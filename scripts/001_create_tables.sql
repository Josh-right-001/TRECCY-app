-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  postnom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  departement TEXT NOT NULL,
  fonction TEXT NOT NULL,
  photo_url TEXT,
  qr_code_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create excel_uploads table (track uploaded Excel files)
CREATE TABLE IF NOT EXISTS public.excel_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  row_count INTEGER DEFAULT 0,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table (user customization preferences)
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  theme TEXT DEFAULT 'light',
  card_color_primary TEXT DEFAULT '#0891b2',
  card_color_secondary TEXT DEFAULT '#10b981',
  card_color_accent TEXT DEFAULT '#f97316',
  animations_enabled BOOLEAN DEFAULT TRUE,
  qr_code_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON public.cards(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_created_at ON public.cards(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_excel_uploads_user_id ON public.excel_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_settings_user_id ON public.settings(user_id);
