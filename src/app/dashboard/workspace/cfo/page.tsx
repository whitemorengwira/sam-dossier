'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlass, UploadSimple, FilePdf, Eye, Trash,
  SpinnerGap, CheckCircle, File, CurrencyCircleDollar,
} from '@phosphor-icons/react'
import {
  getKnownCFODocs, loadLocalCFODocs, saveLocalCFODoc, deleteLocalCFODoc,
  detectFormat, CFO_CATEGORY_META, CFO_STATUS_META,
  type CFODocument,
} from '@/lib/cfo-documents'
import { getGlobalAssetUrl } from '@/lib/getGlobalAssetUrl'
import { getDeletedDocIds, markDocAsDeleted, restoreDeletedDoc } from '@/lib/deleted-docs'
import { toast } from 'sonner'

export default function CFOPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [docs, setDocs] = useState<CFODocument[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)

  useEffect(() => {
    const r2 = getKnownCFODocs()
    const local = loadLocalCFODocs()
    const all = [...local, ...r2]
    const deletedIds = getDeletedDocIds()
    setDocs(all.filter(d => !deletedIds.includes(d.id)))
  }, [])

  const filtered = useMemo(() => {
    if (!search) return docs
    const q = search.toLowerCase()
    return docs.filter(d => d.title.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q))
  }, [docs, search])

  const handleDelete = (e: React.MouseEvent, id: string, title: string, source: 'local' | 'r2') => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      if (source === 'local') {
        deleteLocalCFODoc(id)
      } else {
        markDocAsDeleted(id)
      }
      setDocs(prev => prev.filter(d => d.id !== id))
      toast(`Document "${title}" moved to trash`, {
        action: {
          label: 'Undo',
          onClick: () => {
            if (source === 'r2') {
              restoreDeletedDoc(id)
              const r2 = getKnownCFODocs()
              const restored = r2.find(d => d.id === id)
              if (restored) setDocs(prev => [restored, ...prev])
            }
          }
        }
      })
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

      const newDoc: CFODocument = {
        id: `cfo-local-${Date.now()}`,
        fileName: sanitised || file.name,
        title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
        category: 'budget',
        status: 'pending-approval',
        r2Key: storagePath || `sam-dossier/public/budgets/${file.name}`,
        publicUrl: getGlobalAssetUrl(storagePath || `sam-dossier/public/budgets/${file.name}`),
        uploadedAt: new Date().toISOString(),
        source: 'local',
      }
      saveLocalCFODoc(newDoc)
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

  const pendingCount = docs.filter(d => d.status === 'pending-approval').length
  const approvedCount = docs.filter(d => d.status === 'approved').length

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
          }}>CFO Office</span>
          <span style={{
            padding: '3px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: "var(--font-mono)", textTransform: 'uppercase',
            background: 'rgba(76,175,80,0.15)', color: '#4CAF50',
            border: '1px solid rgba(76,175,80,0.3)',
          }}>Budgets & Finance</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900,
          color: '#D4AF37', marginBottom: 6, letterSpacing: '-0.5px',
        }}>
          Chief Financial Officer
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15, color: 'rgba(245,240,232,0.6)',
          maxWidth: 640, lineHeight: 1.6,
        }}>
          All CFO budgets of Socinga Africa are loaded and sorted here. Upload, review, and approve
          financial documents for the organisation.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(10,17,40,0.5)',
            border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <CurrencyCircleDollar size={24} weight="duotone" style={{ color: '#D4AF37' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5F0E8', fontFamily: 'var(--font-display)' }}>{docs.length}</div>
              <div style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Documents</div>
            </div>
          </div>
          <div style={{
            padding: '12px 20px', background: 'rgba(10,17,40,0.5)',
            border: '1px solid rgba(255,152,0,0.15)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9800', boxShadow: '0 0 8px rgba(255,152,0,0.5)' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#FF9800', fontFamily: 'var(--font-display)' }}>{pendingCount}</div>
              <div style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Approval</div>
            </div>
          </div>
          <div style={{
            padding: '12px 20px', background: 'rgba(10,17,40,0.5)',
            border: '1px solid rgba(76,175,80,0.15)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 8px rgba(76,175,80,0.5)' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#4CAF50', fontFamily: 'var(--font-display)' }}>{approvedCount}</div>
              <div style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved</div>
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
            placeholder="Search budgets & financial documents..."
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
            : <><UploadSimple size={14} /> Upload Budget</>}
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
          const catMeta = CFO_CATEGORY_META[doc.category] || CFO_CATEGORY_META.other
          const statusMeta = CFO_STATUS_META[doc.status] || CFO_STATUS_META['pending-approval']
          return (
            <motion.div key={doc.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/dashboard/workspace/cfo/${doc.id}`)}
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
                <button onClick={(e) => handleDelete(e, doc.id, doc.title, doc.source)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--text-muted)' }} title="Delete">
                  <Trash size={16} style={{ color: '#c5221f', opacity: 0.8 }} />
                </button>
              </span>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center' }}>
            <CurrencyCircleDollar size={36} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: 8 }} />
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No financial documents found. Upload one to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
