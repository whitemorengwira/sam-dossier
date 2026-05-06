/**
 * CFO Documents — Data & Utilities
 *
 * Manages the registry of CFO budget documents stored in R2
 * under the `sam-dossier/public/budgets/` prefix.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface CFODocument {
  id: string
  fileName: string
  title: string
  category: 'budget' | 'payroll' | 'forecast' | 'audit' | 'other'
  status: 'pending-approval' | 'approved' | 'rejected' | 'under-review'
  r2Key: string
  publicUrl: string
  uploadedAt: string
  source: 'r2' | 'local'
}

export const CFO_CATEGORY_META: Record<string, { colour: string; label: string }> = {
  budget:   { colour: '#D4AF37', label: 'Budget' },
  payroll:  { colour: '#4CAF50', label: 'Payroll' },
  forecast: { colour: '#2196F3', label: 'Forecast' },
  audit:    { colour: '#9C27B0', label: 'Audit' },
  other:    { colour: '#78909C', label: 'Other' },
}

export const CFO_STATUS_META: Record<string, { colour: string; label: string }> = {
  'pending-approval': { colour: '#FF9800', label: 'Pending Approval' },
  'approved':         { colour: '#4CAF50', label: 'Approved' },
  'rejected':         { colour: '#f44336', label: 'Rejected' },
  'under-review':     { colour: '#2196F3', label: 'Under Review' },
}

const PREFIX = 'sam-dossier/public/budgets'

/** Known budget documents already uploaded to R2 */
const KNOWN_R2_DOCS: Omit<CFODocument, 'publicUrl'>[] = [
  {
    id: 'cfo-budget-travel-zim',
    fileName: 'Executive Travel Budget Jhb Mutare Zimbabwe.pdf',
    title: 'Executive Travel Budget — Jhb to Mutare, Zimbabwe',
    category: 'budget',
    status: 'pending-approval',
    r2Key: `${PREFIX}/Executive Travel Budget Jhb Mutare Zimbabwe.pdf`,
    uploadedAt: '2026-05-06T21:39:00Z',
    source: 'r2',
  },
  {
    id: 'cfo-budget-salaries',
    fileName: 'SALARIES FOR SOCINGA AFRICA.pdf',
    title: 'Salaries for Socinga Africa',
    category: 'payroll',
    status: 'pending-approval',
    r2Key: `${PREFIX}/SALARIES FOR SOCINGA AFRICA.pdf`,
    uploadedAt: '2026-05-06T21:39:00Z',
    source: 'r2',
  },
  {
    id: 'cfo-budget-ppe',
    fileName: 'SOCINGA MINING ppe_budget_with_vat.pdf',
    title: 'Socinga Mining — PPE Budget (incl. VAT)',
    category: 'budget',
    status: 'pending-approval',
    r2Key: `${PREFIX}/SOCINGA MINING ppe_budget_with_vat.pdf`,
    uploadedAt: '2026-05-06T21:39:00Z',
    source: 'r2',
  },
  {
    id: 'cfo-budget-insurance-hq',
    fileName: 'Socinga_Insurance_HQ_Budget.pdf',
    title: 'Socinga Insurance — HQ Budget',
    category: 'budget',
    status: 'pending-approval',
    r2Key: `${PREFIX}/Socinga_Insurance_HQ_Budget.pdf`,
    uploadedAt: '2026-05-06T21:39:00Z',
    source: 'r2',
  },
]

export function getKnownCFODocs(): CFODocument[] {
  return KNOWN_R2_DOCS.map(d => ({
    ...d,
    publicUrl: getGlobalAssetUrl(d.r2Key),
  }))
}

/** Locally uploaded CFO docs persisted in localStorage */
const LOCAL_KEY = 'sam-dossier-cfo-docs'

export function loadLocalCFODocs(): CFODocument[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(LOCAL_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function saveLocalCFODoc(doc: CFODocument) {
  if (typeof window === 'undefined') return
  const existing = loadLocalCFODocs()
  existing.unshift(doc)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing))
}

export function deleteLocalCFODoc(id: string) {
  if (typeof window === 'undefined') return
  const existing = loadLocalCFODocs()
  const next = existing.filter(d => d.id !== id)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
}

export function detectFormat(fileName: string): 'pdf' | 'docx' | 'xlsx' | 'image' | 'other' {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'docx' || ext === 'doc') return 'docx'
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image'
  return 'other'
}
