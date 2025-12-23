
-- Function to get current plumber's plan type
CREATE OR REPLACE FUNCTION public.get_current_plumber_plan()
RETURNS subscription_plan
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ps.plan_type
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE pp.user_id = auth.uid()
    AND ps.status = 'active'
  ORDER BY ps.created_at DESC
  LIMIT 1
$$;

-- Function to check if a request is visible for basic plan
-- Returns true if: no medium/premium plumber has unlocked it within 1 hour of request creation
CREATE OR REPLACE FUNCTION public.is_request_visible_for_basic(request_id uuid, request_created_at timestamptz)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    -- If less than 1 hour has passed since creation, check if unlocked by higher tier
    CASE 
      WHEN NOW() < (request_created_at + INTERVAL '1 hour') THEN
        -- Not visible yet for basic (within 1 hour window)
        NOT EXISTS (
          SELECT 1
          FROM contact_unlocks cu
          JOIN plumber_subscriptions ps ON ps.plumber_id = cu.plumber_id
          WHERE cu.request_id = is_request_visible_for_basic.request_id
            AND ps.plan_type IN ('medium', 'premium')
            AND ps.status = 'active'
        )
      ELSE
        -- After 1 hour, visible if not exclusively unlocked
        NOT EXISTS (
          SELECT 1
          FROM contact_unlocks cu
          WHERE cu.request_id = is_request_visible_for_basic.request_id
            AND cu.is_exclusive = true
        )
    END
$$;

-- Drop and recreate the view with priority logic
DROP VIEW IF EXISTS public.service_requests_plumber_view;

CREATE VIEW public.service_requests_plumber_view AS
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

-- Update subscription_plans to set max_exclusive_contacts for basic plan
UPDATE subscription_plans 
SET max_exclusive_contacts = 3 
WHERE plan_type = 'basic';
