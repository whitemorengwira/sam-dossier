'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  MagnifyingGlass, UploadSimple, FilePdf, Eye, Trash,
  SpinnerGap, CheckCircle, File, Crown,
} from '@phosphor-icons/react'
import {
  getKnownBoardChairDocs, loadLocalBoardChairDocs, saveLocalBoardChairDoc, deleteLocalBoardChairDoc,
  BC_CATEGORY_META, BC_STATUS_META,
  type BoardChairDocument,
} from '@/lib/board-chair-documents'
import { getGlobalAssetUrl } from '@/lib/getGlobalAssetUrl'

const PRIVILEGED_ROLES = ['admin', 'team']

export default function BoardChairPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [docs, setDocs] = useState<BoardChairDocument[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkRole() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        const role = user?.user_metadata?.role || ''
        const email = user?.email || ''
        if (PRIVILEGED_ROLES.includes(role) || email === 'hello@nwhite.systems') {
          setAuthorized(true)
        } else {
          setAuthorized(false)
          router.replace('/dashboard/overview')
        }
      } catch {
        setAuthorized(false)
        router.replace('/dashboard/overview')
      }
    }
    checkRole()
  }, [router])

  useEffect(() => {
    if (authorized !== true) return
    const r2 = getKnownBoardChairDocs()
    const local = loadLocalBoardChairDocs()
    setDocs([...local, ...r2])
  }, [authorized])

  const filtered = useMemo(() => {
    if (!search) return docs
    const q = search.toLowerCase()
    return docs.filter(d => d.title.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q))
  }, [docs, search])

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteLocalBoardChairDoc(id)
      setDocs(prev => prev.filter(d => d.id !== id))
    }
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setUploadDone(false)

    try {
      const res = await fetch('/api/received-docs/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
      })
      const resData = await res.json()
      if (resData.error) throw new Error(resData.error)
      const { signedUrl, storagePath, fileName: sanitised } = resData

      if (!signedUrl) throw new Error('Failed to generate secure upload URL.')

      await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })

      const newDoc: BoardChairDocument = {
        id: `bc-local-${Date.now()}`,
        fileName: sanitised || file.name,
        title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
        category: 'other',
        status: 'pending-approval',
        r2Key: storagePath || `sam-dossier/public/board-chair/${file.name}`,
        publicUrl: getGlobalAssetUrl(storagePath || `sam-dossier/public/board-chair/${file.name}`),
        uploadedAt: new Date().toISOString(),
        source: 'local',
      }
      saveLocalBoardChairDoc(newDoc)
      setDocs(prev => [newDoc, ...prev])
      setUploadDone(true)
      setTimeout(() => setUploadDone(false), 3000)
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Upload failed. Please check your R2 credentials and try again.')
    } finally {
      setUploading(false)
    }
  }

  if (authorized === null) return null

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{
            padding: '3px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: "var(--font-mono)", textTransform: 'uppercase',
            letterSpacing: '0.5px', background: 'rgba(212,175,55,0.15)',
            color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)',
          }}>Board Chair</span>
          <span style={{
            padding: '3px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: "var(--font-mono)", textTransform: 'uppercase',
            background: 'rgba(156,39,176,0.15)', color: '#9C27B0',
            border: '1px solid rgba(156,39,176,0.3)',
          }}>Governance</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900,
          color: '#D4AF37', marginBottom: 6, letterSpacing: '-0.5px',
        }}>
          Board Chairperson
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15, color: 'rgba(245,240,232,0.6)',
          maxWidth: 640, lineHeight: 1.6,
        }}>
          Key documents from the Chairperson of Socinga Africa. All resolutions, directives, governance
          documentation, and board minutes are managed and archived here.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(10,17,40,0.5)',
            border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Crown size={24} weight="duotone" style={{ color: '#D4AF37' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5F0E8', fontFamily: 'var(--font-display)' }}>{docs.length}</div>
              <div style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Documents</div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)', marginTop: 20 }} />
      </motion.div>

      {/* Controls */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)',
          padding: '8px 14px', flex: '1 1 300px', maxWidth: 420,
        }}>
          <MagnifyingGlass size={16} style={{ color: '#D4AF37' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search chairperson documents..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 13, width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        <input ref={fileInputRef} type="file" hidden
          accept=".pdf,.html,.htm,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.tiff,.mp4,.mov,.avi,.mkv,.webm,.mp3,.wav,.ogg,.txt"
          onChange={e => { const f = e.target.files?.[0]; if (f) { if (f.size > 100 * 1024 * 1024) { alert('File exceeds the 100 MB limit.'); return; } handleUpload(f); } e.target.value = '' }}
        />

        <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', fontSize: 12, fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            background: 'linear-gradient(135deg, var(--gold), #c4a030)',
            border: 'none', color: '#0A1128', cursor: uploading ? 'wait' : 'pointer',
            opacity: uploading ? 0.7 : 1, transition: 'all 0.2s',
          }}
        >
          {uploading ? <><SpinnerGap size={14} className="animate-spin" /> Uploading...</>
            : uploadDone ? <><CheckCircle size={14} weight="fill" /> Uploaded!</>
            : <><UploadSimple size={14} /> Upload Document</>}
        </button>
      </motion.div>

      {/* Document Table */}
      <div style={{
        background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.12)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 140px 60px',
          padding: '10px 16px', borderBottom: '1px solid rgba(212,175,55,0.1)',
          fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)',
        }}>
          <span />
          <span>Document</span>
          <span>Category</span>
          <span>Status</span>
          <span>Date Added</span>
          <span style={{ textAlign: 'center' }}>View</span>
        </div>

        {/* Rows */}
        {filtered.map((doc, i) => {
          const catMeta = BC_CATEGORY_META[doc.category] || BC_CATEGORY_META.other
          const statusMeta = BC_STATUS_META[doc.status] || BC_STATUS_META['pending-approval']
          return (
            <motion.div key={doc.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/dashboard/workspace/board-chair/${doc.id}`)}
              style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 140px 60px',
                padding: '12px 16px', alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: '#c5221f' }}><FilePdf size={18} weight="duotone" /></span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: 'var(--text-primary)' }}>{doc.title}</p>
                <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', margin: 0, color: 'var(--text-muted)' }}>{doc.fileName}</p>
              </div>
              <span style={{
                padding: '2px 8px', fontSize: 9, fontWeight: 700,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                background: `${catMeta.colour}15`, color: catMeta.colour,
                border: `1px solid ${catMeta.colour}30`, display: 'inline-block', width: 'fit-content',
              }}>
                {catMeta.label}
              </span>
              <span style={{
                padding: '2px 8px', fontSize: 9, fontWeight: 700,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                background: `${statusMeta.colour}15`, color: statusMeta.colour,
                border: `1px solid ${statusMeta.colour}30`, display: 'inline-block', width: 'fit-content',
              }}>
                {statusMeta.label}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {new Date(doc.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <Eye size={16} style={{ color: '#D4AF37', opacity: 0.6 }} />
                {doc.source === 'local' && (
                  <button onClick={(e) => handleDelete(e, doc.id, doc.title)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--text-muted)' }} title="Delete">
                    <Trash size={16} style={{ color: '#c5221f', opacity: 0.8 }} />
                  </button>
                )}
              </span>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center' }}>
            <Crown size={36} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: 8 }} />
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No chairperson documents yet. Upload one to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
