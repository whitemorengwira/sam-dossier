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

const PAGE_SLUG = 'risk-matrix'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "hero",
    type: "TextBlock",
    props: {
      text: "<span class='badge badge-gold'>Investment Dossier</span><span class='badge badge-warning ml-2'>Risk Matrix</span><h1 class='text-gold font-display font-black mb-3 text-4xl mt-4'>Risk Management &amp; <span class='text-gold'>Mitigation Framework</span></h1><p class='text-text-secondary text-lg font-heading italic max-w-2xl'>The deployment of multi-million-dollar capital requires an uncompromising approach to risk management. Socinga Africa Mining ensures that the 12 Forge (Private) Limited Special Purpose Vehicle (SPV) operates within the strictest parameters of physical, operational, and macroeconomic security, fully incorporating high-end international methodologies.</p>"
    }
  },
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-metrics",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3'>Key Risk Metrics</h3>"
    }
  },
  {
    id: "table-metrics",
    type: "RichTable",
    props: {
      columns: ["Metric", "Value", "Detail"],
      rows: [
        ["Risk Categories", "3", "Operational, Macro, ESG"],
        ["Mitigation Controls", "14+", "Active controls deployed"],
        ["Grade Buffer", "15–25 g/t", "Production insulation"],
        ["Conservative Peg", "USD 4,750", "Below market peaks"]
      ]
    }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-operational",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Operational Readiness and Execution Risk</h2><p class='text-text-secondary mb-4'>To sustain the targeted production output of 15 kilogrammes (kg) per month, the physical extraction capacity of the mine must be radically scaled from shallow, artisanal workings to a mechanised, 400-metre inclined depth architecture (level 3). Furthermore, the bottleneck of the antiquated stamp-mill system will be eliminated by constructing a 500 tonnes per day (tpd) Carbon-in-Leach (CIL) plant.</p><p class='text-text-secondary mb-4'>To mitigate execution risk during this massive upgrade, the operation relies heavily on our advanced corporate dashboard systems. We apply rigorous &quot;Project Management&quot; and &quot;Asset Management&quot; controls directly to the physical mining environment. The executive team utilises &quot;Inventory Management&quot; for ore tracking, &quot;Maintenance Management&quot; for the CIL plant, and &quot;Security Management&quot; to protect the gold bullion. Real-time tracking of &quot;Consumption &amp; Compliance&quot; ensures reagent burn rates (cyanide, activated carbon) precisely match theoretical expectations, completely eliminating capital leakage.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Mitigation Controls:</strong></p><p class='text-text-secondary mb-1'>&#9656; Advanced corporate dashboard with Project Management and Asset Management controls</p><p class='text-text-secondary mb-1'>&#9656; Inventory Management for ore tracking from shaft to mill</p><p class='text-text-secondary mb-1'>&#9656; Maintenance Management for the 500 tpd CIL plant</p><p class='text-text-secondary mb-1'>&#9656; Security Management to protect gold bullion</p><p class='text-text-secondary mb-1'>&#9656; Real-time Consumption &amp; Compliance tracking for reagent burn rates</p>"
    }
  },
  {
    id: "div-3",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-macro",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Macroeconomic and Commodity Risk</h2><p class='text-text-secondary mb-4'>Global macroeconomic instability is mitigated by calculating the Return on Investment (ROI) against highly conservative benchmarks. By pegging the financial model at USD 4,750 (ZAR 87,875) per ounce — well below market peaks — the project builds in immense safety margins. Furthermore, the exceptionally high run-of-mine grades (15 to 25 grammes per tonne) insulate the project against minor cyclical market corrections.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Mitigation Controls:</strong></p><p class='text-text-secondary mb-1'>&#9656; Financial model pegged at USD 4,750 (ZAR 87,875) — intrinsically conservative</p><p class='text-text-secondary mb-1'>&#9656; Exceptionally high run-of-mine grades (15 to 25 g/t) provide grade insulation</p><p class='text-text-secondary mb-1'>&#9656; 5% royalty bracket preserved well below USD 5,000 windfall threshold</p><p class='text-text-secondary mb-1'>&#9656; 100% Capital Redemption Allowance (CRA) provides immediate tax shield</p>"
    }
  },
  {
    id: "div-4",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-esg",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Environmental, Social, and Governance (ESG) Risk</h2><p class='text-text-secondary mb-4'>To meet 2026 international best practices, Environmental, Social, and Governance (ESG) compliance is structurally embedded into the Capital Expenditure (CapEx). Capital tranches are explicitly allocated to facilitate concurrent environmental rehabilitation, ensuring strict adherence to environmental laws. Mandated features of the new 500 tonnes per day (tpd) Carbon-in-Leach (CIL) plant will include closed-loop water recycling systems within the wash circuits to minimise ecological impact, ensure water security, and lower the overall carbon footprint of the extraction process. Furthermore, community consent-building and social impact are formalised through transparent stakeholder communication plans, fostering long-term trust and mitigating any localized disruption risks.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>Mitigation Controls:</strong></p><p class='text-text-secondary mb-1'>&#9656; Closed-loop water recycling systems within CIL wash circuits</p><p class='text-text-secondary mb-1'>&#9656; Minimised ecological impact and enhanced water security</p><p class='text-text-secondary mb-1'>&#9656; Reduced overall carbon footprint of the extraction process</p><p class='text-text-secondary mb-1'>&#9656; Community consent-building and social impact formalised through stakeholder plans</p><p class='text-text-secondary mb-1'>&#9656; Transparent communication to foster long-term trust and mitigate localised disruption</p>"
    }
  }
]

export default function RiskMatrixPage() {
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
      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map(block => <BlockRenderer key={block.id} block={block} />)}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
