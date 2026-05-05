'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  PenNib,
  CheckCircle,
  DownloadSimple,
  UploadSimple,
  FilePdf,
  MicrosoftWordLogo,
  FileHtml,
  ShieldCheck,
  CaretDown,
  SpinnerGap,
  CloudCheck,
  Printer,
  X,
} from '@phosphor-icons/react'
import { VALIDATED_DOCUMENTS, fetchValidatedDocumentHtml } from '@/lib/validated-documents'

export default function ValidatedDocumentEditorPage() {
  const params = useParams()
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)
  const signCanvasRef = useRef<HTMLCanvasElement>(null)

  const [doc, setDoc] = useState<typeof VALIDATED_DOCUMENTS[0] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [isSigning, setIsSigning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signed, setSigned] = useState(false)
  const [showExport, setShowExport] = useState(false)

  // Find the document by ID
  useEffect(() => {
    const found = VALIDATED_DOCUMENTS.find(d => d.id === params.id)
    if (found) setDoc(found)
    else setLoading(false)
  }, [params.id])

  // Fetch HTML content from R2
  useEffect(() => {
    if (!doc) return
    setLoading(true)
    fetchValidatedDocumentHtml(doc).then(html => {
      if (editorRef.current) {
        editorRef.current.innerHTML = html
      }
      setLoading(false)
    })
  }, [doc])

  // Auto-save to sessionStorage
  const save = useCallback(() => {
    if (!editorRef.current || !doc) return
    setSaveState('saving')
    sessionStorage.setItem(`vd-${doc.id}`, editorRef.current.innerHTML)
    setTimeout(() => setSaveState('saved'), 300)
    setTimeout(() => setSaveState('idle'), 2000)
  }, [doc])

  useEffect(() => {
    const t = setTimeout(save, 800)
    return () => clearTimeout(t)
  }, [save])

  // Signing logic
  const handleSign = () => {
    if (signed) return
    setIsSigning(true)
    setTimeout(() => {
      const c = signCanvasRef.current
      if (!c) return
      const ctx = c.getContext('2d')
      if (!ctx) return
      c.width = c.offsetWidth
      c.height = c.offsetHeight
      ctx.strokeStyle = '#0A1128'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }, 100)
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const c = signCanvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const r = c.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - r.left, e.clientY - r.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const c = signCanvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const r = c.getBoundingClientRect()
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top)
    ctx.stroke()
  }

  const endDraw = () => setIsDrawing(false)

  const clearSignature = () => {
    const c = signCanvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, c.width, c.height)
  }

  const applySignature = () => {
    const c = signCanvasRef.current
    if (!c || !editorRef.current) return
    const dataUrl = c.toDataURL()
    editorRef.current.innerHTML += `
      <div style="margin-top:32px;padding:24px;border-top:2px solid rgba(212,175,55,0.3)">
        <p style="color:#137333;font-weight:600;font-size:14px">✓ Electronically Signed</p>
        <img src="${dataUrl}" style="max-width:280px;height:auto;margin:8px 0" alt="Digital Signature"/>
        <p style="font-size:12px;color:#80868b">Authorised Signatory — ${new Date().toLocaleString('en-GB')}</p>
      </div>
    `
    setSigned(true)
    setIsSigning(false)
    save()
  }

  // Export functions
  const exportHTML = () => {
    if (!editorRef.current || !doc) return
    const blob = new Blob([
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${doc.title}</title><style>body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:48px;color:#202124;line-height:1.7}</style></head><body>${editorRef.current.innerHTML}</body></html>`
    ], { type: 'text/html' })
    downloadBlob(blob, `${doc.title}.html`)
  }

  const exportPDF = async () => {
    if (!editorRef.current || !doc) return
    try {
      const html2pdf = (await import('html2pdf.js')).default
      html2pdf()
        .set({
          margin: [15, 15, 15, 15],
          filename: `${doc.title}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(editorRef.current)
        .save()
    } catch {
      // Fallback to print
      window.print()
    }
    setShowExport(false)
  }

  const exportDOCX = async () => {
    if (!editorRef.current || !doc) return
    try {
      const htmlDocx = (await import('html-docx-js')).default
      const content = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${editorRef.current.innerHTML}</body></html>`
      const blob = htmlDocx.asBlob(content)
      downloadBlob(blob, `${doc.title}.docx`)
    } catch {
      alert('DOCX export failed. Please try HTML or PDF instead.')
    }
    setShowExport(false)
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  // Upload handler
  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.html,.htm,.txt'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = reader.result as string
          save()
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  if (!doc && !loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p className="text-text-muted font-mono">Document not found.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', background: '#E8EAED' }}>

      {/* ── Chrome bar ──── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#0A1128', borderBottom: '1px solid rgba(212,175,55,0.15)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => router.push('/dashboard/validated-documents')}
            style={{
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
              color: 'var(--gold)', padding: '6px 8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', transition: 'all 0.2s',
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
              color: 'var(--gold)', margin: 0,
            }}>
              {doc?.title || 'Loading...'}
            </h2>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {saveState === 'saving' && <><SpinnerGap size={10} className="animate-spin" style={{ display: 'inline', marginRight: 4 }} />Saving…</>}
              {saveState === 'saved' && <><CloudCheck size={10} style={{ display: 'inline', marginRight: 4, color: '#137333' }} />All changes saved</>}
              {saveState === 'idle' && 'Validated Document'}
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Upload */}
          <button
            onClick={handleUpload}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
              color: 'var(--gold)', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <UploadSimple size={14} /> Upload
          </button>

          {/* Export dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowExport(!showExport)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
                color: 'var(--gold)', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <DownloadSimple size={14} /> Export <CaretDown size={10} />
            </button>
            <AnimatePresence>
              {showExport && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: 4,
                    background: '#0A1128', border: '1px solid rgba(212,175,55,0.2)',
                    minWidth: 200, zIndex: 60, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <button onClick={exportPDF} style={menuItemStyle}>
                    <FilePdf size={16} style={{ color: '#c5221f' }} /> Export as PDF
                  </button>
                  <button onClick={exportDOCX} style={menuItemStyle}>
                    <MicrosoftWordLogo size={16} style={{ color: '#1a73e8' }} /> Export as Word (.docx)
                  </button>
                  <button onClick={() => { exportHTML(); setShowExport(false) }} style={menuItemStyle}>
                    <FileHtml size={16} style={{ color: '#e8710a' }} /> Export as HTML
                  </button>
                  <button onClick={() => { window.print(); setShowExport(false) }} style={menuItemStyle}>
                    <Printer size={16} style={{ color: '#5f6368' }} /> Print
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign */}
          <button
            onClick={handleSign}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              background: signed ? 'rgba(19,115,51,0.15)' : 'rgba(212,175,55,0.15)',
              border: `1px solid ${signed ? 'rgba(19,115,51,0.4)' : 'rgba(212,175,55,0.4)'}`,
              color: signed ? '#137333' : 'var(--gold)',
              cursor: signed ? 'default' : 'pointer', transition: 'all 0.2s',
            }}
          >
            {signed ? <><CheckCircle size={14} weight="fill" /> Signed</> : <><PenNib size={14} /> e-Sign</>}
          </button>

          {/* Validated badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '5px 10px', fontSize: 10, fontWeight: 700,
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            letterSpacing: '0.5px',
            background: 'rgba(19,115,51,0.1)', color: '#137333',
            border: '1px solid rgba(19,115,51,0.25)',
          }}>
            <ShieldCheck size={12} weight="fill" /> Validated
          </div>
        </div>
      </div>

      {/* ── Editor body ──── */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center',
        padding: '32px 16px',
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400 }}>
            <SpinnerGap size={36} className="animate-spin" style={{ color: '#D4AF37', marginBottom: 12 }} />
            <p style={{ color: '#80868b', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
              Fetching document from secure vault...
            </p>
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={save}
            style={{
              width: 816, minHeight: 1056,
              background: '#fff', padding: 96,
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              outline: 'none', fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 15, lineHeight: 1.8, color: '#202124',
            }}
          />
        )}
      </div>

      {/* ── Signature Modal ──── */}
      <AnimatePresence>
        {isSigning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: '#0A1128', border: '1px solid rgba(212,175,55,0.2)',
                padding: 32, width: 500, boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="text-gold font-display" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                  Digital Signature
                </h3>
                <button onClick={() => setIsSigning(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <p className="text-text-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
                Draw your signature below. This will be appended to the document as a binding electronic signature.
              </p>
              <canvas
                ref={signCanvasRef}
                style={{
                  width: '100%', height: 140,
                  border: '1px solid rgba(212,175,55,0.2)', cursor: 'crosshair',
                  background: 'rgba(255,255,255,0.05)',
                }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
                <button onClick={clearSignature} style={secondaryBtnStyle}>Clear</button>
                <button onClick={() => setIsSigning(false)} style={secondaryBtnStyle}>Cancel</button>
                <button onClick={applySignature} style={primaryBtnStyle}>Apply Signature</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const menuItemStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  width: '100%', padding: '10px 16px', background: 'transparent',
  border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
  color: 'var(--text-primary)', fontSize: 13, cursor: 'pointer',
  fontFamily: 'inherit', textAlign: 'left' as const,
  transition: 'background 0.15s',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '8px 16px', fontSize: 12, fontWeight: 600,
  background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
  color: 'var(--text-secondary)', cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
}

const primaryBtnStyle: React.CSSProperties = {
  padding: '8px 20px', fontSize: 12, fontWeight: 700,
  background: 'linear-gradient(135deg, var(--gold), #c4a030)',
  border: 'none', color: '#0A1128', cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
}
