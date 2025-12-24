-- =============================================
-- LEAD ASSIGNMENT SYSTEM - DATABASE SCHEMA
-- =============================================

-- 1. Add new columns to plumber_subscriptions for monthly limits and trial
ALTER TABLE public.plumber_subscriptions
ADD COLUMN IF NOT EXISTS monthly_contact_limit integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS monthly_contacts_used integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS contacts_reset_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS is_available boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS last_assigned_at timestamp with time zone DEFAULT NULL;

-- 2. Add new columns to service_requests for assignment tracking
ALTER TABLE public.service_requests
ADD COLUMN IF NOT EXISTS assignment_started_at timestamp with time zone DEFAULT NULL,
ADD COLUMN IF NOT EXISTS assignment_expires_at timestamp with time zone DEFAULT NULL,
ADD COLUMN IF NOT EXISTS assignment_round integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS accepted_at timestamp with time zone DEFAULT NULL,
ADD COLUMN IF NOT EXISTS accepted_by_id uuid REFERENCES public.plumber_profiles(id) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS current_assignee_plan text DEFAULT NULL;

-- Update status to use enum for better type safety
-- First drop default, alter type, then add default back
ALTER TABLE public.service_requests 
ALTER COLUMN status DROP DEFAULT;

-- Create request_status enum if not exists
DO $$ BEGIN
  CREATE TYPE public.request_status AS ENUM ('new', 'assigned', 'accepted', 'expired', 'completed', 'canceled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- We'll keep status as text for now but update values

-- 3. Create assignment_logs table for tracking all assignment attempts
CREATE TABLE IF NOT EXISTS public.assignment_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  plumber_id uuid NOT NULL REFERENCES public.plumber_profiles(id) ON DELETE CASCADE,
  plumber_plan text NOT NULL,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL,
  responded boolean DEFAULT false,
  response_type text DEFAULT NULL, -- 'accepted', 'declined', 'timeout'
  response_at timestamp with time zone DEFAULT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on assignment_logs
ALTER TABLE public.assignment_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for assignment_logs
CREATE POLICY "Admins can manage all assignment logs"
ON public.assignment_logs
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Plumbers can view their own assignment logs"
ON public.assignment_logs
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM plumber_profiles
  WHERE plumber_profiles.id = assignment_logs.plumber_id
  AND plumber_profiles.user_id = auth.uid()
));

-- 4. Update subscription_plans with new limits configuration
UPDATE public.subscription_plans
SET 
  max_exclusive_contacts = 2,
  description = 'Piano base: 2 contatti/mese, solo richieste non urgenti'
WHERE plan_type = 'basic';

UPDATE public.subscription_plans
SET 
  max_exclusive_contacts = 5,
  description = 'Piano intermedio: 5 contatti/mese, tutte le urgenze (dopo Premium)'
WHERE plan_type = 'medium';

UPDATE public.subscription_plans
SET 
  max_exclusive_contacts = NULL,
  contacts_are_exclusive = true,
  description = 'Piano professionale: contatti illimitati, priorità su tutte le richieste'
WHERE plan_type = 'premium';

-- 5. Create a configuration table for timer settings
CREATE TABLE IF NOT EXISTS public.assignment_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  urgency text NOT NULL,
  plan_type text NOT NULL,
  timer_minutes integer NOT NULL,
  max_attempts integer DEFAULT 3,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(urgency, plan_type)
);

-- Enable RLS
ALTER TABLE public.assignment_config ENABLE ROW LEVEL SECURITY;

-- Only admins can manage config
CREATE POLICY "Admins can manage assignment config"
ON public.assignment_config
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can read config
CREATE POLICY "Anyone can view assignment config"
ON public.assignment_config
FOR SELECT
USING (true);

-- Insert default timer configurations
INSERT INTO public.assignment_config (urgency, plan_type, timer_minutes, max_attempts) VALUES
-- SUBITO: Premium 60min, Medium 90min (Basic escluso)
('subito', 'premium', 60, 3),
('subito', 'medium', 90, 3),
-- ENTRO 24 ORE: Premium 120min, Medium 240min, Basic 720min
('entro_24_ore', 'premium', 120, 2),
('entro_24_ore', 'medium', 240, 2),
('entro_24_ore', 'basic', 720, 2),
-- NEI PROSSIMI GIORNI: tutti con timer più lunghi
('prossimi_giorni', 'premium', 720, 2),
('prossimi_giorni', 'medium', 1440, 2),
('prossimi_giorni', 'basic', 1440, 2)
ON CONFLICT (urgency, plan_type) DO UPDATE SET
  timer_minutes = EXCLUDED.timer_minutes,
  max_attempts = EXCLUDED.max_attempts;

-- 6. Create function to get next eligible plumber for assignment
CREATE OR REPLACE FUNCTION public.get_next_eligible_plumber(
  p_request_id uuid,
  p_city text,
  p_urgency text,
  p_target_plan text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plumber_id uuid;
BEGIN
  -- Find the best candidate plumber
  SELECT pp.id INTO v_plumber_id
  FROM plumber_profiles pp
  JOIN plumber_subscriptions ps ON ps.plumber_id = pp.id
  WHERE 
    -- Must serve this city
    pp.service_areas @> ARRAY[p_city]
    -- Must have active subscription
    AND ps.status IN ('active', 'pending')
    -- Must match target plan
    AND ps.plan_type::text = p_target_plan
    -- Must be available
    AND COALESCE(ps.is_available, true) = true
    -- Must not have exceeded monthly limit (for basic/medium)
    AND (
      ps.monthly_contact_limit IS NULL 
      OR ps.monthly_contacts_used < ps.monthly_contact_limit
    )
    -- Must not be currently assigned to this request
    AND pp.id NOT IN (
      SELECT al.plumber_id 
      FROM assignment_logs al 
      WHERE al.request_id = p_request_id
    )
    -- Must not be currently assigned to another active request (optional)
    AND pp.id NOT IN (
      SELECT sr.current_assignee_id 
      FROM service_requests sr 
      WHERE sr.status = 'assigned' 
      AND sr.current_assignee_id IS NOT NULL
      AND sr.id != p_request_id
    )
  ORDER BY
    -- Prioritize by last assigned (round robin)
    COALESCE(ps.last_assigned_at, '1970-01-01'::timestamp) ASC,
    -- Then by rating
    COALESCE(pp.rating, 0) DESC
  LIMIT 1;
  
  RETURN v_plumber_id;
END;
$$;

-- 7. Create function to assign request to plumber
CREATE OR REPLACE FUNCTION public.assign_request_to_plumber(
  p_request_id uuid,
  p_plumber_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan_type text;
  v_urgency text;
  v_timer_minutes integer;
  v_expires_at timestamp with time zone;
BEGIN
  -- Get plumber's plan
  SELECT ps.plan_type::text INTO v_plan_type
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE pp.id = p_plumber_id;
  
  -- Get request urgency
  SELECT urgency::text INTO v_urgency
  FROM service_requests
  WHERE id = p_request_id;
  
  -- Get timer configuration
  SELECT timer_minutes INTO v_timer_minutes
  FROM assignment_config
  WHERE urgency = v_urgency AND plan_type = v_plan_type;
  
  -- Default to 60 minutes if not configured
  v_timer_minutes := COALESCE(v_timer_minutes, 60);
  v_expires_at := now() + (v_timer_minutes || ' minutes')::interval;
  
  -- Update service request
  UPDATE service_requests
  SET 
    status = 'assigned',
    current_assignee_id = p_plumber_id,
    current_assignee_plan = v_plan_type,
    assignment_started_at = now(),
    assignment_expires_at = v_expires_at,
    assignment_round = assignment_round + 1
  WHERE id = p_request_id;
  
  -- Create assignment log
  INSERT INTO assignment_logs (request_id, plumber_id, plumber_plan, expires_at)
  VALUES (p_request_id, p_plumber_id, v_plan_type, v_expires_at);
  
  -- Update plumber's last_assigned_at
  UPDATE plumber_subscriptions
  SET last_assigned_at = now()
  WHERE plumber_id = p_plumber_id;
  
  RETURN true;
END;
$$;

-- 8. Create function to accept a request
CREATE OR REPLACE FUNCTION public.accept_request(
  p_request_id uuid,
  p_plumber_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_assignee uuid;
BEGIN
  -- Verify the plumber is the current assignee
  SELECT current_assignee_id INTO v_current_assignee
  FROM service_requests
  WHERE id = p_request_id AND status = 'assigned';
  
  IF v_current_assignee IS NULL OR v_current_assignee != p_plumber_id THEN
    RETURN false;
  END IF;
  
  -- Update service request
  UPDATE service_requests
  SET 
    status = 'accepted',
    accepted_at = now(),
    accepted_by_id = p_plumber_id,
    assignment_expires_at = now() -- Stop timer
  WHERE id = p_request_id;
  
  -- Update assignment log
  UPDATE assignment_logs
  SET 
    responded = true,
    response_type = 'accepted',
    response_at = now()
  WHERE request_id = p_request_id AND plumber_id = p_plumber_id;
  
  -- Increment monthly_contacts_used
  UPDATE plumber_subscriptions
  SET monthly_contacts_used = monthly_contacts_used + 1
  WHERE plumber_id = p_plumber_id;
  
  -- Create contact unlock record
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, true)
  ON CONFLICT DO NOTHING;
  
  RETURN true;
END;
$$;

-- 9. Create function to handle expired assignments
CREATE OR REPLACE FUNCTION public.handle_expired_assignment(
  p_request_id uuid
)
RETURNS text -- Returns 'reassigned', 'expired', or 'no_action'
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_assignee uuid;
  v_urgency text;
  v_city text;
  v_current_plan text;
  v_assignment_round integer;
  v_next_plan text;
  v_next_plumber uuid;
  v_max_attempts integer;
  v_current_plan_attempts integer;
BEGIN
  -- Get request details
  SELECT 
    current_assignee_id, 
    urgency::text, 
    city,
    current_assignee_plan,
    assignment_round
  INTO v_current_assignee, v_urgency, v_city, v_current_plan, v_assignment_round
  FROM service_requests
  WHERE id = p_request_id AND status = 'assigned';
  
  IF v_current_assignee IS NULL THEN
    RETURN 'no_action';
  END IF;
  
  -- Mark current assignment as timeout
  UPDATE assignment_logs
  SET 
    responded = true,
    response_type = 'timeout',
    response_at = now()
  WHERE request_id = p_request_id AND plumber_id = v_current_assignee AND response_type IS NULL;
  
  -- Clear current assignee
  UPDATE service_requests
  SET 
    current_assignee_id = NULL,
    current_assignee_plan = NULL,
    assignment_started_at = NULL,
    assignment_expires_at = NULL
  WHERE id = p_request_id;
  
  -- Get max attempts for current plan
  SELECT max_attempts INTO v_max_attempts
  FROM assignment_config
  WHERE urgency = v_urgency AND plan_type = v_current_plan;
  v_max_attempts := COALESCE(v_max_attempts, 3);
  
  -- Count attempts for current plan
  SELECT COUNT(*) INTO v_current_plan_attempts
  FROM assignment_logs
  WHERE request_id = p_request_id AND plumber_plan = v_current_plan;
  
  -- Determine next plan to try
  IF v_current_plan_attempts >= v_max_attempts THEN
    -- Move to next tier
    IF v_current_plan = 'premium' THEN
      v_next_plan := 'medium';
    ELSIF v_current_plan = 'medium' THEN
      -- For SUBITO, skip basic
      IF v_urgency = 'subito' THEN
        v_next_plan := NULL; -- No more options
      ELSE
        v_next_plan := 'basic';
      END IF;
    ELSE
      v_next_plan := NULL; -- No more options
    END IF;
  ELSE
    v_next_plan := v_current_plan; -- Try same tier again
  END IF;
  
  -- If no next plan, mark as expired
  IF v_next_plan IS NULL THEN
    UPDATE service_requests
    SET status = 'expired'
    WHERE id = p_request_id;
    RETURN 'expired';
  END IF;
  
  -- Try to find next eligible plumber
  v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
  
  IF v_next_plumber IS NULL THEN
    -- Try next tier if no plumber found in current tier
    IF v_next_plan = 'premium' THEN
      v_next_plan := 'medium';
      v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
    END IF;
    IF v_next_plumber IS NULL AND v_next_plan = 'medium' AND v_urgency != 'subito' THEN
      v_next_plan := 'basic';
      v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
    END IF;
  END IF;
  
  IF v_next_plumber IS NULL THEN
    UPDATE service_requests
    SET status = 'expired'
    WHERE id = p_request_id;
    RETURN 'expired';
  END IF;
  
  -- Assign to next plumber
  PERFORM assign_request_to_plumber(p_request_id, v_next_plumber);
  RETURN 'reassigned';
END;
$$;

-- 10. Enable realtime for assignment tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.assignment_logs;

-- 11. Add index for performance
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_expires ON public.service_requests(assignment_expires_at) WHERE status = 'assigned';
CREATE INDEX IF NOT EXISTS idx_assignment_logs_request ON public.assignment_logs(request_id);
CREATE INDEX IF NOT EXISTS idx_plumber_profiles_areas ON public.plumber_profiles USING GIN(service_areas);