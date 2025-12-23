-- Fix: the admin ALL policy was created as RESTRICTIVE, which blocks public INSERTs.
-- Recreate it as PERMISSIVE so it grants admins access without restricting others.

DROP POLICY IF EXISTS "Admins can manage all requests" ON public.service_requests;

CREATE POLICY "Admins can manage all requests"
ON public.service_requests
AS PERMISSIVE
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));