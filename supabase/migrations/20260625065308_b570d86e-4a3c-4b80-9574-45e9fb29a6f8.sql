
ALTER TABLE public.service_requests
  ADD COLUMN IF NOT EXISTS photo_urls text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ai_estimate jsonb;
