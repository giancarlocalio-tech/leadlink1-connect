-- Fix get_trial_available_requests to use case-insensitive matching
-- The problem: city 'napoli' doesn't match service_areas 'Napoli (NA)'

CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
RETURNS TABLE(
  id uuid,
  intervention_type intervention_type,
  urgency urgency_type,
  property_type property_type,
  accessibility accessibility_type,
  city text,
  description text,
  created_at timestamp with time zone,
  is_exclusive boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
  -- Using case-insensitive matching with ILIKE pattern
  -- Also handle partial matches (e.g., 'napoli' matches 'Napoli (NA)')
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
  WHERE sr.status = 'new'  -- Only show 'new' requests
    -- Case-insensitive city matching
    AND EXISTS (
      SELECT 1 FROM unnest(v_service_areas) AS sa
      WHERE LOWER(sr.city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
         OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(sr.city) || '%'
    )
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
$$;