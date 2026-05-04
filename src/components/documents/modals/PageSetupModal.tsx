'use client'

import { X } from '@phosphor-icons/react'
import { useState } from 'react'

interface PageSetupProps {
  open: boolean
  onClose: () => void
  onApply: (settings: PageSettings) => void
  current: PageSettings
}

export interface PageSettings {
  pageSize: string
  orientation: 'portrait' | 'landscape'
  marginTop: number
  marginBottom: number
  marginLeft: number
  marginRight: number
  pageColour: string
}

const PAGE_SIZES = ['A4', 'A3', 'Letter', 'Legal', 'Tabloid', 'Custom']
const SIZE_DIMS: Record<string, { w: number; h: number }> = {
  A4: { w: 21, h: 29.7 }, A3: { w: 29.7, h: 42 },
  Letter: { w: 21.6, h: 27.9 }, Legal: { w: 21.6, h: 35.6 },
  Tabloid: { w: 27.9, h: 43.2 }, Custom: { w: 21, h: 29.7 },
}

export default function PageSetupModal({ open, onClose, onApply, current }: PageSetupProps) {
  const [settings, setSettings] = useState<PageSettings>(current)

  if (!open) return null

  const update = (key: keyof PageSettings, val: string | number) => {
    setSettings(prev => ({ ...prev, [key]: val }))
  }

  const inputStyle = {
    width: '100%', padding: '8px 10px', border: '1px solid #dadce0', borderRadius: 4,
    fontSize: 13, outline: 'none', color: '#202124', fontFamily: "'DM Sans',sans-serif",
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 8, width: 440, padding: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontFamily: "'Google Sans','DM Sans',sans-serif",
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: '#202124', margin: 0 }}>Page setup</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="#5f6368" />
          </button>
        </div>

        {/* Page Size */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5f6368', display: 'block', marginBottom: 4 }}>Page size</label>
          <select value={settings.pageSize} onChange={e => update('pageSize', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {PAGE_SIZES.map(s => <option key={s} value={s}>{s} {SIZE_DIMS[s] ? `(${SIZE_DIMS[s].w} × ${SIZE_DIMS[s].h} cm)` : ''}</option>)}
          </select>
        </div>

        {/* Orientation */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5f6368', display: 'block', marginBottom: 8 }}>Orientation</label>
          <div style={{ display: 'flex', gap: 16 }}>
            {(['portrait', 'landscape'] as const).map(o => (
              <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3c4043', cursor: 'pointer' }}>
                <input type="radio" checked={settings.orientation === o} onChange={() => update('orientation', o)} style={{ accentColor: '#1a73e8' }} />
                {o.charAt(0).toUpperCase() + o.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Margins */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5f6368', display: 'block', marginBottom: 8 }}>Margins (cm)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {([['marginTop', 'Top'], ['marginBottom', 'Bottom'], ['marginLeft', 'Left'], ['marginRight', 'Right']] as const).map(([key, label]) => (
              <div key={key}>
                <span style={{ fontSize: 11, color: '#80868b' }}>{label}</span>
                <input type="number" value={settings[key]} onChange={e => update(key, parseFloat(e.target.value) || 0)}
                  style={{ ...inputStyle, marginTop: 2 }} step="0.1" min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Page Colour */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5f6368', display: 'block', marginBottom: 4 }}>Page colour</label>
          <input type="color" value={settings.pageColour} onChange={e => update('pageColour', e.target.value)}
            style={{ width: 40, height: 32, border: '1px solid #dadce0', borderRadius: 4, cursor: 'pointer', padding: 0 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{
            padding: '8px 20px', background: '#fff', color: '#1a73e8', border: '1px solid #dadce0',
            borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}>Cancel</button>
          <button onClick={() => { onApply(settings); onClose() }} style={{
            padding: '8px 20px', background: '#1a73e8', color: '#fff', border: 'none',
            borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>OK</button>
        </div>
      </div>
    </div>
  )
}
