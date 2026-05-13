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

const PAGE_SLUG = 'launch-2027'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "hero",
    type: "TextBlock",
    props: {
      text: "<span class='badge badge-gold'>2027 Launch</span><h1 class='text-gold font-display font-black text-3xl mb-2 mt-4'>Launch Workspace</h1><p class='text-text-muted text-sm'>Socinga Africa Official Launch Planning Workspace</p>"
    }
  },
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "progress",
    type: "TextBlock",
    props: {
      text: "<h3 class='text-text-primary font-body font-semibold text-sm mb-3'>Overall Launch Readiness (Target: Q1 2027)</h3><div class='w-full h-3 bg-navy-light overflow-hidden mb-2'><div class='h-full bg-gradient-to-r from-gold to-gold-light' style='width: 32%'></div></div><p class='text-gold font-mono text-sm font-bold'>32% Complete</p>"
    }
  },
  {
    id: "stream-1",
    type: "TextBlock",
    props: { text: "<h4 class='text-text-primary font-body font-semibold text-sm'>Brand Launch Event</h4><span class='badge badge-gold text-[8px] mt-1 mb-2'>Planning</span><p class='text-text-muted text-[11px] leading-relaxed mb-3'>Official Socinga Africa launch event. Venue, invitations, press, and investor showcase.</p><p class='text-gold font-mono text-xs font-bold'>15% Complete</p>" }
  },
  {
    id: "stream-2",
    type: "TextBlock",
    props: { text: "<h4 class='text-text-primary font-body font-semibold text-sm'>Digital Platform Launch</h4><span class='badge badge-gold text-[8px] mt-1 mb-2'>In Progress</span><p class='text-text-muted text-[11px] leading-relaxed mb-3'>SAM Dossier platform, investor portal, and mining intelligence dashboard deployment.</p><p class='text-gold font-mono text-xs font-bold'>65% Complete</p>" }
  },
  {
    id: "stream-3",
    type: "TextBlock",
    props: { text: "<h4 class='text-text-primary font-body font-semibold text-sm'>Mining Operations Go-Live</h4><span class='badge badge-gold text-[8px] mt-1 mb-2'>Pre-Production</span><p class='text-text-muted text-[11px] leading-relaxed mb-3'>Chikonga Mine full mechanisation, CIP plant commissioning, and first commercial gold pour.</p><p class='text-gold font-mono text-xs font-bold'>25% Complete</p>" }
  }
]

export default function Launch2027Page() {
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

  if (loading) return <div className="text-center p-20 text-text-muted animate-pulse font-mono">Loading workspace...</div>

  return (
    <div className="space-y-4 max-w-5xl pb-32">
      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map(block => <BlockRenderer key={block.id} block={block} />)}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
