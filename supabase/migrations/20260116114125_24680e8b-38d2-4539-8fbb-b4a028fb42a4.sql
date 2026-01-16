-- Add delivery tracking columns to whatsapp_logs
ALTER TABLE public.whatsapp_logs 
ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS read_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster webhook lookups
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_respond_io_message_id 
ON public.whatsapp_logs(respond_io_message_id) 
WHERE respond_io_message_id IS NOT NULL;