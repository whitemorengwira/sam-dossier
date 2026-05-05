import { X, Plug, Plus } from '@phosphor-icons/react'
import type { Board } from '@/types/board'

export default function IntegrationsPanel({ board, onClose }: { board: Board; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
      background: 'var(--navy)', borderLeft: '1px solid rgba(212,175,55,0.2)',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plug size={20} color="#D4AF37" weight="duotone" />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F5F0E8', margin: 0 }}>Board Integrations</h2>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 24 }}>
          Connect SAM Dossier to your external tools to sync data and automate actions across platforms.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { name: 'Slack', color: '#E01E5A', status: 'Connect' },
            { name: 'Teams', color: '#6264A7', status: 'Connect' },
            { name: 'Gmail', color: '#EA4335', status: 'Connect' },
            { name: 'Jira', color: '#0052CC', status: 'Connect' },
            { name: 'GitHub', color: '#ffffff', status: 'Connect' },
            { name: 'Drive', color: '#0F9D58', status: 'Connect' },
          ].map((app, i) => (
            <div key={i} style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 6, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: `1px solid ${app.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: app.color, fontWeight: 'bold' }}>
                {app.name[0]}
              </div>
              <span style={{ fontSize: 13, color: '#F5F0E8', fontWeight: 500 }}>{app.name}</span>
              <button style={{ width: '100%', padding: '6px', background: 'rgba(212,175,55,0.1)', border: `1px solid rgba(212,175,55,0.2)`, color: '#D4AF37', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                {app.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
