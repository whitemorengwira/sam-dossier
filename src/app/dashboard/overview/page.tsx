'use client'

import React, { useEffect, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'

const PAGE_SLUG = 'overview'

const FALLBACK_BLOCKS: BlockData[] = [
  {
    id: "hero",
    type: "TextBlock",
    props: {
      text: "<span class='badge badge-gold'>Live Dashboard</span><h1 class='text-gold font-display font-black text-4xl lg:text-5xl tracking-tight mb-2 mt-2'>CHIKONGA MINE</h1><p class='text-text-secondary font-heading text-xl italic'>Manicaland Province, Zimbabwe</p>"
    }
  },
  {
    id: "stats",
    type: "TextBlock",
    props: {
      text: "<div class='grid grid-cols-3 gap-4 mt-8'><div class='text-center'><p class='text-3xl font-mono font-bold text-gold'>5 KG</p><p class='text-text-muted text-xs uppercase tracking-widest mt-1'>Current Output</p></div><div class='text-center'><p class='text-3xl font-mono font-bold text-gold'>15+ KG</p><p class='text-text-muted text-xs uppercase tracking-widest mt-1'>Target Output</p></div><div class='text-center'><p class='text-3xl font-mono font-bold text-gold'>R500M</p><p class='text-text-muted text-xs uppercase tracking-widest mt-1'>Required Investment</p></div></div>"
    }
  },
  {
    id: "div-1",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "metrics-title",
    type: "TextBlock",
    props: { text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Key Metrics</h2>" }
  },
  {
    id: "metrics-1",
    type: "StatCard",
    props: { label: "Gold Price Today", value: "~$3,200/oz", trend: "", bgColour: "rgba(10,17,40,0.5)", borderColour: "rgba(212,175,55,0.2)" }
  },
  {
    id: "metrics-2",
    type: "StatCard",
    props: { label: "Current Revenue", value: "~$514,400", trend: "", bgColour: "rgba(10,17,40,0.5)", borderColour: "rgba(212,175,55,0.2)" }
  },
  {
    id: "metrics-3",
    type: "StatCard",
    props: { label: "Target Revenue", value: "~$1,543,200", trend: "Projected", bgColour: "rgba(10,17,40,0.5)", borderColour: "rgba(212,175,55,0.2)" }
  },
  {
    id: "div-2",
    type: "Divider",
    props: { style: "solid", colour: "rgba(212,175,55,0.25)" }
  },
  {
    id: "quick-access",
    type: "TextBlock",
    props: { text: "<h2 class='text-xl font-display font-bold text-gold mb-4'>Quick Access</h2><p class='text-text-secondary mb-2'><a href='/dashboard/dossier/executive-summary' class='text-gold hover:underline'>Investment Dossier</a> - Complete investment thesis, financials, and mine profile.</p><p class='text-text-secondary mb-2'><a href='/dashboard/workspace/boards' class='text-info hover:underline'>Project Boards</a> - Task management and Kanban boards.</p><p class='text-text-secondary mb-2'><a href='/dashboard/documents' class='text-success hover:underline'>Document Vault</a> - Legal documents, agreements, and eSignature workflows.</p><p class='text-text-secondary mb-2'><a href='/dashboard/spreadsheets/budget' class='text-purple-500 hover:underline'>Spreadsheets</a> - Budget breakdown, cash flow models, and ore grade data.</p>" }
  }
]

export default function OverviewPage() {
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

  if (loading) return <div className="text-center p-20 text-text-muted animate-pulse font-mono">Loading dashboard...</div>

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
