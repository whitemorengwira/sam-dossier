'use client'

import { motion } from 'framer-motion'
import { ChartLineUp, TrendUp, TrendDown } from '@phosphor-icons/react'

const cashflowData = [
  { month: 'Month 1', phase: 'Pre-Prod', revenue: '-', opex: 'R1,200,000', capex: 'R3,500,000', netCf: '-R4,700,000', cumCf: '-R4,700,000' },
  { month: 'Month 2', phase: 'Pre-Prod', revenue: '-', opex: 'R800,000', capex: 'R2,000,000', netCf: '-R2,800,000', cumCf: '-R7,500,000' },
  { month: 'Month 3', phase: 'Pre-Prod', revenue: '-', opex: 'R600,000', capex: 'R1,500,000', netCf: '-R2,100,000', cumCf: '-R9,600,000' },
  { month: 'Month 4', phase: 'Ramp-Up', revenue: 'R1,500,000', opex: 'R1,800,000', capex: 'R500,000', netCf: '-R800,000', cumCf: '-R10,400,000' },
  { month: 'Month 5', phase: 'Ramp-Up', revenue: 'R2,800,000', opex: 'R2,200,000', capex: 'R300,000', netCf: 'R300,000', cumCf: '-R10,100,000' },
  { month: 'Month 6', phase: 'Ramp-Up', revenue: 'R4,200,000', opex: 'R2,800,000', capex: 'R200,000', netCf: 'R1,200,000', cumCf: '-R8,900,000' },
  { month: 'Month 7', phase: 'Ramp-Up', revenue: 'R5,500,000', opex: 'R3,200,000', capex: 'R150,000', netCf: 'R2,150,000', cumCf: '-R6,750,000' },
  { month: 'Month 8', phase: 'Ramp-Up', revenue: 'R6,800,000', opex: 'R3,600,000', capex: 'R100,000', netCf: 'R3,100,000', cumCf: '-R3,650,000' },
  { month: 'Month 9', phase: 'Ramp-Up', revenue: 'R7,500,000', opex: 'R4,000,000', capex: 'R100,000', netCf: 'R3,400,000', cumCf: '-R250,000' },
  { month: 'Month 10', phase: 'Steady', revenue: 'R8,200,000', opex: 'R4,200,000', capex: '-', netCf: 'R4,000,000', cumCf: 'R3,750,000' },
  { month: 'Month 11', phase: 'Steady', revenue: 'R9,000,000', opex: 'R4,400,000', capex: '-', netCf: 'R4,600,000', cumCf: 'R8,350,000' },
  { month: 'Month 12', phase: 'Steady', revenue: 'R9,500,000', opex: 'R4,500,000', capex: '-', netCf: 'R5,000,000', cumCf: 'R13,350,000' },
]

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Cash Flow Model</h1>
        <p className="text-text-muted text-sm">12-month projection: Pre-production through steady-state</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Breakeven Month</p>
          <p className="font-mono text-2xl text-gold font-bold">Month 10</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Year 1 Net Cash Flow</p>
          <p className="font-mono text-2xl text-success font-bold">R13.35M</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Peak CAPEX Month</p>
          <p className="font-mono text-2xl text-warning font-bold">Month 1</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {['Month', 'Phase', 'Revenue', 'OPEX', 'CAPEX', 'Net CF', 'Cumulative'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cashflowData.map((row, i) => {
                const isNeg = row.netCf.startsWith('-')
                return (
                  <tr key={row.month} className="border-b border-gold/5 hover:bg-gold/[0.03]">
                    <td className="py-2.5 px-3 font-mono text-text-primary text-xs font-medium">{row.month}</td>
                    <td className="py-2.5 px-3"><span className={`badge text-[8px] ${row.phase === 'Pre-Prod' ? 'badge-info' : row.phase === 'Ramp-Up' ? 'badge-warning' : 'badge-success'}`}>{row.phase}</span></td>
                    <td className="py-2.5 px-3 font-mono text-text-secondary text-xs">{row.revenue}</td>
                    <td className="py-2.5 px-3 font-mono text-text-muted text-xs">{row.opex}</td>
                    <td className="py-2.5 px-3 font-mono text-text-muted text-xs">{row.capex}</td>
                    <td className={`py-2.5 px-3 font-mono text-xs font-medium ${isNeg ? 'text-danger' : 'text-success'}`}>
                      <span className="flex items-center gap-1">{isNeg ? <TrendDown size={10} /> : <TrendUp size={10} />}{row.netCf}</span>
                    </td>
                    <td className={`py-2.5 px-3 font-mono text-xs font-medium ${row.cumCf.startsWith('-') ? 'text-danger/70' : 'text-gold'}`}>{row.cumCf}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
