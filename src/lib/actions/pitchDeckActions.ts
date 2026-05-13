'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export interface PitchSlide {
  id: string
  title: string
  content: string[]
  notes: string
}

export interface PitchDeck {
  id: string
  name: string
  description: string | null
  slides: PitchSlide[]
  status: 'draft' | 'live' | 'archived'
  version: number
  parent_deck_id: string | null
  created_by_email: string | null
  created_by_display_name: string | null
  last_edited_by_email: string | null
  last_edited_by_display_name: string | null
  created_at: string
  updated_at: string
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
      }
    }
  } catch { /* ignore */ }
  return { id: null, email: null, displayName: 'Unknown' }
}

export async function listPitchDecks(): Promise<PitchDeck[]> {
  const db = createAdminClient()
  const { data, error } = await db
    .from('pitch_decks')
    .select('*')
    .neq('status', 'archived')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('listPitchDecks error:', error)
    return []
  }
  return data as PitchDeck[]
}

export async function getPitchDeck(id: string): Promise<PitchDeck | null> {
  const db = createAdminClient()
  const { data, error } = await db
    .from('pitch_decks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as PitchDeck
}

export async function savePitchDeck(
  name: string,
  slides: PitchSlide[],
  opts?: { id?: string; description?: string; status?: 'draft' | 'live' }
): Promise<PitchDeck> {
  const db = createAdminClient()
  const user = await getCurrentUser()

  if (opts?.id) {
    // Update existing
    const { data, error } = await db
      .from('pitch_decks')
      .update({
        name,
        slides,
        description: opts.description ?? null,
        status: opts.status ?? 'draft',
        last_edited_by_email: user.email,
        last_edited_by_display_name: user.displayName,
      })
      .eq('id', opts.id)
      .select()
      .single()

    if (error) throw new Error(`Failed to update pitch deck: ${error.message}`)
    return data as PitchDeck
  }

  // Create new
  const { data, error } = await db
    .from('pitch_decks')
    .insert({
      name,
      slides,
      description: opts?.description ?? null,
      status: opts?.status ?? 'draft',
      created_by_user_id: user.id,
      created_by_email: user.email,
      created_by_display_name: user.displayName,
      last_edited_by_email: user.email,
      last_edited_by_display_name: user.displayName,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create pitch deck: ${error.message}`)
  return data as PitchDeck
}

export async function deletePitchDeck(id: string): Promise<void> {
  const db = createAdminClient()
  const { error } = await db
    .from('pitch_decks')
    .update({ status: 'archived' })
    .eq('id', id)

  if (error) throw new Error(`Failed to archive pitch deck: ${error.message}`)
}

export async function publishPitchDeck(id: string): Promise<void> {
  const db = createAdminClient()
  const user = await getCurrentUser()
  const { error } = await db
    .from('pitch_decks')
    .update({ status: 'live', last_edited_by_email: user.email, last_edited_by_display_name: user.displayName })
    .eq('id', id)

  if (error) throw new Error(`Failed to publish pitch deck: ${error.message}`)
}
