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
  description: string
  signatureStatus: 'pending' | 'signed' | 'none'
}

const PREFIX = 'sam-dossier/public/socinga-africa-approved-documents'

export const VALIDATED_DOCUMENTS: ValidatedDocument[] = [
  {
    id: 'vd-establishment-policy',
    title: 'Establishment Policy',
    category: 'corporate',
    r2Key: `${PREFIX}/Establishment_Policy.html`,
    description: 'Foundation and establishment policy for Socinga Africa.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-structural-policy',
    title: 'Structural Policy',
    category: 'governance',
    r2Key: `${PREFIX}/Structural_Policy.html`,
    description: 'Guidelines on the structural framework and governance.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-financial-policy',
    title: 'Financial Policy',
    category: 'finance',
    r2Key: `${PREFIX}/Financial_Policy.html`,
    description: 'Core financial policies and economic principles.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-strategic-biz-ops',
    title: 'Strategic Business Operations',
    category: 'corporate',
    r2Key: `${PREFIX}/Strategic_Business_Operations.html`,
    description: 'Overview of strategic operations and business processes.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-ecosystem-policies',
    title: 'Ecosystem Policies',
    category: 'compliance',
    r2Key: `${PREFIX}/Ecosystem_Policies.html`,
    description: 'Framework for ecosystem management and compliance.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-mining-strategy-addendum',
    title: 'Mining Strategy Addendum',
    category: 'legal',
    r2Key: `${PREFIX}/Mining_Strategy_Addendum.html`,
    description: 'Supplementary document detailing the mining strategy.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-mining-strategic-policy',
    title: 'Mining Strategic Policy',
    category: 'corporate',
    r2Key: `${PREFIX}/Mining_Strategic_Policy.html`,
    description: 'Core strategic policy governing mining operations.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-corp-services-structure',
    title: 'Corporate Services Structure',
    category: 'corporate',
    r2Key: `${PREFIX}/Corporate_Services_Structure.html`,
    description: 'Organisational structure for corporate services.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-ecosystem-organogram',
    title: 'Ecosystem Organogram',
    category: 'corporate',
    r2Key: `${PREFIX}/Ecosystem_Organogram.html`,
    description: 'Visual representation of the ecosystem structure.',
    signatureStatus: 'pending',
  },
  {
    id: 'vd-sam-mission-budget',
    title: 'SAM Mission Centre Budget',
    category: 'finance',
    r2Key: `${PREFIX}/SAM-mission-centre-budget.html`,
    description: 'Financial budget and projections for the SAM Mission Centre.',
    signatureStatus: 'pending',
  },
]

/**
 * Fetch the raw HTML content of a validated document from R2.
 * Falls back to a styled editable placeholder if not yet uploaded.
 */
export async function fetchValidatedDocumentHtml(doc: ValidatedDocument): Promise<string> {
  try {
    const url = getGlobalAssetUrl(doc.r2Key)
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } catch {
    return `
      <div style="font-family: 'Georgia', serif; max-width: 680px; margin: 0 auto; padding: 48px 0;">
        <h1 style="font-size: 28px; color: #0A1128; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 24px;">
          ${doc.title}
        </h1>
        <p style="color: #5f6368; font-size: 15px; line-height: 1.8; margin-bottom: 16px;">
          This is the <strong>${doc.title}</strong> document.
          The master HTML file will be loaded from the Cloudflare R2 secure vault once public access is enabled.
        </p>
        <p style="color: #5f6368; font-size: 15px; line-height: 1.8;">
          You may begin editing this document directly. Your changes are preserved in
          the local session. Use the <em>Export</em> function to download as PDF, Word, or HTML.
          Use the <em>e-Sign</em> button to apply your digital signature.
        </p>
        <p style="color: #80868b; font-size: 12px; margin-top: 32px; font-style: italic;">
          Category: ${doc.category.charAt(0).toUpperCase() + doc.category.slice(1)} &bull; Document ID: ${doc.id}
        </p>
      </div>
    `
  }
}

/** Get a document by ID */
export function getValidatedDocumentById(id: string): ValidatedDocument | undefined {
  return VALIDATED_DOCUMENTS.find(d => d.id === id)
}
