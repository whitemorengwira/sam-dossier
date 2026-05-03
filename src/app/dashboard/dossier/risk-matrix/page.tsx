'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Warning, ShieldCheck } from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const risks = [
  { category: 'Geological Uncertainty', severity: 'Medium', likelihood: 'Medium', impact: 'High',
    description: 'Subsurface conditions may differ from surface sampling and historical assay data.',
    mitigation: 'Extensive IP surveying, trenching, and verified AAS assay testing have already mapped and proven the pay zones. Pre-production due diligence will cement these findings into a SAMREC-compliant Competent Persons Report.' },
  { category: 'Commodity Price Volatility', severity: 'Medium', likelihood: 'High', impact: 'Medium',
    description: 'Gold and base metal prices are subject to global macroeconomic forces.',
    mitigation: 'We mine a diversified basket of metals. Pre-arranged off-take agreements lock in margins and secure buyer pipelines. Financial models apply 25-40% discount to current spot prices.' },
  { category: 'Regulatory / Title Risk', severity: 'Low', likelihood: 'Low', impact: 'High',
    description: 'Changes in mining legislation or title disputes could affect operations.',
    mitigation: 'Assets are securely ring-fenced under Swift Ventures (Pvt) Ltd, REG 27275/2022. Legal counsel oversees strict adherence to all Ministry of Mines regulations. Claims are registered and free from impediments.' },
  { category: 'Operational Execution Risk', severity: 'Medium', likelihood: 'Medium', impact: 'Medium',
    description: 'Mining is inherently execution-sensitive with variance between projected and actual output.',
    mitigation: 'SAM has implemented site-level operational supervision, metallurgical oversight, and digital production tracking systems to minimise variance. Milestone-based tranche releases ensure capital deployment is tied to operational progress.' },
  { category: 'Currency / FX Risk', severity: 'Medium', likelihood: 'High', impact: 'Medium',
    description: 'ZAR/USD and ZWL fluctuations could affect capital deployment and returns.',
    mitigation: 'Gold is sold in USD through FGR, providing natural hedge. Investment structured with dual-currency reporting and USD-denominated off-take agreements.' },
  { category: 'Environmental and Safety', severity: 'Low', likelihood: 'Low', impact: 'High',
    description: 'Mining operations carry inherent environmental and workplace safety risks.',
    mitigation: 'Adherence to Environmental Management Act. Capital allocated for concurrent land rehabilitation. Water recycling systems mandated at CIP processing plants. Occupational Health and Safety Act compliance enforced.' },
  { category: 'Political / Sovereign Risk', severity: 'Low', likelihood: 'Low', impact: 'High',
    description: 'Political instability in operating jurisdictions could disrupt operations.',
    mitigation: 'Zimbabwe has formally indicated policy direction supporting in-country beneficiation. Active local legal counsel engagement and structured Ministry of Mines compliance maintained. Pan-African diversification strategy reduces concentration risk.' },
  { category: 'Capital Deployment Risk', severity: 'Low', likelihood: 'Low', impact: 'Medium',
    description: 'Risk of capital misallocation or leakage during deployment phase.',
    mitigation: 'Milestone-based tranche releases approved at board level. Quarterly capital deployment reports. No distributions to shareholders until investor obligations satisfied. Independent external auditor appointment.' },
]

const getSeverityColour = (s: string) => s === 'High' ? 'badge-danger' : s === 'Medium' ? 'badge-warning' : 'badge-success'

export default function RiskMatrixPage() {
  return (
    <div className="space-y-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">Risk Matrix</h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Comprehensive risk identification, assessment, and mitigation framework
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      <div className="space-y-4">
        {risks.map((risk, i) => (
          <ScrollReveal key={risk.category} delay={i * 0.05}>
            <div className="glass-card p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Warning size={20} weight="duotone" className="text-gold shrink-0" />
                  <h3 className="text-text-primary font-body font-semibold">{risk.category}</h3>
                </div>
                <div className="flex gap-2">
                  <span className={`badge text-[9px] ${getSeverityColour(risk.severity)}`}>Severity: {risk.severity}</span>
                  <span className={`badge text-[9px] ${getSeverityColour(risk.likelihood)}`}>Likelihood: {risk.likelihood}</span>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">{risk.description}</p>
              <div className="border-l-2 border-success/50 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} weight="duotone" className="text-success" />
                  <span className="text-success text-xs font-mono uppercase tracking-wider">Mitigation</span>
                </div>
                <p className="text-text-muted text-xs leading-relaxed">{risk.mitigation}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
