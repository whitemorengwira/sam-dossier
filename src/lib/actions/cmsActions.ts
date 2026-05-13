'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { BlockData } from '@/lib/store/useCmsStore'

// Resolve the current user's display info (works even with RLS issues)
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
      }
    }
  } catch { /* ignore */ }
  return { id: null, email: 'admin@socinga.africa', displayName: 'Admin' }
}

// Save a new page version
export async function savePageVersion(pageSlug: string, contentJson: BlockData[], label?: string) {
  const db = createAdminClient()           // service-role: bypasses RLS
  const user = await getCurrentUser()

  // get latest version number
  const { data: latest } = await db
    .from('page_versions')
    .select('version_number')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })
    .limit(1)

  const nextVersion = latest && latest.length > 0 ? latest[0].version_number + 1 : 1

  const { data, error } = await db
    .from('page_versions')
    .insert({
      page_slug: pageSlug,
      version_number: nextVersion,
      content_json: contentJson,
      saved_by: user.email,
      saved_by_display_name: user.displayName,
      saved_by_user_id: user.id,
      label: label || null,
    })
    .select()

  if (error) {
    console.error('Error saving page version:', error)
    throw new Error(`Failed to save page version: ${error.message}`)
  }

  // Log the save action (best-effort, don't fail the save if this fails)
  try {
    await logCmsAction(pageSlug, 'version_saved', null, null, { version: nextVersion, saved_by: user.email })
  } catch (logErr) {
    console.warn('Could not write to change_log:', logErr)
  }

  return data[0]
}

// Fetch latest page version (read-only, use anon client — fine if RLS allows authenticated reads)
export async function getLatestPageVersion(pageSlug: string) {
  // Try admin client so it always works regardless of RLS state
  const db = createAdminClient()
  const { data, error } = await db
    .from('page_versions')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })
    .limit(1)

  if (error || !data || data.length === 0) return null
  return data[0]
}

// Fetch version history
export async function getVersionHistory(pageSlug: string) {
  const db = createAdminClient()
  const { data, error } = await db
    .from('page_versions')
    .select('id, version_number, saved_by, saved_by_display_name, saved_at, label')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })

  if (error) throw new Error('Failed to fetch history')
  return data
}

// Fetch specific version
export async function getVersionById(versionId: string) {
  const db = createAdminClient()
  const { data, error } = await db
    .from('page_versions')
    .select('*')
    .eq('id', versionId)
    .single()

  if (error) throw new Error('Failed to fetch version')
  return data
}

// Log individual action (best-effort)
export async function logCmsAction(
  pageSlug: string,
  actionType: string,
  targetBlockId: string | null,
  beforeValue: any,
  afterValue: any
) {
  const db = createAdminClient()
  const user = await getCurrentUser()

  await db.from('change_log').insert({
    page_slug: pageSlug,
    user_id: user.id,
    user_email: user.email,
    user_display_name: user.displayName,
    action_type: actionType,
    target_block_id: targetBlockId,
    before_value: beforeValue,
    after_value: afterValue,
  })
}

// Fetch audit log
export async function getAuditLog() {
  const db = createAdminClient()
  const { data, error } = await db
    .from('change_log')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100)

  if (error) throw new Error('Failed to fetch audit log')
  return data
}
