-- Fix critical customer PII exposure by removing overly broad SELECT policy
DROP POLICY IF EXISTS "Plumbers can view requests metadata only" ON public.service_requests;

-- Create a safe, PII-free table for listing requests to plumbers
CREATE TABLE IF NOT EXISTS public.service_requests_public_meta (
  request_id uuid PRIMARY KEY REFERENCES public.service_requests(id) ON DELETE CASCADE,
  city text NOT NULL,
  intervention_type public.intervention_type NOT NULL,
  urgency public.urgency_type NOT NULL,
  property_type public.property_type NOT NULL,
  accessibility public.accessibility_type NOT NULL,
  status text NOT NULL DEFAULT 'new',
  is_exclusive boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.service_requests_public_meta ENABLE ROW LEVEL SECURITY;

-- Admin full access
DROP POLICY IF EXISTS "Admins can manage public request meta" ON public.service_requests_public_meta;
CREATE POLICY "Admins can manage public request meta"
ON public.service_requests_public_meta
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Plumbers can read metadata only
DROP POLICY IF EXISTS "Plumbers can view public request meta" ON public.service_requests_public_meta;
CREATE POLICY "Plumbers can view public request meta"
ON public.service_requests_public_meta
FOR SELECT
USING (public.is_plumber(auth.uid()) OR public.has_role(auth.uid(), 'admin'::public.app_role));

-- Sync trigger function (SECURITY DEFINER so it can write regardless of caller)
CREATE OR REPLACE FUNCTION public.sync_service_requests_public_meta()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.service_requests_public_meta
    WHERE request_id = OLD.id;
    RETURN OLD;
  END IF;

  INSERT INTO public.service_requests_public_meta (
    request_id,
    city,
    intervention_type,
    urgency,
    property_type,
    accessibility,
    status,
    is_exclusive,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.city,
    NEW.intervention_type,
    NEW.urgency,
    NEW.property_type,
    NEW.accessibility,
    COALESCE(NEW.status, 'new'),
    COALESCE(NEW.is_exclusive, false),
    COALESCE(NEW.created_at, now()),
    now()
  )
  ON CONFLICT (request_id) DO UPDATE SET
    city = EXCLUDED.city,
    intervention_type = EXCLUDED.intervention_type,
    urgency = EXCLUDED.urgency,
    property_type = EXCLUDED.property_type,
    accessibility = EXCLUDED.accessibility,
    status = EXCLUDED.status,
    is_exclusive = EXCLUDED.is_exclusive,
    created_at = EXCLUDED.created_at,
    updated_at = now();

  RETURN NEW;
END;
$$;

-- Triggers on source table
DROP TRIGGER IF EXISTS trg_sync_service_requests_public_meta_insupd ON public.service_requests;
CREATE TRIGGER trg_sync_service_requests_public_meta_insupd
AFTER INSERT OR UPDATE OF city, intervention_type, urgency, property_type, accessibility, status, is_exclusive, created_at
ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.sync_service_requests_public_meta();

DROP TRIGGER IF EXISTS trg_sync_service_requests_public_meta_del ON public.service_requests;
CREATE TRIGGER trg_sync_service_requests_public_meta_del
AFTER DELETE
ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.sync_service_requests_public_meta();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_service_requests_public_meta_city ON public.service_requests_public_meta (city);
CREATE INDEX IF NOT EXISTS idx_service_requests_public_meta_status ON public.service_requests_public_meta (status);
CREATE INDEX IF NOT EXISTS idx_service_requests_public_meta_created_at ON public.service_requests_public_meta (created_at DESC);
