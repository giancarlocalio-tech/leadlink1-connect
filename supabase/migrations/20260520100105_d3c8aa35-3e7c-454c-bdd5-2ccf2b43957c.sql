
ALTER TABLE public.service_requests
  ADD COLUMN IF NOT EXISTS client_user_id uuid;

CREATE INDEX IF NOT EXISTS idx_service_requests_client_user_id
  ON public.service_requests(client_user_id);

-- Clients can view their own service requests
DROP POLICY IF EXISTS "Clients view own requests" ON public.service_requests;
CREATE POLICY "Clients view own requests"
  ON public.service_requests FOR SELECT
  TO authenticated
  USING (client_user_id = auth.uid());

-- Clients can view conversations linked to their own requests
DROP POLICY IF EXISTS "Clients see own conversations" ON public.conversations;
CREATE POLICY "Clients see own conversations"
  ON public.conversations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.service_requests sr
    WHERE sr.id = conversations.request_id
      AND sr.client_user_id = auth.uid()
  ));

-- Clients can read messages from their own conversations
DROP POLICY IF EXISTS "Clients see messages on own conversations" ON public.conversation_messages;
CREATE POLICY "Clients see messages on own conversations"
  ON public.conversation_messages FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.conversations c
    JOIN public.service_requests sr ON sr.id = c.request_id
    WHERE c.id = conversation_messages.conversation_id
      AND sr.client_user_id = auth.uid()
  ));

-- Clients can send messages on their own conversations
DROP POLICY IF EXISTS "Clients insert messages on own conversations" ON public.conversation_messages;
CREATE POLICY "Clients insert messages on own conversations"
  ON public.conversation_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_type = 'client' AND
    EXISTS (
      SELECT 1 FROM public.conversations c
      JOIN public.service_requests sr ON sr.id = c.request_id
      WHERE c.id = conversation_messages.conversation_id
        AND sr.client_user_id = auth.uid()
    )
  );
