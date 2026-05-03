'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CurrencyCircleDollar, ChartLineUp, Calculator, ArrowsDownUp } from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const revenueScenarios = [
  { label: 'Conservative (5 KG/mo)', monthly: '$514,400', annual: '$6,172,800', margin: '25%', ebitda: '$1,543,200' },
  { label: 'Base Case (10 KG/mo)', monthly: '$1,028,800', annual: '$12,345,600', margin: '30%', ebitda: '$3,703,680' },
  { label: 'Target (15 KG/mo)', monthly: '$1,543,200', annual: '$18,518,400', margin: '35%', ebitda: '$6,481,440' },
  { label: 'Upside (20 KG/mo)', monthly: '$2,057,600', annual: '$24,691,200', margin: '38%', ebitda: '$9,382,656' },
]

const costBreakdown = [
  { item: 'Labour and Workforce (320 FTE)', monthly: 'R2,400,000', pct: 28 },
  { item: 'Diesel, Power and Utilities', monthly: 'R1,200,000', pct: 14 },
  { item: 'Consumables and Reagents', monthly: 'R900,000', pct: 10 },
  { item: 'Equipment Maintenance', monthly: 'R600,000', pct: 7 },
  { item: 'Security and Compliance', monthly: 'R400,000', pct: 5 },
  { item: 'Royalties and Government Levies', monthly: 'R800,000', pct: 9 },
  { item: 'Insurance and Environmental', monthly: 'R300,000', pct: 4 },
  { item: 'Administration and Overheads', monthly: 'R500,000', pct: 6 },
  { item: 'Sustaining CAPEX Reserve', monthly: 'R700,000', pct: 8 },
  { item: 'Contingency (5%)', monthly: 'R450,000', pct: 5 },
]

export default function FinancialModelPage() {
  return (
    <div className="space-y-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
          <span className="badge badge-info">Financial Model</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">Financial Model</h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Revenue projections, cost structure, and scenario analysis
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      <ScrollReveal>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Calculator size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Key Assumptions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Gold Spot Price', value: '$3,200/oz' },
              { label: 'Exchange Rate', value: '19 ZAR/USD' },
              { label: 'Recovery Rate', value: '90-95%' },
              { label: 'Average Grade', value: '15-25 g/t' },
              { label: 'KG to Troy Oz', value: '32.1507' },
              { label: 'Processing Capacity', value: '500 t/day' },
              { label: 'Operating Days', value: '340/year' },
              { label: 'Net Profit Margin', value: '30%' },
            ].map((a) => (
              <div key={a.label} className="border border-gold/15 p-3">
                <p className="stat-label mb-1">{a.label}</p>
                <p className="font-mono text-sm text-gold font-medium">{a.value}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ChartLineUp size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Revenue Scenarios</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase">Scenario</th>
                  <th className="text-right py-3 px-3 text-gold font-mono text-xs uppercase">Monthly</th>
                  <th className="text-right py-3 px-3 text-gold font-mono text-xs uppercase">Annual</th>
                  <th className="text-right py-3 px-3 text-gold font-mono text-xs uppercase">Margin</th>
                  <th className="text-right py-3 px-3 text-gold font-mono text-xs uppercase">EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {revenueScenarios.map((row, i) => (
                  <tr key={row.label} className={`border-b border-gold/10 ${i === 2 ? 'bg-gold/[0.06]' : ''}`}>
                    <td className="py-3 px-3 text-text-primary text-xs font-medium">{row.label}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary text-xs text-right">{row.monthly}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary text-xs text-right">{row.annual}</td>
                    <td className="py-3 px-3 font-mono text-gold text-xs text-right">{row.margin}</td>
                    <td className="py-3 px-3 font-mono text-gold font-medium text-xs text-right">{row.ebitda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ArrowsDownUp size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Operating Costs (Monthly)</h2>
          </div>
          <div className="space-y-3">
            {costBreakdown.map((item) => (
              <div key={item.item}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-text-primary text-xs">{item.item}</span>
                  <span className="font-mono text-xs text-text-secondary">{item.monthly}</span>
                </div>
                <div className="w-full h-1.5 bg-navy-light overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-gold/60 to-gold/30" initial={{ width: 0 }} whileInView={{ width: `${item.pct * 2.5}%` }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gold/15 flex justify-between">
              <span className="text-text-primary text-sm font-semibold">Total Monthly OPEX</span>
              <span className="font-mono text-sm text-gold font-bold">R8,250,000</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <CurrencyCircleDollar size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Payback Analysis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gold/20 p-6 text-center">
              <p className="stat-label mb-2">Investment</p>
              <p className="font-mono text-2xl font-bold text-gold">R500M</p>
              <p className="text-text-muted text-xs font-mono mt-1">USD 27.5M</p>
            </div>
            <div className="border border-gold/20 p-6 text-center">
              <p className="stat-label mb-2">Target EBITDA</p>
              <p className="font-mono text-2xl font-bold text-success">R193M</p>
              <p className="text-text-muted text-xs font-mono mt-1">At 15 KG/mo steady state</p>
            </div>
            <div className="border border-gold/20 p-6 text-center">
              <p className="stat-label mb-2">Payback Period</p>
              <p className="font-mono text-2xl font-bold text-gold">~2.6 Years</p>
              <p className="text-text-muted text-xs font-mono mt-1">From first production</p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
