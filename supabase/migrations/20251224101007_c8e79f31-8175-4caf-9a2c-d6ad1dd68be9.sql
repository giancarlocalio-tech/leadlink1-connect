-- Fix: align assignment logic to existing column 'assigned_plumber_id' (no 'current_assignee_id' column exists)

CREATE OR REPLACE FUNCTION public.get_next_eligible_plumber(
  p_request_id uuid,
  p_city text,
  p_urgency text,
  p_target_plan text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
    AND (
      ps.monthly_contact_limit IS NULL
      OR ps.monthly_contacts_used < ps.monthly_contact_limit
    )
    AND pp.id NOT IN (
      SELECT al.plumber_id
      FROM assignment_logs al
      WHERE al.request_id = p_request_id
    )
    AND pp.id NOT IN (
      SELECT sr.assigned_plumber_id
      FROM service_requests sr
      WHERE sr.status = 'assigned'
        AND sr.assigned_plumber_id IS NOT NULL
        AND sr.id != p_request_id
    )
  ORDER BY
    COALESCE(ps.last_assigned_at, '1970-01-01'::timestamp) ASC,
    COALESCE(pp.rating, 0) DESC
  LIMIT 1;

  RETURN v_plumber_id;
END;
$$;


CREATE OR REPLACE FUNCTION public.assign_request_to_plumber(
  p_request_id uuid,
  p_plumber_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_plan_type text;
  v_urgency text;
  v_timer_minutes integer;
  v_expires_at timestamp with time zone;
BEGIN
  SELECT ps.plan_type::text INTO v_plan_type
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE pp.id = p_plumber_id;

  SELECT urgency::text INTO v_urgency
  FROM service_requests
  WHERE id = p_request_id;

  SELECT timer_minutes INTO v_timer_minutes
  FROM assignment_config
  WHERE urgency = v_urgency AND plan_type = v_plan_type;

  v_timer_minutes := COALESCE(v_timer_minutes, 60);
  v_expires_at := now() + (v_timer_minutes || ' minutes')::interval;

  UPDATE service_requests
  SET
    status = 'assigned',
    assigned_plumber_id = p_plumber_id,
    assigned_at = now(),
    current_assignee_plan = v_plan_type,
    assignment_started_at = now(),
    assignment_expires_at = v_expires_at,
    assignment_round = COALESCE(assignment_round, 0) + 1
  WHERE id = p_request_id;

  INSERT INTO assignment_logs (request_id, plumber_id, plumber_plan, expires_at)
  VALUES (p_request_id, p_plumber_id, v_plan_type, v_expires_at);

  UPDATE plumber_subscriptions
  SET last_assigned_at = now()
  WHERE plumber_id = p_plumber_id;

  RETURN true;
END;
$$;


CREATE OR REPLACE FUNCTION public.accept_request(
  p_request_id uuid,
  p_plumber_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_current_assignee uuid;
BEGIN
  SELECT assigned_plumber_id INTO v_current_assignee
  FROM service_requests
  WHERE id = p_request_id AND status = 'assigned';

  IF v_current_assignee IS NULL OR v_current_assignee != p_plumber_id THEN
    RETURN false;
  END IF;

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

  UPDATE plumber_subscriptions
  SET monthly_contacts_used = monthly_contacts_used + 1
  WHERE plumber_id = p_plumber_id;

  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, true)
  ON CONFLICT DO NOTHING;

  RETURN true;
END;
$$;


CREATE OR REPLACE FUNCTION public.handle_expired_assignment(
  p_request_id uuid
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
      IF v_urgency = 'subito' THEN
        v_next_plan := NULL;
      ELSE
        v_next_plan := 'basic';
      END IF;
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

  PERFORM assign_request_to_plumber(p_request_id, v_next_plumber);
  RETURN 'reassigned';
END;
$$;