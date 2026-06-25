
-- Policies for request-photos bucket
-- Path convention: <auth.uid()>/<random>.jpg

CREATE POLICY "Clients can upload their own request photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'request-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Clients can read their own request photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'request-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Clients can delete their own request photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'request-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Anonymous uploads (cliente che inizia il wizard senza account) - usa cartella "anonymous"
CREATE POLICY "Anonymous can upload to anonymous folder"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'request-photos'
  AND (storage.foldername(name))[1] = 'anonymous'
);

CREATE POLICY "Anonymous can read from anonymous folder"
ON storage.objects FOR SELECT
TO anon
USING (
  bucket_id = 'request-photos'
  AND (storage.foldername(name))[1] = 'anonymous'
);
