'use client'

import React, { useEffect, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'

const PAGE_SLUG = 'chikonga-profile'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "hero",
    type: "TextBlock",
    props: {
      text: "<span class='badge badge-gold'>Investment Dossier</span><span class='badge badge-info ml-2'>Mine Profile</span><h1 class='text-gold font-display font-black mb-3 text-4xl mt-4'>Chikonga Mine Profile</h1><p class='text-text-secondary text-lg font-heading italic max-w-2xl'>Hilltouch Investments (Pvt) Ltd - Mutare, Manicaland Province, Zimbabwe</p>"
    }
  },
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "text-1",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Introduction</h2><p class='text-text-secondary leading-relaxed mb-4'>Chikonga mine is located within the Mutasa District about 40 km NE of the city of Mutare. It covers an area equivalent to 45 hectares of land. The mining property is locally owned by Hilltouch investments...</p>"
    }
  },
  {
    id: "text-2",
    type: "TextBlock",
    props: {
      text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Geological History, Characteristics and Mineralisation</h2><p class='text-text-secondary leading-relaxed mb-4'>The first ancient reference to the Chikonga Mine was in a report by geologist N. M. Harrison who examined the property on behalf of the Geological Survey of Rhodesia in 1972...</p>"
    }
  },
  {
    id: "table-1",
    type: "RichTable",
    props: {
      data: [
        ["Location", "Grade", "Width"],
        ["Start + 7m", "10 g/t", "80 cm"],
        ["+ 8m", "30 g/t", "120 cm"],
        ["+10m", "25.4 g/t", "146 cm (NFE)"]
      ]
    }
  }
]

export default function ChikongaProfilePage() {
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
    const label = prompt('Enter an optional label for this version:') || undefined
    await savePageVersion(PAGE_SLUG, blocks, label)
    clearHistory()
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
