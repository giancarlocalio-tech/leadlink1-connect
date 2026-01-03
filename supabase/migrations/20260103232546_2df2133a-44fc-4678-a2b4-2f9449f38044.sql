-- Add free_requests_remaining field for trial-by-value model
ALTER TABLE public.plumber_subscriptions 
ADD COLUMN IF NOT EXISTS free_requests_remaining integer DEFAULT 3;

-- Add is_trial flag to identify users in trial mode
ALTER TABLE public.plumber_subscriptions 
ADD COLUMN IF NOT EXISTS is_trial boolean DEFAULT true;

-- Update existing subscriptions: those with active paid status keep their state
-- New users will start with is_trial = true and free_requests_remaining = 3
UPDATE public.plumber_subscriptions 
SET is_trial = false 
WHERE status = 'active' AND stripe_subscription_id IS NOT NULL;

-- Update the get_next_eligible_plumber function to check free_requests_remaining
CREATE OR REPLACE FUNCTION public.get_next_eligible_plumber(p_request_id uuid, p_city text, p_urgency text, p_target_plan text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_plumber_id uuid;
BEGIN
  SELECT pp.id INTO v_plumber_id
  FROM plumber_profiles pp
  JOIN plumber_subscriptions ps ON ps.plumber_id = pp.id
  WHERE
    pp.service_areas @> ARRAY[p_city]
    AND ps.status IN ('active', 'pending')
    AND ps.plan_type::text = p_target_plan
    AND COALESCE(ps.is_available, true) = true
    -- Check if user has remaining free requests (trial) OR is a paid subscriber
    AND (
      (ps.is_trial = true AND COALESCE(ps.free_requests_remaining, 0) > 0)
      OR ps.is_trial = false
    )
    AND (
      ps.monthly_contact_limit IS NULL
      OR ps.monthly_contacts_used < ps.monthly_contact_limit
    )
    -- Not already in assignment_logs for this specific request
    AND pp.id NOT IN (
      SELECT al.plumber_id
      FROM assignment_logs al
      WHERE al.request_id = p_request_id
    )
    -- Premium can have multiple assignments, basic/medium only one
    AND (
      p_target_plan = 'premium'
      OR pp.id NOT IN (
        SELECT sr.assigned_plumber_id
        FROM service_requests sr
        WHERE sr.status = 'assigned'
          AND sr.assigned_plumber_id IS NOT NULL
          AND sr.id != p_request_id
      )
    )
  ORDER BY
    COALESCE(ps.last_assigned_at, '1970-01-01'::timestamp) ASC,
    COALESCE(pp.rating, 0) DESC
  LIMIT 1;

  RETURN v_plumber_id;
END;
$function$;

-- Update accept_request function to decrement free_requests_remaining for trial users
CREATE OR REPLACE FUNCTION public.accept_request(p_request_id uuid, p_plumber_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_current_assignee uuid;
  v_is_trial boolean;
BEGIN
  SELECT assigned_plumber_id INTO v_current_assignee
  FROM service_requests
  WHERE id = p_request_id AND status = 'assigned';

  IF v_current_assignee IS NULL OR v_current_assignee != p_plumber_id THEN
    RETURN false;
  END IF;

  -- Check if plumber is in trial mode
  SELECT is_trial INTO v_is_trial
  FROM plumber_subscriptions
  WHERE plumber_id = p_plumber_id;

  UPDATE service_requests
  SET
    status = 'accepted',
    accepted_at = now(),
    accepted_by_id = p_plumber_id,
    assignment_expires_at = now()
  WHERE id = p_request_id;

  UPDATE assignment_logs
  SET
    responded = true,
    response_type = 'accepted',
    response_at = now()
  WHERE request_id = p_request_id
    AND plumber_id = p_plumber_id;

  -- For trial users, decrement free_requests_remaining
  -- For paid users, increment monthly_contacts_used
  IF v_is_trial = true THEN
    UPDATE plumber_subscriptions
    SET free_requests_remaining = GREATEST(0, COALESCE(free_requests_remaining, 0) - 1)
    WHERE plumber_id = p_plumber_id;
  ELSE
    UPDATE plumber_subscriptions
    SET monthly_contacts_used = monthly_contacts_used + 1
    WHERE plumber_id = p_plumber_id;
  END IF;

  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, true)
  ON CONFLICT DO NOTHING;

  RETURN true;
END;
$function$;