'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight } from '@phosphor-icons/react'

const phases = [
  {
    name: 'Pre-Production',
    period: 'Jun 2026 - Nov 2026',
    months: 6,
    colour: 'from-info/40 to-info/10',
    border: 'border-info/40',
    milestones: [
      { task: 'Site visit and geological verification', month: 'Jun', status: 'upcoming' },
      { task: 'SAMREC CPR commissioning', month: 'Jul', status: 'upcoming' },
      { task: 'Equipment procurement and shipping', month: 'Jul-Sep', status: 'upcoming' },
      { task: 'Shaft rehabilitation (No.1 and No.2)', month: 'Aug-Oct', status: 'upcoming' },
      { task: 'Processing plant upgrade (CIP installation)', month: 'Sep-Nov', status: 'upcoming' },
      { task: 'Workforce recruitment and training', month: 'Oct-Nov', status: 'upcoming' },
    ],
  },
  {
    name: 'Production Ramp-Up',
    period: 'Dec 2026 - Nov 2027',
    months: 12,
    colour: 'from-warning/40 to-warning/10',
    border: 'border-warning/40',
    milestones: [
      { task: 'Initial extraction and bulk sampling', month: 'Dec-Feb', status: 'upcoming' },
      { task: 'Incremental output 3 KG to 8 KG/month', month: 'Jan-Jun', status: 'upcoming' },
      { task: 'New shaft development (No.3)', month: 'Mar-Aug', status: 'upcoming' },
      { task: 'Output reaches 10 KG/month', month: 'Jul', status: 'upcoming' },
      { task: 'Workforce expansion to 180', month: 'Jun-Sep', status: 'upcoming' },
      { task: 'Target 12 KG/month achieved', month: 'Nov', status: 'upcoming' },
    ],
  },
  {
    name: 'Steady-State Production',
    period: 'Dec 2027 - May 2029',
    months: 18,
    colour: 'from-success/40 to-success/10',
    border: 'border-success/40',
    milestones: [
      { task: 'Full production at 15+ KG/month', month: 'Dec 2027', status: 'upcoming' },
      { task: 'Revenue plateau achieved', month: 'Q1 2028', status: 'upcoming' },
      { task: 'Headcount reaches 320', month: 'Q2 2028', status: 'upcoming' },
      { task: 'Investor returns commence', month: 'Q2 2028', status: 'upcoming' },
      { task: 'Quarterly dividend distributions begin', month: 'Q3 2028', status: 'upcoming' },
    ],
  },
  {
    name: 'Distribution and Expansion',
    period: 'Ongoing from Q2 2028',
    months: 0,
    colour: 'from-gold/40 to-gold/10',
    border: 'border-gold/40',
    milestones: [
      { task: 'FGR delivery pipeline at full capacity', month: 'Ongoing', status: 'upcoming' },
      { task: 'Off-take agreements fulfilled', month: 'Ongoing', status: 'upcoming' },
      { task: 'Pan-African expansion planning (SA, Mozambique, Malawi)', month: 'Q4 2028', status: 'upcoming' },
      { task: 'Investor exit options available', month: 'Year 3', status: 'upcoming' },
    ],
  },
]

export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Timeline / Gantt</h1>
            <p className="text-text-muted text-sm">Chikonga Mine - 4-Phase Operational Roadmap</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            <span className="font-mono text-xs text-gold">Jun 2026 - 2029+</span>
          </div>
        </div>
      </motion.div>

      {/* Phase Timeline */}
      <div className="space-y-6">
        {phases.map((phase, pi) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: pi * 0.15, duration: 0.6 }}
          >
            {/* Phase Header */}
            <div className={`border-l-4 ${phase.border} pl-4 mb-4`}>
              <div className="flex items-center gap-3">
                <span className="badge badge-gold text-[9px]">Phase {pi + 1}</span>
                <h2 className="text-text-primary font-display font-bold text-lg">{phase.name}</h2>
              </div>
              <p className="text-gold/70 font-mono text-xs mt-1">{phase.period}</p>
            </div>

            {/* Milestones */}
            <div className="ml-6 space-y-2">
              {phase.milestones.map((m, mi) => (
                <motion.div
                  key={m.task}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pi * 0.15 + mi * 0.04, duration: 0.4 }}
                  className="glass-card p-3 flex items-center gap-4 group hover:border-gold/30 transition-colors"
                >
                  {/* Timeline dot */}
                  <div className="relative">
                    <div className="w-3 h-3 border-2 border-gold/50 bg-onyx rounded-full" />
                    {mi < phase.milestones.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-8 bg-gold/15" />
                    )}
                  </div>

                  {/* Gantt bar */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary text-xs font-body">{m.task}</span>
                      <span className="font-mono text-[10px] text-text-muted">{m.month}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-navy-light overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${phase.colour}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: mi * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  <ArrowRight size={12} className="text-text-muted group-hover:text-gold transition-colors shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
