'use client'

import { X } from '@phosphor-icons/react'

interface KeyboardShortcutsProps {
  open: boolean
  onClose: () => void
}

const SHORTCUTS = [
  { category: 'Common actions', items: [
    ['Bold', 'Ctrl+B'], ['Italic', 'Ctrl+I'], ['Underline', 'Ctrl+U'],
    ['Undo', 'Ctrl+Z'], ['Redo', 'Ctrl+Y'], ['Print', 'Ctrl+P'],
    ['Find and replace', 'Ctrl+H'], ['Insert link', 'Ctrl+K'],
    ['Select all', 'Ctrl+A'], ['Copy', 'Ctrl+C'], ['Cut', 'Ctrl+X'], ['Paste', 'Ctrl+V'],
    ['Paste without formatting', 'Ctrl+Shift+V'],
  ]},
  { category: 'Navigation', items: [
    ['Search menus', 'Alt+/'], ['Open keyboard shortcuts', 'Ctrl+/'],
    ['Word count', 'Ctrl+Shift+C'], ['Version history', 'Ctrl+Shift+H'],
    ['Full screen', 'Ctrl+Shift+F'], ['Dictionary', 'Ctrl+Shift+Y'],
    ['Voice typing', 'Ctrl+Shift+S'], ['Insert comment', 'Ctrl+Alt+M'],
  ]},
  { category: 'Text formatting', items: [
    ['Increase font size', 'Ctrl+Shift+>'], ['Decrease font size', 'Ctrl+Shift+<'],
    ['Superscript', 'Ctrl+.'], ['Subscript', 'Ctrl+,'],
    ['Strikethrough', 'Alt+Shift+5'], ['Clear formatting', 'Ctrl+\\'],
  ]},
  { category: 'Paragraph formatting', items: [
    ['Increase indent', 'Tab'], ['Decrease indent', 'Shift+Tab'],
    ['Numbered list', 'Ctrl+Shift+7'], ['Bullet list', 'Ctrl+Shift+8'],
    ['Align left', 'Ctrl+Shift+L'], ['Align centre', 'Ctrl+Shift+E'],
    ['Align right', 'Ctrl+Shift+R'], ['Justify', 'Ctrl+Shift+J'],
  ]},
]

export default function KeyboardShortcutsModal({ open, onClose }: KeyboardShortcutsProps) {
  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 8, width: 560, maxHeight: '80vh', overflowY: 'auto',
        padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontFamily: "'Google Sans','DM Sans',sans-serif",
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 500, color: '#202124', margin: 0 }}>Keyboard shortcuts</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4 }}>
            <X size={18} color="#5f6368" />
          </button>
        </div>

        {SHORTCUTS.map(section => (
          <div key={section.category} style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              {section.category}
            </h4>
            {section.items.map(([label, shortcut]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f3f4' }}>
                <span style={{ fontSize: 13, color: '#3c4043' }}>{label}</span>
                <kbd style={{
                  background: '#f1f3f4', padding: '2px 8px', borderRadius: 4, fontSize: 12,
                  fontFamily: "'JetBrains Mono',monospace", color: '#5f6368', border: '1px solid #e0e0e0',
                }}>{shortcut}</kbd>
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: '#1a73e8', color: '#fff', border: 'none',
            borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>Close</button>
        </div>
      </div>
    </div>
  )
}
