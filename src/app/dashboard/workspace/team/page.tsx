'use client'

import { motion } from 'framer-motion'
import { Users, EnvelopeSimple, Phone, MapPin, Globe } from '@phosphor-icons/react'

const teamMembers = [
  { name: 'Jabulile Dladla', title: 'Managing Director', initials: 'JD', department: 'Executive', email: 'jabulile@socinga.africa', phone: '+27 83 466 7705', location: 'Johannesburg, SA', bio: 'Provides rigorous executive oversight of the investment lifecycle. Jabulile expertly architects capital structuring and enforces strict financial deployment protocols to safeguard incoming funds. Founded SOCINGAMGABADELI CONSULTANCY in 2013.' },
  { name: 'Tsekane Lukie Tshabalala', title: 'Chairperson', initials: 'TT', department: 'Board', email: 'tsekane@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Provides visionary leadership and robust corporate governance at the board level. With a distinguished track record in enterprise scaling and strategic partnerships, Tsekane guides SAM\'s overarching Pan-African growth objectives.' },
  { name: 'Michael Dotsey', title: 'Chief Financial Officer', initials: 'MD', department: 'Finance', email: 'michael@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Oversees all financial operations, investment structuring, capital deployment, and quarterly reporting. Champions the CFO mandate to control all financial instruments.' },
  { name: 'Shingirai Muyenda', title: 'Head of Mining', initials: 'SM', department: 'Mining', email: 'shingirai@socinga.africa', phone: '+263 77 245 3667', location: 'Mutare, Zimbabwe', bio: 'Anchors mining operations with profound expertise in title acquisition, compliance, geological oversight, and production strategy across the Zimbabwe asset portfolio.' },
  { name: 'Olwethu Mlokoti', title: 'Head of Legal', initials: 'OM', department: 'Legal', email: 'olwethu@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Manages legal compliance, regulatory affairs, contract management, and corporate governance across all Socinga entities.' },
  { name: 'David Papenfus', title: 'Head of Digital Infrastructure', initials: 'DP', department: 'Technology', email: 'david@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Leads digital transformation, platform architecture, and technology strategy. Deploys modern mining intelligence systems with real-time operational monitoring.' },
  { name: 'Sondia Viljoen', title: 'Head of CSR', initials: 'SV', department: 'CSR', email: 'sondia@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Directs corporate social responsibility, community engagement, environmental rehabilitation, and ESG compliance frameworks.' },
  { name: 'Bongiwe Selane', title: 'Head of Creative Studios', initials: 'BS', department: 'Creative', email: 'bongiwe@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Leads creative direction, brand identity, and multimedia production across the Socinga Africa Creative Studios (SACS) division.' },
  { name: 'Thea Aboud', title: 'Executive Administrator', initials: 'TA', department: 'Executive', email: 'thea@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Manages executive coordination, stakeholder management, travel logistics, and administrative operations.' },
  { name: 'Patience Ngwira', title: 'General Manager', initials: 'PN', department: 'Operations', email: 'patience@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Oversees day-to-day operational management and inter-departmental coordination across the Socinga ecosystem.' },
  { name: 'Thato Mogale', title: 'Head of Communications', initials: 'TM', department: 'Communications', email: 'thato@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Leads public relations, media strategy, investor communications, and brand positioning across all markets.' },
]

const departments = ['All', ...new Set(teamMembers.map(m => m.department))]

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Team</h1>
            <p className="text-text-muted text-sm">Socinga Africa Executive Leadership - {teamMembers.length} members</p>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gold" />
            <span className="font-mono text-xs text-gold">{teamMembers.length} Active</span>
          </div>
        </div>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="glass-card p-5 group hover:border-gold/40 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <span className="font-mono text-sm text-gold font-bold">{member.initials}</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-text-primary font-body font-semibold text-sm truncate">{member.name}</h4>
                <p className="text-gold text-xs font-mono mt-0.5">{member.title}</p>
                <span className="badge badge-gold text-[8px] mt-1.5">{member.department}</span>
              </div>
            </div>
            <p className="text-text-muted text-[11px] leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
            <div className="space-y-1.5 pt-3 border-t border-gold/10">
              <div className="flex items-center gap-2 text-text-muted text-[10px]">
                <EnvelopeSimple size={10} className="text-gold/60" />
                <span className="font-mono truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-[10px]">
                <MapPin size={10} className="text-gold/60" />
                <span>{member.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
