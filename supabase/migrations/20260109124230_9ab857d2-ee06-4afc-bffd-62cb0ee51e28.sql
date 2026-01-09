-- Tabella per tracciare tutte le email inviate dal sistema
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_type TEXT NOT NULL, -- 'new_request', 'assignment', 'acceptance', 'client_confirmation', etc.
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  resend_email_id TEXT, -- ID ritornato da Resend per tracking
  request_id UUID REFERENCES public.service_requests(id) ON DELETE SET NULL,
  plumber_id UUID REFERENCES public.plumber_profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  opened_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Indici per query veloci
CREATE INDEX idx_email_logs_request_id ON public.email_logs(request_id);
CREATE INDEX idx_email_logs_plumber_id ON public.email_logs(plumber_id);
CREATE INDEX idx_email_logs_email_type ON public.email_logs(email_type);
CREATE INDEX idx_email_logs_created_at ON public.email_logs(created_at DESC);

-- RLS policies - solo admin può vedere
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all email logs"
  ON public.email_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Commento descrittivo
COMMENT ON TABLE public.email_logs IS 'Traccia tutte le email inviate dal sistema per debugging e monitoraggio';