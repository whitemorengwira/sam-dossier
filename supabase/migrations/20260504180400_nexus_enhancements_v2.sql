-- ============================================================
-- NEXUS WORKSPACE SCHEMA ADDITIONS v2.0
-- Additive only — no drops, no truncates, no destructive ops
-- ============================================================

-- Upload intents (for tracking in-progress uploads)
CREATE TABLE IF NOT EXISTS upload_intents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  folder_id       UUID,
  storage_path    TEXT NOT NULL,
  original_file_name TEXT NOT NULL,
  file_type       TEXT NOT NULL,
  file_size       INTEGER NOT NULL,
  file_category   TEXT NOT NULL,
  document_id     UUID REFERENCES documents(id),
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'complete', 'failed', 'expired')),
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Presentations (links documents to presentation data)
CREATE TABLE IF NOT EXISTS presentations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL UNIQUE REFERENCES documents(id) ON DELETE CASCADE,
  workspace_id    UUID NOT NULL REFERENCES workspaces(id),
  title           TEXT NOT NULL,
  data            JSONB NOT NULL DEFAULT '{}',  -- full NexusPresentation JSON
  slide_count     INTEGER DEFAULT 0,
  thumbnail_url   TEXT,                          -- R2 URL of first slide preview
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Workspace activity log
CREATE TABLE IF NOT EXISTS workspace_activity (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES auth.users(id),
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,   -- 'document', 'board', 'item', 'member', etc.
  entity_id       UUID,
  entity_name     TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workspace_activity_workspace_id_idx
  ON workspace_activity(workspace_id, created_at DESC);

-- Document comments (inline comments in editor, separate from chat)
CREATE TABLE IF NOT EXISTS document_comments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  parent_id       UUID REFERENCES document_comments(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  position_data   JSONB,    -- stores TipTap comment mark data for positioning
  resolved        BOOLEAN DEFAULT false,
  resolved_by     UUID REFERENCES auth.users(id),
  resolved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Workspace notifications
CREATE TABLE IF NOT EXISTS notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,    -- 'mention', 'sign_request', 'comment', 'share', etc.
  title           TEXT NOT NULL,
  body            TEXT,
  action_url      TEXT,
  read            BOOLEAN DEFAULT false,
  dismissed       BOOLEAN DEFAULT false,
  related_user_id UUID REFERENCES auth.users(id),  -- who triggered the notification
  related_entity_id UUID,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_unread_idx ON notifications(user_id) WHERE read = false;

-- Enable RLS on new tables
ALTER TABLE upload_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notification policies
CREATE POLICY IF NOT EXISTS "notifications_user_select"
  ON notifications FOR SELECT USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "notifications_user_update"
  ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Presentation policies
CREATE POLICY IF NOT EXISTS "presentations_select"
  ON presentations FOR SELECT
  USING (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

-- Document comments policies
CREATE POLICY IF NOT EXISTS "document_comments_select"
  ON document_comments FOR SELECT
  USING (document_id IN (
    SELECT id FROM documents WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY IF NOT EXISTS "document_comments_insert"
  ON document_comments FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "document_comments_update"
  ON document_comments FOR UPDATE
  USING (user_id = auth.uid());
