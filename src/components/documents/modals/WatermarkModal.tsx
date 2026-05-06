'use client'

import { useState } from 'react'

interface Props { open: boolean; onClose: () => void; onApply: (text: string, opacity: number, angle: number) => void }

const PRESETS = [
  { label: 'CONFIDENTIAL', text: 'CONFIDENTIAL' },
  { label: 'DRAFT', text: 'DRAFT' },
  { label: 'APPROVED', text: 'APPROVED' },
  { label: 'FOR REVIEW', text: 'FOR REVIEW' },
  { label: 'DO NOT COPY', text: 'DO NOT COPY' },
  { label: 'ORIGINAL', text: 'ORIGINAL' },
  { label: 'SAMPLE', text: 'SAMPLE' },
]

export default function WatermarkModal({ open, onClose, onApply }: Props) {
  const [text, setText] = useState('CONFIDENTIAL')
  const [opacity, setOpacity] = useState(15)
  const [angle, setAngle] = useState(-30)

  if (!open) return null

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--navy-light)', border:'1px solid var(--border)', width:440, boxShadow:'0 12px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>💧 Insert Watermark</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:18 }}>✕</button>
        </div>
        <div style={{ padding:'20px' }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', color:'var(--text-muted)', fontSize:11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Watermark Text</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} style={{ width:'100%', padding:'8px 12px', background:'var(--navy)', border:'1px solid var(--border)', color:'var(--text-primary)', fontSize:14, fontFamily:'var(--font-body)', boxSizing:'border-box' }} />
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => setText(p.text)} style={{ padding:'4px 10px', fontSize:11, border:'1px solid', borderColor: text === p.text ? 'var(--gold)' : 'var(--border)', background: text === p.text ? 'rgba(212,175,55,0.15)' : 'transparent', color: text === p.text ? 'var(--gold)' : 'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--font-mono)' }}>{p.label}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:16, marginBottom:16 }}>
            <div style={{ flex:1 }}>
              <label style={{ display:'block', color:'var(--text-muted)', fontSize:11, fontFamily:'var(--font-mono)', marginBottom:6 }}>Opacity: {opacity}%</label>
              <input type="range" min="5" max="40" value={opacity} onChange={e => setOpacity(Number(e.target.value))} style={{ width:'100%' }} />
            </div>
            <div style={{ flex:1 }}>
              <label style={{ display:'block', color:'var(--text-muted)', fontSize:11, fontFamily:'var(--font-mono)', marginBottom:6 }}>Angle: {angle}°</label>
              <input type="range" min="-60" max="60" value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ width:'100%' }} />
            </div>
          </div>
          {/* Preview */}
          <div style={{ height:120, background:'#fff', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', position:'relative', marginBottom:16 }}>
            <span style={{ fontSize:28, fontWeight:900, color:`rgba(0,0,0,${opacity/100})`, transform:`rotate(${angle}deg)`, letterSpacing:'0.2em', fontFamily:'var(--font-display)', userSelect:'none', textTransform:'uppercase' }}>{text}</span>
          </div>
        </div>
        <div style={{ padding:'12px 20px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button onClick={onClose} style={{ padding:'8px 16px', background:'transparent', border:'1px solid var(--border)', color:'var(--text-secondary)', cursor:'pointer', fontSize:12 }}>Cancel</button>
          <button onClick={() => { onApply(text, opacity, angle); onClose() }} style={{ padding:'8px 16px', background:'var(--gold)', color:'var(--onyx)', border:'none', cursor:'pointer', fontSize:12, fontWeight:600 }}>Apply Watermark</button>
        </div>
      </div>
    </div>
  )
}
