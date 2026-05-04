'use client'

import { useState } from 'react'
import { X, Clock, File, ChatCircle, Plus, Paperclip, UserCircle } from '@phosphor-icons/react'
import type { Board, BoardItem, BoardColumn } from '@/types/board'
import { getStatusLabel, getPriorityLabel, getTeamMember } from '@/lib/board-data'

interface ItemDetailPanelProps {
  item: BoardItem
  board: Board
  onClose: () => void
  onUpdate: (itemId: string, colId: string, value: unknown) => void
}

export default function ItemDetailPanel({ item, board, onClose, onUpdate }: ItemDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'updates' | 'files' | 'activity'>('updates')
  const [newUpdate, setNewUpdate] = useState('')

  return (
    <div style={{
      width: 500, background: 'var(--navy)', borderLeft: '1px solid rgba(212,175,55,0.15)',
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      {/* ── Header ──── */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#D4AF37', margin: 0, fontFamily: 'var(--font-display)' }}>
            {item.name}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.4)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>
        
        {/* Properties overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          {board.columns.slice(0, 4).map(col => (
            <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{col.name}</span>
              <div style={{ fontSize: 13, color: '#F5F0E8' }}>
                {col.type === 'status' && (getStatusLabel(board, item.values[col.id])?.text || '—')}
                {col.type === 'priority' && (getPriorityLabel(item.values[col.id])?.text || '—')}
                {col.type === 'date' && (item.values[col.id] ? new Date(item.values[col.id] as string).toLocaleDateString() : '—')}
                {col.type === 'people' && ((item.values[col.id] as string[] || []).map(id => getTeamMember(id)?.name).join(', ') || '—')}
                {col.type === 'text' && (item.values[col.id] as string || '—')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ──── */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '0 24px' }}>
        {[
          { id: 'updates', label: 'Updates', icon: <ChatCircle size={14} /> },
          { id: 'files', label: 'Files', icon: <File size={14} /> },
          { id: 'activity', label: 'Activity Log', icon: <Clock size={14} /> },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', background: 'none',
              border: 'none', borderBottom: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeTab === tab.id ? '#D4AF37' : 'rgba(245,240,232,0.4)',
              fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 500, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content ──── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {activeTab === 'updates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* New Update Box */}
            <div style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, overflow: 'hidden' }}>
              <textarea
                value={newUpdate}
                onChange={e => setNewUpdate(e.target.value)}
                placeholder="Write an update..."
                style={{ width: '100%', height: 100, padding: 16, background: 'transparent', border: 'none', outline: 'none', color: '#F5F0E8', fontSize: 13, resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'rgba(10,17,40,0.4)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer', padding: 4 }}><Paperclip size={16} /></button>
                </div>
                <button
                  style={{ background: '#D4AF37', color: '#0A1128', border: 'none', borderRadius: 4, padding: '6px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: newUpdate.trim() ? 1 : 0.5 }}
                >
                  Update
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(245,240,232,0.4)' }}>
              <ChatCircle size={32} weight="light" style={{ marginBottom: 12, opacity: 0.5 }} />
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#F5F0E8' }}>No updates yet</div>
              <div style={{ fontSize: 13 }}>Write the first update for this item.</div>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(245,240,232,0.4)' }}>
            <File size={32} weight="light" style={{ marginBottom: 12, opacity: 0.5 }} />
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#F5F0E8' }}>No files uploaded</div>
            <button style={{ marginTop: 12, background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', borderRadius: 4, padding: '6px 16px', fontSize: 13, cursor: 'pointer' }}>
              Upload File
            </button>
          </div>
        )}

        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <UserCircle size={24} color="rgba(245,240,232,0.4)" />
              <div>
                <div style={{ fontSize: 13, color: '#F5F0E8' }}><span style={{ fontWeight: 600 }}>System</span> created this item</div>
                <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)' }}>Just now</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
