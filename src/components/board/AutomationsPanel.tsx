import { X, Lightning, Plus } from '@phosphor-icons/react'
import type { Board } from '@/types/board'

export default function AutomationsPanel({ board, onClose }: { board: Board; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
      background: 'var(--navy)', borderLeft: '1px solid rgba(212,175,55,0.2)',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lightning size={20} color="#D4AF37" weight="duotone" />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F5F0E8', margin: 0 }}>Board Automations</h2>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 24 }}>
          Set up rules to automate your workflow. When an event occurs, an action is triggered automatically.
        </p>

        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '10px 16px', background: 'rgba(212,175,55,0.1)', border: '1px dashed rgba(212,175,55,0.4)', color: '#D4AF37', borderRadius: 4, cursor: 'pointer', marginBottom: 24, fontSize: 14, fontWeight: 500 }}>
          <Plus size={16} /> Create Custom Automation
        </button>

        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Suggested Automations</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { trigger: 'When status changes to Done', action: 'Notify assignee' },
            { trigger: 'When date arrives', action: 'Change status to Working on it' },
            { trigger: 'When item is created', action: 'Assign to creator' },
          ].map((auto, i) => (
            <div key={i} style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 6, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#F5F0E8' }}>{auto.trigger}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 1, height: 12, background: 'rgba(212,175,55,0.4)', marginLeft: 8 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 13, color: '#D4AF37' }}>{auto.action}</span>
              </div>
              <button style={{ marginTop: 12, width: '100%', padding: '6px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                Add to Board
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
