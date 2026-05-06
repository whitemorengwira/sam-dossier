'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Star, ChatCircle, PenNib, Clock, Rocket, ShareNetwork, CheckCircle, Sparkle, CloudCheck, SpinnerGap, ShieldCheck, Circle, CaretRight, FileText } from '@phosphor-icons/react'
import EditorToolbar from '@/components/documents/EditorToolbar'
import MenuBar from '@/components/documents/MenuBar'
import Ruler from '@/components/documents/Ruler'
import FindReplaceModal from '@/components/documents/modals/FindReplaceModal'
import WordCountModal from '@/components/documents/modals/WordCountModal'
import PageSetupModal, { type PageSettings } from '@/components/documents/modals/PageSetupModal'
import KeyboardShortcutsModal from '@/components/documents/modals/KeyboardShortcutsModal'
import SpecialCharactersModal from '@/components/documents/modals/SpecialCharactersModal'
import DictionaryModal from '@/components/documents/modals/DictionaryModal'
import WatermarkModal from '@/components/documents/modals/WatermarkModal'
import DocumentDetailsModal from '@/components/documents/modals/DocumentDetailsModal'
import OutlinePanel from '@/components/documents/panels/OutlinePanel'
import { loadDocuments, saveDocuments, loadVersions, saveVersion, saveFinalisedDocument, TEAM } from '@/lib/documents-data'
import { getDeletedDocIds } from '@/lib/deleted-docs'
import { usePresence, formatLastSeen } from '@/hooks/usePresence'
import type { GDocsDocument, SharedUser } from '@/types'
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
  const [upNextDocs, setUpNextDocs] = useState<GDocsDocument[]>([])

  /* ── New state for Phase 1 features ──── */
  const [saveState, setSaveState] = useState<'idle'|'saving'|'saved'>('idle')
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [showWordCount, setShowWordCount] = useState(false)
  const [showPageSetup, setShowPageSetup] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showOutline, setShowOutline] = useState(false)
  const [showRuler, setShowRuler] = useState(true)
  const [showPrintLayout, setShowPrintLayout] = useState(true)
  const [liveWordCount, setLiveWordCount] = useState(false)
  const [docMode, setDocMode] = useState<'editing'|'suggesting'|'viewing'>('editing')
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    pageSize: 'A4', orientation: 'portrait',
    marginTop: 2.54, marginBottom: 2.54, marginLeft: 2.54, marginRight: 2.54,
    pageColour: '#ffffff',
  })

  /* ── New state for fully functional menus ──── */
  const [showSpecialChars, setShowSpecialChars] = useState(false)
  const [showDictionary, setShowDictionary] = useState(false)
  const [showWatermark, setShowWatermark] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [voiceTyping, setVoiceTyping] = useState(false)
  const [spellCheck, setSpellCheck] = useState(true)
  const recognitionRef = useRef<any>(null)

  /* ── Presence ──── */
  const { users: presenceUsers, onlineCount, totalCount } = usePresence('/dashboard/documents')

  // Load document
  useEffect(() => {
    const docs = loadDocuments()
    const deletedIds = getDeletedDocIds()
    const activeDocs = docs.filter(d => !deletedIds.includes(d.id))
    const found = activeDocs.find(d => d.id === params.id)
    if (!found) return
    setDoc(found); setTitle(found.title); setStarred(found.starred)
    setIsPublished(found.isPublished || false)
    setSignStatus(found.signatureStatus || 'none')
    setVersions(loadVersions(found.id))

    const others = activeDocs.filter(d => d.id !== params.id).slice(0, 3)
    setUpNextDocs(others)
  }, [params.id])

  useEffect(() => {
    if (doc && canvasRef.current) { canvasRef.current.innerHTML = doc.content }
  }, [doc])

  // Auto-save
  const save = useCallback(() => {
    if (!canvasRef.current || !doc) return
    setSaveState('saving')
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
    setTimeout(() => setSaveState('saved'), 300)
    setTimeout(() => setSaveState('idle'), 2000)
  }, [doc, title, starred, signStatus, isPublished])

  useEffect(() => { const t = setTimeout(save, 500); return () => clearTimeout(t) }, [save])

  // Comments
  const handleAddComment = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      alert('Please select some text to comment on.')
      return
    }

    const text = prompt('Enter your comment:')
    if (!text) return

    const range = selection.getRangeAt(0)
    const quote = selection.toString()
    
    // Highlight the text
    const span = document.createElement('span')
    span.style.backgroundColor = '#fef7e0'
    span.style.borderBottom = '2px solid #fbbc04'
    span.className = 'comment-anchor'
    range.surroundContents(span)

    const newComment = {
      id: `c-${Date.now()}`,
      author: TEAM[0],
      text,
      timestamp: new Date().toISOString(),
      resolved: false,
      quote,
      replies: []
    }

    setDoc(prev => prev ? { ...prev, comments: [newComment, ...prev.comments] } : prev)
    setShowComments(true)
    save()
  }, [save, setDoc, setShowComments])

  /* ── Keyboard shortcuts ──── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'h') { e.preventDefault(); setShowFindReplace(true) }
      if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); setShowWordCount(true) }
      if (e.ctrlKey && e.key === '/') { e.preventDefault(); setShowShortcuts(true) }
      if (e.ctrlKey && e.shiftKey && e.key === 'H') { e.preventDefault(); setShowVersions(true) }
      if (e.ctrlKey && e.shiftKey && e.key === 'F') { e.preventDefault(); document.documentElement.requestFullscreen?.() }
      if (e.ctrlKey && e.altKey && e.key === 'm') { e.preventDefault(); handleAddComment() }
      if (e.altKey && e.key === '/') { e.preventDefault(); /* command palette placeholder */ }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [handleAddComment])

  /* ── beforeunload guard ──── */
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { if (saveState === 'saving') { e.preventDefault() } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [saveState])

  /* ── Download handler ──── */
  const handleDownload = (format: string) => {
    if (!canvasRef.current) return
    const content = canvasRef.current.innerHTML
    let blob: Blob; let ext = format
    if (format === 'txt') {
      blob = new Blob([canvasRef.current.innerText || ''], { type: 'text/plain' })
    } else if (format === 'pdf') {
      window.print(); return
    } else {
      blob = new Blob([`<html><body>${content}</body></html>`], { type: 'text/html' })
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `${title}.${ext}`; a.click()
    URL.revokeObjectURL(url)
  }

  /* ── Paragraph style ──── */
  const applyParagraphStyle = (tag: string) => {
    canvasRef.current?.focus()
    document.execCommand('formatBlock', false, tag)
  }

  const charCountNoSpaces = canvasRef.current ? (canvasRef.current.innerText || '').replace(/\s/g, '').length : 0
  const pageCount = Math.max(1, Math.ceil((canvasRef.current?.scrollHeight || 1056) / 1056))

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
            <input className={styles.titleInput} value={title} onChange={e => setTitle(e.target.value)} readOnly={docMode === 'viewing'} />
            <span className={styles.lastEdit}>
              {saveState === 'saving' && <><SpinnerGap size={12} className="animate-spin" style={{display:'inline',marginRight:4}} />Saving…</>}
              {saveState === 'saved' && <><CloudCheck size={12} style={{display:'inline',marginRight:4,color:'#137333'}} />Saved to Drive</>}
              {saveState === 'idle' && `Last edit was ${new Date(doc.lastModified).toLocaleDateString()}`}
            </span>
          </div>
          <button className={`${styles.starBtn} ${starred ? styles.starred : ''}`} onClick={() => setStarred(!starred)}>
            <Star size={18} weight={starred ? 'fill' : 'regular'} />
          </button>
        </div>
        <div className={styles.chromeRight}>
          {/* Mode indicator */}
          <span style={{ fontSize: 12, color: '#5f6368', padding: '4px 10px', background: '#f1f3f4', borderRadius: 4, textTransform: 'capitalize' }}>
            {docMode === 'editing' ? '✏️' : docMode === 'suggesting' ? '💡' : '👁️'} {docMode}
          </span>

          <div className={styles.avatarGroup}>
            {doc.shared.slice(0, 4).map(u => {
              const presence = presenceUsers.find(p => p.id === u.id || p.name === u.name)
              const isOnline = presence?.isOnline ?? false
              return (
                <div key={u.id} className={styles.avatar} style={{ position:'relative' }} title={`${u.name} — ${isOnline ? '🟢 Online' : `⚫ ${presence ? formatLastSeen(presence.lastSeen) : 'Offline'}`}`}>
                  {u.avatar}
                  <span style={{ position:'absolute', bottom:-1, right:-1, width:8, height:8, borderRadius:'50%', background: isOnline ? '#34d399' : '#6b7280', border:'2px solid var(--navy)', display:'block' }} />
                </div>
              )
            })}
            {doc.shared.length > 4 && <div className={styles.avatar} style={{background:'#e0e0e0',color:'#5f6368'}}>+{doc.shared.length - 4}</div>}
            <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginLeft:4 }}>{onlineCount} online</span>
          </div>

          <button className={styles.versionBtn} onClick={() => { setShowVersions(!showVersions); setShowComments(false) }}>
            <Clock size={16} /> History
          </button>

          <button className={`${styles.signBtn} ${signStatus === 'signed' ? styles.signed : ''}`} onClick={handleSign}>
            {signStatus === 'signed' ? <><CheckCircle size={16} /> Add Signature</> : <><PenNib size={16} /> e-Sign</>}
          </button>

          <button className={`${styles.publishBtn} ${isPublished ? styles.live : ''}`} onClick={togglePublish}>
            <Rocket size={16} /> {isPublished ? '● Live' : 'Go Live'}
          </button>

          {signStatus === 'signed' && (
            <button
              onClick={() => {
                if (!doc || !canvasRef.current) return
                if (!confirm('Finalise this document and move it to the Validated Documents Vault? This action cannot be undone.')) return
                const finalDoc = { ...doc, content: canvasRef.current.innerHTML, signatureStatus: 'signed' as const, lastModified: new Date().toISOString() }
                saveFinalisedDocument(finalDoc)
                const docs = loadDocuments().filter(d => d.id !== doc.id)
                saveDocuments(docs)
                router.push('/dashboard/validated-documents')
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', fontSize: 12, fontWeight: 600,
                background: 'rgba(19,115,51,0.15)', border: '1px solid rgba(19,115,51,0.4)',
                color: '#137333', cursor: 'pointer', borderRadius: 4,
                fontFamily: 'Google Sans, sans-serif',
              }}
            >
              <ShieldCheck size={16} /> Finalise → Validated Docs
            </button>
          )}

          <button className={`${styles.commentToggle} ${showComments ? styles.active : ''}`} onClick={() => { setShowComments(!showComments); setShowVersions(false) }}>
            <ChatCircle size={18} />
            {doc.comments.length > 0 && <span className={styles.commentBadge}>{doc.comments.length}</span>}
          </button>
        </div>
      </div>

      {/* ── Menu Bar ──── */}
      {docMode !== 'viewing' && (
        <MenuBar
          editorRef={canvasRef}
          onFindReplace={() => setShowFindReplace(true)}
          onWordCount={() => setShowWordCount(true)}
          onPageSetup={() => setShowPageSetup(true)}
          onShortcuts={() => setShowShortcuts(true)}
          onOutline={setShowOutline}
          onRuler={setShowRuler}
          onMode={setDocMode}
          onPrint={() => window.print()}
          onFullScreen={() => document.documentElement.requestFullscreen?.()}
          onNewDoc={() => router.push('/dashboard/documents')}
          onDownload={handleDownload}
          onInsertTable={(r, c) => {
            const rows = Array(r).fill(`<tr>${Array(c).fill('<td>&nbsp;</td>').join('')}</tr>`).join('')
            document.execCommand('insertHTML', false, `<table style="width:100%;border-collapse:collapse"><tbody>${rows}</tbody></table>`)
          }}
          onInsertHR={() => document.execCommand('insertHorizontalRule')}
          onInsertEmoji={() => {
            const emoji = prompt('Enter emoji:')
            if (emoji) document.execCommand('insertText', false, emoji)
          }}
          onInsertComment={() => setShowComments(true)}
          onInsertImage={() => {
            const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'
            input.onchange = () => {
              const file = input.files?.[0]; if (!file) return
              const reader = new FileReader()
              reader.onload = () => document.execCommand('insertImage', false, reader.result as string)
              reader.readAsDataURL(file)
            }
            input.click()
          }}
          onInsertLink={() => {
            const url = prompt('Enter URL:')
            if (url) document.execCommand('createLink', false, url)
          }}
          onParagraphStyle={applyParagraphStyle}
          onAlign={(a) => document.execCommand(`justify${a.charAt(0).toUpperCase() + a.slice(1)}`)}
          onSpacing={(s) => {
            const sel = window.getSelection()
            if (sel && sel.rangeCount) {
              const el = sel.anchorNode?.parentElement
              if (el) el.style.lineHeight = s
            }
          }}
          onClearFormatting={() => document.execCommand('removeFormat')}
          onVersionHistory={() => setShowVersions(true)}
          onNameVersion={() => { const name = prompt('Version name:'); if (name) createVersion(name) }}
          onMakeCopy={() => {
            const docs = loadDocuments()
            const copy = { ...doc, id: `doc-${Date.now()}`, title: `${title} (Copy)`, lastModified: new Date().toISOString() }
            docs.unshift(copy); saveDocuments(docs)
            router.push(`/dashboard/documents/${copy.id}`)
          }}
          onRename={() => { const el = document.querySelector(`.${styles.titleInput}`) as HTMLInputElement; el?.focus() }}
          onTrash={() => { router.push('/dashboard/documents') }}
          onDetails={() => setShowDetails(true)}
          onSpecialChars={() => setShowSpecialChars(true)}
          onDictionary={() => setShowDictionary(true)}
          onWatermark={() => setShowWatermark(true)}
          showRuler={showRuler}
          showOutline={showOutline}
          currentMode={docMode}
          showPrintLayout={showPrintLayout}
          onPrintLayout={setShowPrintLayout}
        />
      )}

      {/* ── Toolbar ──── */}
      {docMode !== 'viewing' && <EditorToolbar editorRef={canvasRef} onAddComment={handleAddComment} />}

      {/* ── Ruler ──── */}
      <Ruler visible={showRuler && docMode !== 'viewing'} marginLeft={96} marginRight={96} pageWidth={816} onMarginChange={() => {}} />

      {/* ── Viewing mode banner ──── */}
      {docMode === 'viewing' && (
        <div style={{ padding: '8px 16px', background: '#e8f0fe', borderBottom: '1px solid #d2e3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 13, color: '#174ea6' }}>
          <span>👁️ You are viewing this document.</span>
          <button onClick={() => setDocMode('editing')} style={{ background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
            Switch to editing
          </button>
        </div>
      )}

      {/* ── Editor body ──── */}
      <div className={styles.editorBody}>
        {/* Outline Panel */}
        <OutlinePanel open={showOutline} onClose={() => setShowOutline(false)} editorRef={canvasRef} />

        <div className={styles.editorMain}>
          <div className={styles.canvasWrapper}>
            <div
              ref={canvasRef}
              className={styles.canvas}
              contentEditable={docMode !== 'viewing'}
              suppressContentEditableWarning
              onInput={save}
              style={{ background: pageSettings.pageColour }}
            />
          </div>

          {/* ── Signature Pad ──── */}
          {isSigning && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', padding: 32, borderRadius: 12, width: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginBottom: 16, color: '#202124', fontFamily: 'Google Sans, sans-serif' }}>Sign this document</h3>
                <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 16 }}>Draw your signature below.</p>
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

          {/* ── Up Next Section ──── */}
          {upNextDocs.length > 0 && (
            <div style={{ padding: '32px 24px', background: '#0A1128', borderTop: '1px solid rgba(212,175,55,0.15)', marginTop: 'auto' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, 
                color: '#D4AF37', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 
              }}>
                Up Next
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {upNextDocs.map(nextDoc => (
                  <div 
                    key={nextDoc.id}
                    onClick={() => router.push(`/dashboard/documents/${nextDoc.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px', background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{ 
                      width: 40, height: 40, borderRadius: 6, 
                      background: 'rgba(10,17,40,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
                      color: '#D4AF37'
                    }}>
                      <FileText size={24} weight="duotone" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {nextDoc.title}
                      </h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {nextDoc.category}
                      </p>
                    </div>
                    <CaretRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>
                ))}
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
              <p style={{ fontSize: 13, color: '#80868b' }}>No versions saved yet.</p>
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
          {liveWordCount && <span style={{ fontWeight: 500, color: '#1a73e8' }}>{wordCount} words</span>}
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

      {/* ── Modals ──── */}
      <FindReplaceModal open={showFindReplace} onClose={() => setShowFindReplace(false)} editorRef={canvasRef} />
      <WordCountModal open={showWordCount} onClose={() => setShowWordCount(false)} pages={pageCount} words={wordCount} characters={charCount} charsNoSpaces={charCountNoSpaces} onToggleLive={setLiveWordCount} liveEnabled={liveWordCount} />
      <PageSetupModal open={showPageSetup} onClose={() => setShowPageSetup(false)} onApply={setPageSettings} current={pageSettings} />
      <KeyboardShortcutsModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <SpecialCharactersModal open={showSpecialChars} onClose={() => setShowSpecialChars(false)} onInsert={(char) => { canvasRef.current?.focus(); document.execCommand('insertText', false, char) }} />
      <DictionaryModal open={showDictionary} onClose={() => setShowDictionary(false)} editorRef={canvasRef} />
      <WatermarkModal open={showWatermark} onClose={() => setShowWatermark(false)} onApply={(text, opacity, angle) => {
        if (!canvasRef.current) return
        const watermarkEl = canvasRef.current.querySelector('.nexus-watermark') as HTMLElement
        if (watermarkEl) watermarkEl.remove()
        const wm = document.createElement('div')
        wm.className = 'nexus-watermark'
        wm.style.cssText = `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:0;overflow:hidden;`
        wm.innerHTML = `<span style="font-size:72px;font-weight:900;color:rgba(0,0,0,${opacity/100});transform:rotate(${angle}deg);letter-spacing:0.2em;text-transform:uppercase;user-select:none;font-family:var(--font-display)">${text}</span>`
        canvasRef.current.style.position = 'relative'
        canvasRef.current.prepend(wm)
        save()
      }} />
      <DocumentDetailsModal
        open={showDetails} onClose={() => setShowDetails(false)}
        documentTitle={title} documentContent={canvasRef.current?.innerHTML || doc.content}
        owner={doc.owner.name} created={doc.lastModified} lastModified={doc.lastModified}
        wordCount={wordCount} charCount={charCount}
        shared={doc.shared.map(s => ({ name: s.name, role: s.role }))}
      />
    </div>
  )
}

