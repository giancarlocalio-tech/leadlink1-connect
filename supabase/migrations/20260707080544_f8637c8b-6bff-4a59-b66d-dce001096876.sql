
CREATE TABLE public.ai_consultation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT NOT NULL UNIQUE,
  messages_used INTEGER NOT NULL DEFAULT 0,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  stripe_session_id TEXT,
  paid_at TIMESTAMPTZ,
  amount_paid_cents INTEGER,
  detected_city TEXT,
  detected_problem TEXT,
  user_email TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  referer TEXT,
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_sessions_token ON public.ai_consultation_sessions(access_token);
CREATE INDEX idx_ai_sessions_stripe ON public.ai_consultation_sessions(stripe_session_id) WHERE stripe_session_id IS NOT NULL;
CREATE INDEX idx_ai_sessions_created ON public.ai_consultation_sessions(created_at DESC);
GRANT ALL ON public.ai_consultation_sessions TO service_role;
ALTER TABLE public.ai_consultation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view all AI sessions" ON public.ai_consultation_sessions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.ai_consultation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.ai_consultation_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_messages_session ON public.ai_consultation_messages(session_id, created_at);
GRANT ALL ON public.ai_consultation_messages TO service_role;
ALTER TABLE public.ai_consultation_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view all AI messages" ON public.ai_consultation_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.ai_consultation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.ai_consultation_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_events_session ON public.ai_consultation_events(session_id);
CREATE INDEX idx_ai_events_type_created ON public.ai_consultation_events(event_type, created_at DESC);
GRANT ALL ON public.ai_consultation_events TO service_role;
ALTER TABLE public.ai_consultation_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view all AI events" ON public.ai_consultation_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_ai_sessions_updated_at
BEFORE UPDATE ON public.ai_consultation_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
