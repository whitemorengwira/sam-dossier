'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Table, Kanban, ChartLine, CalendarDots, ChartPie, CaretDown, CaretRight,
  Plus, DotsThree, MagnifyingGlass, FunnelSimple, SortAscending,
  Star, Lightning, Plug, Eye, EyeSlash, Check, X, Pencil, Trash, Users,
} from '@phosphor-icons/react'
import { loadBoard, saveBoard, getStatusLabel, getPriorityLabel, getTeamMember, DEFAULT_STATUSES, PRIORITY_LABELS } from '@/lib/board-data'
import type { Board, BoardGroup, BoardItem, BoardView, StatusLabel } from '@/types/board'
import TimelineView from '@/components/board/TimelineView'
import CalendarView from '@/components/board/CalendarView'
import ChartView from '@/components/board/ChartView'
import FormView from '@/components/board/FormView'
import ItemDetailPanel from '@/components/board/ItemDetailPanel'
import AutomationsPanel from '@/components/board/AutomationsPanel'
import IntegrationsPanel from '@/components/board/IntegrationsPanel'

/* ── View icons ──── */
const VIEW_ICONS: Record<string, React.ReactNode> = {
  table: <Table size={16} weight="duotone" />,
  kanban: <Kanban size={16} weight="duotone" />,
  timeline: <ChartLine size={16} weight="duotone" />,
  calendar: <CalendarDots size={16} weight="duotone" />,
  chart: <ChartPie size={16} weight="duotone" />,
  form: <Plug size={16} weight="duotone" />,
}

export default function BoardsPage() {
  const [board, setBoard] = useState<Board | null>(null)
  const [activeView, setActiveView] = useState('v-table')
  const [search, setSearch] = useState('')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editingGroup, setEditingGroup] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [editingCell, setEditingCell] = useState<{ itemId: string; colId: string } | null>(null)
  const [showStatusPicker, setShowStatusPicker] = useState<{ itemId: string; colId: string } | null>(null)
  const [detailItem, setDetailItem] = useState<BoardItem | null>(null)
  const [showAutomations, setShowAutomations] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showColumnPicker, setShowColumnPicker] = useState(false)

  useEffect(() => {
    const b = loadBoard()
    if (!b.views.find(v => v.id === 'v-form')) {
      b.views.push({ id: 'v-form', name: 'Form', type: 'form' })
    }
    setBoard(b)
  }, [])

  const persist = (b: Board) => { setBoard(b); saveBoard(b) }

  /* ── Item CRUD ──── */
  const addItem = (groupId: string) => {
    if (!board) return
    const group = board.groups.find(g => g.id === groupId)
    if (!group) return
    const newItem: BoardItem = {
      id: `item-${Date.now()}`, groupId, name: 'New item',
      position: group.items.length, values: { 'col-status': 'st-1' },
    }
    const updated = { ...board, groups: board.groups.map(g => g.id === groupId ? { ...g, items: [...g.items, newItem] } : g) }
    persist(updated)
    setEditingItem(newItem.id)
  }

  const updateItemName = (itemId: string, name: string) => {
    if (!board) return
    const updated = { ...board, groups: board.groups.map(g => ({ ...g, items: g.items.map(i => i.id === itemId ? { ...i, name } : i) })) }
    persist(updated)
  }

  const updateItemValue = (itemId: string, colId: string, value: unknown) => {
    if (!board) return
    const updated = { ...board, groups: board.groups.map(g => ({ ...g, items: g.items.map(i => i.id === itemId ? { ...i, values: { ...i.values, [colId]: value } } : i) })) }
    persist(updated)
    setEditingCell(null)
    setShowStatusPicker(null)
  }

  const deleteItem = (itemId: string) => {
    if (!board) return
    const updated = { ...board, groups: board.groups.map(g => ({ ...g, items: g.items.filter(i => i.id !== itemId) })) }
    persist(updated)
  }

  const toggleGroup = (groupId: string) => {
    if (!board) return
    const updated = { ...board, groups: board.groups.map(g => g.id === groupId ? { ...g, collapsed: !g.collapsed } : g) }
    persist(updated)
  }

  const toggleItemSelect = (id: string) => {
    setSelectedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  /* ── Filtered items ──── */
  const filteredGroups = useMemo(() => {
    if (!board) return []
    if (!search) return board.groups
    const q = search.toLowerCase()
    return board.groups.map(g => ({
      ...g,
      items: g.items.filter(i => i.name.toLowerCase().includes(q)),
    })).filter(g => g.items.length > 0)
  }, [board, search])

  if (!board) return <div style={{ padding: 40, color: '#F5F0E8' }}>Loading board…</div>

  const currentView = board.views.find(v => v.id === activeView) || board.views[0]

  /* ── Status cell renderer ──── */
  const renderStatusCell = (item: BoardItem, colId: string, labels: StatusLabel[]) => {
    const val = item.values[colId] as string | undefined
    const label = labels.find(l => l.id === val)
    const isOpen = showStatusPicker?.itemId === item.id && showStatusPicker?.colId === colId

    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowStatusPicker(isOpen ? null : { itemId: item.id, colId })}
          style={{
            background: label?.colour || '#c4c4c4', color: '#fff', border: 'none',
            padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            width: '100%', textAlign: 'center', minHeight: 28,
          }}
        >
          {label?.text || 'Not set'}
        </button>
        {isOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 50, background: 'rgba(10,17,40,0.95)', border: '1px solid rgba(212,175,55,0.2)', minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            {labels.map(l => (
              <button key={l.id} onClick={() => updateItemValue(item.id, colId, l.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#F5F0E8', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 12, height: 12, background: l.colour, borderRadius: 2 }} />
                {l.text}
                {val === l.id && <Check size={12} style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ── People cell ──── */
  const renderPeopleCell = (item: BoardItem, colId: string) => {
    const ids = (item.values[colId] as string[] | undefined) || []
    return (
      <div style={{ display: 'flex', gap: 2 }}>
        {ids.map(id => {
          const m = getTeamMember(id)
          return m ? (
            <div key={id} style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: '#D4AF37' }} title={m.name}>
              {m.avatar}
            </div>
          ) : null
        })}
      </div>
    )
  }

  /* ── Date cell ──── */
  const renderDateCell = (item: BoardItem, colId: string) => {
    const val = item.values[colId] as string | undefined
    const isEditing = editingCell?.itemId === item.id && editingCell?.colId === colId
    const isOverdue = val && new Date(val) < new Date()

    if (isEditing) {
      return <input type="date" defaultValue={val} autoFocus onBlur={e => updateItemValue(item.id, colId, e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 12, outline: 'none', width: '100%' }} />
    }
    return (
      <span onClick={() => setEditingCell({ itemId: item.id, colId })} style={{ cursor: 'pointer', fontSize: 12, color: isOverdue ? '#e2445c' : 'rgba(245,240,232,0.6)' }}>
        {val ? new Date(val).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
      </span>
    )
  }

  /* ── Text cell ──── */
  const renderTextCell = (item: BoardItem, colId: string) => {
    const val = (item.values[colId] as string) || ''
    const isEditing = editingCell?.itemId === item.id && editingCell?.colId === colId

    if (isEditing) {
      return <input type="text" defaultValue={val} autoFocus onBlur={e => updateItemValue(item.id, colId, e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 12, outline: 'none', width: '100%' }} />
    }
    return <span onClick={() => setEditingCell({ itemId: item.id, colId })} style={{ cursor: 'pointer', fontSize: 12, color: 'rgba(245,240,232,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{val || '—'}</span>
  }

  /* ── Other simple cells ──── */
  const renderNumberCell = (item: BoardItem, colId: string) => {
    const val = (item.values[colId] as number) || ''
    const isEditing = editingCell?.itemId === item.id && editingCell?.colId === colId
    if (isEditing) {
      return <input type="number" defaultValue={val} autoFocus onBlur={e => updateItemValue(item.id, colId, e.target.value ? Number(e.target.value) : undefined)} onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 12, outline: 'none', width: '100%', textAlign: 'right' }} />
    }
    return <span onClick={() => setEditingCell({ itemId: item.id, colId })} style={{ cursor: 'pointer', fontSize: 12, color: 'rgba(245,240,232,0.6)', display: 'block', textAlign: 'right' }}>{val || '—'}</span>
  }

  const renderCheckboxCell = (item: BoardItem, colId: string) => {
    const val = (item.values[colId] as boolean) || false
    return <input type="checkbox" checked={val} onChange={e => updateItemValue(item.id, colId, e.target.checked)} style={{ accentColor: '#D4AF37', cursor: 'pointer', margin: '0 auto', display: 'block' }} />
  }

  const renderLinkCell = (item: BoardItem, colId: string) => {
    const val = (item.values[colId] as string) || ''
    const isEditing = editingCell?.itemId === item.id && editingCell?.colId === colId
    if (isEditing) {
      return <input type="text" defaultValue={val} autoFocus onBlur={e => updateItemValue(item.id, colId, e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 12, outline: 'none', width: '100%' }} />
    }
    if (val) {
      return <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><a href={val} target="_blank" rel="noopener noreferrer" style={{ color: '#579bfc', textDecoration: 'underline', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</a><Pencil size={12} color="rgba(245,240,232,0.4)" cursor="pointer" onClick={() => setEditingCell({ itemId: item.id, colId })} /></span>
    }
    return <span onClick={() => setEditingCell({ itemId: item.id, colId })} style={{ cursor: 'pointer', fontSize: 12, color: 'rgba(245,240,232,0.6)', display: 'block' }}>—</span>
  }

  const renderRatingCell = (item: BoardItem, colId: string) => {
    const val = (item.values[colId] as number) || 0
    return (
      <div style={{ display: 'flex', gap: 2, color: '#D4AF37' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={14} weight={star <= val ? 'fill' : 'regular'} onClick={() => updateItemValue(item.id, colId, star)} style={{ cursor: 'pointer' }} />
        ))}
      </div>
    )
  }

  /* ── Cell renderer ──── */
  const renderCell = (item: BoardItem, col: typeof board.columns[0]) => {
    switch (col.type) {
      case 'status': return renderStatusCell(item, col.id, board.statusLabels)
      case 'priority': return renderStatusCell(item, col.id, PRIORITY_LABELS)
      case 'people': return renderPeopleCell(item, col.id)
      case 'date': return renderDateCell(item, col.id)
      case 'numbers': return renderNumberCell(item, col.id)
      case 'checkbox': return renderCheckboxCell(item, col.id)
      case 'link': return renderLinkCell(item, col.id)
      case 'rating': return renderRatingCell(item, col.id)
      case 'longtext':
      case 'email':
      case 'phone':
      case 'dropdown':
      case 'tags':
      case 'formula':
      case 'autonumber':
      case 'created_by':
      case 'created_at':
      case 'last_updated_by':
      case 'last_updated_at':
      case 'file':
      case 'text':
      default: return renderTextCell(item, col.id)
    }
  }

  /* ── Kanban View ──── */
  const renderKanban = () => (
    <div style={{ display: 'flex', gap: 12, padding: 16, overflowX: 'auto', flex: 1 }}>
      {board.statusLabels.map(status => {
        const items = board.groups.flatMap(g => g.items.filter(i => i.values['col-status'] === status.id))
        return (
          <div key={status.id} style={{ minWidth: 280, maxWidth: 280, background: 'rgba(10,17,40,0.5)', border: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 12px', borderBottom: '2px solid ' + status.colour, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F0E8' }}>{status.text}</span>
              <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)' }}>{items.length}</span>
            </div>
            <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
              {items.map(item => {
                const priority = getPriorityLabel(item.values['col-priority'])
                const people = (item.values['col-people'] as string[] | undefined) || []
                const date = item.values['col-date'] as string | undefined
                return (
                  <div key={item.id} style={{ background: 'rgba(10,17,40,0.7)', border: '1px solid rgba(212,175,55,0.15)', padding: 12, cursor: 'pointer', transition: 'border-color 0.2s' }}
                    onClick={() => setDetailItem(item)}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'}
                  >
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#F5F0E8', marginBottom: 8 }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {people.map(id => {
                          const m = getTeamMember(id)
                          return m ? <div key={id} style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#D4AF37', fontWeight: 600 }}>{m.avatar}</div> : null
                        })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {priority && <span style={{ fontSize: 10, padding: '1px 6px', background: priority.colour + '33', color: priority.colour, fontWeight: 600 }}>{priority.text}</span>}
                        {date && <span style={{ fontSize: 10, color: new Date(date) < new Date() ? '#e2445c' : 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)' }}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => addItem(board.groups[0].id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'transparent', border: '1px dashed rgba(212,175,55,0.2)', color: 'rgba(245,240,232,0.4)', fontSize: 12, cursor: 'pointer' }}>
                <Plus size={12} /> Add item
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )

  /* ── Table View ──── */
  const renderTable = () => (
    <div style={{ overflowX: 'auto', flex: 1 }}>
      {/* Column headers */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(212,175,55,0.15)', position: 'sticky', top: 0, background: 'var(--navy)', zIndex: 10 }}>
        <div style={{ width: 40, padding: '8px 4px', flexShrink: 0 }} />
        <div style={{ minWidth: 300, padding: '8px 12px', fontSize: 12, fontWeight: 600, color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>Item</div>
        {board.columns.map(col => (
          <div key={col.id} style={{ width: col.width || 140, padding: '8px 12px', fontSize: 12, fontWeight: 600, color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0, borderLeft: '1px solid rgba(212,175,55,0.08)' }}>
            {col.name}
          </div>
        ))}
        <div style={{ width: 40, padding: '8px', borderLeft: '1px solid rgba(212,175,55,0.08)', flexShrink: 0, position: 'relative' }}>
          <button onClick={() => setShowColumnPicker(!showColumnPicker)} style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Plus size={16} />
          </button>
          {showColumnPicker && (
            <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 60, background: 'rgba(10,17,40,0.95)', border: '1px solid rgba(212,175,55,0.2)', width: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', padding: '8px 0', maxHeight: 300, overflowY: 'auto' }}>
              <div style={{ padding: '4px 12px', fontSize: 11, fontWeight: 600, color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>Add Column</div>
              {['status', 'people', 'date', 'text', 'longtext', 'numbers', 'dropdown', 'checkbox', 'tags', 'timeline', 'priority', 'link', 'email', 'phone', 'file', 'rating', 'formula'].map(type => (
                <button key={type} onClick={() => {
                  const newCol = { id: `col-${Date.now()}`, name: type.charAt(0).toUpperCase() + type.slice(1), type: type as any, width: 140 }
                  const updated = { ...board, columns: [...board.columns, newCol] }
                  persist(updated)
                  setShowColumnPicker(false)
                }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 16px', background: 'transparent', border: 'none', color: '#F5F0E8', fontSize: 13, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: 40, flexShrink: 0 }} />
      </div>

      {/* Groups */}
      {filteredGroups.map(group => (
        <div key={group.id}>
          {/* Group header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(10,17,40,0.3)', borderBottom: '1px solid rgba(212,175,55,0.08)', cursor: 'pointer' }} onClick={() => toggleGroup(group.id)}>
            <span style={{ color: group.colour, transition: 'transform 0.2s' }}>
              {group.collapsed ? <CaretRight size={14} /> : <CaretDown size={14} />}
            </span>
            <span style={{ width: 4, height: 20, background: group.colour, borderRadius: 2 }} />
            {editingGroup === group.id ? (
              <input autoFocus defaultValue={group.name} onBlur={e => { const updated = { ...board, groups: board.groups.map(g => g.id === group.id ? { ...g, name: e.target.value } : g) }; persist(updated); setEditingGroup(null) }}
                onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                onClick={e => e.stopPropagation()}
                style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 14, fontWeight: 600, outline: 'none' }}
              />
            ) : (
              <span style={{ fontSize: 14, fontWeight: 600, color: group.colour }} onDoubleClick={e => { e.stopPropagation(); setEditingGroup(group.id) }}>{group.name}</span>
            )}
            <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.35)', fontFamily: 'var(--font-mono)' }}>{group.items.length} items</span>
          </div>

          {/* Items */}
          {!group.collapsed && group.items.map(item => (
            <div key={item.id} style={{ display: 'flex', borderBottom: '1px solid rgba(212,175,55,0.06)', transition: 'background 0.1s', borderLeft: `3px solid ${group.colour}` }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Checkbox */}
              <div style={{ width: 40, padding: '8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <input type="checkbox" checked={selectedItems.has(item.id)} onChange={() => toggleItemSelect(item.id)}
                  style={{ accentColor: '#D4AF37', cursor: 'pointer' }} />
              </div>

              {/* Item name */}
              <div style={{ minWidth: 300, padding: '8px 12px', flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center' }}
                className="group"
              >
                {editingItem === item.id ? (
                  <input autoFocus defaultValue={item.name} onBlur={e => { updateItemName(item.id, e.target.value); setEditingItem(null) }}
                    onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                    style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', color: '#F5F0E8', padding: '2px 6px', fontSize: 13, outline: 'none', width: '100%' }}
                  />
                ) : (
                  <>
                    <span style={{ fontSize: 13, color: '#F5F0E8', cursor: 'pointer', flex: 1 }} onDoubleClick={() => setEditingItem(item.id)}>{item.name}</span>
                    <button onClick={() => setDetailItem(item)} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer', opacity: 0.8, marginLeft: 8 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                    >
                      Open
                    </button>
                  </>
                )}
              </div>

              {/* Column cells */}
              {board.columns.map(col => (
                <div key={col.id} style={{ width: col.width || 140, padding: '6px 8px', flexShrink: 0, borderLeft: '1px solid rgba(212,175,55,0.06)', display: 'flex', alignItems: 'center' }}>
                  {renderCell(item, col)}
                </div>
              ))}
              <div style={{ width: 40, borderLeft: '1px solid rgba(212,175,55,0.06)', flexShrink: 0 }} />

              {/* Actions */}
              <div style={{ width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.2)', padding: 4, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e2445c'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.2)'}
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Add item row */}
          {!group.collapsed && (
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(212,175,55,0.06)', borderLeft: `3px solid ${group.colour}` }}>
              <div style={{ width: 40 }} />
              <button onClick={() => addItem(group.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.35)', fontSize: 12, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.35)'}
              >
                <Plus size={12} /> Add item
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 128px)' }}>
      {/* ── Board Header ──── */}
      <div style={{ padding: '16px 0 0 0', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#D4AF37', fontFamily: 'var(--font-display)', margin: 0, letterSpacing: '-0.01em' }}>{board.name}</h1>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: board.favourite ? '#D4AF37' : 'rgba(245,240,232,0.3)', transition: 'color 0.2s' }}
            onClick={() => persist({ ...board, favourite: !board.favourite })}
          >
            <Star size={18} weight={board.favourite ? 'fill' : 'regular'} />
          </button>
        </div>
        {board.description && <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginBottom: 12, maxWidth: 'none' }}>{board.description}</p>}

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212,175,55,0.15)', padding: '0 8px', background: 'rgba(10,17,40,0.4)' }}>
            <MagnifyingGlass size={14} color="rgba(245,240,232,0.35)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items…"
              style={{ background: 'transparent', border: 'none', outline: 'none', padding: '6px 8px', color: '#F5F0E8', fontSize: 12, width: 160 }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'transparent', border: '1px solid rgba(212,175,55,0.15)', color: 'rgba(245,240,232,0.5)', fontSize: 12, cursor: 'pointer' }}>
            <FunnelSimple size={14} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'transparent', border: '1px solid rgba(212,175,55,0.15)', color: 'rgba(245,240,232,0.5)', fontSize: 12, cursor: 'pointer' }}>
            <SortAscending size={14} /> Sort
          </button>
          <div style={{ width: 1, height: 16, background: 'rgba(212,175,55,0.2)', margin: '0 8px' }} />
          <button onClick={() => setShowAutomations(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: 12, cursor: 'pointer', borderRadius: 4 }}>
            <Lightning size={14} /> Automations
          </button>
          <button onClick={() => setShowIntegrations(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: 12, cursor: 'pointer', borderRadius: 4 }}>
            <Plug size={14} /> Integrations
          </button>
        </div>
      </div>

      {/* ── View Tabs ──── */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(212,175,55,0.15)', marginBottom: 0 }}>
        {board.views.map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              background: activeView === v.id ? 'rgba(212,175,55,0.08)' : 'transparent',
              border: 'none', borderBottom: activeView === v.id ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeView === v.id ? '#D4AF37' : 'rgba(245,240,232,0.5)',
              fontSize: 13, fontWeight: activeView === v.id ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {VIEW_ICONS[v.type]} {v.name}
          </button>
        ))}
      </div>

      {/* ── View Content ──── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {currentView.type === 'table' && renderTable()}
        {currentView.type === 'kanban' && renderKanban()}
        {currentView.type === 'timeline' && <TimelineView board={board} />}
        {currentView.type === 'calendar' && <CalendarView board={board} />}
        {currentView.type === 'chart' && <ChartView board={board} />}
        {currentView.type === 'form' && <FormView board={board} />}

        {/* ── Item Detail Panel ──── */}
        {detailItem && (
          <ItemDetailPanel
            item={detailItem}
            board={board}
            onClose={() => setDetailItem(null)}
            onUpdate={updateItemValue}
          />
        )}

        {/* ── Automations & Integrations ──── */}
        {showAutomations && <AutomationsPanel board={board} onClose={() => setShowAutomations(false)} />}
        {showIntegrations && <IntegrationsPanel board={board} onClose={() => setShowIntegrations(false)} />}
      </div>
    </div>
  )
}
