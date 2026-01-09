-- Drop the old function with wrong parameter order that excludes trial users
DROP FUNCTION IF EXISTS public.get_next_eligible_plumber(text, uuid, text, text);

-- Ensure only the correct version exists (p_request_id, p_city, p_urgency, p_target_plan)
-- This version INCLUDES trial users with remaining free requests
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
  SELECT pp.id INTO v_plumber_id
  FROM plumber_profiles pp
  JOIN plumber_subscriptions ps ON ps.plumber_id = pp.id
  WHERE
    pp.service_areas @> ARRAY[p_city]
    AND ps.status IN ('active', 'pending')
    AND ps.plan_type::text = p_target_plan
    AND COALESCE(ps.is_available, true) = true
    -- Include trial users with remaining free requests OR paid subscribers
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
$$;