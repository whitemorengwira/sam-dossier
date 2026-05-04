'use client'

import { useState } from 'react'
import type { Board } from '@/types/board'
import { CheckCircle } from '@phosphor-icons/react'

interface FormViewProps {
  board: Board
}

export default function FormView({ board }: FormViewProps) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <CheckCircle size={64} color="#00c875" weight="fill" style={{ marginBottom: 24 }} />
        <h2 style={{ fontSize: 24, color: '#F5F0E8', marginBottom: 12, fontWeight: 600 }}>Thank you!</h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: 32 }}>Your response has been submitted successfully.</p>
        <button onClick={() => setSubmitted(false)} style={{ background: '#D4AF37', color: '#0A1128', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto', background: 'var(--navy)' }}>
      <div style={{ width: '100%', maxWidth: 600, background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '32px 40px', background: 'rgba(212,175,55,0.05)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#D4AF37', margin: '0 0 8px 0', fontFamily: 'var(--font-display)' }}>
            {board.name}
          </h2>
          {board.description && <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.6)', margin: 0 }}>{board.description}</p>}
        </div>

        <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Item Name Field */}
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>Item Name *</label>
            <input type="text" placeholder="Enter item name" required
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 4, color: '#F5F0E8', fontSize: 14, outline: 'none' }}
            />
          </div>

          {/* Dynamic Columns */}
          {board.columns.map(col => {
            if (col.type === 'people' || col.type === 'timeline') return null // Skip complex types in basic form

            return (
              <div key={col.id}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>{col.name}</label>
                
                {col.type === 'text' && (
                  <input type="text" placeholder={`Enter ${col.name.toLowerCase()}`}
                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 4, color: '#F5F0E8', fontSize: 14, outline: 'none' }}
                  />
                )}

                {col.type === 'date' && (
                  <input type="date"
                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 4, color: '#F5F0E8', fontSize: 14, outline: 'none' }}
                  />
                )}

                {col.type === 'status' && (
                  <select style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 4, color: '#F5F0E8', fontSize: 14, outline: 'none', cursor: 'pointer' }}>
                    <option value="">Select status</option>
                    {board.statusLabels.map(l => (
                      <option key={l.id} value={l.id}>{l.text}</option>
                    ))}
                  </select>
                )}

                {col.type === 'priority' && (
                  <select style={{ width: '100%', padding: '10px 14px', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 4, color: '#F5F0E8', fontSize: 14, outline: 'none', cursor: 'pointer' }}>
                    <option value="">Select priority</option>
                    <option value="pr-1">Critical</option>
                    <option value="pr-2">High</option>
                    <option value="pr-3">Medium</option>
                    <option value="pr-4">Low</option>
                  </select>
                )}
              </div>
            )
          })}

          <button onClick={() => setSubmitted(true)} style={{ marginTop: 16, background: '#D4AF37', color: '#0A1128', border: 'none', borderRadius: 4, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#e6c85c'}
            onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
