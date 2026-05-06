import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface CGDocument {
  id: string
  fileName: string
  title: string
  category: 'policy' | 'board' | 'structure' | 'other'
  status: 'active' | 'archived' | 'draft'
  r2Key: string
  publicUrl: string
  uploadedAt: string
  source: 'r2' | 'local'
}

export const CG_CATEGORY_META: Record<string, { colour: string; label: string }> = {
  policy:    { colour: '#D4AF37', label: 'Policy' },
  board:     { colour: '#4CAF50', label: 'Board' },
  structure: { colour: '#2196F3', label: 'Structure' },
  other:     { colour: '#78909C', label: 'Other' },
}

export const CG_STATUS_META: Record<string, { colour: string; label: string }> = {
  'active':   { colour: '#4CAF50', label: 'Active' },
  'draft':    { colour: '#FF9800', label: 'Draft' },
  'archived': { colour: '#9E9E9E', label: 'Archived' },
}

const PREFIX = 'sam-dossier/public/head-of-cg'

const KNOWN_R2_DOCS: Omit<CGDocument, 'publicUrl'>[] = [
  {
    id: 'cg-doc-hr-policy',
    fileName: 'SOCINGA AFRICA BUSINESS COMPANY  HUMAN RESOURCE POLICY.docx',
    title: 'Socinga Africa Human Resource Policy',
    category: 'policy',
    status: 'active',
    r2Key: `${PREFIX}/SOCINGA AFRICA BUSINESS COMPANY  HUMAN RESOURCE POLICY.docx`,
    uploadedAt: '2026-05-06T20:11:00Z',
    source: 'r2',
  },
  {
    id: 'cg-doc-share-structure',
    fileName: 'SOCINGA AFRICA BUSINESS COMPANY SHARE STRUCTURE.docx',
    title: 'Socinga Africa Share Structure',
    category: 'structure',
    status: 'active',
    r2Key: `${PREFIX}/SOCINGA AFRICA BUSINESS COMPANY SHARE STRUCTURE.docx`,
    uploadedAt: '2026-05-06T20:11:00Z',
    source: 'r2',
  },
]

export function getKnownCGDocs(): CGDocument[] {
  return KNOWN_R2_DOCS.map(d => ({
    ...d,
    publicUrl: getGlobalAssetUrl(d.r2Key),
  }))
}

const LOCAL_KEY = 'sam-dossier-cg-docs'

export function loadLocalCGDocs(): CGDocument[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(LOCAL_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function saveLocalCGDoc(doc: CGDocument) {
  if (typeof window === 'undefined') return
  const existing = loadLocalCGDocs()
  existing.unshift(doc)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing))
}

export function deleteLocalCGDoc(id: string) {
  if (typeof window === 'undefined') return
  const existing = loadLocalCGDocs()
  const next = existing.filter(d => d.id !== id)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
}

export function detectCGFormat(fileName: string): 'pdf' | 'docx' | 'xlsx' | 'image' | 'other' {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'docx' || ext === 'doc') return 'docx'
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image'
  return 'other'
}
