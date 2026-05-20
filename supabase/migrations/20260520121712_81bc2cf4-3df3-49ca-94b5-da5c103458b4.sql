DROP FUNCTION IF EXISTS public.get_my_unlocked_requests();

CREATE FUNCTION public.get_my_unlocked_requests()
RETURNS TABLE (
  id uuid,
  client_name text,
  client_phone text,
  client_email text,
  intervention_type text,
  city text,
  description text,
  phone_contact_allowed boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    sr.id,
    CASE
      WHEN sr.client_name IS NULL OR btrim(sr.client_name) = '' THEN sr.client_name
      WHEN array_length(regexp_split_to_array(btrim(sr.client_name), '\s+'), 1) = 1
        THEN btrim(sr.client_name)
      ELSE (regexp_split_to_array(btrim(sr.client_name), '\s+'))[1]
           || ' '
           || upper(left((regexp_split_to_array(btrim(sr.client_name), '\s+'))[2], 1))
           || '.'
    END AS client_name,
    CASE WHEN sr.phone_contact_allowed THEN sr.client_phone ELSE NULL END AS client_phone,
    sr.client_email,
    sr.intervention_type::text,
    sr.city,
    sr.description,
    sr.phone_contact_allowed
  FROM public.service_requests sr
  JOIN public.contact_unlocks cu ON cu.request_id = sr.id
  JOIN public.plumber_profiles pp ON pp.id = cu.plumber_id
  WHERE pp.user_id = auth.uid();
END;
$$;