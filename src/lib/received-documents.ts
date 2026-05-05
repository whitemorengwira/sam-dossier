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

/** Known documents already uploaded to R2 */
const KNOWN_R2_DOCS: Omit<ReceivedDoc, 'publicUrl'>[] = [
  { id: 'rd-1', fileName: 'chikonga-mine-profile.pdf', title: 'Chikonga Mine Profile', format: 'pdf', r2Key: `${PREFIX}/chikonga-mine-profile.pdf`, uploadedAt: '2026-04-15T10:00:00Z', source: 'r2' },
  { id: 'rd-2', fileName: 'socinga-establishment-policy.pdf', title: 'Establishment Policy', format: 'pdf', r2Key: `${PREFIX}/socinga-establishment-policy.pdf`, uploadedAt: '2026-04-20T09:00:00Z', source: 'r2' },
  { id: 'rd-3', fileName: 'mining-strategy-addendum.html', title: 'Mining Strategy Addendum', format: 'html', r2Key: `${PREFIX}/mining-strategy-addendum.html`, uploadedAt: '2026-04-22T11:00:00Z', source: 'r2' },
  { id: 'rd-4', fileName: 'financial-policy.pdf', title: 'Financial Policy', format: 'pdf', r2Key: `${PREFIX}/financial-policy.pdf`, uploadedAt: '2026-04-25T08:00:00Z', source: 'r2' },
  { id: 'rd-5', fileName: 'zedek-mining-mou.pdf', title: 'Zedek Mining MoU', format: 'pdf', r2Key: `${PREFIX}/zedek-mining-mou.pdf`, uploadedAt: '2026-01-12T11:00:00Z', source: 'r2' },
  { id: 'rd-6', fileName: 'loi-ares-antimony.pdf', title: 'LOI — ARES Antimony', format: 'pdf', r2Key: `${PREFIX}/loi-ares-antimony.pdf`, uploadedAt: '2025-12-09T10:00:00Z', source: 'r2' },
  { id: 'rd-7', fileName: 'mengxi-geological-survey.pdf', title: 'MENGXI Geological Survey', format: 'pdf', r2Key: `${PREFIX}/mengxi-geological-survey.pdf`, uploadedAt: '2026-02-10T08:00:00Z', source: 'r2' },
  { id: 'rd-8', fileName: 'swift-ventures-opportunities.html', title: 'Swift Ventures — Mining Opportunities', format: 'html', r2Key: `${PREFIX}/swift-ventures-opportunities.html`, uploadedAt: '2026-01-05T10:00:00Z', source: 'r2' },
]

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
