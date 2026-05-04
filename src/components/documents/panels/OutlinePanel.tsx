'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, ListDashes } from '@phosphor-icons/react'

interface OutlinePanelProps {
  open: boolean
  onClose: () => void
  editorRef: React.RefObject<HTMLDivElement | null>
}

interface HeadingItem {
  id: string
  text: string
  level: number
  element: Element
}

export default function OutlinePanel({ open, onClose, editorRef }: OutlinePanelProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])

  const scanHeadings = useCallback(() => {
    if (!editorRef.current) return
    const els = editorRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6')
    const items: HeadingItem[] = []
    els.forEach((el, i) => {
      const id = `outline-h-${i}`
      el.id = id
      items.push({ id, text: el.textContent || '(Untitled)', level: parseInt(el.tagName[1]), element: el })
    })
    setHeadings(items)
  }, [editorRef])

  useEffect(() => {
    if (!open) return
    scanHeadings()
    const interval = setInterval(scanHeadings, 2000)
    return () => clearInterval(interval)
  }, [open, scanHeadings])

  if (!open) return null

  return (
    <div style={{
      width: 240, borderRight: '1px solid #e0e0e0', background: '#fff', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f3f4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ListDashes size={16} color="#5f6368" />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#202124' }}>Outline</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
          <X size={14} color="#80868b" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {headings.length === 0 ? (
          <div style={{ padding: '24px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#80868b', lineHeight: 1.5 }}>
              No headings found. Add headings to your document to see them in the outline.
            </p>
          </div>
        ) : (
          headings.map(h => (
            <button
              key={h.id}
              onClick={() => h.element.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: `4px 16px 4px ${12 + (h.level - 1) * 16}px`,
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: h.level <= 2 ? 13 : 12,
                fontWeight: h.level <= 2 ? 500 : 400,
                color: '#3c4043', lineHeight: 1.8,
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f1f3f4')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {h.text}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
