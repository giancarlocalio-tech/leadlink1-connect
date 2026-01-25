
-- Update unlock_contact_with_credits to match by province code
CREATE OR REPLACE FUNCTION public.unlock_contact_with_credits(p_plumber_id uuid, p_request_id uuid)
 RETURNS TABLE(success boolean, message text, credits_spent integer, new_balance integer, client_name text, client_phone text, client_email text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_is_trial boolean;
  v_free_remaining integer;
  v_current_balance integer;
  v_urgency text;
  v_credits_cost integer;
  v_new_balance integer;
  v_client_name text;
  v_client_phone text;
  v_client_email text;
  v_request_city text;
  v_request_status text;
  v_service_areas text[];
  v_already_unlocked boolean;
  v_city_matches boolean;
  v_request_province text;
BEGIN
  -- Check if already unlocked by THIS plumber
  SELECT EXISTS(
    SELECT 1 FROM contact_unlocks
    WHERE plumber_id = p_plumber_id AND request_id = p_request_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    SELECT sr.client_name, sr.client_phone, sr.client_email
    INTO v_client_name, v_client_phone, v_client_email
    FROM service_requests sr
    WHERE sr.id = p_request_id;
    
    RETURN QUERY SELECT true, 'Contatto già sbloccato'::text, 0, 0, v_client_name, v_client_phone, v_client_email;
    RETURN;
  END IF;

  -- Check if plumber is in trial mode with remaining requests
  SELECT ps.is_trial, ps.free_requests_remaining, pp.service_areas
  INTO v_is_trial, v_free_remaining, v_service_areas
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE ps.plumber_id = p_plumber_id;
  
  -- Get request details
  SELECT sr.urgency::text, sr.city, sr.status, sr.client_name, sr.client_phone, sr.client_email
  INTO v_urgency, v_request_city, v_request_status, v_client_name, v_client_phone, v_client_email
  FROM service_requests sr
  WHERE sr.id = p_request_id;
  
  IF v_urgency IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Extract province code from request city (e.g., "NA" from "Portici (NA)")
  v_request_province := SUBSTRING(v_request_city FROM '\(([A-Z]{2})\)$');
  
  -- Check service area: match by city name OR by province code
  SELECT EXISTS (
    SELECT 1 FROM unnest(v_service_areas) AS sa
    WHERE 
      -- City name matching (existing logic)
      LOWER(v_request_city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
      OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(v_request_city) || '%'
      -- NEW: Province code matching
      OR (
        v_request_province IS NOT NULL
        AND SUBSTRING(sa FROM '\(([A-Z]{2})\)$') = v_request_province
      )
  ) INTO v_city_matches;
  
  IF NOT v_city_matches THEN
    RETURN QUERY SELECT false, 'Questa richiesta non è nella tua zona di lavoro'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- If in trial mode with remaining requests, use trial system
  IF v_is_trial AND COALESCE(v_free_remaining, 0) > 0 THEN
    RETURN QUERY SELECT * FROM trial_claim_request(p_plumber_id, p_request_id);
    RETURN;
  END IF;
  
  -- Get credit cost for this urgency
  SELECT uc.credits_cost INTO v_credits_cost
  FROM unlock_costs uc
  WHERE uc.urgency = v_urgency;
  
  IF v_credits_cost IS NULL THEN
    v_credits_cost := 3;
  END IF;
  
  -- Get current balance
  SELECT balance INTO v_current_balance
  FROM plumber_credits
  WHERE plumber_id = p_plumber_id
  FOR UPDATE;
  
  IF v_current_balance IS NULL THEN
    INSERT INTO plumber_credits (plumber_id, balance)
    VALUES (p_plumber_id, 0)
    ON CONFLICT (plumber_id) DO NOTHING;
    v_current_balance := 0;
  END IF;
  
  IF v_current_balance < v_credits_cost THEN
    RETURN QUERY SELECT 
      false, 
      format('Crediti insufficienti. Hai %s crediti, ne servono %s', v_current_balance, v_credits_cost)::text,
      0, v_current_balance, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  v_new_balance := v_current_balance - v_credits_cost;
  
  UPDATE plumber_credits
  SET 
    balance = v_new_balance,
    total_spent = total_spent + v_credits_cost,
    updated_at = now()
  WHERE plumber_id = p_plumber_id;
  
  INSERT INTO credit_transactions (
    plumber_id, transaction_type, credits, balance_after, 
    request_id, unlock_reason, description
  ) VALUES (
    p_plumber_id, 'unlock', -v_credits_cost, v_new_balance,
    p_request_id, v_urgency, 
    format('Sblocco contatto - Urgenza: %s', v_urgency)
  );
  
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, false)
  ON CONFLICT DO NOTHING;
  
  RETURN QUERY SELECT 
    true, 
    'Contatto sbloccato con successo!'::text,
    v_credits_cost, 
    v_new_balance, 
    v_client_name, 
    v_client_phone, 
    v_client_email;
END;
$function$;

-- Update trial_claim_request to match by province code
CREATE OR REPLACE FUNCTION public.trial_claim_request(p_plumber_id uuid, p_request_id uuid)
 RETURNS TABLE(success boolean, message text, client_name text, client_phone text, client_email text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_is_trial boolean;
  v_free_requests_remaining integer;
  v_request_city text;
  v_service_areas text[];
  v_client_name text;
  v_client_phone text;
  v_client_email text;
  v_city_matches boolean;
  v_already_unlocked boolean;
  v_request_province text;
BEGIN
  -- Check if already unlocked by THIS plumber
  SELECT EXISTS(
    SELECT 1 FROM contact_unlocks
    WHERE plumber_id = p_plumber_id AND request_id = p_request_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    SELECT sr.client_name, sr.client_phone, sr.client_email
    INTO v_client_name, v_client_phone, v_client_email
    FROM service_requests sr
    WHERE sr.id = p_request_id;
    
    RETURN QUERY SELECT true, 'Contatto già sbloccato'::text, v_client_name, v_client_phone, v_client_email;
    RETURN;
  END IF;

  SELECT ps.is_trial, ps.free_requests_remaining, pp.service_areas
  INTO v_is_trial, v_free_requests_remaining, v_service_areas
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE ps.plumber_id = p_plumber_id;
  
  IF NOT v_is_trial THEN
    RETURN QUERY SELECT false, 'Non sei in modalità trial'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  IF COALESCE(v_free_requests_remaining, 0) <= 0 THEN
    RETURN QUERY SELECT false, 'Hai esaurito le richieste gratuite. Acquista crediti per continuare.'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  SELECT sr.city, sr.client_name, sr.client_phone, sr.client_email
  INTO v_request_city, v_client_name, v_client_phone, v_client_email
  FROM service_requests sr
  WHERE sr.id = p_request_id;
  
  IF v_request_city IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Extract province code from request city
  v_request_province := SUBSTRING(v_request_city FROM '\(([A-Z]{2})\)$');
  
  -- Check service area: match by city name OR by province code
  SELECT EXISTS (
    SELECT 1 FROM unnest(v_service_areas) AS sa
    WHERE 
      LOWER(v_request_city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
      OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(v_request_city) || '%'
      OR (
        v_request_province IS NOT NULL
        AND SUBSTRING(sa FROM '\(([A-Z]{2})\)$') = v_request_province
      )
  ) INTO v_city_matches;
  
  IF NOT v_city_matches THEN
    RETURN QUERY SELECT false, 'Questa richiesta non è nella tua zona di lavoro'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  UPDATE plumber_subscriptions
  SET free_requests_remaining = GREATEST(0, COALESCE(free_requests_remaining, 0) - 1)
  WHERE plumber_id = p_plumber_id;
  
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, false)
  ON CONFLICT DO NOTHING;
  
  INSERT INTO assignment_logs (request_id, plumber_id, plumber_plan, expires_at, responded, response_type, response_at)
  VALUES (p_request_id, p_plumber_id, 'trial', now(), true, 'unlocked', now());
  
  RETURN QUERY SELECT true, 'Contatto sbloccato con successo!'::text, v_client_name, v_client_phone, v_client_email;
END;
$function$;

-- Update get_trial_available_requests to match by province code
CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
 RETURNS TABLE(id uuid, intervention_type intervention_type, urgency urgency_type, property_type property_type, accessibility accessibility_type, city text, description text, created_at timestamp with time zone, is_exclusive boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_service_areas text[];
  v_plumber_created_at timestamp with time zone;
BEGIN
  SELECT pp.service_areas, pp.created_at
  INTO v_service_areas, v_plumber_created_at
  FROM plumber_profiles pp
  WHERE pp.id = p_plumber_id;
  
  RETURN QUERY
  SELECT 
    sr.id,
    sr.intervention_type,
    sr.urgency,
    sr.property_type,
    sr.accessibility,
    sr.city,
    sr.description,
    sr.created_at,
    sr.is_exclusive
  FROM service_requests sr
  WHERE sr.status = 'new'
    AND sr.created_at >= NOW() - INTERVAL '3 days'
    -- Match by city name OR by province code
    AND EXISTS (
      SELECT 1 FROM unnest(v_service_areas) AS sa
      WHERE 
        LOWER(sr.city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
        OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(sr.city) || '%'
        OR (
          SUBSTRING(sr.city FROM '\(([A-Z]{2})\)$') IS NOT NULL
          AND SUBSTRING(sa FROM '\(([A-Z]{2})\)$') = SUBSTRING(sr.city FROM '\(([A-Z]{2})\)$')
        )
    )
    AND sr.created_at >= v_plumber_created_at
    AND NOT EXISTS (
      SELECT 1 FROM contact_unlocks cu 
      WHERE cu.request_id = sr.id AND cu.plumber_id = p_plumber_id
    )
  ORDER BY 
    CASE sr.urgency 
      WHEN 'subito' THEN 1 
      WHEN 'entro_24_ore' THEN 2 
      ELSE 3 
    END,
    sr.created_at DESC;
END;
$function$;
