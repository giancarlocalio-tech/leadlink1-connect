-- Add policy for plumbers to view their assigned/accepted requests
CREATE POLICY "Plumbers can view their assigned requests"
ON public.service_requests
FOR SELECT
USING (
  assigned_plumber_id IN (
    SELECT id FROM plumber_profiles WHERE user_id = auth.uid()
  )
  OR accepted_by_id IN (
    SELECT id FROM plumber_profiles WHERE user_id = auth.uid()
  )
);