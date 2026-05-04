'use client'

import { useMemo } from 'react'
import type { Board } from '@/types/board'

interface ChartViewProps {
  board: Board
}

export default function ChartView({ board }: ChartViewProps) {
  // Simple bar chart showing items per status
  const chartData = useMemo(() => {
    const counts = new Map<string, number>()
    board.groups.forEach(g => {
      g.items.forEach(i => {
        const s = i.values['col-status'] as string
        if (s) counts.set(s, (counts.get(s) || 0) + 1)
      })
    })

    return board.statusLabels.map(l => ({
      name: l.text,
      count: counts.get(l.id) || 0,
      colour: l.colour
    })).filter(d => d.count > 0)
  }, [board])

  const maxCount = Math.max(...chartData.map(d => d.count), 1)

  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <h2 style={{ fontSize: 18, color: '#F5F0E8', marginBottom: 32, fontWeight: 600 }}>Items by Status</h2>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 300, paddingBottom: 40, position: 'relative', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
        {/* Y-axis labels */}
        <div style={{ position: 'absolute', left: -30, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 40, color: 'rgba(245,240,232,0.4)', fontSize: 11 }}>
          <span>{maxCount}</span>
          <span>{Math.round(maxCount / 2)}</span>
          <span>0</span>
        </div>

        {chartData.map(d => {
          const height = (d.count / maxCount) * 100
          return (
            <div key={d.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>{d.count}</div>
              <div style={{ 
                width: 40, height: `${height}%`, background: d.colour, borderRadius: '4px 4px 0 0',
                transition: 'height 0.5s ease', boxShadow: `0 0 12px ${d.colour}40`
              }} />
              <div style={{ 
                position: 'absolute', bottom: 10, width: 80, textAlign: 'center', 
                fontSize: 11, color: 'rgba(245,240,232,0.6)', fontWeight: 500, whiteSpace: 'nowrap' 
              }}>
                {d.name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
