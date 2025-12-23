-- Drop the overly permissive policy that exposes all customer data to all plumbers
DROP POLICY IF EXISTS "Plumbers can view requests" ON public.service_requests;

-- Create a new, more restrictive policy for plumbers
-- Plumbers can only see requests where:
-- 1. They are assigned to the request, OR
-- 2. They have unlocked the contact for that request
CREATE POLICY "Plumbers can view assigned or unlocked requests"
ON public.service_requests
FOR SELECT
TO authenticated
USING (
  -- Admins can see everything (handled by separate policy)
  public.has_role(auth.uid(), 'admin')
  OR
  -- Plumbers can only see requests they have unlocked or are assigned to
  (
    public.is_plumber(auth.uid())
    AND (
      -- Request is assigned to this plumber
      assigned_plumber_id IN (
        SELECT id FROM public.plumber_profiles WHERE user_id = auth.uid()
      )
      OR
      -- Plumber has unlocked this request
      EXISTS (
        SELECT 1 FROM public.contact_unlocks cu
        JOIN public.plumber_profiles pp ON cu.plumber_id = pp.id
        WHERE cu.request_id = service_requests.id AND pp.user_id = auth.uid()
      )
    )
  )
);