/**
 * Validated Documents — Data Layer
 *
 * Master registry of the 10 Socinga Africa approved corporate documents.
 * Each document is hosted as a raw HTML file on Cloudflare R2 and is
 * fetched on-demand into the rich-text editor.
 */

import { getGlobalAssetUrl } from './getGlobalAssetUrl'

export interface ValidatedDocument {
  id: string
  title: string
  category: 'corporate' | 'legal' | 'compliance' | 'governance' | 'finance' | 'hr'
  /** Relative path inside R2 (under the approved-documents prefix) */
  r2Key: string
  description: string
}

const PREFIX = 'sam-dossier/public/socinga-africa-approved-documents'

export const VALIDATED_DOCUMENTS: ValidatedDocument[] = [
  {
    id: 'vd-corporate-profile',
    title: 'Socinga Africa Corporate Profile',
    category: 'corporate',
    r2Key: `${PREFIX}/corporate-profile.html`,
    description: 'Official corporate overview, history, and organisational positioning.',
  },
  {
    id: 'vd-shareholder-agreement',
    title: 'Shareholder Agreement',
    category: 'legal',
    r2Key: `${PREFIX}/shareholder-agreement.html`,
    description: 'Binding shareholder agreement governing equity, voting rights, and distributions.',
  },
  {
    id: 'vd-investment-term-sheet',
    title: 'Investment Term Sheet',
    category: 'finance',
    r2Key: `${PREFIX}/investment-term-sheet.html`,
    description: 'Formal term sheet outlining capital commitment, interest, and profit-sharing.',
  },
  {
    id: 'vd-nda-mutual',
    title: 'Mutual Non-Disclosure Agreement',
    category: 'legal',
    r2Key: `${PREFIX}/nda-mutual.html`,
    description: 'Standard mutual NDA for counterparties and prospective investors.',
  },
  {
    id: 'vd-spv-memorandum',
    title: 'SPV Memorandum of Incorporation',
    category: 'governance',
    r2Key: `${PREFIX}/spv-memorandum.html`,
    description: 'Memorandum of Incorporation for the ring-fenced mining SPV entity.',
  },
  {
    id: 'vd-mining-services-agreement',
    title: 'Mining Services Agreement',
    category: 'legal',
    r2Key: `${PREFIX}/mining-services-agreement.html`,
    description: 'Service-level agreement between the SPV and operational mining contractors.',
  },
  {
    id: 'vd-offtake-agreement',
    title: 'Off-Take Agreement Template',
    category: 'finance',
    r2Key: `${PREFIX}/offtake-agreement.html`,
    description: 'Standard off-take agreement for commodity sales to licensed buyers.',
  },
  {
    id: 'vd-code-of-conduct',
    title: 'Code of Conduct & Ethics Policy',
    category: 'compliance',
    r2Key: `${PREFIX}/code-of-conduct.html`,
    description: 'Company-wide behavioural code, anti-bribery, and compliance standards.',
  },
  {
    id: 'vd-employment-contract',
    title: 'Employment Contract Template',
    category: 'hr',
    r2Key: `${PREFIX}/employment-contract.html`,
    description: 'Standard employment contract for field and corporate employees.',
  },
  {
    id: 'vd-environmental-impact',
    title: 'Environmental Impact Assessment',
    category: 'compliance',
    r2Key: `${PREFIX}/environmental-impact-assessment.html`,
    description: 'EIA documentation for regulatory submissions and mine-site compliance.',
  },
]

/**
 * Fetch the raw HTML content of a validated document from R2.
 * Falls back to a styled placeholder if the document is not yet uploaded.
 */
export async function fetchValidatedDocumentHtml(doc: ValidatedDocument): Promise<string> {
  try {
    const url = getGlobalAssetUrl(doc.r2Key)
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    return html
  } catch {
    return `
      <div style="font-family: 'Georgia', serif; max-width: 680px; margin: 0 auto; padding: 48px 0;">
        <h1 style="font-size: 28px; color: #0A1128; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 24px;">
          ${doc.title}
        </h1>
        <p style="color: #5f6368; font-size: 15px; line-height: 1.8; margin-bottom: 16px;">
          This is a placeholder for the <strong>${doc.title}</strong> document.
          The master HTML file has not yet been uploaded to the Cloudflare R2 asset store.
        </p>
        <p style="color: #5f6368; font-size: 15px; line-height: 1.8;">
          You may begin editing this document directly. Your changes will be preserved in
          the local session. To persist changes permanently, use the <em>Export</em> function
          in the toolbar above.
        </p>
        <p style="color: #80868b; font-size: 12px; margin-top: 32px; font-style: italic;">
          Category: ${doc.category.charAt(0).toUpperCase() + doc.category.slice(1)} &bull; Document ID: ${doc.id}
        </p>
      </div>
    `
  }
}
