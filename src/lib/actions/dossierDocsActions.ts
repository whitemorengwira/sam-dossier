'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const DOCS_SLUG = 'executive-summary-docs'

export interface DossierDoc {
  id: string
  label: string
  subtitle: string
  url: string
  uploadedBy: string
  uploadedAt: string
}

async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const meta = user.user_metadata || {}
      return {
        id: user.id,
        email: user.email || 'unknown',
        displayName: meta.full_name || meta.name || user.email?.split('@')[0] || 'User',
        role: meta.role || 'viewer',
      }
    }
  } catch { /* ignore */ }
  return null
}

export async function getDossierDocs(): Promise<DossierDoc[]> {
  const db = createAdminClient()
  const { data } = await db
    .from('page_versions')
    .select('content_json')
    .eq('page_slug', DOCS_SLUG)
    .order('version_number', { ascending: false })
    .limit(1)

  if (!data || data.length === 0) return []
  return (data[0].content_json as unknown as DossierDoc[]) || []
}

export async function addDossierDoc(doc: Omit<DossierDoc, 'uploadedBy' | 'uploadedAt'>): Promise<DossierDoc[]> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorised')
  if (user.role !== 'admin' && user.role !== 'team') throw new Error('Unauthorised — admin or team role required')

  const existing = await getDossierDocs()

  const newDoc: DossierDoc = {
    ...doc,
    uploadedBy: user.displayName,
    uploadedAt: new Date().toISOString(),
  }

  const updated = [...existing, newDoc]
  await persistDocs(updated, user.email, user.displayName, user.id)
  return updated
}

export async function removeDossierDoc(docId: string): Promise<DossierDoc[]> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorised')
  if (user.role !== 'admin' && user.role !== 'team') throw new Error('Unauthorised — admin or team role required')

  const existing = await getDossierDocs()
  const updated = existing.filter(d => d.id !== docId)
  await persistDocs(updated, user.email, user.displayName, user.id)
  return updated
}

async function persistDocs(docs: DossierDoc[], email: string, displayName: string, userId: string | null) {
  const db = createAdminClient()

  const { data: latest } = await db
    .from('page_versions')
    .select('version_number')
    .eq('page_slug', DOCS_SLUG)
    .order('version_number', { ascending: false })
    .limit(1)

  const nextVersion = latest && latest.length > 0 ? latest[0].version_number + 1 : 1

  await db.from('page_versions').insert({
    page_slug: DOCS_SLUG,
    version_number: nextVersion,
    content_json: docs as unknown as any[],
    saved_by: email,
    saved_by_display_name: displayName,
    saved_by_user_id: userId,
  })
}
