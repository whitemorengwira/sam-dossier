'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, MagnifyingGlass, ArrowUp, ArrowDown } from '@phosphor-icons/react'

interface FindReplaceProps {
  open: boolean
  onClose: () => void
  editorRef: React.RefObject<HTMLDivElement | null>
}

export default function FindReplaceModal({ open, onClose, editorRef }: FindReplaceProps) {
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [matchCase, setMatchCase] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [currentMatch, setCurrentMatch] = useState(0)

  const clearHighlights = useCallback(() => {
    if (!editorRef.current) return
    const marks = editorRef.current.querySelectorAll('mark[data-find]')
    marks.forEach(m => {
      const parent = m.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(m.textContent || ''), m)
        parent.normalize()
      }
    })
  }, [editorRef])

  const highlightMatches = useCallback(() => {
    if (!editorRef.current || !findText) { setMatchCount(0); setCurrentMatch(0); return }
    clearHighlights()

    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) textNodes.push(node as Text)

    let count = 0
    const flags = matchCase ? 'g' : 'gi'
    let pattern: RegExp
    try {
      const escaped = useRegex ? findText : findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      pattern = wholeWord ? new RegExp(`\\b${escaped}\\b`, flags) : new RegExp(escaped, flags)
    } catch { return }

    for (const textNode of textNodes) {
      const text = textNode.textContent || ''
      const matches = [...text.matchAll(pattern)]
      if (matches.length === 0) continue

      const frag = document.createDocumentFragment()
      let lastIdx = 0
      for (const m of matches) {
        const idx = m.index!
        if (idx > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, idx)))
        const mark = document.createElement('mark')
        mark.setAttribute('data-find', 'true')
        mark.style.background = count === currentMatch ? '#ff9632' : '#fff2a8'
        mark.style.padding = '0'
        mark.textContent = m[0]
        frag.appendChild(mark)
        count++
        lastIdx = idx + m[0].length
      }
      if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)))
      textNode.parentNode?.replaceChild(frag, textNode)
    }
    setMatchCount(count)
    if (currentMatch >= count) setCurrentMatch(0)
  }, [findText, matchCase, wholeWord, useRegex, currentMatch, clearHighlights, editorRef])

  useEffect(() => {
    if (open && findText) highlightMatches()
    if (!open) clearHighlights()
  }, [open, findText, matchCase, wholeWord, useRegex, currentMatch, highlightMatches, clearHighlights])

  const scrollToCurrentMatch = useCallback(() => {
    if (!editorRef.current) return
    const marks = editorRef.current.querySelectorAll('mark[data-find]')
    marks.forEach((m, i) => {
      (m as HTMLElement).style.background = i === currentMatch ? '#ff9632' : '#fff2a8'
    })
    marks[currentMatch]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentMatch, editorRef])

  useEffect(() => { scrollToCurrentMatch() }, [currentMatch, scrollToCurrentMatch])

  const goNext = () => setCurrentMatch(prev => (prev + 1) % Math.max(matchCount, 1))
  const goPrev = () => setCurrentMatch(prev => (prev - 1 + Math.max(matchCount, 1)) % Math.max(matchCount, 1))

  const replaceCurrent = () => {
    if (!editorRef.current) return
    const marks = editorRef.current.querySelectorAll('mark[data-find]')
    if (marks[currentMatch]) {
      marks[currentMatch].replaceWith(document.createTextNode(replaceText))
      editorRef.current.normalize()
      highlightMatches()
    }
  }

  const replaceAll = () => {
    if (!editorRef.current) return
    const marks = editorRef.current.querySelectorAll('mark[data-find]')
    marks.forEach(m => m.replaceWith(document.createTextNode(replaceText)))
    editorRef.current.normalize()
    setMatchCount(0)
    setCurrentMatch(0)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) { onClose(); e.preventDefault() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', top: 64, right: 24, width: 400, background: '#fff',
      border: '1px solid #dadce0', borderRadius: 8, padding: 16, zIndex: 200,
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)', fontFamily: "'Google Sans','DM Sans',sans-serif",
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#202124' }}>Find and replace</span>
        <button onClick={() => { clearHighlights(); onClose() }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4 }}>
          <X size={16} color="#5f6368" />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dadce0', borderRadius: 4, padding: '0 8px' }}>
          <MagnifyingGlass size={14} color="#80868b" />
          <input value={findText} onChange={e => setFindText(e.target.value)} placeholder="Find" autoFocus
            style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 6px', fontSize: 13, color: '#202124' }}
          />
        </div>
        <span style={{ fontSize: 12, color: '#80868b', whiteSpace: 'nowrap' }}>
          {matchCount > 0 ? `${currentMatch + 1} of ${matchCount}` : '0 results'}
        </span>
        <button onClick={goPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><ArrowUp size={16} color="#5f6368" /></button>
        <button onClick={goNext} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><ArrowDown size={16} color="#5f6368" /></button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <input value={replaceText} onChange={e => setReplaceText(e.target.value)} placeholder="Replace with"
          style={{ flex: 1, border: '1px solid #dadce0', borderRadius: 4, padding: '8px 12px', fontSize: 13, outline: 'none', color: '#202124' }}
        />
        <button onClick={replaceCurrent} style={{ padding: '6px 12px', background: '#f1f3f4', border: '1px solid #dadce0', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#3c4043' }}>Replace</button>
        <button onClick={replaceAll} style={{ padding: '6px 12px', background: '#f1f3f4', border: '1px solid #dadce0', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#3c4043' }}>All</button>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Match case', val: matchCase, set: setMatchCase },
          { label: 'Whole word', val: wholeWord, set: setWholeWord },
          { label: 'Regex', val: useRegex, set: setUseRegex },
        ].map(opt => (
          <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#5f6368', cursor: 'pointer' }}>
            <input type="checkbox" checked={opt.val} onChange={() => opt.set(!opt.val)} style={{ accentColor: '#1a73e8' }} />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}
