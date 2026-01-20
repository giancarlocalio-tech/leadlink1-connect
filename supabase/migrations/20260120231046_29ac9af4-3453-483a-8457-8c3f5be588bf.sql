-- Update get_trial_available_requests to work for ALL plumbers (not just trial)
-- With credit-based system, all plumbers can see and unlock requests
CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
RETURNS TABLE(id uuid, intervention_type intervention_type, urgency urgency_type, property_type property_type, accessibility accessibility_type, city text, description text, created_at timestamp with time zone, is_exclusive boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_service_areas text[];
  v_plumber_created_at timestamp with time zone;
BEGIN
  -- Get plumber's service areas and registration date
  SELECT pp.service_areas, pp.created_at
  INTO v_service_areas, v_plumber_created_at
  FROM plumber_profiles pp
  WHERE pp.id = p_plumber_id;
  
  -- Return available requests in the plumber's service areas
  -- that are 'new' and not already unlocked by this plumber
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
    AND sr.status = 'new'  -- Only show 'new' requests (not assigned/accepted/expired)
    -- Only show requests created AFTER the plumber registered
    AND sr.created_at >= v_plumber_created_at
    -- Exclude requests this plumber already unlocked
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