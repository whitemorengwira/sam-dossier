'use client'

import { motion } from 'framer-motion'
import { Rocket, Target, CalendarDots, Users, ChartLineUp, Globe } from '@phosphor-icons/react'

const launchStreams = [
  { title: 'Brand Launch Event', icon: <Rocket size={20} weight="duotone" />, status: 'Planning', completion: 15, tasks: 12, desc: 'Official Socinga Africa launch event. Venue, invitations, press, and investor showcase.' },
  { title: 'Digital Platform Launch', icon: <Globe size={20} weight="duotone" />, status: 'In Progress', completion: 65, tasks: 8, desc: 'SAM Dossier platform, investor portal, and mining intelligence dashboard deployment.' },
  { title: 'Investor Roadshow', icon: <ChartLineUp size={20} weight="duotone" />, status: 'Planning', completion: 10, tasks: 15, desc: 'Pan-African investor roadshow across Johannesburg, Cape Town, Harare, and Maputo.' },
  { title: 'Mining Operations Go-Live', icon: <Target size={20} weight="duotone" />, status: 'Pre-Production', completion: 25, tasks: 20, desc: 'Chikonga Mine full mechanisation, CIP plant commissioning, and first commercial gold pour.' },
  { title: 'Team Expansion', icon: <Users size={20} weight="duotone" />, status: 'Recruiting', completion: 30, tasks: 6, desc: 'Recruitment drive for field geologists, metallurgists, site managers, and compliance officers.' },
  { title: 'Regulatory Compliance', icon: <CalendarDots size={20} weight="duotone" />, status: 'Ongoing', completion: 45, tasks: 9, desc: 'SAMREC CPR completion, EIA submissions, Ministry of Mines compliance, and SPV registrations.' },
]

export default function Launch2027Page() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-3 mb-4">
          <Rocket size={28} weight="duotone" className="text-gold" />
          <div>
            <h1 className="text-gold font-display font-black text-2xl">Launch 2027</h1>
            <p className="text-text-muted text-sm">Socinga Africa Official Launch Planning Workspace</p>
          </div>
        </div>
        <hr className="divider-gold" />
      </motion.div>

      {/* Overall Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-text-primary font-body font-semibold text-sm">Overall Launch Readiness</h3>
          <span className="font-mono text-sm text-gold font-bold">32%</span>
        </div>
        <div className="w-full h-3 bg-navy-light overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 1.5, ease: 'easeOut' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-text-muted text-[10px] font-mono">0%</span>
          <span className="text-gold text-[10px] font-mono">Target: Q1 2027</span>
          <span className="text-text-muted text-[10px] font-mono">100%</span>
        </div>
      </motion.div>

      {/* Work Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {launchStreams.map((stream, i) => (
          <motion.div
            key={stream.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            className="glass-card p-5 group hover:border-gold/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-gold/20 to-gold/5">
                  <span className="text-gold">{stream.icon}</span>
                </div>
                <div>
                  <h4 className="text-text-primary font-body font-semibold text-sm">{stream.title}</h4>
                  <span className="badge badge-gold text-[8px] mt-1">{stream.status}</span>
                </div>
              </div>
              <span className="font-mono text-xs text-gold font-bold">{stream.completion}%</span>
            </div>
            <p className="text-text-muted text-[11px] leading-relaxed mb-3">{stream.desc}</p>
            <div className="w-full h-1.5 bg-navy-light overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/60 to-gold/30"
                initial={{ width: 0 }}
                whileInView={{ width: `${stream.completion}%` }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
            <p className="text-text-muted text-[9px] font-mono">{stream.tasks} tasks remaining</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
