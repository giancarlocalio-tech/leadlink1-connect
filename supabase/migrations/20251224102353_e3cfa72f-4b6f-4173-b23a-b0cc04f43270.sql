-- Drop and recreate the view with correct status filter
DROP VIEW IF EXISTS service_requests_plumber_view;

CREATE VIEW service_requests_plumber_view AS
SELECT 
  id,
  intervention_type,
  city,
  description,
  urgency,
  property_type,
  accessibility,
  privacy_accepted,
  status,
  created_at,
  updated_at,
  assigned_plumber_id,
  is_exclusive,
  assigned_at,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN client_name
    ELSE NULL
  END as client_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN client_phone
    ELSE NULL
  END as client_phone,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM contact_unlocks cu
      JOIN plumber_profiles pp ON pp.id = cu.plumber_id
      WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
    ) THEN client_email
    ELSE NULL
  END as client_email,
  EXISTS (
    SELECT 1 FROM contact_unlocks cu
    JOIN plumber_profiles pp ON pp.id = cu.plumber_id
    WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
  ) as is_contact_unlocked
FROM service_requests sr
WHERE 
  -- Show 'new' requests (not yet assigned) based on plan visibility rules
  (
    status = 'new' 
    AND (
      get_current_plumber_plan() IN ('medium', 'premium')
      OR (
        get_current_plumber_plan() = 'basic' 
        AND is_request_visible_for_basic(id, created_at)
      )
    )
  )
  -- OR show requests that the plumber has unlocked (accepted)
  OR EXISTS (
    SELECT 1 FROM contact_unlocks cu
    JOIN plumber_profiles pp ON pp.id = cu.plumber_id
    WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
  );