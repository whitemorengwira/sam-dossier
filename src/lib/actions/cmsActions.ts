'use server'

import { createClient } from '@/lib/supabase/server'
import { BlockData } from '@/lib/store/useCmsStore'

// Save a new page version
export async function savePageVersion(pageSlug: string, contentJson: BlockData[], label?: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // get latest version number
  const { data: latest } = await supabase
    .from('page_versions')
    .select('version_number')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })
    .limit(1)

  const nextVersion = latest && latest.length > 0 ? latest[0].version_number + 1 : 1

  const { data, error } = await supabase
    .from('page_versions')
    .insert({
      page_slug: pageSlug,
      version_number: nextVersion,
      content_json: contentJson,
      saved_by: user?.email || 'admin@socinga.africa',
      label
    })
    .select()

  if (error) {
    console.error('Error saving page version:', error)
    throw new Error('Failed to save page version')
  }

  // Also log the save action
  await logCmsAction(pageSlug, 'version_saved', null, null, contentJson)

  return data[0]
}

// Fetch latest page version
export async function getLatestPageVersion(pageSlug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
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
  const supabase = createClient()
  const { data, error } = await supabase
    .from('page_versions')
    .select('id, version_number, saved_by, saved_at, label')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })

  if (error) throw new Error('Failed to fetch history')
  return data
}

// Fetch specific version
export async function getVersionById(versionId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('page_versions')
    .select('*')
    .eq('id', versionId)
    .single()

  if (error) throw new Error('Failed to fetch version')
  return data
}

// Log individual action
export async function logCmsAction(
  pageSlug: string,
  actionType: string,
  targetBlockId: string | null,
  beforeValue: any,
  afterValue: any
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  await supabase.from('change_log').insert({
    page_slug: pageSlug,
    user_id: user?.id,
    user_email: user?.email || 'admin@socinga.africa',
    user_display_name: user?.user_metadata?.full_name || 'Admin',
    action_type: actionType,
    target_block_id: targetBlockId,
    before_value: beforeValue,
    after_value: afterValue
  })
}

// Fetch audit log
export async function getAuditLog() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('change_log')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100)

  if (error) throw new Error('Failed to fetch audit log')
  return data
}
