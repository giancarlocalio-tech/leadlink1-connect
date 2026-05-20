
-- ============================================================
-- 1. plumber_credits: nuove colonne in centesimi
-- ============================================================
ALTER TABLE public.plumber_credits
  ADD COLUMN IF NOT EXISTS balance_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_purchased_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_spent_cents integer NOT NULL DEFAULT 0;

-- Migrazione dati esistenti: 1 credito = 1 € = 100 centesimi
UPDATE public.plumber_credits
SET 
  balance_cents = COALESCE(balance, 0) * 100,
  total_purchased_cents = COALESCE(total_purchased, 0) * 100,
  total_spent_cents = COALESCE(total_spent, 0) * 100
WHERE balance_cents = 0 AND (balance > 0 OR total_purchased > 0 OR total_spent > 0);

-- ============================================================
-- 2. credit_packages: importo in centesimi + nuovi pacchetti
-- ============================================================
ALTER TABLE public.credit_packages
  ADD COLUMN IF NOT EXISTS amount_cents integer NOT NULL DEFAULT 0;

-- Disattiva i vecchi pacchetti a crediti
UPDATE public.credit_packages SET is_active = false WHERE amount_cents = 0;

-- Inserisce i nuovi pacchetti in euro (stile ProntoPro)
INSERT INTO public.credit_packages (name, credits, price_cents, price_per_credit, amount_cents, is_active, sort_order)
VALUES
  ('20 €',  0, 2000,  1, 2000,  true, 1),
  ('40 €',  0, 4000,  1, 4000,  true, 2),
  ('80 €',  0, 8000,  1, 8000,  true, 3),
  ('200 €', 0, 20000, 1, 20000, true, 4),
  ('300 €', 0, 30000, 1, 30000, true, 5);

-- ============================================================
-- 3. unlock_costs: costo in centesimi
-- ============================================================
ALTER TABLE public.unlock_costs
  ADD COLUMN IF NOT EXISTS cost_cents integer NOT NULL DEFAULT 0;

UPDATE public.unlock_costs SET cost_cents = 600  WHERE urgency = 'subito';
UPDATE public.unlock_costs SET cost_cents = 400  WHERE urgency = 'entro_24_ore';
UPDATE public.unlock_costs SET cost_cents = 250  WHERE urgency = 'prossimi_giorni';

-- Inserisce eventuali righe mancanti
INSERT INTO public.unlock_costs (urgency, credits_cost, cost_cents)
SELECT 'subito', 6, 600
WHERE NOT EXISTS (SELECT 1 FROM public.unlock_costs WHERE urgency = 'subito');

INSERT INTO public.unlock_costs (urgency, credits_cost, cost_cents)
SELECT 'entro_24_ore', 4, 400
WHERE NOT EXISTS (SELECT 1 FROM public.unlock_costs WHERE urgency = 'entro_24_ore');

INSERT INTO public.unlock_costs (urgency, credits_cost, cost_cents)
SELECT 'prossimi_giorni', 3, 250
WHERE NOT EXISTS (SELECT 1 FROM public.unlock_costs WHERE urgency = 'prossimi_giorni');

-- ============================================================
-- 4. credit_transactions: delta e saldo in centesimi
-- ============================================================
ALTER TABLE public.credit_transactions
  ADD COLUMN IF NOT EXISTS amount_cents_delta integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_after_cents integer NOT NULL DEFAULT 0;

-- ============================================================
-- 5. Trigger nuovi idraulici: niente più 3 prove gratuite
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_plumber_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.plumber_subscriptions (
    plumber_id,
    plan_type,
    status,
    is_trial,
    free_requests_remaining,
    monthly_contacts_used,
    exclusive_contacts_used
  ) VALUES (
    NEW.id,
    'basic',
    'pending',
    false,  -- niente più trial
    0,      -- niente più prove gratuite
    0,
    0
  )
  ON CONFLICT (plumber_id) DO NOTHING;
  
  RETURN NEW;
END;
$function$;

-- ============================================================
-- 6. Funzione: accredito saldo dopo pagamento
-- ============================================================
CREATE OR REPLACE FUNCTION public.add_balance(
  p_plumber_id uuid,
  p_amount_cents integer,
  p_stripe_payment_id text,
  p_description text DEFAULT NULL
)
RETURNS TABLE(success boolean, new_balance_cents integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_new_balance integer;
  v_existing_tx uuid;
BEGIN
  -- Idempotenza: se questo stripe_payment_id è già stato registrato, non duplicare
  IF p_stripe_payment_id IS NOT NULL THEN
    SELECT id INTO v_existing_tx
    FROM credit_transactions
    WHERE stripe_payment_intent_id = p_stripe_payment_id
    LIMIT 1;
    
    IF v_existing_tx IS NOT NULL THEN
      SELECT balance_cents INTO v_new_balance
      FROM plumber_credits
      WHERE plumber_id = p_plumber_id;
      RETURN QUERY SELECT true, COALESCE(v_new_balance, 0);
      RETURN;
    END IF;
  END IF;

  -- Assicura che esista il record plumber_credits
  INSERT INTO plumber_credits (plumber_id, balance_cents, total_purchased_cents)
  VALUES (p_plumber_id, 0, 0)
  ON CONFLICT (plumber_id) DO NOTHING;

  -- Aggiorna saldo
  UPDATE plumber_credits
  SET 
    balance_cents = balance_cents + p_amount_cents,
    total_purchased_cents = total_purchased_cents + p_amount_cents,
    updated_at = now()
  WHERE plumber_id = p_plumber_id
  RETURNING balance_cents INTO v_new_balance;

  -- Registra transazione
  INSERT INTO credit_transactions (
    plumber_id, transaction_type, credits, balance_after,
    amount_cents_delta, balance_after_cents,
    amount_cents, stripe_payment_intent_id, description
  ) VALUES (
    p_plumber_id, 'purchase', 0, 0,
    p_amount_cents, v_new_balance,
    p_amount_cents, p_stripe_payment_id,
    COALESCE(p_description, format('Ricarica saldo +%s,%s €', p_amount_cents/100, lpad((p_amount_cents%100)::text, 2, '0')))
  );

  RETURN QUERY SELECT true, v_new_balance;
END;
$function$;

-- ============================================================
-- 7. Funzione: sblocco contatto con saldo in euro
-- ============================================================
CREATE OR REPLACE FUNCTION public.unlock_contact_with_balance(
  p_plumber_id uuid,
  p_request_id uuid
)
RETURNS TABLE(
  success boolean,
  message text,
  amount_spent_cents integer,
  new_balance_cents integer,
  client_name text,
  client_phone text,
  client_email text
)
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
BEGIN
  -- Già sbloccato da questo idraulico?
  SELECT EXISTS(
    SELECT 1 FROM contact_unlocks
    WHERE plumber_id = p_plumber_id AND request_id = p_request_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    SELECT sr.client_name, sr.client_phone, sr.client_email
    INTO v_client_name, v_client_phone, v_client_email
    FROM service_requests sr WHERE sr.id = p_request_id;
    
    SELECT balance_cents INTO v_new_balance
    FROM plumber_credits WHERE plumber_id = p_plumber_id;
    
    RETURN QUERY SELECT true, 'Contatto già sbloccato'::text, 0, COALESCE(v_new_balance, 0),
                        v_client_name, v_client_phone, v_client_email;
    RETURN;
  END IF;

  -- Aree di servizio
  SELECT pp.service_areas INTO v_service_areas
  FROM plumber_profiles pp WHERE pp.id = p_plumber_id;
  
  -- Dettagli richiesta
  SELECT sr.urgency::text, sr.city, sr.client_name, sr.client_phone, sr.client_email
  INTO v_urgency, v_request_city, v_client_name, v_client_phone, v_client_email
  FROM service_requests sr WHERE sr.id = p_request_id;
  
  IF v_urgency IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Match zona
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
  
  -- Costo in centesimi
  SELECT cost_cents INTO v_cost_cents FROM unlock_costs WHERE urgency = v_urgency;
  IF v_cost_cents IS NULL OR v_cost_cents = 0 THEN
    v_cost_cents := 400; -- default 4 €
  END IF;
  
  -- Saldo
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
    format('Sblocco contatto - Urgenza: %s', v_urgency)
  );
  
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, false)
  ON CONFLICT DO NOTHING;
  
  RETURN QUERY SELECT
    true,
    'Contatto sbloccato con successo!'::text,
    v_cost_cents, v_new_balance,
    v_client_name, v_client_phone, v_client_email;
END;
$function$;
