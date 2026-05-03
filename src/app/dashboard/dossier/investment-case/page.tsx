'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChartLineUp, ShieldCheck, Coins, TrendUp, ArrowRight, Scales } from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const highlights = [
  { icon: <ShieldCheck size={22} weight="duotone" />, title: 'Legally Secured Mineral Titles', desc: 'Assets are legally ring-fenced through our SPV, 12 Forge (Pvt) Ltd, Reg: 14253/2025.' },
  { icon: <ChartLineUp size={22} weight="duotone" />, title: 'Data-Driven Operational Oversight', desc: 'Real-time monitoring from shaft to mill via digital dashboards and analytics.' },
  { icon: <Coins size={22} weight="duotone" />, title: 'Diversified Portfolio', desc: 'Strategic commodities including Gold, Chrome, Antimony, Lithium, and Copper.' },
  { icon: <TrendUp size={22} weight="duotone" />, title: 'Pre-Arranged Off-Take Channels', desc: 'Direct Letters of Intent (LOI) secured, ensuring guaranteed liquidity with major national buyers.' },
]

const useOfFunds = [
  { category: 'Mining Equipment Mobilisation', zar: 'R3,500,000', usd: '$184,210', pct: 35 },
  { category: 'Processing Plant Scaling (CIP & Boilers)', zar: 'R3,000,000', usd: '$157,895', pct: 30 },
  { category: 'Operational Working Capital', zar: 'R1,500,000', usd: '$78,947', pct: 15 },
  { category: 'Compliance, Safety & Governance (Incl. SAMREC CPR)', zar: 'R1,000,000', usd: '$52,631', pct: 10 },
  { category: 'Sales, Off-take Logistics & Transport', zar: 'R1,000,000', usd: '$52,631', pct: 10 },
]

const roiProjections = [
  { year: 'Year 1', grossZar: 'R60,000,000', grossUsd: '$3,157,894', netZar: 'R18,000,000', netUsd: '$947,368', investorZar: 'R11,600,000', investorUsd: '$610,526' },
  { year: 'Year 2', grossZar: 'R110,000,000', grossUsd: '$5,789,473', netZar: 'R33,000,000', netUsd: '$1,736,842', investorZar: 'R20,600,000', investorUsd: '$1,084,210' },
  { year: 'Year 3', grossZar: 'R145,000,000', grossUsd: '$7,631,579', netZar: 'R43,500,000', netUsd: '$2,289,473', investorZar: 'R26,900,000', investorUsd: '$1,415,789' },
]

export default function InvestmentCasePage() {
  return (
    <div className="space-y-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
          <span className="badge badge-success">Investment Case</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">Investment Case</h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Asset-Backed Mineral Extraction with Measured, Commercial Returns
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      {/* Investment Highlights */}
      <ScrollReveal>
        <section>
          <h2 className="text-xl font-display font-bold text-gold mb-6">Investment Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="glass-card p-6 flex gap-4">
                <span className="text-gold shrink-0 mt-1">{h.icon}</span>
                <div>
                  <h4 className="text-text-primary font-body font-semibold text-sm mb-1">{h.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Deal Structure */}
      <ScrollReveal delay={0.1}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Scales size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Deal Structure</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border border-gold/20 p-4 text-center">
              <p className="stat-label mb-1">Capital Required</p>
              <p className="font-mono text-lg font-bold text-gold">R10,000,000</p>
              <p className="font-mono text-xs text-text-muted">~USD $526,315</p>
            </div>
            <div className="border border-gold/20 p-4 text-center">
              <p className="stat-label mb-1">Investment Term</p>
              <p className="font-mono text-lg font-bold text-gold">3 Years</p>
            </div>
            <div className="border border-gold/20 p-4 text-center">
              <p className="stat-label mb-1">Base Interest</p>
              <p className="font-mono text-lg font-bold text-gold">20% p.a.</p>
              <p className="font-mono text-xs text-text-muted">Payable quarterly</p>
            </div>
            <div className="border border-gold/20 p-4 text-center">
              <p className="stat-label mb-1">Profit Split</p>
              <p className="font-mono text-lg font-bold text-success">60% Investor</p>
              <p className="font-mono text-xs text-text-muted">40% SAM</p>
            </div>
          </div>
          <p className="text-text-secondary leading-relaxed text-sm">
            The investor&apos;s capital shall rank senior to ordinary equity within the Swift Ventures SPV. Security shall include: first-ranking charge over funded processing equipment, cession of off-take receivables, and board-approved capital control over SPV distribution accounts. No distributions to ordinary shareholders may occur until investor capital and contracted interest obligations have been satisfied in accordance with the agreed waterfall structure.
          </p>
        </section>
      </ScrollReveal>

      {/* Use of Funds */}
      <ScrollReveal delay={0.15}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">Use of Funds (Tranche Deployment)</h2>
          <div className="space-y-4">
            {useOfFunds.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-text-primary text-sm">{item.category}</span>
                  <span className="font-mono text-xs text-gold">{item.zar} | {item.usd}</span>
                </div>
                <div className="w-full h-2 bg-navy-light overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold to-gold-light"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ROI Projections */}
      <ScrollReveal delay={0.2}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">3-Year ROI Projections</h2>
          <p className="text-text-muted text-xs mb-4 font-mono">Aggregated Portfolio | Net Profit Margin 30% after OPEX, Royalties, and Taxes | ~19 ZAR/USD</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase tracking-wider">Period</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase tracking-wider">Est. Gross Revenue</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase tracking-wider">Est. Net Profit (30%)</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase tracking-wider">Investor Total Return</th>
                </tr>
              </thead>
              <tbody>
                {roiProjections.map((row) => (
                  <tr key={row.year} className="border-b border-gold/10 hover:bg-gold/[0.04] transition-colors">
                    <td className="py-3 px-3 font-mono text-text-primary font-medium text-xs">{row.year}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary text-xs">{row.grossZar}<br /><span className="text-text-muted">{row.grossUsd}</span></td>
                    <td className="py-3 px-3 font-mono text-text-secondary text-xs">{row.netZar}<br /><span className="text-text-muted">{row.netUsd}</span></td>
                    <td className="py-3 px-3 font-mono text-gold font-medium text-xs">{row.investorZar}<br /><span className="text-gold/70">{row.investorUsd}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary leading-relaxed text-sm mt-6">
            The investor recoups the initial ZAR 10M capital alongside the 20% base interest rapidly within Year 1, followed by aggressive, highly lucrative pure profit generation in Years 2 and 3. Sensitivity testing has been conducted against 20% commodity price downside scenarios, recovery rate compression to 1.5 g/t baseline, and 10% operational cost escalation. Even under stressed modelling conditions, the project maintains positive free cash flow generation.
          </p>
        </section>
      </ScrollReveal>

      {/* Commodity Pricing */}
      <ScrollReveal delay={0.25}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">Commodity Pricing Assumptions</h2>
          <p className="text-text-muted text-xs mb-4">Financial modelling built on conservative mid-cycle benchmarks with 25-40% institutional-grade sensitivity buffers.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Gold', model: '$3,300/oz', spot: '~$5,085', discount: '35%' },
              { name: 'Chrome', model: '$300/tonne', spot: '~$365', discount: '18%' },
              { name: 'Antimony', model: '$13,500/tonne', spot: '~$22,500', discount: '40%' },
              { name: 'Copper', model: '$9,750/tonne', spot: '~$13,000', discount: '25%' },
            ].map((c) => (
              <div key={c.name} className="border border-gold/15 p-4">
                <h4 className="text-gold font-mono text-sm font-bold mb-2">{c.name}</h4>
                <p className="text-text-primary font-mono text-xs">Modelled: {c.model}</p>
                <p className="text-text-muted font-mono text-[10px]">Spot: {c.spot}</p>
                <span className="badge badge-warning text-[9px] mt-2">{c.discount} discount</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
