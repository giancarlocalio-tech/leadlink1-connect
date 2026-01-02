-- Update handle_expired_assignment to include Basic for all urgency types
CREATE OR REPLACE FUNCTION public.handle_expired_assignment(p_request_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  SELECT
    assigned_plumber_id,
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

  UPDATE assignment_logs
  SET
    responded = true,
    response_type = 'timeout',
    response_at = now()
  WHERE request_id = p_request_id
    AND plumber_id = v_current_assignee
    AND response_type IS NULL;

  UPDATE service_requests
  SET
    status = 'new',
    assigned_plumber_id = NULL,
    assigned_at = NULL,
    current_assignee_plan = NULL,
    assignment_started_at = NULL,
    assignment_expires_at = NULL
  WHERE id = p_request_id;

  SELECT max_attempts INTO v_max_attempts
  FROM assignment_config
  WHERE urgency = v_urgency AND plan_type = v_current_plan;
  v_max_attempts := COALESCE(v_max_attempts, 3);

  SELECT COUNT(*) INTO v_current_plan_attempts
  FROM assignment_logs
  WHERE request_id = p_request_id AND plumber_plan = v_current_plan;

  IF v_current_plan_attempts >= v_max_attempts THEN
    IF v_current_plan = 'premium' THEN
      v_next_plan := 'medium';
    ELSIF v_current_plan = 'medium' THEN
      -- Basic now included for ALL urgency types (including subito)
      v_next_plan := 'basic';
    ELSE
      v_next_plan := NULL;
    END IF;
  ELSE
    v_next_plan := v_current_plan;
  END IF;

  IF v_next_plan IS NULL THEN
    UPDATE service_requests
    SET status = 'expired'
    WHERE id = p_request_id;
    RETURN 'expired';
  END IF;

  v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);

  IF v_next_plumber IS NULL THEN
    IF v_next_plan = 'premium' THEN
      v_next_plan := 'medium';
      v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
    END IF;
    -- Basic now included for ALL urgency types
    IF v_next_plumber IS NULL AND v_next_plan = 'medium' THEN
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

  PERFORM assign_request_to_plumber(p_request_id, v_next_plumber);
  RETURN 'reassigned';
END;
$function$;

-- Update is_request_visible_for_basic to remove the 1-hour delay
-- Basic users now see requests immediately
CREATE OR REPLACE FUNCTION public.is_request_visible_for_basic(request_id uuid, request_created_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    -- Request is visible immediately for basic if not exclusively unlocked
    NOT EXISTS (
      SELECT 1
      FROM contact_unlocks cu
      WHERE cu.request_id = is_request_visible_for_basic.request_id
        AND cu.is_exclusive = true
    )
$function$;

-- Add assignment_config for basic plan with subito urgency
INSERT INTO public.assignment_config (urgency, plan_type, timer_minutes, max_attempts)
VALUES ('subito', 'basic', 120, 3)
ON CONFLICT DO NOTHING;