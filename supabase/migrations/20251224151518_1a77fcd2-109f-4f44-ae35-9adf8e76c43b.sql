-- Ricreare la view senza SECURITY DEFINER per risolvere il warning
-- Prima drop della view esistente
DROP VIEW IF EXISTS public.service_requests_plumber_view;

-- Ricreare con security_invoker = true esplicito
CREATE VIEW public.service_requests_plumber_view 
WITH (security_invoker = true)
AS
SELECT 
  sr.id,
  sr.city,
  sr.description,
  sr.intervention_type,
  sr.urgency,
  sr.property_type,
  sr.accessibility,
  sr.is_exclusive,
  sr.status,
  sr.created_at,
  sr.updated_at,
  sr.assigned_at,
  sr.assigned_plumber_id,
  sr.privacy_accepted,
  -- Maschera i dati di contatto se non sbloccati
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu 
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_name
    ELSE NULL
  END AS client_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu 
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_phone
    ELSE NULL
  END AS client_phone,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu 
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_email
    ELSE NULL
  END AS client_email,
  EXISTS (
    SELECT 1 FROM contact_unlocks cu 
    JOIN plumber_profiles pp ON pp.id = cu.plumber_id
    WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
  ) AS is_contact_unlocked
FROM service_requests sr;