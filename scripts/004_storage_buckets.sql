-- Create storage buckets for photos and PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('card-photos', 'card-photos', true),
  ('card-pdfs', 'card-pdfs', true),
  ('qr-codes', 'qr-codes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for card-photos bucket
CREATE POLICY "card_photos_select_all" ON storage.objects
  FOR SELECT USING (bucket_id = 'card-photos');

CREATE POLICY "card_photos_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'card-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "card_photos_update_own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'card-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "card_photos_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'card-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for card-pdfs bucket
CREATE POLICY "card_pdfs_select_all" ON storage.objects
  FOR SELECT USING (bucket_id = 'card-pdfs');

CREATE POLICY "card_pdfs_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'card-pdfs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "card_pdfs_update_own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'card-pdfs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "card_pdfs_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'card-pdfs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for qr-codes bucket
CREATE POLICY "qr_codes_select_all" ON storage.objects
  FOR SELECT USING (bucket_id = 'qr-codes');

CREATE POLICY "qr_codes_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'qr-codes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "qr_codes_update_own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'qr-codes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "qr_codes_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'qr-codes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
