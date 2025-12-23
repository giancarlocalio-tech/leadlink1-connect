-- Rimuovi completamente la policy esistente
DROP POLICY IF EXISTS "Anyone can create service requests" ON public.service_requests;

-- Crea una policy PERMISSIVE per l'insert (usando PERMISSIVE esplicitamente)
CREATE POLICY "Anyone can create service requests"
ON public.service_requests
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (privacy_accepted = true);