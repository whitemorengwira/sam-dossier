'use client'

import { motion } from 'framer-motion'
import { CalendarDots, Clock, MapPin, Users, VideoCamera } from '@phosphor-icons/react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const currentMonth = 'May 2026'

const events = [
  { day: 5, title: 'Board Meeting - Q2 Strategy', time: '09:00', type: 'meeting', attendees: 'JD, TT, MD', location: 'Virtual' },
  { day: 8, title: 'Geological Survey Review', time: '14:00', type: 'review', attendees: 'SM, WN', location: 'Mutare' },
  { day: 12, title: 'Investor Presentation - R10M Tranche', time: '10:00', type: 'presentation', attendees: 'JD, MD, TT', location: 'Johannesburg' },
  { day: 15, title: 'Flight to Mutare - Site Visit', time: '06:30', type: 'travel', attendees: 'JD, SM, TA', location: 'OR Tambo > Mutare' },
  { day: 16, title: 'Chikonga Mine Site Visit (Day 1)', time: '08:00', type: 'site_visit', attendees: 'Full Team', location: 'Chikonga Mine' },
  { day: 17, title: 'Chikonga Mine Site Visit (Day 2)', time: '08:00', type: 'site_visit', attendees: 'Full Team', location: 'Chikonga Mine' },
  { day: 20, title: 'NDA Signing - Investor A', time: '11:00', type: 'legal', attendees: 'OM, JD', location: 'Virtual' },
  { day: 22, title: 'Independent Geologist Briefing', time: '15:00', type: 'review', attendees: 'SM', location: 'Mutare' },
  { day: 25, title: 'Financial Model Review', time: '10:00', type: 'review', attendees: 'MD, JD', location: 'Virtual' },
  { day: 28, title: 'Mining Mandate - Zimbabwe Compliance', time: '14:00', type: 'legal', attendees: 'SM, OM', location: 'Harare' },
  { day: 30, title: 'Budget Meeting - June Planning', time: '09:00', type: 'meeting', attendees: 'JD, MD, TT', location: 'Virtual' },
]

const typeColours: Record<string, string> = {
  meeting: 'border-l-info bg-info/5',
  review: 'border-l-warning bg-warning/5',
  presentation: 'border-l-gold bg-gold/5',
  travel: 'border-l-purple-500 bg-purple-500/5',
  site_visit: 'border-l-success bg-success/5',
  legal: 'border-l-danger bg-danger/5',
}

// Generate calendar grid for May 2026 (starts on Friday)
const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const dayNum = i - 3 // May 2026 starts on Fri (index 4 = 0-indexed)
  return dayNum >= 1 && dayNum <= 31 ? dayNum : null
})

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Calendar</h1>
            <p className="text-text-muted text-sm">{currentMonth} - {events.length} events scheduled</p>
          </div>
          <button className="btn-gold px-4 py-2 text-sm flex items-center gap-2">
            <CalendarDots size={16} weight="duotone" /> New Event
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="lg:col-span-2 glass-card p-6">
          <h3 className="text-gold font-display font-bold text-lg mb-4">{currentMonth}</h3>
          <div className="grid grid-cols-7 gap-1">
            {days.map(d => (
              <div key={d} className="text-center py-2 text-gold/60 font-mono text-[10px] uppercase">{d}</div>
            ))}
            {calendarDays.map((day, i) => {
              const dayEvents = day ? events.filter(e => e.day === day) : []
              const isToday = day === 3
              return (
                <div key={i} className={`min-h-[80px] p-1.5 border transition-colors ${day ? 'border-gold/10 hover:border-gold/25 cursor-pointer' : 'border-transparent'} ${isToday ? 'bg-gold/[0.06] border-gold/30' : ''}`}>
                  {day && (
                    <>
                      <span className={`font-mono text-xs ${isToday ? 'text-gold font-bold' : 'text-text-muted'}`}>{day}</span>
                      {dayEvents.map(ev => (
                        <div key={ev.title} className={`mt-1 px-1 py-0.5 border-l-2 text-[8px] text-text-primary truncate ${typeColours[ev.type]}`}>
                          {ev.title.split(' - ')[0]}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-3">
          <h3 className="text-text-primary font-body font-semibold text-sm mb-2">Upcoming Events</h3>
          {events.map((ev, i) => (
            <div key={ev.title} className={`glass-card p-3 border-l-2 ${typeColours[ev.type]} hover:border-gold/30 transition-colors`}>
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-text-primary text-xs font-body font-medium leading-tight">{ev.title}</h4>
                <span className="font-mono text-[9px] text-gold shrink-0 ml-2">May {ev.day}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-text-muted text-[9px]">
                  <Clock size={9} /> {ev.time}
                </div>
                <div className="flex items-center gap-1 text-text-muted text-[9px]">
                  <MapPin size={9} /> {ev.location}
                </div>
                <div className="flex items-center gap-1 text-text-muted text-[9px]">
                  <Users size={9} /> {ev.attendees}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
