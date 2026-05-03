'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Users,
  ChartLineUp,
  CurrencyCircleDollar,
  MapPin,
  Hammer,
} from '@phosphor-icons/react'

/* Scroll-triggered reveal wrapper */
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* Team member data - all 11 executives from socinga.africa/about */
const teamMembers = [
  { name: 'Jabulile Dladla', title: 'Managing Director', role: 'Strategic leadership and corporate governance across all Socinga entities.' },
  { name: 'Michael Dotsey', title: 'Chief Financial Officer', role: 'Financial oversight, investment structuring, and capital deployment.' },
  { name: 'Sondia Viljoen', title: 'Head of CSR', role: 'Corporate social responsibility, community engagement, and ESG compliance.' },
  { name: 'Shingirai Muyenda', title: 'Head of Mining', role: 'Mining operations leadership, geological oversight, and production strategy.' },
  { name: 'Bongiwe Selane', title: 'Head of SACS (Creative Studios)', role: 'Creative direction, brand identity, and multimedia production.' },
  { name: 'Thea Aboud', title: 'Executive Administrator', role: 'Executive coordination, stakeholder management, and administrative operations.' },
  { name: 'Tsekane Lukie Tshabalala', title: 'Chairperson', role: 'Board leadership, shareholder relations, and strategic advisory.' },
  { name: 'David Papenfus', title: 'Head of Digital Infrastructure', role: 'Digital transformation, platform architecture, and technology strategy.' },
  { name: 'Patience Ngwira', title: 'General Manager', role: 'Day-to-day operational management and inter-departmental coordination.' },
  { name: 'Olwethu Mlokoti', title: 'Head of Legal', role: 'Legal compliance, regulatory affairs, and contract management.' },
  { name: 'Thato Mogale', title: 'Head of Communications', role: 'Public relations, media strategy, and investor communications.' },
]

/* Phase timeline data */
const phases = [
  {
    label: 'Pre-Production',
    period: 'June 2026 - Nov 2026',
    deliverables: ['Site visit and geological verification', 'Equipment procurement', 'Shaft rehabilitation', 'Processing plant upgrade'],
  },
  {
    label: 'Production Ramp-Up',
    period: 'Dec 2026 - Nov 2027',
    deliverables: ['Incremental output 3KG to 12KG/month', 'Workforce expansion to 180', 'New shaft development', 'Safety and training programmes'],
  },
  {
    label: 'Steady-State',
    period: 'Dec 2027 - May 2029',
    deliverables: ['Full production at 15+ KG/month', 'Revenue plateau achieved', 'Headcount of 320', 'Investor returns commence'],
  },
  {
    label: 'Distribution',
    period: 'Ongoing from Q2 2028',
    deliverables: ['FGR delivery pipeline active', 'Off-take agreements fulfilled', 'Investor reporting and dividends', 'Pan-African expansion planning'],
  },
]

export default function ExecutiveSummaryPage() {
  return (
    <div className="space-y-12 max-w-6xl">
      {/* Page Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="badge badge-gold mb-4 inline-block">Investment Dossier</span>
        <h1 className="text-gold font-display font-black mb-3">
          Executive Summary
        </h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Chikonga Mine, Mutare, Manicaland Province, Zimbabwe - A ZAR 500 Million Transformation Opportunity
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      {/* Section 1: The Opportunity */}
      <ScrollReveal>
        <section className="glass-card p-8 lg:p-10 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Hammer size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">The Opportunity</h2>
          </div>

          <p className="text-text-secondary leading-relaxed">
            Chikonga Mine is a subsidiary of Hilltouch Investments, an indigenous gold mining entity that is wholly owned by its Directors Mr Lufeyi Shato and Mrs Joyce Kujenga. Established in 2005, it has grown in leaps and bounds from humble beginnings to become Manicaland&apos;s 3rd largest producer of the yellow mineral.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The 45-hectare property is comprised of four 10-hectare registered claims. All four claims are currently or have previously been mined on a small scale for gold, with the first recorded production in 1959. Good and better standards of mining are presently being conducted by Hilltouch on multiple, steeply dipping, parallel narrow reefs (shear zones) stacked across a 350-metre wide, 800-metre+ structural corridor.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Improved gold grades averaged 15 g/t, 18 g/t and 25 g/t in 2019, 2020 and 2021 respectively. Mineralised reefs/shear zones occur as siliceous mica schist and silicified andesite typically hosting bands of fine-grained grey and black quartz with disseminated pyrrhotite, pyrite, arsenopyrite, chalcopyrite and gold.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Limited sampling of the tailings at the Chikonga Mine indicate an average grade of 15 g/t gold. Gold recovery is accomplished by Hilltouch utilising a stamp mill and standard cyanidation extraction, suggesting recoveries in the 90 to 95 per cent range during the 2019 to 2021 period, and that the gold mineralisation was largely free milling.
          </p>
        </section>
      </ScrollReveal>

      {/* Section 2: The Funding Ask */}
      <ScrollReveal delay={0.1}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <CurrencyCircleDollar size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">The Funding Ask</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gold/20 p-6">
              <p className="stat-label mb-2">Investment Required (ZAR)</p>
              <p className="font-mono text-3xl font-bold text-gold">R500,000,000</p>
            </div>
            <div className="border border-gold/20 p-6">
              <p className="stat-label mb-2">Investment Required (USD)</p>
              <p className="font-mono text-3xl font-bold text-gold">$27,472,527</p>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed mt-6">
            The secured investment of <strong className="text-gold">ZAR 500,000,000 (USD 27,472,527)</strong> will fund the complete transformation of Chikonga Mine from a small-scale artisanal operation into a mechanised, high-output gold production facility. Capital will be deployed across processing plant upgrades, heavy mining equipment, shaft development, infrastructure, workforce expansion, geological surveys, and a 12-month working capital reserve.
          </p>
        </section>
      </ScrollReveal>

      {/* Section 3: The Return */}
      <ScrollReveal delay={0.15}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ChartLineUp size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">The Return</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-gold/20 p-5">
              <p className="stat-label mb-1">Current Output</p>
              <p className="font-mono text-2xl font-bold text-text-primary">5 KG<span className="text-text-muted text-sm"> / month</span></p>
              <p className="font-mono text-sm text-text-muted mt-1">~$514,400 / month</p>
            </div>
            <div className="border border-gold/20 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -mr-6 -mt-6 rotate-45" />
              <p className="stat-label mb-1">Target Output</p>
              <p className="font-mono text-2xl font-bold text-gold">15+ KG<span className="text-text-muted text-sm"> / month</span></p>
              <p className="font-mono text-sm text-gold/70 mt-1">~$1,543,200 / month</p>
            </div>
            <div className="border border-gold/20 p-5">
              <p className="stat-label mb-1">Revenue Uplift</p>
              <p className="font-mono text-2xl font-bold text-success">+200%</p>
              <p className="font-mono text-sm text-text-muted mt-1">3x production increase</p>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed">
            At current gold spot prices of approximately <strong className="text-gold">$3,200/oz</strong>, the production increase from 5 KG to 15+ KG per month represents a monthly revenue uplift from approximately $514,400 to $1,543,200. Annual steady-state EBITDA is projected at <strong className="text-gold">R193,042,740 (USD 10,606,744)</strong>, with a payback period of approximately 2.6 years from first production month.
          </p>
        </section>
      </ScrollReveal>

      {/* Section 4: The Team */}
      <ScrollReveal delay={0.2}>
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">The Team</h2>
          </div>
          <p className="text-text-secondary text-sm max-w-2xl">
            Socinga Africa&apos;s executive team brings together decades of experience across mining, finance, legal, technology, and corporate governance.
          </p>

          {/* Horizontal scrolling team cards */}
          <div className="overflow-x-auto pb-4 -mx-2">
            <div className="flex gap-4 px-2" style={{ minWidth: 'max-content' }}>
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className="glass-card w-[260px] shrink-0"
                >
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center mb-3">
                    <span className="text-xs font-mono text-gold font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="text-text-primary font-body font-semibold text-sm">{member.name}</h4>
                  <p className="text-gold text-xs font-mono mt-0.5 mb-2">{member.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: The Timeline */}
      <ScrollReveal delay={0.25}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8">
            <MapPin size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">The Timeline</h2>
          </div>

          {/* Phase timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gold/25" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {phases.map((phase, i) => (
                <div key={phase.label} className="relative pt-10">
                  {/* Milestone dot */}
                  <div className="absolute top-3 left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 border-2 border-gold bg-onyx rounded-full z-10">
                    <div className="absolute inset-1 rounded-full bg-gold/40" />
                  </div>

                  <div className="border border-gold/15 p-4">
                    <span className="badge badge-gold text-[9px] mb-2">Phase {i + 1}</span>
                    <h4 className="text-text-primary font-body font-semibold text-sm mb-1">{phase.label}</h4>
                    <p className="text-gold/70 font-mono text-[10px] mb-3">{phase.period}</p>
                    <ul className="space-y-1.5">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="text-text-muted text-[11px] flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold/50 mt-1.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: CTA */}
      <ScrollReveal delay={0.3}>
        <div className="text-center py-8">
          <Link
            href="/dashboard/dossier/chikonga-profile"
            className="btn-gold px-8 py-4 text-base inline-flex items-center gap-3"
          >
            View Full Investment Dossier
            <ArrowRight size={20} weight="bold" />
          </Link>
          <p className="text-text-muted text-xs mt-4 font-mono">
            Confidential - For Authorised Personnel Only
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
