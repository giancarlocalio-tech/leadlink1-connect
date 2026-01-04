CREATE OR REPLACE FUNCTION handle_expired_assignment(p_request_id uuid)
RETURNS text
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
  v_total_plumbers_in_plan integer;
BEGIN
  -- Get current assignment details
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

  -- Mark the current assignment as timed out
  UPDATE assignment_logs
  SET
    responded = true,
    response_type = 'timeout',
    response_at = now()
  WHERE request_id = p_request_id
    AND plumber_id = v_current_assignee
    AND response_type IS NULL;

  -- Reset request to 'new' temporarily
  UPDATE service_requests
  SET
    status = 'new',
    assigned_plumber_id = NULL,
    assigned_at = NULL,
    current_assignee_plan = NULL,
    assignment_started_at = NULL,
    assignment_expires_at = NULL
  WHERE id = p_request_id;

  -- Get max_attempts from config (NULL means try ALL plumbers of this plan)
  SELECT max_attempts INTO v_max_attempts
  FROM assignment_config
  WHERE urgency = v_urgency AND plan_type = v_current_plan;

  -- Count how many plumbers of this plan have been tried
  SELECT COUNT(*) INTO v_current_plan_attempts
  FROM assignment_logs
  WHERE request_id = p_request_id AND plumber_plan = v_current_plan;

  -- If max_attempts is NULL, count total eligible plumbers for this plan in this city
  IF v_max_attempts IS NULL THEN
    SELECT COUNT(*) INTO v_total_plumbers_in_plan
    FROM plumber_profiles pp
    JOIN plumber_subscriptions ps ON ps.plumber_id = pp.id
    WHERE pp.service_areas @> ARRAY[v_city]
      AND ps.status IN ('active', 'pending')
      AND ps.plan_type::text = v_current_plan
      AND ps.is_trial = false
      AND COALESCE(ps.is_available, true) = true;
    
    -- Set max_attempts to total plumbers (try all of them)
    v_max_attempts := v_total_plumbers_in_plan;
  END IF;

  -- Determine next plan to try
  IF v_current_plan_attempts >= v_max_attempts THEN
    -- Exhausted current plan, move to next tier
    IF v_current_plan = 'premium' THEN
      v_next_plan := 'medium';
    ELSIF v_current_plan = 'medium' THEN
      v_next_plan := 'basic';
    ELSE
      v_next_plan := NULL; -- No more tiers
    END IF;
  ELSE
    -- Still have plumbers to try in current plan
    v_next_plan := v_current_plan;
  END IF;

  -- If no more plans to try, mark as expired
  IF v_next_plan IS NULL THEN
    UPDATE service_requests
    SET status = 'expired'
    WHERE id = p_request_id;
    RETURN 'expired';
  END IF;

  -- Find next eligible plumber
  v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);

  -- If no plumber found in current plan, try lower tiers
  IF v_next_plumber IS NULL AND v_next_plan = 'premium' THEN
    v_next_plan := 'medium';
    v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
  END IF;
  
  IF v_next_plumber IS NULL AND v_next_plan = 'medium' THEN
    v_next_plan := 'basic';
    v_next_plumber := get_next_eligible_plumber(p_request_id, v_city, v_urgency, v_next_plan);
  END IF;

  -- If still no plumber, keep as 'new' for trial users (don't mark expired immediately)
  IF v_next_plumber IS NULL THEN
    -- Leave status as 'new' so trial users can claim it
    RETURN 'no_subscribers_available';
  END IF;

  -- Assign to the next plumber
  PERFORM assign_request_to_plumber(p_request_id, v_next_plumber);
  RETURN 'reassigned';
END;
$$;