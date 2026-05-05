-- Migration: CMS Tables for visual content management system

CREATE TABLE IF NOT EXISTS public.page_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    content_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    saved_by TEXT,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    label TEXT
);

CREATE INDEX IF NOT EXISTS idx_page_versions_page_slug ON public.page_versions(page_slug);

CREATE TABLE IF NOT EXISTS public.change_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    user_id UUID,
    user_email TEXT,
    user_display_name TEXT,
    action_type TEXT NOT NULL,
    target_block_id TEXT,
    before_value JSONB,
    after_value JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_change_log_page_slug ON public.change_log(page_slug);
CREATE INDEX IF NOT EXISTS idx_change_log_action_type ON public.change_log(action_type);

-- RLS Policies (assuming basic authenticated access for admin CMS)
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.change_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read page_versions" ON public.page_versions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert page_versions" ON public.page_versions FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read change_log" ON public.change_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert change_log" ON public.change_log FOR INSERT TO authenticated WITH CHECK (true);
