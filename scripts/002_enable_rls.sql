-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.excel_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for cards table
CREATE POLICY "cards_select_own" ON public.cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cards_insert_own" ON public.cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cards_update_own" ON public.cards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "cards_delete_own" ON public.cards
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for excel_uploads table
CREATE POLICY "excel_uploads_select_own" ON public.excel_uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "excel_uploads_insert_own" ON public.excel_uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "excel_uploads_update_own" ON public.excel_uploads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "excel_uploads_delete_own" ON public.excel_uploads
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for settings table
CREATE POLICY "settings_select_own" ON public.settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "settings_insert_own" ON public.settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "settings_update_own" ON public.settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "settings_delete_own" ON public.settings
  FOR DELETE USING (auth.uid() = user_id);
