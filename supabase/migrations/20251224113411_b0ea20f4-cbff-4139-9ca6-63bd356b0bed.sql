-- Add wizard_answers JSONB column to store detailed wizard responses
ALTER TABLE public.service_requests 
ADD COLUMN wizard_answers jsonb DEFAULT NULL;