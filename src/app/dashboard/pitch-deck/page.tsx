'use client'

import { motion } from 'framer-motion'
import { PresentationChart, ArrowRight, DownloadSimple, Globe } from '@phosphor-icons/react'
import Link from 'next/link'

const slides = [
  { num: 1, title: 'Legal Disclaimer and Safe Harbour', section: 'Cover' },
  { num: 2, title: 'The Socinga Africa Ecosystem', section: 'Introduction' },
  { num: 3, title: 'Corporate, Regulatory and Verification Disclosure', section: 'Compliance' },
  { num: 4, title: 'Introduction to Socinga Africa Mining', section: 'SAM' },
  { num: 5, title: 'Executive Summary', section: 'SAM' },
  { num: 6, title: 'Zimbabwe\'s Refining Revolution', section: 'Market' },
  { num: 7, title: 'The Operational Lifecycle: From Shaft to Sale', section: 'Operations' },
  { num: 8, title: 'Zimbabwe Mining Assets - Commodity Profiles', section: 'Assets' },
  { num: 9, title: 'Executive Leadership Team', section: 'Team' },
  { num: 10, title: 'Deal Structure, Use of Funds and Exit Strategy', section: 'Finance' },
  { num: 11, title: 'Projected Financials and ROI (3-Year Model)', section: 'Finance' },
  { num: 12, title: 'Risks and Mitigation', section: 'Risk' },
  { num: 13, title: 'ESG Framework: Sustainability and Governance', section: 'ESG' },
  { num: 14, title: 'Further Reading and Investor Portal', section: 'Resources' },
]

const dossierLinks = [
  { title: 'Corporate Mining Overview', url: 'https://socinga.africa/mining/', desc: 'SAM\'s overarching vision, business model, and commodity focus.' },
  { title: 'Zimbabwe Asset Portfolio', url: 'https://socinga.africa/mining/zim-assets/', desc: 'Deep-dive into legally ring-fenced Zimbabwean operations.' },
  { title: 'Financial Models and ROI', url: 'https://socinga.africa/mining/roi/', desc: '60/40 profit-sharing model and return generation strategies.' },
  { title: 'Smart Mining Technology', url: 'https://socinga.africa/mining/smart-mining/', desc: 'Digital dashboards and real-time shaft-to-mill monitoring.' },
  { title: 'Investor Documentation Portal', url: 'https://socinga.africa/mining/investor-docs/', desc: 'Statutory permits, SPV certificates, off-take LOIs, and assay reports.' },
]

export default function PitchDeckPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <span className="badge badge-gold mb-3 inline-block">Mining Division</span>
            <h1 className="text-gold font-display font-black text-2xl mb-2">Investor Pitch Deck</h1>
            <p className="text-text-muted text-sm">SOCINGA-AFRICA Mining Pitch Deck 2026 | 14 Slides</p>
          </div>
          <button className="btn-gold px-4 py-2 text-sm flex items-center gap-2">
            <DownloadSimple size={16} weight="bold" /> Download PDF
          </button>
        </div>
        <hr className="divider-gold mt-4" />
      </motion.div>

      {/* Slide Index */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <PresentationChart size={22} weight="duotone" className="text-gold" />
          <h2 className="text-lg font-display font-bold text-gold">Slide Index</h2>
        </div>
        <div className="space-y-1">
          {slides.map((slide, i) => (
            <motion.div key={slide.num} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }} className="flex items-center gap-4 p-3 hover:bg-gold/[0.04] transition-colors group cursor-pointer">
              <span className="font-mono text-xs text-gold/60 w-6 text-right">{String(slide.num).padStart(2, '0')}</span>
              <span className="text-text-primary text-sm flex-1">{slide.title}</span>
              <span className="badge badge-gold text-[8px]">{slide.section}</span>
              <ArrowRight size={12} className="text-text-muted group-hover:text-gold transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h3 className="text-gold font-display font-bold text-lg mb-4">Investor Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dossierLinks.map((link) => (
            <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="glass-card p-4 group hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-gold" />
                <h4 className="text-text-primary text-sm font-body font-medium group-hover:text-gold transition-colors">{link.title}</h4>
              </div>
              <p className="text-text-muted text-[11px] leading-relaxed">{link.desc}</p>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
