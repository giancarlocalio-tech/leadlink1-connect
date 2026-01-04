
-- Update get_next_eligible_plumber to EXCLUDE trial users
-- Trial users should NOT receive automatic assignments with timers
-- They see all requests and can claim them manually (first come, first served)
CREATE OR REPLACE FUNCTION public.get_next_eligible_plumber(
  p_city text,
  p_request_id uuid,
  p_target_plan text,
  p_urgency text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
    -- EXCLUDE trial users - they don't get automatic assignments
    -- Trial users see all requests and claim manually (first come, first served)
    AND ps.is_trial = false
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
$$;
