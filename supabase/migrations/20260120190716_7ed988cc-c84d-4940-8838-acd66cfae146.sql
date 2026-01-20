-- Credit packages available for purchase
CREATE TABLE public.credit_packages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  credits integer NOT NULL,
  price_cents integer NOT NULL, -- Price in cents (EUR)
  price_per_credit numeric(10,2) NOT NULL, -- Calculated price per credit
  stripe_price_id text, -- Will be set after creating Stripe products
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Plumber credit balance
CREATE TABLE public.plumber_credits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plumber_id uuid NOT NULL UNIQUE REFERENCES public.plumber_profiles(id) ON DELETE CASCADE,
  balance integer NOT NULL DEFAULT 0,
  total_purchased integer NOT NULL DEFAULT 0,
  total_spent integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Credit transactions (purchases and consumption)
CREATE TABLE public.credit_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plumber_id uuid NOT NULL REFERENCES public.plumber_profiles(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'unlock', 'refund', 'bonus')),
  credits integer NOT NULL, -- Positive for purchases, negative for unlocks
  balance_after integer NOT NULL,
  -- For purchases
  package_id uuid REFERENCES public.credit_packages(id),
  stripe_payment_intent_id text,
  amount_cents integer, -- Amount paid in cents
  -- For unlocks
  request_id uuid REFERENCES public.service_requests(id),
  unlock_reason text, -- 'subito', 'entro_24_ore', 'prossimi_giorni'
  -- Metadata
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Unlock costs configuration
CREATE TABLE public.unlock_costs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  urgency text NOT NULL UNIQUE,
  credits_cost integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert default unlock costs
INSERT INTO public.unlock_costs (urgency, credits_cost) VALUES
  ('subito', 5),
  ('entro_24_ore', 3),
  ('prossimi_giorni', 2);

-- Insert default credit packages
INSERT INTO public.credit_packages (name, credits, price_cents, price_per_credit, sort_order) VALUES
  ('Base', 34, 10000, 2.94, 1),
  ('Pro', 80, 20000, 2.50, 2),
  ('Business', 150, 30000, 2.00, 3);

-- Enable RLS
ALTER TABLE public.credit_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plumber_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlock_costs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credit_packages (public read)
CREATE POLICY "Anyone can view active credit packages"
  ON public.credit_packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage credit packages"
  ON public.credit_packages FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for plumber_credits
CREATE POLICY "Plumbers can view own credits"
  ON public.plumber_credits FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM plumber_profiles
    WHERE plumber_profiles.id = plumber_credits.plumber_id
    AND plumber_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all credits"
  ON public.plumber_credits FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for credit_transactions
CREATE POLICY "Plumbers can view own transactions"
  ON public.credit_transactions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM plumber_profiles
    WHERE plumber_profiles.id = credit_transactions.plumber_id
    AND plumber_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all transactions"
  ON public.credit_transactions FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for unlock_costs (public read)
CREATE POLICY "Anyone can view unlock costs"
  ON public.unlock_costs FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage unlock costs"
  ON public.unlock_costs FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to initialize credits for new plumber
CREATE OR REPLACE FUNCTION public.handle_new_plumber_credits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.plumber_credits (plumber_id, balance)
  VALUES (NEW.id, 0)
  ON CONFLICT (plumber_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger to auto-create credits row for new plumbers
CREATE TRIGGER on_plumber_profile_created_credits
  AFTER INSERT ON public.plumber_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_plumber_credits();

-- Function to unlock contact using credits
CREATE OR REPLACE FUNCTION public.unlock_contact_with_credits(
  p_plumber_id uuid,
  p_request_id uuid
)
RETURNS TABLE(success boolean, message text, credits_spent integer, new_balance integer, client_name text, client_phone text, client_email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
  v_service_areas text[];
  v_already_unlocked boolean;
BEGIN
  -- Check if already unlocked
  SELECT EXISTS(
    SELECT 1 FROM contact_unlocks
    WHERE plumber_id = p_plumber_id AND request_id = p_request_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    -- Return existing contact info
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
  SELECT sr.urgency::text, sr.city, sr.client_name, sr.client_phone, sr.client_email
  INTO v_urgency, v_request_city, v_client_name, v_client_phone, v_client_email
  FROM service_requests sr
  WHERE sr.id = p_request_id;
  
  IF v_urgency IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Check service area
  IF NOT (v_request_city = ANY(v_service_areas)) THEN
    RETURN QUERY SELECT false, 'Questa richiesta non è nella tua zona di lavoro'::text, 0, 0, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- If in trial mode with remaining requests, use trial system
  IF v_is_trial AND COALESCE(v_free_remaining, 0) > 0 THEN
    -- Use trial claim instead
    RETURN QUERY SELECT * FROM trial_claim_request(p_plumber_id, p_request_id);
    RETURN;
  END IF;
  
  -- Get credit cost for this urgency
  SELECT uc.credits_cost INTO v_credits_cost
  FROM unlock_costs uc
  WHERE uc.urgency = v_urgency;
  
  IF v_credits_cost IS NULL THEN
    v_credits_cost := 3; -- Default cost
  END IF;
  
  -- Get current balance
  SELECT balance INTO v_current_balance
  FROM plumber_credits
  WHERE plumber_id = p_plumber_id
  FOR UPDATE;
  
  IF v_current_balance IS NULL THEN
    -- Create credits row if not exists
    INSERT INTO plumber_credits (plumber_id, balance)
    VALUES (p_plumber_id, 0)
    ON CONFLICT (plumber_id) DO NOTHING;
    v_current_balance := 0;
  END IF;
  
  -- Check if enough credits
  IF v_current_balance < v_credits_cost THEN
    RETURN QUERY SELECT 
      false, 
      format('Crediti insufficienti. Hai %s crediti, ne servono %s', v_current_balance, v_credits_cost)::text,
      0, v_current_balance, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Deduct credits
  v_new_balance := v_current_balance - v_credits_cost;
  
  UPDATE plumber_credits
  SET 
    balance = v_new_balance,
    total_spent = total_spent + v_credits_cost,
    updated_at = now()
  WHERE plumber_id = p_plumber_id;
  
  -- Record transaction
  INSERT INTO credit_transactions (
    plumber_id, transaction_type, credits, balance_after, 
    request_id, unlock_reason, description
  ) VALUES (
    p_plumber_id, 'unlock', -v_credits_cost, v_new_balance,
    p_request_id, v_urgency, 
    format('Sblocco contatto - Urgenza: %s', v_urgency)
  );
  
  -- Create unlock record
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
$$;

-- Indexes for performance
CREATE INDEX idx_credit_transactions_plumber ON public.credit_transactions(plumber_id);
CREATE INDEX idx_credit_transactions_created ON public.credit_transactions(created_at DESC);
CREATE INDEX idx_plumber_credits_plumber ON public.plumber_credits(plumber_id);