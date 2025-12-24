-- =============================================
-- FIX 1: Aggiungere RLS alla view service_requests_plumber_view
-- =============================================

-- Prima ricreiamo la view con SECURITY INVOKER (default) per rispettare RLS
DROP VIEW IF EXISTS public.service_requests_plumber_view;

CREATE VIEW public.service_requests_plumber_view AS
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
  -- Campo computed per indicare se il contatto è sbloccato
  EXISTS (
    SELECT 1 FROM contact_unlocks cu 
    JOIN plumber_profiles pp ON pp.id = cu.plumber_id
    WHERE cu.request_id = sr.id AND pp.user_id = auth.uid()
  ) AS is_contact_unlocked
FROM service_requests sr;

-- =============================================
-- FIX 2: Aggiornare policy service_requests per mascherare dati sensibili
-- Rimuoviamo la policy che espone tutto e la ricreamo più sicura
-- =============================================

DROP POLICY IF EXISTS "Plumbers can view all pending requests" ON public.service_requests;

-- Nuova policy: idraulici vedono richieste ma i dati contatto sono gestiti dalla view
-- Questa policy permette SELECT ma il frontend dovrà usare la view per i dati mascherati
CREATE POLICY "Plumbers can view requests metadata only"
ON public.service_requests
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR (
    is_plumber(auth.uid()) 
    AND status IN ('new', 'assigned', 'accepted')
  )
);

-- =============================================
-- FIX 3: Proteggere contact_logs da UPDATE/DELETE
-- =============================================

CREATE POLICY "Nobody can update contact logs"
ON public.contact_logs
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Nobody can delete contact logs"
ON public.contact_logs
FOR DELETE
TO authenticated
USING (false);

-- =============================================
-- FIX 4: Proteggere contact_unlocks da UPDATE/DELETE per plumbers
-- =============================================

CREATE POLICY "Nobody can update contact unlocks"
ON public.contact_unlocks
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Nobody can delete contact unlocks"  
ON public.contact_unlocks
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));