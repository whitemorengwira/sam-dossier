-- ============================================================
-- MONDAY.COM BOARDS & ITEMS SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS boards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  favourite       BOOLEAN DEFAULT false,
  columns         JSONB NOT NULL DEFAULT '[]', -- Array of BoardColumn objects
  groups          JSONB NOT NULL DEFAULT '[]', -- Array of BoardGroup objects
  views           JSONB NOT NULL DEFAULT '[]', -- Array of BoardView objects
  status_labels   JSONB NOT NULL DEFAULT '[]', -- Array of StatusLabel objects
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS boards_workspace_id_idx ON boards(workspace_id);

CREATE TABLE IF NOT EXISTS board_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id        UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  group_id        TEXT NOT NULL,
  parent_item_id  UUID REFERENCES board_items(id) ON DELETE CASCADE, -- For subitems
  name            TEXT NOT NULL,
  values          JSONB NOT NULL DEFAULT '{}', -- Column values keyed by column id
  position        INTEGER NOT NULL DEFAULT 0,
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS board_items_board_id_idx ON board_items(board_id);
CREATE INDEX IF NOT EXISTS board_items_parent_id_idx ON board_items(parent_item_id);

-- Enable RLS
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_items ENABLE ROW LEVEL SECURITY;

-- Board policies
CREATE POLICY IF NOT EXISTS "boards_select"
  ON boards FOR SELECT
  USING (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

CREATE POLICY IF NOT EXISTS "boards_insert"
  ON boards FOR INSERT
  WITH CHECK (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

CREATE POLICY IF NOT EXISTS "boards_update"
  ON boards FOR UPDATE
  USING (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

CREATE POLICY IF NOT EXISTS "boards_delete"
  ON boards FOR DELETE
  USING (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

-- Board items policies
CREATE POLICY IF NOT EXISTS "board_items_select"
  ON board_items FOR SELECT
  USING (board_id IN (
    SELECT id FROM boards WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY IF NOT EXISTS "board_items_insert"
  ON board_items FOR INSERT
  WITH CHECK (board_id IN (
    SELECT id FROM boards WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY IF NOT EXISTS "board_items_update"
  ON board_items FOR UPDATE
  USING (board_id IN (
    SELECT id FROM boards WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY IF NOT EXISTS "board_items_delete"
  ON board_items FOR DELETE
  USING (board_id IN (
    SELECT id FROM boards WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));
