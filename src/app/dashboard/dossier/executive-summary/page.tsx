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
    id: "team-title",
    type: "TextBlock",
    props: { text: "<h2 class='text-xl font-display font-bold text-gold mb-4 mt-8'>The Team</h2><p class='text-text-secondary text-sm max-w-2xl'>Socinga Africa's executive team brings together decades of experience across mining, finance, legal, technology, and corporate governance.</p>" }
  },
  {
    id: "team-1",
    type: "TeamMemberCard",
    props: { name: "Jabulile Dladla", title: "Managing Director", role: "Strategic leadership and corporate governance across all Socinga entities.", initials: "JD", bgColour: "#0A1128" }
  },
  {
    id: "team-2",
    type: "TeamMemberCard",
    props: { name: "Michael Dotsey", title: "Chief Financial Officer", role: "Financial oversight, investment structuring, and capital deployment.", initials: "MD", bgColour: "#0A1128" }
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
    <div className="space-y-4 max-w-6xl pb-32">
      {editingMode && (
        <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />
      )}
      
      <CmsProvider>
        {blocks.map(block => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </CmsProvider>

      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
