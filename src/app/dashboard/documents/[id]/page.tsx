'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Star, ChatCircle, PenNib, Clock, Rocket, ShareNetwork, CheckCircle, Sparkle } from '@phosphor-icons/react'
import EditorToolbar from '@/components/documents/EditorToolbar'
import { loadDocuments, saveDocuments, loadVersions, saveVersion, TEAM } from '@/lib/documents-data'
import type { GDocsDocument } from '@/types'
import type { DocVersion } from '@/lib/documents-data'
import styles from './page.module.css'

export default function DocumentEditorPage() {
  const params = useParams()
  const router = useRouter()
  const canvasRef = useRef<HTMLDivElement>(null)
  const signCanvasRef = useRef<HTMLCanvasElement>(null)

  const [doc, setDoc] = useState<GDocsDocument | null>(null)
  const [title, setTitle] = useState('')
  const [starred, setStarred] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showVersions, setShowVersions] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [versions, setVersions] = useState<DocVersion[]>([])
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [isSigning, setIsSigning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [signStatus, setSignStatus] = useState<'none'|'pending'|'signed'>('none')

  // Load document
  useEffect(() => {
    const docs = loadDocuments()
    const found = docs.find(d => d.id === params.id)
    if (!found) return
    /* eslint-disable react-hooks/set-state-in-effect */
    setDoc(found); setTitle(found.title); setStarred(found.starred)
    setIsPublished(found.isPublished || false)
    setSignStatus(found.signatureStatus || 'none')
    setVersions(loadVersions(found.id))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [params.id])

  useEffect(() => {
    if (doc && canvasRef.current) { canvasRef.current.innerHTML = doc.content }
  }, [doc])

  // Auto-save
  const save = useCallback(() => {
    if (!canvasRef.current || !doc) return
    const content = canvasRef.current.innerHTML
    const text = canvasRef.current.innerText || ''
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
    setCharCount(text.length)
    const docs = loadDocuments()
    const idx = docs.findIndex(d => d.id === doc.id)
    if (idx >= 0) {
      docs[idx] = { ...docs[idx], title, content, starred, lastModified: new Date().toISOString(), signatureStatus: signStatus, isPublished }
      saveDocuments(docs)
    }
  }, [doc, title, starred, signStatus, isPublished])

  useEffect(() => { const t = setTimeout(save, 1500); return () => clearTimeout(t) }, [save])

  // Version save
  const createVersion = (label?: string) => {
    if (!doc || !canvasRef.current) return
    const v: DocVersion = { id: `v-${Date.now()}`, date: new Date().toISOString(), author: TEAM[0].name, label, snapshot: canvasRef.current.innerHTML }
    saveVersion(doc.id, v)
    setVersions(loadVersions(doc.id))
  }

  const restoreVersion = (v: DocVersion) => {
    if (canvasRef.current) canvasRef.current.innerHTML = v.snapshot
    save()
  }

  // Publish
  const togglePublish = () => {
    if (!isPublished) createVersion('Published')
    setIsPublished(!isPublished)
  }

  // Sign
  const handleSign = () => {
    if (signStatus === 'signed') return
    setIsSigning(true)
    // Init canvas
    setTimeout(() => {
      const c = signCanvasRef.current
      if (!c) return
      const ctx = c.getContext('2d')
      if (!ctx) return
      c.width = c.offsetWidth; c.height = c.offsetHeight
      ctx.strokeStyle = '#202124'; ctx.lineWidth = 2; ctx.lineCap = 'round'
    }, 100)
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const c = signCanvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    const r = c.getBoundingClientRect()
    ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const c = signCanvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    const r = c.getBoundingClientRect()
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke()
  }

  const endDraw = () => setIsDrawing(false)

  const applySignature = () => {
    const c = signCanvasRef.current
    if (!c) return
    const dataUrl = c.toDataURL()
    if (canvasRef.current) {
      canvasRef.current.innerHTML += `<div style="margin-top:32px;padding:24px;border-top:2px solid #dadce0"><p style="color:#137333;font-weight:600">✓ Electronically Signed</p><img src="${dataUrl}" style="max-width:300px;height:auto;margin:8px 0" alt="Signature"/><p style="font-size:12px;color:#5f6368">${TEAM[0].name} — ${new Date().toLocaleString()}</p></div>`
    }
    setSignStatus('signed'); setIsSigning(false)
    createVersion('Signed')
    save()
  }

  const clearSignature = () => {
    const c = signCanvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    ctx.clearRect(0, 0, c.width, c.height)
  }

  // AI
  const generateAI = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true); setAiResult('')
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `For this document titled "${title}": ${aiPrompt}`, stream: false }) })
      const data = await res.json()
      setAiResult(data.text || data.error || 'No result')
    } catch { setAiResult('AI generation failed. Please try again.') }
    setAiLoading(false)
  }

  const insertAI = () => {
    if (canvasRef.current && aiResult) {
      canvasRef.current.innerHTML += `<p>${aiResult}</p>`
      setShowAI(false); setAiResult(''); setAiPrompt('')
      save()
    }
  }

  if (!doc) return <div className={styles.loading}>Loading document...</div>

  return (
    <div className={styles.editorPage}>
      {/* ── Chrome bar ──── */}
      <div className={styles.editorChrome}>
        <div className={styles.chromeLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/dashboard/documents')}><ArrowLeft size={18} /></button>
          <div className={styles.docIcon}>📄</div>
          <div className={styles.titleWrapper}>
            <input className={styles.titleInput} value={title} onChange={e => setTitle(e.target.value)} />
            <span className={styles.lastEdit}>Last edit was {new Date(doc.lastModified).toLocaleDateString()}</span>
          </div>
          <button className={`${styles.starBtn} ${starred ? styles.starred : ''}`} onClick={() => setStarred(!starred)}>
            <Star size={18} weight={starred ? 'fill' : 'regular'} />
          </button>
        </div>
        <div className={styles.chromeRight}>
          <div className={styles.avatarGroup}>
            {doc.shared.slice(0, 3).map(u => <div key={u.id} className={styles.avatar}>{u.avatar}</div>)}
          </div>

          <button className={styles.versionBtn} onClick={() => { setShowVersions(!showVersions); setShowComments(false) }}>
            <Clock size={16} /> History
          </button>

          <button className={`${styles.signBtn} ${signStatus === 'signed' ? styles.signed : ''}`} onClick={handleSign}>
            {signStatus === 'signed' ? <><CheckCircle size={16} /> Signed</> : <><PenNib size={16} /> e-Sign</>}
          </button>

          <button className={`${styles.publishBtn} ${isPublished ? styles.live : ''}`} onClick={togglePublish}>
            <Rocket size={16} /> {isPublished ? '● Live' : 'Go Live'}
          </button>

          <button className={`${styles.commentToggle} ${showComments ? styles.active : ''}`} onClick={() => { setShowComments(!showComments); setShowVersions(false) }}>
            <ChatCircle size={18} />
            {doc.comments.length > 0 && <span className={styles.commentBadge}>{doc.comments.length}</span>}
          </button>

          <button className={styles.shareBtn}><ShareNetwork size={16} /> Share</button>
        </div>
      </div>

      {/* ── Toolbar ──── */}
      <EditorToolbar />

      {/* ── Editor body ──── */}
      <div className={styles.editorBody}>
        <div className={styles.editorMain}>
          <div className={styles.canvasWrapper}>
            <div ref={canvasRef} className={styles.canvas} contentEditable suppressContentEditableWarning onInput={save} />
          </div>

          {/* ── Signature Pad (overlay inside canvas area) ──── */}
          {isSigning && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', padding: 32, borderRadius: 12, width: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginBottom: 16, color: '#202124', fontFamily: 'Google Sans, sans-serif' }}>Sign this document</h3>
                <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 16 }}>Draw your signature below. This constitutes a legally binding electronic signature.</p>
                <canvas
                  ref={signCanvasRef} className={styles.signatureCanvas}
                  style={{ width: '100%', height: 140, border: '1px solid #dadce0', borderRadius: 8, cursor: 'crosshair', background: '#fafafa' }}
                  onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
                  <button onClick={clearSignature} style={{ padding: '8px 16px', background: '#f1f3f4', border: 'none', borderRadius: 4, cursor: 'pointer', color: '#5f6368' }}>Clear</button>
                  <button onClick={() => setIsSigning(false)} style={{ padding: '8px 16px', background: '#f1f3f4', border: 'none', borderRadius: 4, cursor: 'pointer', color: '#5f6368' }}>Cancel</button>
                  <button onClick={applySignature} style={{ padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Apply Signature</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Comments Panel ──── */}
        {showComments && (
          <div className={styles.versionPanel}>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: '#202124', marginBottom: 16 }}>Comments</h3>
            {doc.comments.length === 0 ? (
              <p style={{ fontSize: 13, color: '#80868b' }}>No comments yet. Select text and add a comment.</p>
            ) : doc.comments.map(c => (
              <div key={c.id} className={styles.versionItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div className={styles.avatar} style={{ width: 24, height: 24, fontSize: 9, marginLeft: 0 }}>{c.author.avatar}</div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#202124' }}>{c.author.name}</span>
                </div>
                {c.quote && <div style={{ fontSize: 12, color: '#1a73e8', borderLeft: '2px solid #1a73e8', padding: '2px 8px', margin: '4px 0' }}>{c.quote}</div>}
                <p style={{ fontSize: 13, color: '#3c4043' }}>{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Version History Panel ──── */}
        {showVersions && (
          <div className={styles.versionPanel}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#202124' }}>Version history</h3>
              <button onClick={() => createVersion()} style={{ fontSize: 12, color: '#1a73e8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Save version</button>
            </div>
            {versions.length === 0 ? (
              <p style={{ fontSize: 13, color: '#80868b' }}>No versions saved yet. Click &ldquo;Save version&rdquo; to create a snapshot.</p>
            ) : versions.map(v => (
              <div key={v.id} className={styles.versionItem} onClick={() => restoreVersion(v)}>
                <div className={styles.versionDate}>{new Date(v.date).toLocaleString()}</div>
                <div className={styles.versionAuthor}>{v.author}</div>
                {v.label && <div className={styles.versionLabel}>{v.label}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Status bar ──── */}
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          {signStatus === 'signed' && <span style={{ color: '#137333' }}>✓ Signed</span>}
          {isPublished && <span style={{ color: '#137333' }}>● Published</span>}
        </div>
        <div className={styles.statusRight}>
          <button className={styles.aiButton} onClick={() => setShowAI(!showAI)}>
            <Sparkle size={14} weight="fill" /> Help me write
          </button>
        </div>
      </div>

      {/* ── AI Panel ──── */}
      {showAI && (
        <div style={{ position: 'fixed', bottom: 60, right: 24, width: 400, background: '#fff', border: '1px solid #dadce0', borderRadius: 12, padding: 20, zIndex: 50, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: '#202124', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Sparkle size={16} /> AI Writing Assistant</h4>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {['Summarise this document', 'Make it more formal', 'Create action items', 'Write a follow-up email'].map(p => (
              <button key={p} onClick={() => setAiPrompt(p)} style={{ padding: '4px 10px', fontSize: 12, border: '1px solid #dadce0', borderRadius: 16, background: aiPrompt === p ? '#e8f0fe' : '#fff', color: '#3c4043', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
          <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Or type a custom prompt..." style={{ width: '100%', height: 60, padding: 8, border: '1px solid #dadce0', borderRadius: 8, resize: 'none', fontSize: 13, fontFamily: 'inherit', color: '#202124' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={generateAI} disabled={aiLoading} style={{ flex: 1, padding: '8px 16px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 13, opacity: aiLoading ? 0.6 : 1 }}>{aiLoading ? 'Generating...' : 'Generate'}</button>
            <button onClick={() => setShowAI(false)} style={{ padding: '8px 16px', background: '#f1f3f4', border: 'none', borderRadius: 4, cursor: 'pointer', color: '#5f6368', fontSize: 13 }}>Close</button>
          </div>
          {aiResult && (
            <div style={{ marginTop: 12, padding: 12, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: 13, color: '#3c4043', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{aiResult}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={insertAI} style={{ padding: '6px 12px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>Insert into document</button>
                <button onClick={() => { setAiResult(''); setAiPrompt('') }} style={{ padding: '6px 12px', background: '#f1f3f4', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#5f6368' }}>Discard</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
