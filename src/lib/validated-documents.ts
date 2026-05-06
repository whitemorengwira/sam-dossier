/**
 * Validated Documents — R2 Integration
 *
 * Fetches the actual approved documents from the Cloudflare R2 bucket
 * via the /api/approved-documents listing endpoint. No hardcoded filenames —
 * the API dynamically discovers what's in the bucket.
 */

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

/** Fetch documents from the R2 listing API — the only source of truth */
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
        description: 'Approved corporate document stored in R2.',
        publicUrl: d.publicUrl,
        signatureStatus: 'pending' as const,
        lastModified: d.lastModified,
      }))
    }
  } catch {
    // API unavailable — return empty
  }
  return []
}

/** Returns empty — documents come exclusively from the R2 API */
export function getStaticValidatedDocuments(): ValidatedDocument[] {
  return []
}
