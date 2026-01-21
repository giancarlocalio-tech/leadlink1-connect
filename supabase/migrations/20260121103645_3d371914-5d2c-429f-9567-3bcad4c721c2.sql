
-- Create a function to normalize city names to standard format "CityName (XX)"
CREATE OR REPLACE FUNCTION public.normalize_city_name(p_city_name text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_normalized text;
  v_clean_input text;
BEGIN
  -- Clean input: trim whitespace and extract name before parenthesis if present
  v_clean_input := LOWER(TRIM(SPLIT_PART(p_city_name, ' (', 1)));
  
  -- Try to find exact match in italian_cities
  SELECT ic.name || ' (' || ic.province_code || ')'
  INTO v_normalized
  FROM italian_cities ic
  WHERE LOWER(TRIM(ic.name)) = v_clean_input
  LIMIT 1;
  
  -- If found, return normalized format
  IF v_normalized IS NOT NULL THEN
    RETURN v_normalized;
  END IF;
  
  -- If not found, return original trimmed input
  RETURN TRIM(p_city_name);
END;
$function$;

-- Create trigger function to normalize city on service_requests insert/update
CREATE OR REPLACE FUNCTION public.normalize_service_request_city()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.city := normalize_city_name(NEW.city);
  RETURN NEW;
END;
$function$;

-- Create trigger for service_requests
DROP TRIGGER IF EXISTS normalize_city_trigger ON service_requests;
CREATE TRIGGER normalize_city_trigger
  BEFORE INSERT OR UPDATE OF city ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION normalize_service_request_city();

-- Create trigger function to normalize service_areas on plumber_profiles insert/update
CREATE OR REPLACE FUNCTION public.normalize_plumber_service_areas()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_normalized_areas text[];
  v_area text;
BEGIN
  IF NEW.service_areas IS NOT NULL THEN
    v_normalized_areas := ARRAY[]::text[];
    FOREACH v_area IN ARRAY NEW.service_areas
    LOOP
      v_normalized_areas := array_append(v_normalized_areas, normalize_city_name(v_area));
    END LOOP;
    NEW.service_areas := v_normalized_areas;
  END IF;
  
  -- Also normalize main_city
  IF NEW.main_city IS NOT NULL THEN
    NEW.main_city := normalize_city_name(NEW.main_city);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for plumber_profiles
DROP TRIGGER IF EXISTS normalize_service_areas_trigger ON plumber_profiles;
CREATE TRIGGER normalize_service_areas_trigger
  BEFORE INSERT OR UPDATE OF service_areas, main_city ON plumber_profiles
  FOR EACH ROW
  EXECUTE FUNCTION normalize_plumber_service_areas();

-- Now clean up existing data

-- Fix service_requests with non-standard city format
UPDATE service_requests
SET city = normalize_city_name(city)
WHERE city != normalize_city_name(city);

-- Fix plumber_profiles with non-standard service_areas
UPDATE plumber_profiles pp
SET 
  service_areas = (
    SELECT array_agg(normalize_city_name(area))
    FROM unnest(pp.service_areas) AS area
  ),
  main_city = normalize_city_name(main_city)
WHERE EXISTS (
  SELECT 1 FROM unnest(pp.service_areas) AS area
  WHERE area != normalize_city_name(area)
)
OR main_city != normalize_city_name(main_city);
