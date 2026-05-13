'use client'

import { toast } from 'sonner'
import React, { useEffect, useRef, useState } from 'react'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { getDossierDocs, addDossierDoc, removeDossierDoc, DossierDoc } from '@/lib/actions/dossierDocsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'
import { createClient } from '@/lib/supabase/client'

const PAGE_SLUG = 'executive-summary'

// Hardcoded foundation documents (always present, cannot be removed)
const FOUNDATION_DOCS: DossierDoc[] = [
  {
    id: 'chikonga-profile',
    label: 'Chikonga Mine Profile',
    subtitle: '27-page technical report',
    url: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/Chikonga%20Mine%20Profile.pdf',
    uploadedBy: 'System',
    uploadedAt: '',
  },
  {
    id: 'hilltouch-letter',
    label: 'Hilltouch Invitation Letter',
    subtitle: 'Socinga Mining — verified',
    url: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/HILLTOUCH%20INVITATION%20LETTER%20SOCINGA%20MINING.pdf',
    uploadedBy: 'System',
    uploadedAt: '',
  },
]

// ─── Document Viewer ──────────────────────────────────────────────────────────

function DocumentViewer({ docs, canManage, onRemove }: {
  docs: DossierDoc[]
  canManage: boolean
  onRemove: (id: string) => void
}) {
  const allDocs = [...FOUNDATION_DOCS, ...docs]
  const [activeId, setActiveId] = useState(allDocs[0].id)
  const active = allDocs.find(d => d.id === activeId) ?? allDocs[0]

  // If the active tab was removed, fall back to first
  useEffect(() => {
    if (!allDocs.find(d => d.id === activeId)) {
      setActiveId(allDocs[0].id)
    }
  }, [allDocs, activeId])

  const isFoundation = FOUNDATION_DOCS.some(d => d.id === active.id)

  return (
    <div className="mt-10 border border-gold/20 rounded-xl overflow-hidden shadow-2xl bg-[#0d1117]">
      {/* Tab bar */}
      <div className="flex items-stretch border-b border-gold/15 bg-[#0a0e14] overflow-x-auto">
        {allDocs.map((doc) => {
          const isActive = doc.id === activeId
          const isUploaded = !FOUNDATION_DOCS.some(d => d.id === doc.id)
          return (
            <button
              key={doc.id}
              onClick={() => setActiveId(doc.id)}
              className={`flex items-center gap-2.5 px-5 py-3.5 text-left transition-all duration-200 border-r border-gold/10 shrink-0 group relative ${
                isActive
                  ? 'bg-[#0d1117] border-b-2 border-b-gold'
                  : 'hover:bg-white/5'
              }`}
              style={{ marginBottom: isActive ? '-1px' : '0' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 shrink-0 ${isActive ? 'text-gold' : 'text-text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="min-w-0">
                <p className={`font-display font-semibold text-xs truncate max-w-[140px] ${isActive ? 'text-gold' : 'text-text-secondary group-hover:text-white'}`}>
                  {doc.label}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5 truncate max-w-[140px]">{doc.subtitle}</p>
              </div>
              {isActive && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
              {/* Remove button for uploaded (non-foundation) docs */}
              {canManage && isUploaded && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); onRemove(doc.id) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRemove(doc.id) } }}
                  className="ml-1 p-0.5 rounded hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove document"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}

        {/* Download */}
        <a
          href={active.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 px-4 py-3.5 text-xs text-text-muted hover:text-gold transition-colors border-l border-gold/10 shrink-0"
          title="Download PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* Uploader badge */}
      {!isFoundation && active.uploadedBy && (
        <div className="px-5 py-2 bg-gold/5 border-b border-gold/10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[11px] text-text-muted">
            Uploaded by <span className="text-gold/80">{active.uploadedBy}</span>
            {active.uploadedAt && (
              <> · {new Date(active.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</>
            )}
          </span>
        </div>
      )}

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

// ─── Upload Panel ─────────────────────────────────────────────────────────────

const WORKSPACE_ID = 'temp-workspace-id'

interface UploadingFile {
  id: string
  name: string
  size: number
  progress: number
  status: 'uploading' | 'done' | 'error'
  error?: string
  publicUrl?: string
}

function UploadPanel({ onDocAdded }: { onDocAdded: (doc: DossierDoc) => void }) {
  const [open, setOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<UploadingFile[]>([])
  const [label, setLabel] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return
    const file = incoming[0] // one file at a time for simplicity
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are supported here')
      return
    }
    if (!label.trim()) {
      toast.error('Please enter a document name first')
      return
    }
    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    const uid = crypto.randomUUID()
    const entry: UploadingFile = { id: uid, name: file.name, size: file.size, progress: 0, status: 'uploading' }
    setFiles(prev => [...prev, entry])

    try {
      // 1. Get signed URL
      const res = await fetch('/api/upload/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          workspaceId: WORKSPACE_ID,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Could not get upload URL')
      }

      const { signedUrl, storagePath } = await res.json()
      setFiles(prev => prev.map(f => f.id === uid ? { ...f, progress: 10 } : f))

      // 2. PUT directly to R2
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const p = Math.round(10 + (e.loaded / e.total) * 80)
            setFiles(prev => prev.map(f => f.id === uid ? { ...f, progress: p } : f))
          }
        })
        xhr.addEventListener('load', () => xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)))
        xhr.addEventListener('error', () => reject(new Error('Network error')))
        xhr.open('PUT', signedUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

      setFiles(prev => prev.map(f => f.id === uid ? { ...f, progress: 95 } : f))

      // 3. Build public URL from the storage path
      const publicBase = process.env.NEXT_PUBLIC_GLOBAL_R2_URL || 'https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev'
      const publicUrl = `${publicBase}/${storagePath}`

      // 4. Persist to dossier docs list
      const newDoc: Omit<DossierDoc, 'uploadedBy' | 'uploadedAt'> = {
        id: uid,
        label: label.trim(),
        subtitle: subtitle.trim() || file.name,
        url: publicUrl,
      }

      const updated = await addDossierDoc(newDoc)
      const saved = updated.find(d => d.id === uid)
      if (saved) onDocAdded(saved)

      setFiles(prev => prev.map(f => f.id === uid ? { ...f, progress: 100, status: 'done', publicUrl } : f))
      toast.success(`"${label}" uploaded and added to documents`)
      setLabel('')
      setSubtitle('')

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setFiles(prev => prev.map(f => f.id === uid ? { ...f, status: 'error', error: msg } : f))
      toast.error(msg)
    }
  }

  const clearDone = () => setFiles(prev => prev.filter(f => f.status === 'uploading'))

  return (
    <div className="mt-6">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold/20 bg-gold/5 hover:bg-gold/10 text-gold text-sm font-display font-semibold transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${open ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {open ? 'Close Upload Panel' : 'Upload Document'}
      </button>

      {open && (
        <div className="mt-4 border border-gold/15 rounded-xl bg-[#0a0e14] overflow-hidden">
          <div className="px-5 py-4 border-b border-gold/10">
            <h3 className="text-gold font-display font-bold text-sm">Add Document to Dossier</h3>
            <p className="text-text-muted text-xs mt-0.5">Upload a PDF — it will appear as a new tab in the document viewer above.</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Metadata fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Document Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  placeholder="e.g. Environmental Impact Report"
                  className="w-full bg-white/5 border border-gold/15 rounded-lg px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-medium">Subtitle / Description</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="e.g. Q1 2026 — verified"
                  className="w-full bg-white/5 border border-gold/15 rounded-lg px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false) }}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
              onClick={() => inputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-3 py-10 px-6 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 ${
                dragging
                  ? 'border-gold bg-gold/10'
                  : 'border-gold/20 hover:border-gold/40 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 ${dragging ? 'text-gold' : 'text-text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-center">
                <p className={`text-sm font-medium ${dragging ? 'text-gold' : 'text-text-secondary'}`}>
                  {dragging ? 'Drop PDF here' : 'Drag & drop a PDF, or click to browse'}
                </p>
                <p className="text-xs text-text-muted mt-1">PDF files only · Max 100 MB</p>
              </div>
            </div>

            {/* Upload queue */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map(f => (
                  <div key={f.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-white truncate">{f.name}</p>
                        <span className={`text-[10px] ml-2 shrink-0 ${f.status === 'done' ? 'text-emerald-400' : f.status === 'error' ? 'text-red-400' : 'text-text-muted'}`}>
                          {f.status === 'done' ? 'Done' : f.status === 'error' ? 'Failed' : `${f.progress}%`}
                        </span>
                      </div>
                      {f.status === 'uploading' && (
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full transition-all duration-300"
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                      )}
                      {f.status === 'error' && <p className="text-[10px] text-red-400">{f.error}</p>}
                    </div>
                  </div>
                ))}
                {files.some(f => f.status !== 'uploading') && (
                  <button onClick={clearDone} className="text-[11px] text-text-muted hover:text-white transition-colors">
                    Clear completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Fallback CMS Blocks ──────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExecutiveSummaryPage() {
  const { blocks, setBlocks, clearHistory } = useCmsStore()
  const [loading, setLoading] = useState(true)
  const [editingMode, setEditingMode] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<DossierDoc[]>([])
  const [userRole, setUserRole] = useState<string>('viewer')

  // Detect edit mode
  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)
    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  // Get user role for upload gating
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'viewer'
        // Auto-elevate the system admin
        if (session.user.email === 'hello@nwhite.systems') setUserRole('admin')
        else setUserRole(role)
      }
    })
  }, [])

  // Load CMS blocks + uploaded docs
  useEffect(() => {
    async function init() {
      try {
        const [latest, savedDocs] = await Promise.all([
          getLatestPageVersion(PAGE_SLUG),
          getDossierDocs(),
        ])
        if (latest?.content_json?.length > 0) setBlocks(latest.content_json)
        else setBlocks(FALLBACK_BLOCKS)
        setUploadedDocs(savedDocs)
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
    if (confirm('Discard unsaved changes?')) window.location.reload()
  }

  const handleDocAdded = (doc: DossierDoc) => {
    setUploadedDocs(prev => [...prev, doc])
  }

  const handleDocRemoved = async (id: string) => {
    if (!confirm('Remove this document from the dossier?')) return
    try {
      const updated = await removeDossierDoc(id)
      setUploadedDocs(updated)
      toast.success('Document removed')
    } catch {
      toast.error('Failed to remove document')
    }
  }

  const canManage = userRole === 'admin' || userRole === 'team'

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

      {/* Tabbed document viewer */}
      <DocumentViewer
        docs={uploadedDocs}
        canManage={canManage}
        onRemove={handleDocRemoved}
      />

      {/* Upload panel — only shown to admin/team */}
      {canManage && (
        <UploadPanel onDocAdded={handleDocAdded} />
      )}

      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
