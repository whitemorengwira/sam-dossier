'use client'

import { X } from '@phosphor-icons/react'
import { useState } from 'react'

interface WordCountProps {
  open: boolean
  onClose: () => void
  pages: number
  words: number
  characters: number
  charsNoSpaces: number
  onToggleLive: (enabled: boolean) => void
  liveEnabled: boolean
}

export default function WordCountModal({ open, onClose, pages, words, characters, charsNoSpaces, onToggleLive, liveEnabled }: WordCountProps) {
  if (!open) return null

  const rows = [
    { label: 'Pages', value: pages },
    { label: 'Words', value: words },
    { label: 'Characters', value: characters },
    { label: 'Characters excluding spaces', value: charsNoSpaces },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 8, width: 360, padding: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontFamily: "'Google Sans','DM Sans',sans-serif",
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: '#202124', margin: 0 }}>Word count</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="#5f6368" />
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <tbody>
            {rows.map(r => (
              <tr key={r.label}>
                <td style={{ padding: '8px 0', fontSize: 14, color: '#3c4043', borderBottom: '1px solid #f1f3f4' }}>{r.label}</td>
                <td style={{ padding: '8px 0', fontSize: 14, color: '#202124', fontWeight: 500, textAlign: 'right', borderBottom: '1px solid #f1f3f4' }}>
                  {r.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#5f6368', cursor: 'pointer' }}>
          <input type="checkbox" checked={liveEnabled} onChange={() => onToggleLive(!liveEnabled)} style={{ accentColor: '#1a73e8' }} />
          Display word count while typing
        </label>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: '#1a73e8', color: '#fff', border: 'none',
            borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>OK</button>
        </div>
      </div>
    </div>
  )
}
