'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scales, Buildings, ShieldCheck, Globe } from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const entities = [
  { name: 'SOCINGAMGABADELI CONSULTANCY AND PROJECTS (PTY) LTD', reg: '2013/227290/07', jurisdiction: 'Republic of South Africa', role: 'Parent Company / Group Holding', fsp: 'FSP 46620 | Category I', details: 'Underwritten by Assupol, Safrican and Rand Mutual Assurance' },
  { name: '12 Forge (Private) Limited', reg: '14253/2025', jurisdiction: 'Republic of Zimbabwe', role: 'Special Purpose Vehicle (SPV) - Mining Operations', fsp: 'N/A', details: 'All mining operations, mineral titles, processing infrastructure, and extraction activities are legally executed through this entity.' },
  { name: 'Swift Ventures (Private) Limited', reg: '27275/2022', jurisdiction: 'Republic of Zimbabwe', role: 'Local Operating Entity - Zimbabwe Assets', fsp: 'N/A', details: 'Ensures sovereign compliance and seamless capital mobility for institutional partners.' },
  { name: 'Hilltouch Investments (Pvt) Ltd', reg: 'Zimbabwe Registration', jurisdiction: 'Republic of Zimbabwe', role: 'Chikonga Mine Owner / Operator', fsp: 'N/A', details: 'Wholly owned by Directors Mr Lufeyi Shato and Mrs Joyce Kujenga since 2005.' },
]

export default function LegalStructurePage() {
  return (
    <div className="space-y-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">Legal Structure</h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Corporate entities, regulatory ring-fencing, and compliance framework
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      <ScrollReveal>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Ring-Fencing Clarification</h2>
          </div>
          <p className="text-text-secondary leading-relaxed">
            All mining operations, mineral titles, processing infrastructure, and extraction activities are legally executed through 12 Forge (Private) Limited (Reg: 14253/2025), a duly incorporated Zimbabwean Special Purpose Vehicle (SPV). The Financial Services Provider (FSP 46620) licence applies strictly and exclusively to the Group&apos;s insurance administration division within South Africa. No mining capital is raised, processed, or deployed under the FSP licence structure. This legal ring-fencing ensures regulatory clarity, operational segregation, and structured capital governance between insurance activities and mineral extraction operations.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section>
          <h2 className="text-xl font-display font-bold text-gold mb-6">Corporate Entities</h2>
          <div className="space-y-4">
            {entities.map((e, i) => (
              <motion.div key={e.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }} className="glass-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Buildings size={20} weight="duotone" className="text-gold shrink-0" />
                    <h4 className="text-text-primary font-body font-semibold text-sm">{e.name}</h4>
                  </div>
                  <span className="badge badge-gold text-[9px] shrink-0">{e.jurisdiction}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div><p className="stat-label mb-1">Registration</p><p className="font-mono text-xs text-text-primary">{e.reg}</p></div>
                  <div><p className="stat-label mb-1">Role</p><p className="text-xs text-gold">{e.role}</p></div>
                  <div><p className="stat-label mb-1">FSP</p><p className="font-mono text-xs text-text-secondary">{e.fsp}</p></div>
                </div>
                <p className="text-text-muted text-xs mt-3 leading-relaxed">{e.details}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Regulatory Registrations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'CIPC Registration', value: '2013/227290/07', desc: 'Companies and Intellectual Property Commission' },
              { label: 'FSP Number', value: '46620', desc: 'Category I - Long-Term Insurance (Subcategory A)' },
              { label: 'CSD Supplier', value: 'MAAA0404307', desc: 'Central Supplier Database' },
              { label: 'Income Tax', value: '9154960182', desc: 'South African Revenue Service' },
              { label: 'VAT Registration', value: '4150298216', desc: 'Value Added Tax' },
              { label: 'CIDB Registration', value: 'CRS 10254845 | PE 3CE', desc: 'Construction Industry Development Board' },
            ].map((r) => (
              <div key={r.label} className="border border-gold/15 p-4">
                <p className="stat-label mb-1">{r.label}</p>
                <p className="font-mono text-sm text-gold font-medium">{r.value}</p>
                <p className="text-text-muted text-[10px] mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Scales size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Key Legislation</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Companies Act', 'Long Term Insurance Act', 'Mines Health and Safety Act', 'Environmental Management Act', 'Protection of Personal Information Act', 'Prevention and Combating of Corrupt Activities Act', 'Labour Relations Act', 'Basic Conditions of Employment Act', 'King V Code'].map((law) => (
              <div key={law} className="flex items-center gap-2 p-3 border border-gold/10">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                <span className="text-text-secondary text-xs">{law}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
