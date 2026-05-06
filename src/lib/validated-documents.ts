/**
 * Validated Documents — R2 Integration
 *
 * The 10 Socinga Africa approved corporate documents hosted on
 * Cloudflare R2 at the `socinga-africa-approved-documents/` prefix.
 * Each document is fetched on-demand into the rich-text editor.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface ValidatedDocument {
  id: string
  title: string
  category: 'corporate' | 'legal' | 'compliance' | 'governance' | 'finance' | 'hr'
  r2Key: string
  signatureStatus: 'pending' | 'signed' | 'none'
}

const PREFIX = 'sam-dossier/public/socinga-africa-approved-documents'

export const VALIDATED_DOCUMENTS: ValidatedDocument[] = [
  {
    id: 'vd-establishment-policy',
    title: 'Establishment Policy',
    category: 'corporate',
    r2Key: `${PREFIX}/Establishment_Policy.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-structural-policy',
    title: 'Structural Policy',
    category: 'governance',
    r2Key: `${PREFIX}/Structural_Policy.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-financial-policy',
    title: 'Financial Policy',
    category: 'finance',
    r2Key: `${PREFIX}/Financial_Policy.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-strategic-biz-ops',
    title: 'Strategic Business Operations',
    category: 'corporate',
    r2Key: `${PREFIX}/Strategic_Business_Operations.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-ecosystem-policies',
    title: 'Ecosystem Policies',
    category: 'compliance',
    r2Key: `${PREFIX}/Ecosystem_Policies.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-mining-strategy-addendum',
    title: 'Mining Strategy Addendum',
    category: 'legal',
    r2Key: `${PREFIX}/Mining_Strategy_Addendum.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-mining-strategic-policy',
    title: 'Mining Strategic Policy',
    category: 'corporate',
    r2Key: `${PREFIX}/Mining_Strategic_Policy.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-corp-services-structure',
    title: 'Corporate Services Structure',
    category: 'corporate',
    r2Key: `${PREFIX}/Corporate_Services_Structure.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-ecosystem-organogram',
    title: 'Ecosystem Organogram',
    category: 'corporate',
    r2Key: `${PREFIX}/Ecosystem_Organogram.html`,
    signatureStatus: 'pending',
  },
  {
    id: 'vd-sam-mission-budget',
    title: 'SAM Mission Centre Budget',
    category: 'finance',
    r2Key: `${PREFIX}/SAM-mission-centre-budget.html`,
    signatureStatus: 'pending',
  },
]

/**
 * Fetch the raw HTML content of a validated document from R2.
 * Falls back to a styled editable placeholder if not yet uploaded.
 */
export async function fetchValidatedDocumentHtml(doc: ValidatedDocument): Promise<string> {
  try {
    const url = `/api/validated-docs/content?r2Key=${encodeURIComponent(doc.r2Key)}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } catch {
    return `
      <div style="font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 0 auto; padding: 48px; text-align: center;">
        <h1 style="font-size: 24px; color: #0A1128; margin-bottom: 16px;">${doc.title}</h1>
        <p style="color: #80868b; font-size: 14px;">Unable to load document from R2. Please check your connection and try again.</p>
      </div>
    `
  }
}

/** Get a document by ID */
export function getValidatedDocumentById(id: string): ValidatedDocument | undefined {
  return VALIDATED_DOCUMENTS.find(d => d.id === id)
}
