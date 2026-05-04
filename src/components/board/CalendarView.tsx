'use client'

import { useMemo, useState } from 'react'
import type { Board, BoardItem } from '@/types/board'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface CalendarViewProps {
  board: Board
}

export default function CalendarView({ board }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Extract all items with dates
  const calendarItems = useMemo(() => {
    const items: Array<{ item: BoardItem; groupColor: string; date: Date }> = []
    board.groups.forEach(g => {
      g.items.forEach(i => {
        const dateVal = i.values['col-date'] as string | undefined
        if (dateVal) {
          items.push({ item: i, groupColor: g.colour, date: new Date(dateVal) })
        }
      })
    })
    return items
  }, [board])

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  const today = () => setCurrentDate(new Date())

  const weeks = []
  let days = []
  
  // Padding for previous month
  for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
    days.push(<div key={`empty-${i}`} style={{ background: 'rgba(10,17,40,0.3)', borderRight: '1px solid rgba(212,175,55,0.05)', borderBottom: '1px solid rgba(212,175,55,0.05)' }} />)
  }

  const isToday = (day: number) => {
    const d = new Date()
    return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
    const dayItems = calendarItems.filter(ci => ci.date.toDateString() === dateStr)
    
    days.push(
      <div key={`day-${day}`} style={{ 
        borderRight: '1px solid rgba(212,175,55,0.05)', borderBottom: '1px solid rgba(212,175,55,0.05)', 
        padding: 8, display: 'flex', flexDirection: 'column', minHeight: 120, background: 'var(--navy)'
      }}>
        <div style={{ 
          fontSize: 12, fontWeight: isToday(day) ? 700 : 500, color: isToday(day) ? '#fff' : '#F5F0E8', 
          background: isToday(day) ? '#D4AF37' : 'transparent', width: 24, height: 24, borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8
        }}>
          {day}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
          {dayItems.map(ci => (
            <div key={ci.item.id} style={{ 
              background: ci.groupColor + '33', borderLeft: `3px solid ${ci.groupColor}`, 
              padding: '4px 6px', fontSize: 11, color: '#F5F0E8', borderRadius: '0 4px 4px 0',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer'
            }} title={ci.item.name}>
              {ci.item.name}
            </div>
          ))}
        </div>
      </div>
    )

    if (days.length === 7) {
      weeks.push(<div key={`week-${weeks.length}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>{days}</div>)
      days = []
    }
  }

  // Padding for next month
  if (days.length > 0) {
    while (days.length < 7) {
      days.push(<div key={`empty-next-${days.length}`} style={{ background: 'rgba(10,17,40,0.3)', borderRight: '1px solid rgba(212,175,55,0.05)', borderBottom: '1px solid rgba(212,175,55,0.05)' }} />)
    }
    weeks.push(<div key={`week-${weeks.length}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>{days}</div>)
  }

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--navy)' }}>
      {/* Calendar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F5F0E8', margin: 0, minWidth: 150 }}>
            {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </h2>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={prevMonth} style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)', color: '#F5F0E8', cursor: 'pointer', padding: 6, borderRadius: 4, display: 'flex', alignItems: 'center' }}><CaretLeft size={16} /></button>
            <button onClick={today} style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)', color: '#F5F0E8', cursor: 'pointer', padding: '6px 12px', fontSize: 13, borderRadius: 4 }}>Today</button>
            <button onClick={nextMonth} style={{ background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)', color: '#F5F0E8', cursor: 'pointer', padding: 6, borderRadius: 4, display: 'flex', alignItems: 'center' }}><CaretRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Weekdays */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        {WEEKDAYS.map(d => (
          <div key={d} style={{ padding: '12px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, borderLeft: '1px solid rgba(212,175,55,0.05)' }}>
        {weeks}
      </div>
    </div>
  )
}
