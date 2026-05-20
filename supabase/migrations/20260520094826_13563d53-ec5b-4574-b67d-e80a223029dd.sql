
-- ============= CONVERSATIONS =============
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL,
  plumber_id uuid NOT NULL,
  client_access_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  quote_amount_cents integer,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (request_id, plumber_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_plumber ON public.conversations(plumber_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_token ON public.conversations(client_access_token);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plumbers see own conversations"
  ON public.conversations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM plumber_profiles pp
    WHERE pp.id = conversations.plumber_id AND pp.user_id = auth.uid()
  ));

CREATE POLICY "Plumbers update own conversations"
  ON public.conversations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM plumber_profiles pp
    WHERE pp.id = conversations.plumber_id AND pp.user_id = auth.uid()
  ));

CREATE POLICY "Admins manage all conversations"
  ON public.conversations FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============= MESSAGES =============
CREATE TABLE IF NOT EXISTS public.conversation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('plumber','client')),
  content text NOT NULL CHECK (length(content) BETWEEN 1 AND 4000),
  read_by_recipient boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conv ON public.conversation_messages(conversation_id, created_at);

ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plumbers see own messages"
  ON public.conversation_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM conversations c
    JOIN plumber_profiles pp ON pp.id = c.plumber_id
    WHERE c.id = conversation_messages.conversation_id AND pp.user_id = auth.uid()
  ));

CREATE POLICY "Plumbers insert own messages"
  ON public.conversation_messages FOR INSERT
  WITH CHECK (
    sender_type = 'plumber' AND
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN plumber_profiles pp ON pp.id = c.plumber_id
      WHERE c.id = conversation_messages.conversation_id AND pp.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins manage all messages"
  ON public.conversation_messages FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============= TRIGGER: auto-create conversation on unlock =============
CREATE OR REPLACE FUNCTION public.create_conversation_on_unlock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO conversations (request_id, plumber_id)
  VALUES (NEW.request_id, NEW.plumber_id)
  ON CONFLICT (request_id, plumber_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_create_conversation_on_unlock ON public.contact_unlocks;
CREATE TRIGGER trg_create_conversation_on_unlock
  AFTER INSERT ON public.contact_unlocks
  FOR EACH ROW
  EXECUTE FUNCTION public.create_conversation_on_unlock();

-- ============= TRIGGER: update last_message_at =============
CREATE OR REPLACE FUNCTION public.bump_conversation_last_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE conversations
  SET last_message_at = NEW.created_at, updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_last_message ON public.conversation_messages;
CREATE TRIGGER trg_bump_last_message
  AFTER INSERT ON public.conversation_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.bump_conversation_last_message();

-- ============= updated_at trigger on conversations =============
DROP TRIGGER IF EXISTS trg_conversations_updated ON public.conversations;
CREATE TRIGGER trg_conversations_updated
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============= REALTIME =============
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- ============= BACKFILL: create conversations for existing unlocks =============
INSERT INTO conversations (request_id, plumber_id)
SELECT DISTINCT request_id, plumber_id FROM contact_unlocks
ON CONFLICT (request_id, plumber_id) DO NOTHING;
