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
      text: "<span class='badge badge-gold'>Investment Dossier</span><span class='badge badge-warning ml-2'>Risk Matrix</span><h1 class='text-gold font-display font-black mb-3 text-4xl mt-4'>Risk Matrix</h1>"
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
    props: { text: "<p class='text-text-secondary'>Identification and mitigation strategies for operational, financial, and sovereign risks.</p>" }
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
