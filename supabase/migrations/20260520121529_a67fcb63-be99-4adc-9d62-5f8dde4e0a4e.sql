CREATE OR REPLACE FUNCTION public.get_my_unlocked_requests()
RETURNS TABLE (
  id uuid,
  client_name text,
  client_phone text,
  client_email text,
  intervention_type intervention_type,
  city text,
  description text,
  phone_contact_allowed boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT
    sr.id,
    sr.client_name,
    CASE WHEN COALESCE(sr.phone_contact_allowed, true) THEN sr.client_phone ELSE NULL END AS client_phone,
    sr.client_email,
    sr.intervention_type,
    sr.city,
    sr.description,
    COALESCE(sr.phone_contact_allowed, true) AS phone_contact_allowed
  FROM public.service_requests sr
  JOIN public.contact_unlocks cu ON cu.request_id = sr.id
  JOIN public.plumber_profiles pp ON pp.id = cu.plumber_id
  WHERE pp.user_id = auth.uid()
$$;

GRANT EXECUTE ON FUNCTION public.get_my_unlocked_requests() TO authenticated;