'use client'

import { motion } from 'framer-motion'
import { Users, EnvelopeSimple, Phone, MapPin, Globe } from '@phosphor-icons/react'

const teamMembers = [
  { name: 'Tsekane Lukie Tshabalala', title: 'Chairperson', initials: 'TT', department: 'Board', email: 'lukie@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Tsekane Lukie Tshabalala is the Chairperson of the Socinga Africa Group of Companies, providing overarching strategic oversight and robust corporate stewardship for the entire enterprise.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/tsekane-tshabalala.jpg' },
  { name: 'Jabulile Dladla', title: 'Managing Director & Founding Member', initials: 'JD', department: 'Executive', email: 'jabulile@socinga.africa', phone: '+27 83 466 7705', location: 'Johannesburg, SA', bio: 'Jabulile Dladla is the founding member and serves as the Managing Director of Socinga Africa, serving as the visionary architect behind the organisation\'s evolution from a specialised consultancy into a diversified pan-African enterprise.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/jabulile-dladla.jpg' },
  { name: 'Whitemore Ngwira', title: 'Group Chief Executive Officer', initials: 'WN', department: 'Executive', email: 'whitemore@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Whitemore Ngwira serves as the Chief Executive Officer, steering the overarching strategic expansion and daily operations of the group of companies. Tasked with scaling the enterprise across South Africa, Zimbabwe, Mozambique, Malawi, and the broader African continent, he expertly integrates the organisation\'s four core pillars — Insurance, Creative Studios, Mining, and Corporate Social Responsibility — into a cohesive, high-performing ecosystem.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/whitemore-ngwira.jpg' },
  { name: 'Michael Lawrence Dotsey', title: 'Chief Financial Officer', initials: 'MD', department: 'Finance', email: 'michael@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'A distinguished Chartered Accountant with extensive cross-sector experience spanning financial services, insurance, and the non-profit landscape, he is responsible for orchestrating the capital allocation strategies that sustain the organisation\'s varied ventures — from long-term insurance administration to high-yield mining assets.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/michael-dotsey.jpg' },
  { name: 'Sondia Viljoen', title: 'Head of Social Impact & CSR', initials: 'SV', department: 'CSR', email: 'sondia@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Sondia Viljoen leads the Socinga Africa Foundation (SAF), the dedicated Corporate Social Responsibility (CSR) arm of the Socinga Africa group, where she directs the organisation\'s overarching social impact strategy and community investment initiatives.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/sondia-viljoen.jpg' },
  { name: 'Olwethu Mlokoti', title: 'Head of Corporate Governance', initials: 'OM', department: 'Legal', email: 'olwethu@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Olwethu Mlokoti serves as the Head of Corporate Governance, commanding the overarching regulatory compliance and structural integrity of the group of companies. Tasked with safeguarding the enterprise across South Africa, Zimbabwe, Mozambique, Malawi, and the broader African continent, she expertly integrates stringent governance protocols into the organisation\'s four core pillars — Insurance, Creative Studios, Mining, and Corporate Social Responsibility.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/olwethu-mlokoti.jpg' },
  { name: 'Patience Ngwira', title: 'Social Impact Officer', initials: 'PN', department: 'CSR', email: 'patience@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Patience Ngwira serves as the Social Impact Officer, championing the overarching community development initiatives and corporate social responsibility (CSR) programs of the group. Tasked with ensuring that the enterprise\'s growth is inherently linked to social upliftment, she expertly integrates sustainable practices across South Africa, Zimbabwe, Mozambique, Malawi, and the broader African continent.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/patience-ngwira.jpg' },
  { name: 'Bongiwe Selane', title: 'Head of Creative Studios', initials: 'BS', department: 'Creative', email: 'bongiwe@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Bongiwe Selane is the Head of Socinga Africa Creative Studios (SACS), directing the organisation\'s integrated brand strategy, advertising, and full-service production operations.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/bongiwe-selane.jpg' },
  { name: 'David Papenfus', title: 'Head of Digital Infrastructure', initials: 'DP', department: 'Technology', email: 'david@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'David Papenfus is the Head of Digital Infrastructure, responsible for architecting and maintaining the comprehensive technological framework that supports the group\'s diversified pan-African operations.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/david-papenfus.jpg' },
  { name: 'Shingirai Muyenda', title: 'Head of Socinga Africa Mining', initials: 'SM', department: 'Mining', email: 'shingirai@socinga.africa', phone: '+263 77 245 3667', location: 'Mutare, Zimbabwe', bio: 'He is responsible for managing a robust portfolio of regional assets, ensuring that all extraction and resource development activities align with stringent regulatory compliance and sustainable environmental practices.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/shingirai-muyenda.jpg' },
  { name: 'Thea Aboud', title: 'Executive Administrator', initials: 'TA', department: 'Executive', email: 'thea@socinga.africa', phone: '+27 83 290 2158', location: 'Johannesburg, SA', bio: 'Thea Aboud is the Executive Administrator, functioning as the vital operational link that ensures seamless coordination across executive leadership and the group\'s multiple divisions.', photoUrl: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/thea-aboud.jpg' },
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
              <div className="w-14 h-14 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center shrink-0 overflow-hidden">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-sm text-gold font-bold">{member.initials}</span>
                )}
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
