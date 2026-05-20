-- Add phone_contact_allowed column to service_requests
ALTER TABLE public.service_requests
ADD COLUMN IF NOT EXISTS phone_contact_allowed boolean NOT NULL DEFAULT true;

-- Update unlock_contact_with_balance to apply 30% discount when phone is not allowed
CREATE OR REPLACE FUNCTION public.unlock_contact_with_balance(p_plumber_id uuid, p_request_id uuid)
 RETURNS TABLE(success boolean, message text, amount_spent_cents integer, new_balance_cents integer, client_name text, client_phone text, client_email text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_current_balance integer;
  v_urgency text;
  v_cost_cents integer;
  v_new_balance integer;
  v_client_name text;
  v_client_phone text;
  v_client_email text;
  v_request_city text;
  v_service_areas text[];
  v_already_unlocked boolean;
  v_city_matches boolean;
  v_request_province text;
  v_phone_allowed boolean;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM contact_unlocks
    WHERE plumber_id = p_plumber_id AND request_id = p_request_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    SELECT sr.client_name,
           CASE WHEN sr.phone_contact_allowed THEN sr.client_phone ELSE NULL END,
           sr.client_email
    INTO v_client_name, v_client_phone, v_client_email
    FROM service_requests sr WHERE sr.id = p_request_id;
    
    SELECT balance_cents INTO v_new_balance
    FROM plumber_credits WHERE plumber_id = p_plumber_id;
    
    RETURN QUERY SELECT true, 'Contatto già sbloccato'::text, 0, COALESCE(v_new_balance, 0),
                        v_client_name, v_client_phone, v_client_email;
    RETURN;
  END IF;

  SELECT pp.service_areas INTO v_service_areas
  FROM plumber_profiles pp WHERE pp.id = p_plumber_id;
  
  SELECT sr.urgency::text, sr.city, sr.client_name, sr.client_phone, sr.client_email, sr.phone_contact_allowed
  INTO v_urgency, v_request_city, v_client_name, v_client_phone, v_client_email, v_phone_allowed
  FROM service_requests sr WHERE sr.id = p_request_id;
  
  IF v_urgency IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  v_request_province := SUBSTRING(v_request_city FROM '\(([A-Z]{2})\)$');
  SELECT EXISTS (
    SELECT 1 FROM unnest(v_service_areas) AS sa
    WHERE 
      LOWER(v_request_city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
      OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(v_request_city) || '%'
      OR (v_request_province IS NOT NULL AND SUBSTRING(sa FROM '\(([A-Z]{2})\)$') = v_request_province)
  ) INTO v_city_matches;
  
  IF NOT v_city_matches THEN
    RETURN QUERY SELECT false, 'Questa richiesta non è nella tua zona di lavoro'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  SELECT cost_cents INTO v_cost_cents FROM unlock_costs WHERE urgency = v_urgency;
  IF v_cost_cents IS NULL OR v_cost_cents = 0 THEN
    v_cost_cents := 400;
  END IF;
  
  -- Apply 30% discount when phone contact is not allowed (chat-only)
  IF COALESCE(v_phone_allowed, true) = false THEN
    v_cost_cents := ROUND(v_cost_cents * 0.7)::integer;
  END IF;
  
  SELECT balance_cents INTO v_current_balance
  FROM plumber_credits WHERE plumber_id = p_plumber_id FOR UPDATE;
  
  IF v_current_balance IS NULL THEN
    INSERT INTO plumber_credits (plumber_id, balance_cents) VALUES (p_plumber_id, 0)
    ON CONFLICT (plumber_id) DO NOTHING;
    v_current_balance := 0;
  END IF;
  
  IF v_current_balance < v_cost_cents THEN
    RETURN QUERY SELECT 
      false,
      format('Saldo insufficiente. Hai %s,%s €, servono %s,%s €',
             v_current_balance/100, lpad((v_current_balance%100)::text, 2, '0'),
             v_cost_cents/100, lpad((v_cost_cents%100)::text, 2, '0'))::text,
      0, v_current_balance, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  v_new_balance := v_current_balance - v_cost_cents;
  
  UPDATE plumber_credits
  SET balance_cents = v_new_balance,
      total_spent_cents = total_spent_cents + v_cost_cents,
      updated_at = now()
  WHERE plumber_id = p_plumber_id;
  
  INSERT INTO credit_transactions (
    plumber_id, transaction_type, credits, balance_after,
    amount_cents_delta, balance_after_cents,
    request_id, unlock_reason, description
  ) VALUES (
    p_plumber_id, 'unlock', 0, 0,
    -v_cost_cents, v_new_balance,
    p_request_id, v_urgency,
    format('Sblocco contatto - Urgenza: %s%s', v_urgency, CASE WHEN COALESCE(v_phone_allowed, true) = false THEN ' (solo chat)' ELSE '' END)
  );
  
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, false)
  ON CONFLICT DO NOTHING;
  
  -- Hide phone if not allowed
  IF COALESCE(v_phone_allowed, true) = false THEN
    v_client_phone := NULL;
  END IF;
  
  RETURN QUERY SELECT
    true,
    'Contatto sbloccato con successo!'::text,
    v_cost_cents, v_new_balance,
    v_client_name, v_client_phone, v_client_email;
END;
$function$;