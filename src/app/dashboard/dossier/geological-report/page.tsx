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

const PAGE_SLUG = 'geological-report'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-corridor",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Structural Corridor</h2>"
    }
  },
  {
    id: "table-corridor",
    type: "RichTable",
    props: {
      columns: ["Parameter", "Value"],
      rows: [
        ["Corridor Width", "350 metres"],
        ["Strike Length", "800+ metres"],
        ["Reef Type", "Parallel Narrow Reefs"],
        ["Dip Geometry", "Steeply Dipping"]
      ]
    }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-harrison",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Historical Assay (Harrison)</h2>"
    }
  },
  {
    id: "table-harrison",
    type: "RichTable",
    props: {
      columns: ["Year", "Zone", "Grade (g/t)"],
      rows: [
        ["1972", "Reef A", "11.2"],
        ["1972", "Reef B", "1.6"],
        ["1972", "Reef C", "2.8"],
        ["1975", "Reef D", "1.9"],
        ["1975", "Reef E", "7.1"]
      ]
    }
  },
  {
    id: "div-3",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-production",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Recent Production Assay</h2>"
    }
  },
  {
    id: "table-production",
    type: "RichTable",
    props: {
      columns: ["Year", "Operator", "Avg Grade (g/t)"],
      rows: [
        ["2019", "Hilltouch", "15.0"],
        ["2020", "Hilltouch", "18.0"],
        ["2021", "Hilltouch", "25.0"]
      ]
    }
  },
  {
    id: "div-4",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-location",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Location and Regional Geology</h2><p class='text-text-secondary mb-4'>The Chikonga Mine is strategically located exactly 20 kilometres (km) from the Mutare Central Business District (CBD) in Manicaland, Zimbabwe. The asset sits on a sprawling 45-hectare footprint comprising four distinctly registered claims, each covering 10 hectares. Geologically, the property is situated within the highly prolific Mutare Greenstone Belt.</p><p class='text-text-secondary mb-4'>Lode gold deposits within this specific greenstone architecture are typically concentrated within fractures and shear zones along brittle-ductile second-order faults. At the Chikonga site, mining operations are presently conducted on multiple, steeply dipping, parallel narrow reefs. These shear zones are stacked across a massive structural corridor that spans approximately 350 metres in width and extends laterally for over 800 metres.</p><p class='text-text-secondary mb-4'>The mineralised reefs themselves manifest as siliceous mica schist and silicified andesite, hosting distinct bands of fine-grained grey and black quartz heavily impregnated with disseminated sulphides, including pyrrhotite, pyrite, arsenopyrite, chalcopyrite, and native gold.</p>"
    }
  },
  {
    id: "div-5",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-grades",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Exceptional Run-of-Mine Grades and Historical Tailings</h2><p class='text-text-secondary mb-4'>The primary driver of the expansion&apos;s financial feasibility is the exceptionally high run-of-mine grade consistently extracted from the Chikonga shear zones. Verified operational data demonstrates that the run-of-mine gold grades at Chikonga averaged 15 grammes per tonne (g/t) in 2019, escalated to 18 grammes per tonne (g/t) in 2020, and reached an extraordinary 25 grammes per tonne (g/t) in 2021.</p><p class='text-text-secondary mb-4'>Furthermore, a historical geological survey conducted by the Regional Geologist of the Geological Survey of Rhodesia in 1974 reported on an underground winze intersection that revealed a &quot;strong wide band of pale grey rock.&quot; Despite containing no visible quartz or sulphides, this wall-rock assay returned a grade of 5 grammes per tonne (g/t) gold. This indicates that the mineralisation extends significantly beyond the visible quartz veins into the surrounding host rock, presenting a vast, unexploited tonnage opportunity.</p><p class='text-text-secondary mb-4'>Equally compelling is the data regarding the site&apos;s historical waste materials. Limited sampling of the existing tailings dumps at the Chikonga Mine indicates a retained average grade of 15 grammes per tonne (g/t) gold. The reprocessing of these 15 grammes per tonne (g/t) tailings alone, fed directly into the new Carbon-in-Leach (CIL) plant, provides an immediate, low-cost revenue stream that bypasses the expenses associated with underground drilling and blasting.</p>"
    }
  },
  {
    id: "div-6",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-modelling",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Data-Driven Resource Modelling</h2><p class='text-text-secondary mb-4'>To align with 2026 international best practices, the expansion will heavily utilise Geographic Information System (GIS) tools and remote sensing data to construct 3D prospectivity visuals of the ore body. This integration of big data drastically reduces site uncertainty before precision blasting occurs, ensuring the mechanised stoping efficiently intercepts the 15 to 25 grammes per tonne (g/t) pay zones.</p><p class='text-text-secondary mb-4'><strong class='text-gold'>Note on Meng Xi Prospects:</strong> The technical parameters applied at Chikonga are derived from the same geological methodologies utilised in the Meng Xi Trenching and Sampling reports, ensuring institutional-grade data integrity across the Socinga portfolio.</p>"
    }
  }
]

export default function GeologicalReportPage() {
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
        theme="geological"
        badge="Geological Report"
        badgeVariant="badge badge-info"
        title={<>Geological <span className="text-gold">Report</span></>}
        subtitle="The fundamental viability of any mining expansion is inextricably linked to the quality, scale, and proven consistency of the underlying geological resource. The Chikonga Mine profile presents a compelling empirical case for aggressive capital deployment, supported by decades of historical production and recent high-yield assay verification."
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
