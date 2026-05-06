'use client'

import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  documentTitle: string
  documentContent: string
  owner: string
  created: string
  lastModified: string
  wordCount: number
  charCount: number
  shared: { name: string; role: string }[]
}

export default function DocumentDetailsModal({ open, onClose, documentTitle, documentContent, owner, created, lastModified, wordCount, charCount, shared }: Props) {
  if (!open) return null

  const sizeBytes = new Blob([documentContent]).size
  const sizeLabel = sizeBytes < 1024 ? `${sizeBytes} B` : sizeBytes < 1024 * 1024 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`

  // Count various elements
  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null
  if (tempDiv) tempDiv.innerHTML = documentContent
  const headingCount = tempDiv?.querySelectorAll('h1,h2,h3,h4,h5,h6').length || 0
  const imageCount = tempDiv?.querySelectorAll('img').length || 0
  const tableCount = tempDiv?.querySelectorAll('table').length || 0
  const linkCount = tempDiv?.querySelectorAll('a').length || 0
  const listCount = tempDiv?.querySelectorAll('ul,ol').length || 0

  const rows = [
    { label: 'Title', value: documentTitle },
    { label: 'Owner', value: owner },
    { label: 'Created', value: new Date(created).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { label: 'Last Modified', value: new Date(lastModified).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
    { label: 'Size', value: sizeLabel },
    { label: 'Words', value: wordCount.toLocaleString() },
    { label: 'Characters', value: charCount.toLocaleString() },
    { label: 'Headings', value: headingCount.toString() },
    { label: 'Images', value: imageCount.toString() },
    { label: 'Tables', value: tableCount.toString() },
    { label: 'Links', value: linkCount.toString() },
    { label: 'Lists', value: listCount.toString() },
    { label: 'Shared with', value: `${shared.length} people` },
  ]

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--navy-light)', border:'1px solid var(--border)', width:420, boxShadow:'0 12px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>📋 Document Details</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:18 }}>✕</button>
        </div>
        <div style={{ padding:'16px 20px' }}>
          {rows.map(r => (
            <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color:'var(--text-muted)', fontSize:12, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{r.label}</span>
              <span style={{ color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)', fontWeight:500, textAlign:'right', maxWidth:250, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.value}</span>
            </div>
          ))}
          {shared.length > 0 && (
            <div style={{ marginTop:12, padding:12, background:'rgba(212,175,55,0.04)', border:'1px solid var(--border)' }}>
              <p style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.1em' }}>People with access</p>
              {shared.map((u, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0' }}>
                  <span style={{ color:'var(--text-primary)', fontSize:12 }}>{u.name}</span>
                  <span style={{ color:'var(--gold)', fontSize:10, fontFamily:'var(--font-mono)', textTransform:'uppercase' }}>{u.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding:'12px 20px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'6px 16px', background:'var(--gold)', color:'var(--onyx)', border:'none', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'var(--font-body)' }}>Close</button>
        </div>
      </div>
    </div>
  )
}
