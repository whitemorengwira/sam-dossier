'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlass, UploadSimple, FilePdf, FileHtml, MicrosoftWordLogo,
  MicrosoftPowerpointLogo, Table, Image as ImageIcon, File, LinkSimple,
  Eye, Clock, ArrowRight, SpinnerGap, X, CheckCircle,
} from '@phosphor-icons/react'
import {
  getKnownReceivedDocs, loadLocalReceivedDocs, saveLocalReceivedDoc,
  detectFormat, type ReceivedDoc,
} from '@/lib/received-documents'
import { getGlobalAssetUrl } from '@/lib/getGlobalAssetUrl'

const FORMAT_META: Record<string, { colour: string; icon: React.ReactNode; label: string }> = {
  pdf:   { colour: '#c5221f', icon: <FilePdf size={18} weight="duotone" />, label: 'PDF' },
  html:  { colour: '#e8710a', icon: <FileHtml size={18} weight="duotone" />, label: 'HTML' },
  docx:  { colour: '#1a73e8', icon: <MicrosoftWordLogo size={18} weight="duotone" />, label: 'Word' },
  pptx:  { colour: '#d14524', icon: <MicrosoftPowerpointLogo size={18} weight="duotone" />, label: 'PowerPoint' },
  xlsx:  { colour: '#137333', icon: <Table size={18} weight="duotone" />, label: 'Excel' },
  image: { colour: '#9334e6', icon: <ImageIcon size={18} weight="duotone" />, label: 'Image' },
  link:  { colour: '#D4AF37', icon: <LinkSimple size={18} weight="duotone" />, label: 'Link' },
  other: { colour: '#5f6368', icon: <File size={18} weight="duotone" />, label: 'File' },
}

export default function ReceivedExternalDocsPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [docs, setDocs] = useState<ReceivedDoc[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)

  useEffect(() => {
    const r2 = getKnownReceivedDocs()
    const local = loadLocalReceivedDocs()
    setDocs([...local, ...r2])
  }, [])

  const filtered = useMemo(() => {
    if (!search) return docs
    const q = search.toLowerCase()
    return docs.filter(d => d.title.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q))
  }, [docs, search])

  const handleUpload = async (file: File) => {
    setUploading(true)
    setUploadDone(false)

    try {
      // Request presigned URL
      const res = await fetch('/api/received-docs/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
      })
      const { signedUrl, storagePath, fileName: sanitised } = await res.json()

      if (signedUrl) {
        // Direct upload to R2
        await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      }

      // Register locally
      const newDoc: ReceivedDoc = {
        id: `rd-local-${Date.now()}`,
        fileName: sanitised || file.name,
        title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
        format: detectFormat(file.name),
        r2Key: storagePath || `sam-dossier/public/received-verified-documents/${file.name}`,
        publicUrl: getGlobalAssetUrl(storagePath || `sam-dossier/public/received-verified-documents/${file.name}`),
        uploadedAt: new Date().toISOString(),
        source: 'local',
      }
      saveLocalReceivedDoc(newDoc)
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

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span className="badge badge-gold">Received External</span>
          <span className="badge" style={{ background: 'rgba(26,115,232,0.15)', color: '#1a73e8', border: '1px solid rgba(26,115,232,0.3)', fontSize: 10, padding: '2px 8px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Multi-Format</span>
        </div>
        <h1 className="text-gold font-display font-black" style={{ fontSize: 32, marginBottom: 6 }}>
          Received External Documents
        </h1>
        <p className="text-text-secondary" style={{ fontSize: 15, maxWidth: 640 }}>
          Universal repository for inbound records. Upload PDFs, HTML, Word, PowerPoint, and more.
          Click any document to view it in the Omni-Viewer.
        </p>
        <hr className="divider-gold" style={{ marginTop: 20 }} />
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
          <MagnifyingGlass size={16} className="text-gold" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search received documents..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 13, width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        <input ref={fileInputRef} type="file" hidden
          accept=".pdf,.html,.htm,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp,.svg,.txt"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = '' }}
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
          display: 'grid', gridTemplateColumns: '40px 1fr 100px 140px 60px',
          padding: '10px 16px', borderBottom: '1px solid rgba(212,175,55,0.1)',
          fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)',
        }}>
          <span />
          <span>Document</span>
          <span>Format</span>
          <span>Date Received</span>
          <span style={{ textAlign: 'center' }}>View</span>
        </div>

        {/* Rows */}
        {filtered.map((doc, i) => {
          const meta = FORMAT_META[doc.format] || FORMAT_META.other
          return (
            <motion.div key={doc.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              onClick={() => router.push(`/dashboard/received-docs/${doc.id}`)}
              style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 100px 140px 60px',
                padding: '12px 16px', alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: meta.colour }}>{meta.icon}</span>
              <div>
                <p className="text-text-primary" style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{doc.title}</p>
                <p className="text-text-muted" style={{ fontSize: 10, fontFamily: 'var(--font-mono)', margin: 0 }}>{doc.fileName}</p>
              </div>
              <span style={{
                padding: '2px 8px', fontSize: 9, fontWeight: 700,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                background: `${meta.colour}15`, color: meta.colour,
                border: `1px solid ${meta.colour}30`, display: 'inline-block', width: 'fit-content',
              }}>
                {meta.label}
              </span>
              <span className="text-text-muted" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                {new Date(doc.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span style={{ textAlign: 'center' }}>
                <Eye size={16} className="text-gold" style={{ opacity: 0.6 }} />
              </span>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center' }}>
            <File size={36} className="text-text-muted" style={{ opacity: 0.3, marginBottom: 8 }} />
            <p className="text-text-muted" style={{ fontSize: 13 }}>No documents found. Upload one to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
