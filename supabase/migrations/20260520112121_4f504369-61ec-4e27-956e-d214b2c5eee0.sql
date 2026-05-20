-- Allow authenticated clients to see their own requests even when older rows
-- were created before client_user_id was populated, as long as the email matches.
DROP POLICY IF EXISTS "Clients view requests matching own email" ON public.service_requests;
CREATE POLICY "Clients view requests matching own email"
ON public.service_requests
FOR SELECT
TO authenticated
USING (
  client_email IS NOT NULL
  AND lower(client_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
);

-- Allow clients to see conversations for requests linked either by user id or email.
DROP POLICY IF EXISTS "Clients see own conversations" ON public.conversations;
CREATE POLICY "Clients see own conversations"
ON public.conversations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.service_requests sr
    WHERE sr.id = conversations.request_id
      AND (
        sr.client_user_id = auth.uid()
        OR (
          sr.client_email IS NOT NULL
          AND lower(sr.client_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
        )
      )
  )
);

-- Allow clients to read messages in conversations tied to their own request.
DROP POLICY IF EXISTS "Clients see messages on own conversations" ON public.conversation_messages;
CREATE POLICY "Clients see messages on own conversations"
ON public.conversation_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.conversations c
    JOIN public.service_requests sr ON sr.id = c.request_id
    WHERE c.id = conversation_messages.conversation_id
      AND (
        sr.client_user_id = auth.uid()
        OR (
          sr.client_email IS NOT NULL
          AND lower(sr.client_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
        )
      )
  )
);

-- Allow clients to reply only inside conversations tied to their own request.
DROP POLICY IF EXISTS "Clients insert messages on own conversations" ON public.conversation_messages;
CREATE POLICY "Clients insert messages on own conversations"
ON public.conversation_messages
FOR INSERT
TO authenticated
WITH CHECK (
  sender_type = 'client'
  AND EXISTS (
    SELECT 1
    FROM public.conversations c
    JOIN public.service_requests sr ON sr.id = c.request_id
    WHERE c.id = conversation_messages.conversation_id
      AND (
        sr.client_user_id = auth.uid()
        OR (
          sr.client_email IS NOT NULL
          AND lower(sr.client_email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
        )
      )
  )
);