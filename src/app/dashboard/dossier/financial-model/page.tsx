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

const PAGE_SLUG = 'financial-model'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-waterfall",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>The Capital Repayment Waterfall (Order of Priority)</h2><p class='text-text-secondary mb-3'><strong class='text-gold'>P1 — Operating Expenditure (OpEx) &amp; Statutory Taxes/Royalties:</strong> Sustaining the physical integrity and legal standing of the mine.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>P2 — 20 Per Cent (20%) Senior Debt Interest:</strong> Compensating the investor for the time value of money.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>P3 — Investor&apos;s Capital Repayment (Principal):</strong> 100 per cent (100%) of the remaining free cash flow is aggressively swept directly against the outstanding ZAR 250,000,000 (USD 13,513,513) principal balance.</p><p class='text-text-secondary mb-3'><strong class='text-gold'>P4 — The 60/40 Profit Split:</strong> Only after Priorities 1, 2, and 3 are satisfied does the Net Distributable Profit split 60 per cent (60%) to the investor and 40 per cent (40%) to Socinga Africa Mining.</p>"
    }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-payback",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Practical Payback Timeline and Post-Payback Equity Yield</h2><p class='text-text-secondary mb-4'>To ensure absolute clarity regarding the investment mechanics, the following details the exact timeline regarding how much capital is paid back, when the Return on Investment (ROI) kicks in, and what happens to the capital and profits thereafter:</p><p class='text-text-secondary mb-3'><strong>When does the ROI kick in?</strong> The Return on Investment (ROI) kicks in immediately during Year 1. While the plant is being commissioned, the investor receives exactly ZAR 50,000,000 (USD 2,702,702.60) in pure interest yields paid out of the first available operational cash flows. Simultaneously, the aggressive cash sweep begins paying down the principal balance.</p><p class='text-text-secondary mb-3'><strong>How much is paid back, and after how long?</strong> The entire ZAR 250,000,000 (USD 13,513,513) principal is paid back in full in under 24 months (by the end of Year 2). In Year 1, the priority cash sweep repays ZAR 139,142,126.88 (USD 7,521,196.15) of the original principal. In Year 2, the remaining principal balance of ZAR 110,857,873.12 (USD 5,992,316.85) is completely cleared.</p><p class='text-text-secondary mb-3'><strong>What happens after full repayment?</strong> Once the ZAR 250,000,000 (USD 13,513,513) is fully returned to the investor at the end of Year 2, the debt is considered completely extinguished. The 20 per cent (20%) interest payments cease because there is no longer any outstanding principal to levy interest against. At this pivotal moment, the investor practically holds a risk-free asset. For the entire remaining Life of Mine (LoM), the massive free cash flows transition into the pure equity phase. The investor receives 60 per cent (60%) of all remaining Net Distributable Profit in perpetuity, delivering staggering unencumbered yields (as demonstrated in the Year 3 matrix below).</p>"
    }
  },
  {
    id: "div-3",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-assumptions",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Return on Investment (ROI) Matrix</h2><h3 class='text-lg font-display font-bold mb-3'>Base Assumptions</h3>"
    }
  },
  {
    id: "table-assumptions",
    type: "RichTable",
    props: {
      columns: ["Parameter", "Value"],
      rows: [
        ["Gold Price", "USD 4,750.00 (ZAR 87,875.00)"],
        ["Target Production (15 kg/month)", "482.26 oz/month — 5,787.12 oz/annum"],
        ["Estimated OpEx", "USD 1,200.00 (ZAR 22,200.00) per ounce"]
      ]
    }
  },
  {
    id: "div-4",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-y1-label",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3'>Year 1: Plant Commissioning and Ramp-Up (8 kg/month average)</h3>"
    }
  },
  {
    id: "table-y1",
    type: "RichTable",
    props: {
      columns: ["Metric", "USD", "ZAR"],
      rows: [
        ["Gross Revenue (3,086.46 oz × Price)", "USD 14,660,685.00", "ZAR 271,222,672.50"],
        ["Priority 1: OpEx & Royalties", "(USD 4,436,786.25)", "(ZAR 82,080,545.63)"],
        ["Priority 2: 20% Interest Paid to Investor", "(USD 2,702,702.60)", "(ZAR 50,000,000.00)"],
        ["Priority 3: Principal Repayment Swept", "(USD 7,521,196.15)", "(ZAR 139,142,126.88)"],
        ["Outstanding Capital Balance → Year 2", "USD 5,992,316.85", "ZAR 110,857,873.12"]
      ]
    }
  },
  {
    id: "div-5",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-y2-label",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3'>Year 2: Steady State 15 kg/month and Final Payback</h3>"
    }
  },
  {
    id: "table-y2",
    type: "RichTable",
    props: {
      columns: ["Metric", "USD", "ZAR"],
      rows: [
        ["Gross Revenue (5,787.12 oz × Price)", "USD 27,488,820.00", "ZAR 508,543,170.00"],
        ["Priority 1: OpEx & Royalties", "(USD 8,318,985.00)", "(ZAR 153,901,222.50)"],
        ["Priority 2: 20% Interest on Remaining Principal", "(USD 1,198,463.37)", "(ZAR 22,171,574.62)"],
        ["Priority 3: Final Principal Repayment Swept", "(USD 5,992,316.85)", "(ZAR 110,857,873.12)"],
        ["Net Distributable Profit Available for Split", "USD 11,979,054.78", "ZAR 221,612,499.76"],
        ["Priority 4: Investor Share (60%)", "USD 7,187,432.87", "ZAR 132,967,499.85"],
        ["Priority 4: Socinga Share (40%)", "USD 4,791,621.91", "ZAR 88,644,999.91"]
      ]
    }
  },
  {
    id: "div-6",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-y3-label",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold text-gold mb-3'>Year 3: Post-Payback Pure Equity Yield (Debt Extinguished)</h3>"
    }
  },
  {
    id: "table-y3",
    type: "RichTable",
    props: {
      columns: ["Metric", "USD", "ZAR"],
      rows: [
        ["Gross Revenue (5,787.12 oz × Price)", "USD 27,488,820.00", "ZAR 508,543,170.00"],
        ["Priority 1: OpEx & Royalties", "(USD 8,318,985.00)", "(ZAR 153,901,222.50)"],
        ["Net Distributable Profit Available for Split", "USD 19,169,835.00", "ZAR 354,641,947.50"],
        ["Priority 4: Investor Share (60%)", "USD 11,501,901.00", "ZAR 212,785,168.50"],
        ["Priority 4: Socinga Share (40%)", "USD 7,667,934.00", "ZAR 141,856,779.00"]
      ]
    }
  },
  {
    id: "div-7",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-sensitivity",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Sensitivity Analysis &amp; Risk-Adjusted Projections</h2><p class='text-text-secondary mb-4'>In accordance with international financial evaluation standards, these models include sensitivity testing against operational variations. By utilising a highly conservative Operating Expenditure (OpEx) benchmark and a discounted gold price, the Internal Rate of Return (IRR) remains fiercely robust, ensuring that the targeted capital is defended against minor market fluctuations.</p>"
    }
  }
]

export default function FinancialModelPage() {
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
        theme="financial"
        badge="Financial Model"
        badgeVariant="badge badge-info"
        title={<>Capital Deployment &amp; <span className="text-gold">ROI Matrix</span></>}
        subtitle="The deployment of ZAR 250,000,000 (USD 13,513,513) is governed by a legally binding, mathematically precise Capital Repayment Waterfall. This framework dictates the exact chronological priority in which revenues generated from the 15 kilogrammes (kg) per month output are distributed, ensuring the unconditional protection of the investor's principal and the systematic execution of the Production-Sharing Agreement (PSA)."
      />

      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map((block, i) => (
          <ScrollReveal key={block.id} delay={i * 60}>
            <BlockRenderer block={block} />
          </ScrollReveal>
        ))}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
