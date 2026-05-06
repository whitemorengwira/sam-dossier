-- Validated document signatures
-- Run this migration in your Supabase project's SQL Editor.
-- Dashboard > SQL Editor > New Query > Paste > Run

create table public.document_signatures (
  id uuid primary key default gen_random_uuid(),
  document_slug text not null,
  pad_id text not null,
  signature_role text not null,
  signature_data_url text not null,
  signed_by_user_id uuid not null references auth.users(id) on delete restrict,
  signed_at timestamptz not null default now(),
  signed_ip inet,
  signed_user_agent text,
  unique (document_slug, pad_id, signed_by_user_id)
);

create index document_signatures_slug_idx
  on public.document_signatures (document_slug);

alter table public.document_signatures enable row level security;

-- Authenticated users can read all signatures (board needs to see who has signed)
create policy "authenticated read"
  on public.document_signatures for select
  to authenticated
  using (true);

-- Authenticated users can insert their own signatures
create policy "authenticated insert own"
  on public.document_signatures for insert
  to authenticated
  with check (auth.uid() = signed_by_user_id);

-- Only the original signer can delete their own signature (within 24h)
create policy "authenticated delete own recent"
  on public.document_signatures for delete
  to authenticated
  using (
    auth.uid() = signed_by_user_id
    and signed_at > now() - interval '24 hours'
  );

-- Allow authenticated users to update their own signatures (for upsert)
create policy "authenticated update own"
  on public.document_signatures for update
  to authenticated
  using (auth.uid() = signed_by_user_id)
  with check (auth.uid() = signed_by_user_id);
