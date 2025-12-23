-- Create a view that masks contact info for plumbers who haven't unlocked the request
CREATE OR REPLACE VIEW public.service_requests_plumber_view AS
SELECT 
  sr.id,
  sr.intervention_type,
  sr.description,
  sr.city,
  sr.urgency,
  sr.property_type,
  sr.accessibility,
  sr.status,
  sr.is_exclusive,
  sr.created_at,
  sr.updated_at,
  sr.assigned_plumber_id,
  sr.assigned_at,
  sr.privacy_accepted,
  -- Only show contact info if admin OR plumber has unlocked this request
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN sr.client_name
    WHEN EXISTS (
      SELECT 1 FROM public.contact_unlocks cu
      JOIN public.plumber_profiles pp ON cu.plumber_id = pp.id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_name
    ELSE '***'
  END as client_name,
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN sr.client_phone
    WHEN EXISTS (
      SELECT 1 FROM public.contact_unlocks cu
      JOIN public.plumber_profiles pp ON cu.plumber_id = pp.id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_phone
    ELSE '***'
  END as client_phone,
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN sr.client_email
    WHEN EXISTS (
      SELECT 1 FROM public.contact_unlocks cu
      JOIN public.plumber_profiles pp ON cu.plumber_id = pp.id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_email
    ELSE NULL
  END as client_email,
  -- Indicate if contact is unlocked for the current user
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN true
    WHEN EXISTS (
      SELECT 1 FROM public.contact_unlocks cu
      JOIN public.plumber_profiles pp ON cu.plumber_id = pp.id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN true
    ELSE false
  END as is_contact_unlocked
FROM public.service_requests sr;

-- Grant SELECT access to authenticated users (RLS from underlying table still applies)
GRANT SELECT ON public.service_requests_plumber_view TO authenticated;