'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useCmsStore } from '@/lib/store/useCmsStore'
import { X, Check, Pencil } from '@phosphor-icons/react'

// ── helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags and decode entities for plain-text display */
function htmlToText(html: string): string {
  if (typeof document === 'undefined') return html
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerText || div.textContent || ''
}

/** Wrap plain text back into the same HTML wrapper that the block uses */
function patchHtml(original: string, newText: string): string {
  // Simple approach: replace the human-readable text nodes while preserving tags.
  // For our use-case we just swap the visible text inside any wrapping element.
  // Strategy: find the outermost wrapper and replace its innerText.
  if (typeof document === 'undefined') return newText
  const div = document.createElement('div')
  div.innerHTML = original
  // Walk text nodes and replace their content proportionally
  // For simplicity, if the HTML is complex (multiple visible segments like stats grid),
  // we edit field-by-field via the structured editor instead.
  return original
}

// ── Inline text editor ────────────────────────────────────────────────────────

function InlineTextField({
  label,
  value,
  onSave,
  multiline = false,
}: {
  label: string
  value: string
  onSave: (v: string) => void
  multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      setDraft(value)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [editing, value])

  const commit = () => {
    onSave(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="space-y-1">
        <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{label}</label>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') cancel() }}
            rows={3}
            className="w-full bg-onyx border border-gold/40 text-white text-sm px-3 py-2 resize-none focus:outline-none focus:border-gold/80 rounded-sm"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel() }}
            className="w-full bg-onyx border border-gold/40 text-white text-sm px-3 py-2 focus:outline-none focus:border-gold/80 rounded-sm"
          />
        )}
        <div className="flex gap-2 justify-end">
          <button onClick={cancel} className="text-[11px] text-text-muted hover:text-white px-2 py-1 transition-colors">Cancel</button>
          <button onClick={commit} className="text-[11px] bg-gold text-navy font-bold px-3 py-1 hover:bg-gold/80 transition-colors flex items-center gap-1 rounded-sm">
            <Check size={12} weight="bold" /> Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group flex items-start justify-between gap-2 cursor-pointer hover:bg-gold/5 rounded px-2 py-1.5 -mx-2 transition-colors"
      onClick={() => setEditing(true)}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-text-primary leading-snug line-clamp-3 break-words">{value || <span className="italic text-text-muted">Empty</span>}</p>
      </div>
      <Pencil size={13} className="text-text-muted group-hover:text-gold shrink-0 mt-1 transition-colors" />
    </div>
  )
}

// ── Stats grid editor (for the 3-column stats block) ─────────────────────────

interface StatItem { label: string; value: string }

function parseStatsGrid(html: string): StatItem[] {
  if (typeof document === 'undefined') return []
  const div = document.createElement('div')
  div.innerHTML = html
  const centers = div.querySelectorAll('.text-center')
  const result: StatItem[] = []
  centers.forEach(c => {
    const p = c.querySelectorAll('p')
    result.push({ value: p[0]?.textContent?.trim() || '', label: p[1]?.textContent?.trim() || '' })
  })
  return result
}

function rebuildStatsGrid(original: string, stats: StatItem[]): string {
  if (typeof document === 'undefined') return original
  const div = document.createElement('div')
  div.innerHTML = original
  const centers = div.querySelectorAll('.text-center')
  centers.forEach((c, i) => {
    if (!stats[i]) return
    const p = c.querySelectorAll('p')
    if (p[0]) p[0].textContent = stats[i].value
    if (p[1]) p[1].textContent = stats[i].label
  })
  return div.innerHTML
}

function StatsGridEditor({ html, onChange }: { html: string; onChange: (v: string) => void }) {
  const items = parseStatsGrid(html)

  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Statistics</p>
      {items.map((item, i) => (
        <div key={i} className="border border-gold/10 rounded-sm p-2 space-y-1.5">
          <InlineTextField
            label={`Stat ${i + 1} — Value`}
            value={item.value}
            onSave={v => {
              const newItems = items.map((s, j) => j === i ? { ...s, value: v } : s)
              onChange(rebuildStatsGrid(html, newItems))
            }}
          />
          <InlineTextField
            label={`Stat ${i + 1} — Label`}
            value={item.label}
            onSave={v => {
              const newItems = items.map((s, j) => j === i ? { ...s, label: v } : s)
              onChange(rebuildStatsGrid(html, newItems))
            }}
          />
        </div>
      ))}
    </div>
  )
}

// ── Heading + body extractor for simple TextBlocks ────────────────────────────

function isStatsBlock(html: string): boolean {
  return html.includes('grid-cols-3') && html.includes('text-center')
}

function getTextSegments(html: string): Array<{ tag: string; text: string; selector: string }> {
  if (typeof document === 'undefined') return []
  const div = document.createElement('div')
  div.innerHTML = html
  const segments: Array<{ tag: string; text: string; selector: string }> = []
  const seen = new Set<Node>()
  div.querySelectorAll('h1, h2, h3, h4, p, li, a').forEach((el, i) => {
    if (seen.has(el)) return
    const text = el.textContent?.trim() || ''
    if (text) {
      seen.add(el)
      segments.push({ tag: el.tagName.toLowerCase(), text, selector: `seg-${i}` })
    }
  })
  return segments
}

function patchSegment(html: string, segIndex: number, newText: string): string {
  if (typeof document === 'undefined') return html
  const div = document.createElement('div')
  div.innerHTML = html
  const elements = Array.from(div.querySelectorAll('h1, h2, h3, h4, p, li, a'))
  const seen = new Set<Node>()
  const unique: Element[] = []
  elements.forEach(el => {
    if (!seen.has(el) && el.textContent?.trim()) { seen.add(el); unique.push(el) }
  })
  if (unique[segIndex]) {
    // preserve child elements (like <strong>) but update text-only nodes
    const el = unique[segIndex]
    if (el.children.length === 0) {
      el.textContent = newText
    } else {
      // replace all text nodes, keep child elements intact
      Array.from(el.childNodes).forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) n.textContent = newText
      })
    }
  }
  return div.innerHTML
}

// ── SmartHtmlEditor ───────────────────────────────────────────────────────────

function SmartHtmlEditor({ html, onChange }: { html: string; onChange: (v: string) => void }) {
  if (isStatsBlock(html)) {
    return <StatsGridEditor html={html} onChange={onChange} />
  }

  const segments = getTextSegments(html)

  if (segments.length === 0) {
    return (
      <InlineTextField
        label="Content"
        value={html}
        onSave={onChange}
        multiline
      />
    )
  }

  const tagLabel: Record<string, string> = {
    h1: 'Heading', h2: 'Heading', h3: 'Sub-heading', h4: 'Sub-heading',
    p: 'Paragraph', li: 'List item', a: 'Link'
  }

  return (
    <div className="space-y-2">
      {segments.map((seg, i) => (
        <InlineTextField
          key={seg.selector}
          label={tagLabel[seg.tag] || seg.tag}
          value={seg.text}
          multiline={seg.tag === 'p' || seg.tag === 'li'}
          onSave={v => onChange(patchSegment(html, i, v))}
        />
      ))}
    </div>
  )
}

// ── Main PropertyPanel ────────────────────────────────────────────────────────

export function PropertyPanel() {
  const { blocks, selectedBlockId, updateBlock, selectBlock } = useCmsStore()
  const [editingMode, setEditingMode] = useState(false)

  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)
    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  if (!editingMode || !selectedBlockId) return null

  const block = blocks.find(b => b.id === selectedBlockId)
  if (!block) return null

  const handleChange = (key: string, value: string) => {
    updateBlock(selectedBlockId, { [key]: value })
  }

  const friendlyLabel = (key: string) => {
    const map: Record<string, string> = {
      label: 'Label', value: 'Value', trend: 'Trend / Note',
      title: 'Title', content: 'Content', name: 'Name',
      bgColour: 'Background colour', borderColour: 'Border colour',
      overlayText: 'Overlay text', alt: 'Alt text',
      col1Html: 'Left column', col2Html: 'Right column',
      src: 'Image URL', image: 'Image URL',
    }
    return map[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
  }

  return (
    <div className="fixed right-6 top-32 w-80 bg-navy/97 backdrop-blur-xl border border-gold/30 shadow-2xl z-[200] flex flex-col rounded-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gold/15 bg-gold/5">
        <h3 className="text-gold font-display font-semibold text-sm">Edit: {block.type}</h3>
        <button onClick={() => selectBlock(null)} className="text-text-muted hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[65vh] space-y-5">
        {Object.entries(block.props).map(([key, value]) => {
          // Colour fields — simple pill swatch picker
          if (key === 'bgColour' || key === 'borderColour' || key === 'colour') {
            const presets = ['#0A1128', '#121212', '#1a2240', 'rgba(10,17,40,0.5)', 'rgba(212,175,55,0.1)', 'rgba(212,175,55,0.25)', '#D4AF37', '#FFFFFF', 'transparent']
            return (
              <div key={key} className="space-y-2">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{friendlyLabel(key)}</p>
                <div className="flex flex-wrap gap-2">
                  {presets.map(swatch => (
                    <button
                      key={swatch}
                      onClick={() => handleChange(key, swatch)}
                      title={swatch}
                      style={{ backgroundColor: swatch }}
                      className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${value === swatch ? 'border-gold scale-110' : 'border-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            )
          }

          // Image URL
          if (key === 'src' || key === 'image') {
            return (
              <InlineTextField
                key={key}
                label={friendlyLabel(key)}
                value={String(value)}
                onSave={v => handleChange(key, v)}
              />
            )
          }

          // HTML content — use smart editor
          if (key === 'text' || key === 'col1Html' || key === 'col2Html' || (typeof value === 'string' && value.trim().startsWith('<'))) {
            return (
              <div key={key} className="space-y-1">
                {(key === 'col1Html' || key === 'col2Html') && (
                  <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{friendlyLabel(key)}</p>
                )}
                <SmartHtmlEditor
                  html={String(value)}
                  onChange={v => handleChange(key, v)}
                />
              </div>
            )
          }

          // Plain text / number fields
          return (
            <InlineTextField
              key={key}
              label={friendlyLabel(key)}
              value={String(value)}
              onSave={v => handleChange(key, v)}
            />
          )
        })}
      </div>

      <div className="px-4 py-2 border-t border-gold/10 bg-navy/50">
        <p className="text-[10px] text-text-muted font-mono text-center">Click a field to edit it. Changes save when you click Save Page.</p>
      </div>
    </div>
  )
}
