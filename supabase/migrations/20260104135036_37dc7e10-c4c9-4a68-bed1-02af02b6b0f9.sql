
-- Update get_trial_available_requests to only show requests created AFTER plumber registration
CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
 RETURNS TABLE(id uuid, intervention_type intervention_type, urgency urgency_type, property_type property_type, accessibility accessibility_type, city text, description text, created_at timestamp with time zone, is_exclusive boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_service_areas text[];
  v_is_trial boolean;
  v_plumber_created_at timestamp with time zone;
BEGIN
  -- Check if plumber is in trial mode and get their registration date
  SELECT ps.is_trial, pp.service_areas, pp.created_at
  INTO v_is_trial, v_service_areas, v_plumber_created_at
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE ps.plumber_id = p_plumber_id;
  
  -- Only return results for trial users
  IF NOT v_is_trial THEN
    RETURN;
  END IF;
  
  -- Return available requests in the plumber's service areas
  -- that are either 'new' or 'assigned' but not yet 'accepted'
  -- and not already accepted by another trial plumber
  -- AND created AFTER the plumber registered
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
  WHERE sr.city = ANY(v_service_areas)
    AND sr.status IN ('new', 'assigned')
    -- Exclude requests already accepted
    AND sr.accepted_by_id IS NULL
    -- Only show requests created AFTER the plumber registered
    AND sr.created_at >= v_plumber_created_at
    -- Exclude requests this plumber already tried to accept
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
