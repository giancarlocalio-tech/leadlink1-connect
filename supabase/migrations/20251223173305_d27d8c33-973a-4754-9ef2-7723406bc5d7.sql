-- Drop the existing restrictive policy for plumbers viewing requests
DROP POLICY IF EXISTS "Plumbers can view assigned or unlocked requests" ON public.service_requests;

-- Create a new policy that allows plumbers to view ALL requests
-- The contact info will be masked by the view for non-unlocked requests
CREATE POLICY "Plumbers can view all pending requests" 
ON public.service_requests 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  is_plumber(auth.uid())
);