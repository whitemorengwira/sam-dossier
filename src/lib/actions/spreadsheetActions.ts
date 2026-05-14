'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface SpreadsheetRecord {
  id: string
  page_slug: string
  version_number: number
  content_json: {
    title: string
    gridData: Record<string, string>
    colWidths: number[]
    numCols: number
    numRows: number
    isLive: boolean
    liveAt?: string
    liveBy?: string
  }
  saved_by: string
  saved_by_display_name: string
  saved_by_user_id: string | null
  saved_at: string
  label: string | null
}

// Resolve current user
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

// ─── Save spreadsheet ────────────────────────────────────────────────────────
export async function saveSpreadsheet(
  spreadsheetId: string,
  contentJson: SpreadsheetRecord['content_json'],
  label?: string
) {
  const db = createAdminClient()
  const user = await getCurrentUser()
  const pageSlug = `spreadsheet-${spreadsheetId}`

  // Get latest version
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
      label: label || contentJson.title || 'Untitled spreadsheet',
    })
    .select()

  if (error) throw new Error(`Failed to save spreadsheet: ${error.message}`)
  return data[0]
}

// ─── Go Live (mark as published) ─────────────────────────────────────────────
export async function goLiveSpreadsheet(spreadsheetId: string) {
  const db = createAdminClient()
  const user = await getCurrentUser()
  const pageSlug = `spreadsheet-${spreadsheetId}`

  // Get latest version
  const { data: latest } = await db
    .from('page_versions')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })
    .limit(1)

  if (!latest || latest.length === 0) throw new Error('Save the spreadsheet first before going live')

  const current = latest[0]
  const updatedContent = {
    ...current.content_json,
    isLive: true,
    liveAt: new Date().toISOString(),
    liveBy: user.displayName,
  }

  // Save a new "live" version
  const { data, error } = await db
    .from('page_versions')
    .insert({
      page_slug: pageSlug,
      version_number: current.version_number + 1,
      content_json: updatedContent,
      saved_by: user.email,
      saved_by_display_name: user.displayName,
      saved_by_user_id: user.id,
      label: `LIVE: ${updatedContent.title || 'Untitled'}`,
    })
    .select()

  if (error) throw new Error(`Failed to publish: ${error.message}`)
  return data[0]
}

// ─── List all saved spreadsheets ─────────────────────────────────────────────
export async function listSpreadsheets() {
  const db = createAdminClient()

  // Get all unique spreadsheet slugs with their latest version
  const { data, error } = await db
    .from('page_versions')
    .select('*')
    .like('page_slug', 'spreadsheet-%')
    .order('saved_at', { ascending: false })

  if (error) throw new Error(`Failed to list spreadsheets: ${error.message}`)

  // Deduplicate: only keep latest version per page_slug
  const seen = new Map<string, typeof data[0]>()
  for (const row of data || []) {
    if (!seen.has(row.page_slug)) {
      seen.set(row.page_slug, row)
    }
  }

  return Array.from(seen.values())
}

// ─── Load specific spreadsheet ───────────────────────────────────────────────
export async function loadSpreadsheet(spreadsheetId: string) {
  const db = createAdminClient()
  const pageSlug = `spreadsheet-${spreadsheetId}`

  const { data, error } = await db
    .from('page_versions')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('version_number', { ascending: false })
    .limit(1)

  if (error || !data || data.length === 0) return null
  return data[0]
}

// ─── Delete spreadsheet ─────────────────────────────────────────────────────
export async function deleteSpreadsheet(spreadsheetId: string) {
  const db = createAdminClient()
  const pageSlug = `spreadsheet-${spreadsheetId}`

  const { error } = await db
    .from('page_versions')
    .delete()
    .eq('page_slug', pageSlug)

  if (error) throw new Error(`Failed to delete: ${error.message}`)
  return true
}
