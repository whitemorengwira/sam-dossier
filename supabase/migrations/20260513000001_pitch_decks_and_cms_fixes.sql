-- Migration: Pitch decks table + CMS column additions

-- Add display name and user ID columns to page_versions (safe, idempotent)
ALTER TABLE public.page_versions
  ADD COLUMN IF NOT EXISTS saved_by_display_name TEXT,
  ADD COLUMN IF NOT EXISTS saved_by_user_id UUID;

-- ── Pitch Decks ───────────────────────────────────────────────────────────────
-- Each row is a saved pitch deck version. Users can create multiple decks,
-- give them names, and save new versions. Admins see all; others see their own.

CREATE TABLE IF NOT EXISTS public.pitch_decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Untitled Deck',
    description TEXT,
    slides JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- attribution
    created_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_by_email TEXT,
    created_by_display_name TEXT,
    last_edited_by_email TEXT,
    last_edited_by_display_name TEXT,
    -- lifecycle
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'archived')),
    version INTEGER NOT NULL DEFAULT 1,
    parent_deck_id UUID REFERENCES public.pitch_decks(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pitch_decks_created_by ON public.pitch_decks(created_by_user_id);
CREATE INDEX IF NOT EXISTS idx_pitch_decks_status ON public.pitch_decks(status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pitch_decks_updated_at ON public.pitch_decks;
CREATE TRIGGER trg_pitch_decks_updated_at
  BEFORE UPDATE ON public.pitch_decks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.pitch_decks ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all decks (so team can see each other's work)
CREATE POLICY "Authenticated users can read pitch_decks"
  ON public.pitch_decks FOR SELECT TO authenticated USING (true);

-- Users can insert their own decks
CREATE POLICY "Users can create pitch_decks"
  ON public.pitch_decks FOR INSERT TO authenticated
  WITH CHECK (created_by_user_id = auth.uid() OR created_by_user_id IS NULL);

-- Users can update decks they created; admins can update any
CREATE POLICY "Creators can update their pitch_decks"
  ON public.pitch_decks FOR UPDATE TO authenticated
  USING (created_by_user_id = auth.uid() OR created_by_user_id IS NULL);
