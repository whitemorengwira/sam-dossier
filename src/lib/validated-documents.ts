/**
 * Validated Documents — R2 Manifest
 *
 * Fetches the actual approved documents from the Cloudflare R2 bucket
 * via the /api/approved-documents listing endpoint. Falls back to the
 * manifest below if the API is unavailable or credentials are not set.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface ValidatedDocument {
  id: string
  title: string
  fileName: string
  category: string
  format: 'pdf' | 'html' | 'docx' | 'pptx' | 'xlsx' | 'image' | 'other'
  description: string
  publicUrl: string
  signatureStatus: 'pending' | 'signed' | 'none'
  lastModified: string
}

const PREFIX = 'sam-dossier/public/socinga-africa-approved-documents'

function detectFormat(name: string): ValidatedDocument['format'] {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'html' || ext === 'htm') return 'html'
  if (ext === 'docx' || ext === 'doc') return 'docx'
  if (ext === 'pptx' || ext === 'ppt') return 'pptx'
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
  return 'other'
}

function detectCategory(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('financial') || lower.includes('finance')) return 'finance'
  if (lower.includes('legal') || lower.includes('nda') || lower.includes('loi') || lower.includes('mou') || lower.includes('letter-of-intent') || lower.includes('memorandum')) return 'legal'
  if (lower.includes('compliance') || lower.includes('eia') || lower.includes('conduct')) return 'compliance'
  if (lower.includes('governance') || lower.includes('moi') || lower.includes('spv')) return 'governance'
  if (lower.includes('hr') || lower.includes('employment') || lower.includes('human-resource')) return 'hr'
  if (lower.includes('mining') || lower.includes('geological') || lower.includes('mine')) return 'strategy'
  return 'corporate'
}

function humanTitle(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

/** Fetch documents from the R2 listing API */
export async function fetchApprovedDocuments(): Promise<ValidatedDocument[]> {
  try {
    const res = await fetch('/api/approved-documents')
    const data = await res.json()
    if (data.documents && data.documents.length > 0) {
      return data.documents.map((d: any, i: number) => ({
        id: `vd-r2-${i}`,
        title: d.title || humanTitle(d.fileName),
        fileName: d.fileName,
        category: detectCategory(d.fileName),
        format: d.format || detectFormat(d.fileName),
        description: `Approved corporate document stored in R2.`,
        publicUrl: d.publicUrl,
        signatureStatus: 'pending' as const,
        lastModified: d.lastModified,
      }))
    }
  } catch {
    // API unavailable — fall through to static manifest
  }
  return STATIC_MANIFEST
}

/**
 * Static manifest — used when the R2 listing API is unavailable.
 * These are the known filenames in the approved-documents prefix.
 * Update this list when new documents are uploaded to R2.
 */
const KNOWN_FILES = [
  'Socinga-Africa-Establishment-Policy.html',
  'Socinga-Africa-Structural-Policy.html',
  'Socinga-Africa-Financial-Policy.html',
  'Strategic-Business-Operations-Policy.html',
  'Socinga-Africa-Ecosystem-Policies-OPS-Framework.html',
  'Mining-Strategy-Addendum-Agenda-V1.html',
  'Socinga-Africa-Mining-Strategic-Policy.html',
  'Letter-of-Intent-ARES-Antimony.html',
  'Zedek-Mining-MoU-Gold-Mining-Zimbabwe.html',
  'Chikonga-Mine-Profile-Hilltouch-Investments.html',
]

const STATIC_MANIFEST: ValidatedDocument[] = KNOWN_FILES.map((fileName, i) => ({
  id: `vd-${i + 1}`,
  title: humanTitle(fileName),
  fileName,
  category: detectCategory(fileName),
  format: detectFormat(fileName),
  description: 'Approved corporate document from the Socinga Africa archive.',
  publicUrl: getGlobalAssetUrl(`${PREFIX}/${fileName}`),
  signatureStatus: 'pending' as const,
  lastModified: '2026-05-01T00:00:00Z',
}))

/** Get all documents (static fallback — for SSR/initial render) */
export function getStaticValidatedDocuments(): ValidatedDocument[] {
  return STATIC_MANIFEST
}

/** Get a single document by ID */
export function getValidatedDocumentById(id: string): ValidatedDocument | undefined {
  return STATIC_MANIFEST.find(d => d.id === id)
}
