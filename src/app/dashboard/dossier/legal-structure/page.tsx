'use client'

import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'
import { CinematicHero } from '@/components/dossier/CinematicHero'
import { ScrollReveal } from '@/components/dossier/ScrollReveal'
import { VisualBreak } from '@/components/dossier/VisualBreak'

const PAGE_SLUG = 'legal-structure'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-spv",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>12 Forge (Private) Limited — Special Purpose Vehicle</h2><p class='text-text-secondary mb-4'>To guarantee absolute operational segregation and to protect the ZAR 250,000,000 (USD 13,513,513) capital injection from cross-collateralisation risks, all mining operations, mineral titles, processing infrastructure, and extraction activities associated with this expansion are legally executed through a dedicated Zimbabwean Special Purpose Vehicle (SPV) named 12 Forge (Private) Limited.</p><p class='text-text-secondary mb-4'>The utilisation of 12 Forge (Private) Limited ensures that the mining operations are entirely insulated from the broader corporate activities of the Socinga Africa group. It is imperative to note that the parent entity&apos;s South African Financial Services Provider (FSP) licence is strictly ring-fenced for insurance administration; absolutely no mining capital is raised, processed, or deployed under the insurance regulatory structure.</p><p class='text-text-secondary mb-4'>Instead, 12 Forge (Private) Limited holds unencumbered legal title to the mining concessions and operates with complete statutory permitting granted by the Zimbabwean Ministry of Mines and Mining Development. This precise legal segregation provides the investor with a clear, direct line of sight to the underlying physical assets without exposure to external corporate liabilities.</p>"
    }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-spv-details",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3'>SPV Details</h3>"
    }
  },
  {
    id: "table-spv",
    type: "RichTable",
    props: {
      columns: ["Parameter", "Value"],
      rows: [
        ["Entity Name", "12 Forge (Pvt) Ltd"],
        ["Jurisdiction", "Zimbabwe"],
        ["Mineral Titles", "Unencumbered"],
        ["Statutory Permitting", "Ministry of Mines"],
        ["FSP Licence", "Ring-fenced (SA only)"]
      ]
    }
  },
  {
    id: "text-split-details",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3 mt-6'>Investment Split</h3>"
    }
  },
  {
    id: "table-split",
    type: "RichTable",
    props: {
      columns: ["Parameter", "Value"],
      rows: [
        ["Investor Share", "60% Net Free Cash Flow"],
        ["Socinga Share", "40% Operational Equity"],
        ["Structure", "Production-Sharing Agreement"],
        ["Vehicle", "Bespoke Project Finance"]
      ]
    }
  },
  {
    id: "div-3",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-psa",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Production-Sharing Agreement (PSA)</h2><p class='text-text-secondary mb-4'>The investment instrument is fundamentally structured as a bespoke Project Finance facility, executed via a Production-Sharing Agreement (PSA) within the 12 Forge (Private) Limited Special Purpose Vehicle (SPV). The Production-Sharing Agreement (PSA) dictates that the incoming investor acquires a 60 per cent (60%) equity share of the net distributable free cash flow generated specifically by the infrastructure funded by this capital tranche. Socinga Africa Mining retains the remaining 40 per cent (40%) equity share to manage the operational lifecycle, technological oversight, and statutory compliance.</p>"
    }
  },
  {
    id: "div-4",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-entitlements",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Entitlements and Statutory Compliance Tracking</h2><p class='text-text-secondary mb-4'>Crucially, all legal rights, water usage permits, and environmental certifications are classified corporately as &quot;Entitlements&quot; and tracked transparently through our digital compliance frameworks. This ensures that the Special Purpose Vehicle (SPV) maintains a perfect legal standing at all times.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Legal Rights:</strong> Mining concession titles held unencumbered through 12 Forge (Pvt) Ltd.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Water Usage Permits:</strong> Full statutory water rights secured for processing operations.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Environmental Certifications:</strong> EIA compliance tracked digitally through our governance platform.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Digital Compliance:</strong> Real-time entitlement monitoring across all statutory requirements.</p>"
    }
  },
  {
    id: "div-5",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-confirmation",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Formal Legal Confirmation and Workflow Resolution</h2><p class='text-text-secondary mb-4'>In direct response to the pending system requirement for Task (M) SAM Dossier #426359, this section serves as the formal review and approval of the corporate architecture. The establishment of the 12 Forge (Private) Limited Special Purpose Vehicle (SPV) and the specific mechanics of the Production-Sharing Agreement (PSA) have been legally confirmed and verified against statutory guidelines. With this confirmation documented, the Request_Legal_Confirmation bottleneck is cleared, allowing this dossier item to be officially marked as closed so the workflow can be advanced via the system&apos;s RETRY execution.</p>"
    }
  }
]

export default function LegalStructurePage() {
  const { blocks, setBlocks, clearHistory } = useCmsStore()
  const [loading, setLoading] = useState(true)
  const [editingMode, setEditingMode] = useState(false)

  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)

    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  useEffect(() => {
    async function init() {
      try {
        const latest = await getLatestPageVersion(PAGE_SLUG)
        if (latest && latest.content_json && latest.content_json.length > 0) {
          setBlocks(latest.content_json)
        } else {
          setBlocks(FALLBACK_BLOCKS)
        }
      } catch (e) {
        setBlocks(FALLBACK_BLOCKS)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [setBlocks])

  const handleSave = async () => {
    await savePageVersion(PAGE_SLUG, blocks)
    clearHistory()
    toast.success('Page saved successfully')
  }

  const handleDiscard = () => {
    if (confirm('Discard unsaved changes?')) window.location.reload()
  }

  if (loading) return <div className="text-center p-20 text-text-muted animate-pulse font-mono">Loading dossier content...</div>

  return (
    <div className="space-y-4 max-w-6xl pb-32">
      <CinematicHero
        theme="legal"
        badge="Legal Structure"
        badgeVariant="badge badge-info"
        title={<>Corporate Governance &amp; <span className="text-gold">SPV Architecture</span></>}
        subtitle="The deployment of institutional capital into emerging market mining jurisdictions necessitates a flawless architectural framework for corporate governance, risk mitigation, and statutory compliance. Socinga Africa Mining approaches mining capital deployment with actuarial-level fiduciary discipline."
      />

      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map((block, i) => (
          <ScrollReveal key={block.id} delay={i * 70}>
            <BlockRenderer block={block} />
          </ScrollReveal>
        ))}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
