'use client'

import { useMemo } from 'react'
import type { Board, BoardItem } from '@/types/board'
import { getTeamMember } from '@/lib/board-data'

interface TimelineViewProps {
  board: Board
}

export default function TimelineView({ board }: TimelineViewProps) {
  // Extract all items with dates
  const timelineItems = useMemo(() => {
    const items: Array<{ item: BoardItem; groupName: string; groupColor: string; date: Date }> = []
    board.groups.forEach(g => {
      g.items.forEach(i => {
        const dateVal = i.values['col-date'] as string | undefined
        if (dateVal) {
          items.push({ item: i, groupName: g.name, groupColor: g.colour, date: new Date(dateVal) })
        }
      })
    })
    return items.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [board])

  if (timelineItems.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'rgba(245,240,232,0.5)' }}>
        No items with dates to display on the timeline.
      </div>
    )
  }

  const startDate = new Date(timelineItems[0].date)
  startDate.setDate(startDate.getDate() - 7) // 1 week before first item
  const endDate = new Date(timelineItems[timelineItems.length - 1].date)
  endDate.setDate(endDate.getDate() + 14) // 2 weeks after last item

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const dayWidth = 40 // px per day

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: totalDays * dayWidth, minHeight: 400, background: 'var(--navy)' }}>
        
        {/* Timeline Header (Months & Days) */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(212,175,55,0.15)', position: 'sticky', top: 0, background: 'var(--navy)', zIndex: 10 }}>
          {Array.from({ length: totalDays }).map((_, i) => {
            const d = new Date(startDate)
            d.setDate(d.getDate() + i)
            const isToday = d.toDateString() === new Date().toDateString()
            return (
              <div key={i} style={{ width: dayWidth, flexShrink: 0, borderRight: '1px solid rgba(212,175,55,0.05)', textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>{d.toLocaleDateString('en-GB', { weekday: 'narrow' })}</div>
                <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? '#D4AF37' : '#F5F0E8', marginTop: 4, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isToday ? 'rgba(212,175,55,0.1)' : 'transparent', borderRadius: '50%', margin: '4px auto 0' }}>
                  {d.getDate()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Grid & Items */}
        <div style={{ position: 'relative', paddingTop: 16 }}>
          {/* Grid lines */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none' }}>
            {Array.from({ length: totalDays }).map((_, i) => (
              <div key={i} style={{ width: dayWidth, flexShrink: 0, borderRight: '1px solid rgba(212,175,55,0.05)' }} />
            ))}
          </div>

          {/* Today line */}
          {(() => {
            const today = new Date()
            if (today >= startDate && today <= endDate) {
              const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
              return (
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: diffDays * dayWidth + dayWidth / 2, width: 2, background: '#e2445c', zIndex: 5 }} />
              )
            }
            return null
          })()}

          {/* Items */}
          {timelineItems.map((ti, rowIndex) => {
            const startOffsetDays = Math.floor((ti.date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
            const durationDays = 3 // Mock duration for visual since we only have single date
            
            return (
              <div key={ti.item.id} style={{ position: 'relative', height: 36, marginBottom: 8 }}>
                <div
                  style={{
                    position: 'absolute', left: startOffsetDays * dayWidth, width: durationDays * dayWidth, height: 28, top: 4,
                    background: ti.groupColor, borderRadius: 14, display: 'flex', alignItems: 'center', padding: '0 10px',
                    color: '#fff', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)', cursor: 'pointer', zIndex: 10
                  }}
                  title={ti.item.name}
                >
                  {ti.item.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
