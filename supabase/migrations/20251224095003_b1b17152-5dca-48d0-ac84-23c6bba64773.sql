-- Ensure newly created service requests are visible/processable by giving them a default status

-- 1) Backfill existing rows that were created with NULL status
UPDATE public.service_requests
SET status = 'new'
WHERE status IS NULL;

-- 2) Set a default for future inserts
ALTER TABLE public.service_requests
ALTER COLUMN status SET DEFAULT 'new';
