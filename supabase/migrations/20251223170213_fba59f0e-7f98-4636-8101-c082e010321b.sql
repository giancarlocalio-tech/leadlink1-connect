-- Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create service requests" ON public.service_requests;

-- Create a PERMISSIVE INSERT policy (allows anyone to create requests if privacy is accepted)
CREATE POLICY "Anyone can create service requests"
ON public.service_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (privacy_accepted = true);