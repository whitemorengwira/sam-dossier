'use client'

import React, { useEffect, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FileText, FilePdf } from '@phosphor-icons/react'

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
    <Tabs orientation="vertical" defaultValue="summary" className="w-full flex flex-col md:flex-row gap-6 min-h-[85vh] pb-10">
      <div className="w-full md:w-64 shrink-0">
        <TabsList className="flex flex-col h-auto w-full bg-onyx-light border border-gold/20 p-2 items-stretch gap-2">
          <TabsTrigger value="summary" className="data-[state=active]:bg-gold data-[state=active]:text-onyx justify-start px-4 py-3 h-auto rounded">
            <span className="flex items-center gap-3 font-mono font-bold text-sm"><FileText size={20} /> Executive Summary</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="data-[state=active]:bg-gold data-[state=active]:text-onyx justify-start px-4 py-3 h-auto text-left rounded">
            <span className="flex items-center gap-3 font-mono font-bold text-sm"><FilePdf size={20} className="shrink-0" /> Chikonga Mine Profile</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 min-w-0">
        <TabsContent value="summary" className="mt-0 h-full">
          <div className="space-y-4 max-w-4xl pb-32">
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
        </TabsContent>

        <TabsContent value="pdf" className="mt-0 h-[calc(100vh-150px)] min-h-[800px] border border-gold/20 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
          <iframe 
            src="https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/Chikonga%20Mine%20Profile.pdf#toolbar=1&navpanes=0&scrollbar=1&zoom=100" 
            className="w-full h-full border-none"
            title="Chikonga Mine Profile PDF"
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}
