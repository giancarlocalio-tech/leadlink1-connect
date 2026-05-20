DROP FUNCTION IF EXISTS public.get_trial_available_requests(uuid);

CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
 RETURNS TABLE(id uuid, intervention_type intervention_type, urgency urgency_type, property_type property_type, accessibility accessibility_type, city text, description text, created_at timestamp with time zone, is_exclusive boolean, phone_contact_allowed boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_service_areas text[];
  v_plumber_created_at timestamp with time zone;
BEGIN
  SELECT pp.service_areas, pp.created_at
  INTO v_service_areas, v_plumber_created_at
  FROM plumber_profiles pp
  WHERE pp.id = p_plumber_id;
  
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
    sr.is_exclusive,
    sr.phone_contact_allowed
  FROM service_requests sr
  WHERE sr.status = 'new'
    AND sr.created_at >= NOW() - INTERVAL '3 days'
    AND EXISTS (
      SELECT 1 FROM unnest(v_service_areas) AS sa
      WHERE 
        LOWER(sr.city) LIKE '%' || LOWER(SPLIT_PART(sa, ' (', 1)) || '%'
        OR LOWER(SPLIT_PART(sa, ' (', 1)) LIKE '%' || LOWER(sr.city) || '%'
        OR (
          SUBSTRING(sr.city FROM '\(([A-Z]{2})\)$') IS NOT NULL
          AND SUBSTRING(sa FROM '\(([A-Z]{2})\)$') = SUBSTRING(sr.city FROM '\(([A-Z]{2})\)$')
        )
    )
    AND sr.created_at >= v_plumber_created_at
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