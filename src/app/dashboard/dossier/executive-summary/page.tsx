'use client'

import React, { useEffect, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'

const PAGE_SLUG = 'executive-summary'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "hero-1",
    type: "TextBlock",
    props: {
      text: "<span class='badge badge-gold mb-4 inline-block'>Investment Dossier</span><h1 class='text-gold font-display font-black mb-3 text-4xl'>Executive Summary</h1><p class='text-text-secondary text-lg font-heading italic max-w-2xl'>Chikonga Mine, Mutare, Manicaland Province, Zimbabwe - A ZAR 500 Million Transformation Opportunity</p>"
    }
  },
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "opp-1",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>The Opportunity</h2><p class='text-text-secondary leading-relaxed mb-4'>Chikonga Mine is a subsidiary of Hilltouch Investments...</p>"
    }
  },
  {
    id: "profile-summary",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Executive Summary</h2><p class='text-text-secondary leading-relaxed mb-4'>Chikonga Mine is a subsidiary of Hilltouch Investments, an indigenous gold mining entity that is wholly owned by its Directors Mr Lufeyi Shato & Mrs Joyce Kujenga. Established in 2005, it has grown in leaps and bounds from humble beginnings to become Manicaland's 3rd largest producer of the yellow mineral.</p><p class='text-text-secondary leading-relaxed mb-4'>Chikonga Mine is located 20km off Mutare CBD along the Mutare-Harare highway. The 45 hectare property is comprised of four 10 hectare registered claims. Improved gold grades averaged 15g/t, 18g/t to 25g/t in 2019, 2020 and 2021 respectively.</p>"
    }
  },
  {
    id: "profile-geology",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Introduction & Geology</h2><p class='text-text-secondary leading-relaxed mb-4'>Geologically the Chikonga mine lies in the Northern part of Mutare and Odzi greenstone belt, which is divided into two arms, the Odzi limb, extending WNE from Odzi centre and the Mutare limb, trending East. Historically underground operations were developed to 2nd level and have been de-watered and channel sampled.</p><p class='text-text-secondary leading-relaxed mb-4'>Mineralized reefs/shear zones occur as siliceous mica schist and silicified andesite typically hosting bands of fine grained grey and black quartz with disseminated pyrrhotite, pyrite, arsenopyrite, chalcopyrite and gold.</p>"
    }
  },
  {
    id: "profile-table",
    type: "RichTable",
    props: {
      data: [
        ["Asset / Metric", "Description", "Details"],
        ["Location", "Mutasa District", "40 km NE of Mutare city"],
        ["Property Size", "45 Hectares", "Four 10 hectare registered claims"],
        ["Gold Grade Averages", "2019 - 2021", "15g/t, 18g/t, up to 25g/t"],
        ["Production Standard", "Cyanidation & Leaching", "Running elution plant producing >1kg gold/month"]
      ]
    }
  }
]

export default function ExecutiveSummaryPage() {
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
        console.error('Failed to load page content', e)
        setBlocks(FALLBACK_BLOCKS)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [setBlocks])

  const handleSave = async () => {
    const label = prompt('Enter an optional label for this version (e.g. "Updated team section"):') || undefined
    await savePageVersion(PAGE_SLUG, blocks, label)
    clearHistory()
  }

  const handleDiscard = () => {
    if (confirm('Discard unsaved changes?')) {
      window.location.reload()
    }
  }

  if (loading) {
    return <div className="text-center p-20 text-text-muted animate-pulse font-mono">Loading dossier content...</div>
  }

  return (
    <div className="space-y-4 max-w-4xl pb-32">
      {editingMode && (
        <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />
      )}
      
      <CmsProvider>
        {blocks.map(block => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </CmsProvider>

      {/* Chikonga Mine Profile PDF */}
      <div className="mt-8 border border-gold/20 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
        <div className="px-5 py-3 bg-onyx-light border-b border-gold/15">
          <h3 className="text-gold font-display font-bold text-sm tracking-wide">Chikonga Mine Profile — Full Document</h3>
        </div>
        <iframe 
          src="https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/Chikonga%20Mine%20Profile.pdf#toolbar=1&navpanes=0&scrollbar=1&zoom=100" 
          className="w-full border-none"
          style={{ height: 'calc(100vh - 200px)', minHeight: '700px' }}
          title="Chikonga Mine Profile PDF"
        />
      </div>

      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}

