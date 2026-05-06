/**
 * Received External Documents — Data & Utilities
 *
 * Manages the registry of externally received documents stored in R2
 * under the `received-verified-documents/` prefix.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface ReceivedDoc {
  id: string
  fileName: string
  title: string
  format: 'pdf' | 'html' | 'docx' | 'pptx' | 'xlsx' | 'link' | 'image' | 'video' | 'other'
  r2Key: string
  publicUrl: string
  uploadedAt: string
  source: 'r2' | 'local'
}

const PREFIX = 'sam-dossier/public/received-verified-documents'

/** Known documents already uploaded to R2 — add entries here when real files exist */
const KNOWN_R2_DOCS: Omit<ReceivedDoc, 'publicUrl'>[] = []

export function getKnownReceivedDocs(): ReceivedDoc[] {
  return KNOWN_R2_DOCS.map(d => ({
    ...d,
    publicUrl: getGlobalAssetUrl(d.r2Key),
  }))
}

/** Locally uploaded docs persisted in localStorage */
const LOCAL_KEY = 'sam-dossier-received-docs'

export function loadLocalReceivedDocs(): ReceivedDoc[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(LOCAL_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function saveLocalReceivedDoc(doc: ReceivedDoc) {
  if (typeof window === 'undefined') return
  const existing = loadLocalReceivedDocs()
  existing.unshift(doc)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing))
}

export function deleteLocalReceivedDoc(id: string) {
  if (typeof window === 'undefined') return
  const existing = loadLocalReceivedDocs()
  const next = existing.filter(d => d.id !== id)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
}

export function detectFormat(fileName: string): ReceivedDoc['format'] {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'html' || ext === 'htm') return 'html'
  if (ext === 'docx' || ext === 'doc') return 'docx'
  if (ext === 'pptx' || ext === 'ppt') return 'pptx'
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(ext)) return 'image'
  if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) return 'video'
  return 'other'
}

/** Build viewer URL depending on format */
export function getViewerUrl(doc: ReceivedDoc): string {
  if (doc.format === 'docx' || doc.format === 'pptx' || doc.format === 'xlsx') {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(doc.publicUrl)}`
  }
  return doc.publicUrl
}
