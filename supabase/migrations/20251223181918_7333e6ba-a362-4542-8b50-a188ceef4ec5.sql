
-- Drop and recreate the view WITHOUT security definer issues
-- Using a simpler approach that relies on RLS of underlying tables
DROP VIEW IF EXISTS public.service_requests_plumber_view;

CREATE VIEW public.service_requests_plumber_view 
WITH (security_invoker = true)
AS
SELECT 
  sr.id,
  sr.intervention_type,
  sr.city,
  sr.description,
  sr.urgency,
  sr.property_type,
  sr.accessibility,
  sr.privacy_accepted,
  sr.status,
  sr.created_at,
  sr.updated_at,
  sr.assigned_plumber_id,
  sr.is_exclusive,
  sr.assigned_at,
  -- Only show contact info if unlocked by current plumber
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_name
    ELSE NULL
  END as client_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_phone
    ELSE NULL
  END as client_phone,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN sr.client_email
    ELSE NULL
  END as client_email,
  -- Check if contact is unlocked by current plumber
  EXISTS (
    SELECT 1 FROM contact_unlocks cu
    JOIN plumber_profiles pp ON pp.id = cu.plumber_id
    WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
  ) as is_contact_unlocked
FROM service_requests sr
WHERE 
  sr.status = 'pending'
  AND (
    -- Medium and Premium: see everything immediately
    get_current_plumber_plan() IN ('medium', 'premium')
    OR
    -- Basic: only see requests after 1 hour OR if not unlocked by higher tier
    (
      get_current_plumber_plan() = 'basic'
      AND is_request_visible_for_basic(sr.id, sr.created_at)
    )
    OR
    -- Already unlocked by current plumber: always visible
    EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    )
  );
