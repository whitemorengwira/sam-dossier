/**
 * Board Chair Documents — Data & Utilities
 *
 * Manages the registry of Board Chairperson documents stored in R2
 * under the `sam-dossier/public/board-chair/` prefix.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface BoardChairDocument {
  id: string
  fileName: string
  title: string
  category: 'resolution' | 'minutes' | 'directive' | 'governance' | 'other'
  status: 'pending-approval' | 'approved' | 'archived' | 'under-review'
  r2Key: string
  publicUrl: string
  uploadedAt: string
  source: 'r2' | 'local'
}

export const BC_CATEGORY_META: Record<string, { colour: string; label: string }> = {
  resolution: { colour: '#D4AF37', label: 'Resolution' },
  minutes:    { colour: '#4CAF50', label: 'Minutes' },
  directive:  { colour: '#2196F3', label: 'Directive' },
  governance: { colour: '#9C27B0', label: 'Governance' },
  other:      { colour: '#78909C', label: 'Other' },
}

export const BC_STATUS_META: Record<string, { colour: string; label: string }> = {
  'pending-approval': { colour: '#FF9800', label: 'Pending Approval' },
  'approved':         { colour: '#4CAF50', label: 'Approved' },
  'archived':         { colour: '#78909C', label: 'Archived' },
  'under-review':     { colour: '#2196F3', label: 'Under Review' },
}

/** Known documents already uploaded to R2 — add entries here when real files exist */
const KNOWN_R2_DOCS: Omit<BoardChairDocument, 'publicUrl'>[] = []

export function getKnownBoardChairDocs(): BoardChairDocument[] {
  return KNOWN_R2_DOCS.map(d => ({
    ...d,
    publicUrl: getGlobalAssetUrl(d.r2Key),
  }))
}

/** Locally uploaded Board Chair docs persisted in localStorage */
const LOCAL_KEY = 'sam-dossier-board-chair-docs'

export function loadLocalBoardChairDocs(): BoardChairDocument[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(LOCAL_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function saveLocalBoardChairDoc(doc: BoardChairDocument) {
  if (typeof window === 'undefined') return
  const existing = loadLocalBoardChairDocs()
  existing.unshift(doc)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing))
}

export function deleteLocalBoardChairDoc(id: string) {
  if (typeof window === 'undefined') return
  const existing = loadLocalBoardChairDocs()
  const next = existing.filter(d => d.id !== id)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
}
