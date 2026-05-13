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

const PAGE_SLUG = 'executive-summary'

const DOCUMENTS = [
  {
    id: 'chikonga-profile',
    label: 'Chikonga Mine Profile',
    subtitle: '27-page technical report',
    icon: '⛏',
    url: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/Chikonga%20Mine%20Profile.pdf',
  },
  {
    id: 'hilltouch-letter',
    label: 'Hilltouch Invitation Letter',
    subtitle: 'Socinga Mining — verified',
    icon: '✉',
    url: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/HILLTOUCH%20INVITATION%20LETTER%20SOCINGA%20MINING.pdf',
  },
]

function DocumentViewer() {
  const [activeId, setActiveId] = React.useState(DOCUMENTS[0].id)
  const active = DOCUMENTS.find(d => d.id === activeId)!

  return (
    <div className="mt-10 border border-gold/20 rounded-xl overflow-hidden shadow-2xl bg-[#0d1117]">
      {/* Tab bar */}
      <div className="flex items-stretch border-b border-gold/15 bg-[#0a0e14]">
        {DOCUMENTS.map((doc) => {
          const isActive = doc.id === activeId
          return (
            <button
              key={doc.id}
              onClick={() => setActiveId(doc.id)}
              className={`flex items-center gap-3 px-6 py-4 text-left transition-all duration-200 border-r border-gold/10 last:border-r-0 flex-1 group ${
                isActive
                  ? 'bg-[#0d1117] border-b-2 border-b-gold'
                  : 'hover:bg-white/5'
              }`}
              style={{ marginBottom: isActive ? '-1px' : '0' }}
            >
              <span className="text-xl leading-none">{doc.icon}</span>
              <div className="min-w-0">
                <p className={`font-display font-semibold text-sm truncate ${isActive ? 'text-gold' : 'text-text-secondary group-hover:text-white'}`}>
                  {doc.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5 truncate">{doc.subtitle}</p>
              </div>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              )}
            </button>
          )
        })}
        {/* Download link */}
        <a
          href={active.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-4 text-xs text-text-muted hover:text-gold transition-colors border-l border-gold/10 shrink-0"
          title="Download PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* PDF frame */}
      <iframe
        key={active.id}
        src={`${active.url}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-fit`}
        className="w-full border-none block"
        style={{ height: 'calc(100vh - 180px)', minHeight: '750px' }}
        title={active.label}
      />
    </div>
  )
}

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
    await savePageVersion(PAGE_SLUG, blocks)
    clearHistory()
    toast.success('Page saved successfully')
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

      {/* Document Viewer */}
      <DocumentViewer />

      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}

