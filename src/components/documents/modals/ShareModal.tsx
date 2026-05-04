'use client'

import { X, CopySimple, CaretDown } from '@phosphor-icons/react'
import { useState } from 'react'
import type { SharedUser } from '@/types'
import { TEAM } from '@/lib/documents-data'

interface ShareModalProps {
  open: boolean
  onClose: () => void
  shared: SharedUser[]
  owner: SharedUser
  onUpdateShared: (users: SharedUser[]) => void
}

const ROLES = ['viewer', 'commenter', 'editor'] as const

export default function ShareModal({ open, onClose, shared, owner, onUpdateShared }: ShareModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'viewer' | 'commenter' | 'editor'>('viewer')
  const [linkAccess, setLinkAccess] = useState<'restricted' | 'anyone'>('restricted')
  const [linkRole, setLinkRole] = useState<'viewer' | 'commenter' | 'editor'>('viewer')
  const [notify, setNotify] = useState(true)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const addPerson = () => {
    if (!email.trim()) return
    const existing = shared.find(u => u.email === email.trim())
    if (existing) return
    const match = TEAM.find(t => t.email === email.trim())
    const newUser: SharedUser = match
      ? { ...match, role }
      : { id: `u-${Date.now()}`, name: email.split('@')[0], email: email.trim(), role, avatar: email.slice(0, 2).toUpperCase() }
    onUpdateShared([...shared, newUser])
    setEmail('')
  }

  const changeRole = (userId: string, newRole: 'viewer' | 'commenter' | 'editor') => {
    onUpdateShared(shared.map(u => u.id === userId ? { ...u, role: newRole } : u))
  }

  const removeUser = (userId: string) => {
    onUpdateShared(shared.filter(u => u.id !== userId))
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 12, width: 520, padding: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontFamily: "'Google Sans','DM Sans',sans-serif", maxHeight: '80vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 500, color: '#202124', margin: 0 }}>Share</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="#5f6368" />
          </button>
        </div>

        {/* Add people */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Add people and groups"
            onKeyDown={e => e.key === 'Enter' && addPerson()}
            style={{ flex: 1, border: '1px solid #dadce0', borderRadius: 4, padding: '10px 12px', fontSize: 13, outline: 'none', color: '#202124' }}
          />
          <select value={role} onChange={e => setRole(e.target.value as typeof role)}
            style={{ border: '1px solid #dadce0', borderRadius: 4, padding: '8px', fontSize: 13, color: '#3c4043', cursor: 'pointer' }}
          >
            <option value="viewer">Viewer</option>
            <option value="commenter">Commenter</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        {/* Notify */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#5f6368', marginBottom: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={notify} onChange={() => setNotify(!notify)} style={{ accentColor: '#1a73e8' }} />
          Notify people
        </label>

        {notify && (
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message (optional)"
            style={{ width: '100%', height: 60, border: '1px solid #dadce0', borderRadius: 4, padding: 8, fontSize: 13, resize: 'none', marginBottom: 16, outline: 'none', color: '#202124', fontFamily: 'inherit' }}
          />
        )}

        {/* Current access list */}
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 13, fontWeight: 500, color: '#202124', marginBottom: 8 }}>People with access</h4>
          
          {/* Owner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f3f4' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>
              {owner.avatar || owner.name.slice(0, 2)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#202124', fontWeight: 500 }}>{owner.name} (you)</div>
              <div style={{ fontSize: 12, color: '#80868b' }}>{owner.email}</div>
            </div>
            <span style={{ fontSize: 12, color: '#80868b', padding: '4px 8px', background: '#f1f3f4', borderRadius: 4 }}>Owner</span>
          </div>

          {shared.filter(u => u.id !== owner.id).map(u => (
            <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f3f4' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>
                {u.avatar || u.name.slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#202124' }}>{u.name}</div>
                <div style={{ fontSize: 12, color: '#80868b' }}>{u.email}</div>
              </div>
              <select value={u.role === 'owner' ? 'editor' : u.role} onChange={e => changeRole(u.id, e.target.value as 'viewer' | 'commenter' | 'editor')}
                style={{ border: 'none', fontSize: 12, color: '#5f6368', cursor: 'pointer', background: 'transparent' }}
              >
                <option value="viewer">Viewer</option>
                <option value="commenter">Commenter</option>
                <option value="editor">Editor</option>
              </select>
              <button onClick={() => removeUser(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <X size={14} color="#80868b" />
              </button>
            </div>
          ))}
        </div>

        {/* Link access */}
        <div style={{ marginBottom: 16, padding: 12, background: '#f8f9fa', borderRadius: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#202124', marginBottom: 8 }}>General access</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select value={linkAccess} onChange={e => setLinkAccess(e.target.value as 'restricted' | 'anyone')}
              style={{ border: '1px solid #dadce0', borderRadius: 4, padding: '6px 8px', fontSize: 12, color: '#3c4043', cursor: 'pointer', flex: 1 }}
            >
              <option value="restricted">Restricted</option>
              <option value="anyone">Anyone with the link</option>
            </select>
            {linkAccess === 'anyone' && (
              <select value={linkRole} onChange={e => setLinkRole(e.target.value as typeof linkRole)}
                style={{ border: '1px solid #dadce0', borderRadius: 4, padding: '6px 8px', fontSize: 12, color: '#3c4043', cursor: 'pointer' }}
              >
                <option value="viewer">Viewer</option>
                <option value="commenter">Commenter</option>
                <option value="editor">Editor</option>
              </select>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={copyLink} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            background: '#e8f0fe', color: '#1a73e8', border: 'none', borderRadius: 20,
            cursor: 'pointer', fontWeight: 500, fontSize: 13,
          }}>
            <CopySimple size={14} /> {copied ? 'Link copied!' : 'Copy link'}
          </button>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: '#1a73e8', color: '#fff', border: 'none',
            borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>Done</button>
        </div>
      </div>
    </div>
  )
}
