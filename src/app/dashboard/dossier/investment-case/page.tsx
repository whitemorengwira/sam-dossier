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

const PAGE_SLUG = 'investment-case'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "metrics-1",
    type: "RichTable",
    props: {
      columns: ["Metric", "Value", "Detail"],
      rows: [
        ["Capital Injection", "ZAR 250M", "USD 13,513,513"],
        ["Baseline Gold Price", "USD 4,750", "Per Troy Ounce"],
        ["Royalty Rate", "5%", "Within USD 1,200–5,000/oz"],
        ["Capital Redemption", "100%", "Allowance (CRA)"],
        ["Production Target", "15 KG/mo", "From current 5 KG/month"],
        ["Profit Split", "60/40", "Investor / Socinga"]
      ]
    }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-rationale",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>The Strategic Rationale</h2><p class='text-text-secondary mb-4'>The strategic rationale underpinning this expansion is rooted in the exceptional, proven metrics of the Chikonga Mine and the robust capital governance framework engineered by Socinga Africa Mining. By transitioning from inefficient stamp-milling and basic cyanidation to modern Carbon-in-Leach (CIL) metallurgy, the operation will not only triple its volumetric output but will also drastically enhance its recovery efficiencies.</p>"
    }
  },
  {
    id: "div-3",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-market",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Market Context and Global Demand Analysis</h2><p class='text-text-secondary mb-4'>In alignment with modern feasibility study requirements, our market analysis confirms the enduring commercial context for gold. As an essential safe-haven asset, gold commands a premium pricing environment that directly influences revenue projections and heavily justifies the financial metrics of the project.</p>"
    }
  },
  {
    id: "div-4",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-macro",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Macroeconomic and Fiscal Feasibility</h2><p class='text-text-secondary mb-4'>The financial architecture of this expansion must be meticulously stress-tested against the prevailing macroeconomic environment and the specific statutory fiscal policies enforced by the Government of Zimbabwe. The commercial viability of the ZAR 250,000,000 (USD 13,513,513) investment is heavily insulated by current global commodity dynamics, yet requires sophisticated navigation of domestic taxation.</p>"
    }
  },
  {
    id: "div-5",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-pillar1",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Three Pillars of Financial Insulation</h2><h3 class='text-lg font-display font-bold mb-3'><span class='text-gold'>01</span> — Gold Price Macroeconomics</h3><p class='text-text-secondary mb-4'>For the purposes of this highly conservative financial model, the baseline gold price is assumed at exactly USD 4,750 (ZAR 87,875) per troy ounce. By locking the model at this rate, the feasibility study builds in an intrinsic margin of safety, ensuring that the 15 kilogrammes (kg) per month target generates robust cash flows even during minor cyclical market corrections.</p>"
    }
  },
  {
    id: "text-pillar2",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold mb-3'><span class='text-gold'>02</span> — The 5 Per Cent (5%) Royalty Framework</h3><p class='text-text-secondary mb-4'>Under the legally enacted framework applicable to this model, large-scale gold producers are subject to a 5 per cent (5%) royalty rate for gold prices ranging between USD 1,200 (ZAR 22,200) and USD 5,000 (ZAR 92,500) per ounce. The aggressive 10 per cent (10%) windfall royalty is strictly triggered only when the global spot price exceeds the USD 5,000 (ZAR 92,500) threshold. Because our financial model assumes a steady-state commodity price of USD 4,750 (ZAR 87,875) per ounce, the operation fits perfectly within the 5 per cent (5%) royalty bracket, preserving millions in gross revenue annually and shielding the investor&apos;s free cash flow from excessive sovereign taxation.</p>"
    }
  },
  {
    id: "text-pillar3",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-lg font-display font-bold mb-3'><span class='text-gold'>03</span> — The 100% Capital Redemption Allowance (CRA)</h3><p class='text-text-secondary mb-4'>In assessing the profitability of capital-intensive mining expansions, the treatment of Capital Expenditure (CapEx) against corporate income tax is the most critical variable. Zimbabwe&apos;s Income Tax Act allows mining companies to claim a 100 per cent (100%) Capital Redemption Allowance (CRA) on a &quot;New Mine Basis&quot;. Following recent intense industry advocacy, the Government of Zimbabwe confirmed the preservation of this 100 per cent (100%) upfront deduction for 2026, withdrawing previous proposals that would have forced life-of-mine amortisation. This statutory mechanism functions as a massive, immediate tax shield, legally deferring corporate income tax and allowing the operation to direct all available liquidity toward the rapid repayment of the investor&apos;s ZAR 250,000,000 (USD 13,513,513) principal.</p>"
    }
  }
]

export default function InvestmentCasePage() {
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
        theme="investment"
        badge="Investment Case"
        badgeVariant="badge badge-success"
        title={<>Strategic Rationale &amp; <span className="text-gold">Market Context</span></>}
        subtitle="The strategic rationale underpinning this expansion is rooted in the exceptional, proven metrics of the Chikonga Mine and the robust capital governance framework engineered by Socinga Africa Mining."
      />

      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map((block, i) => (
          <ScrollReveal key={block.id} delay={i * 80}>
            <BlockRenderer block={block} />
          </ScrollReveal>
        ))}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
