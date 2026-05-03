'use client'

import { motion } from 'framer-motion'
import { Mountains, TrendUp } from '@phosphor-icons/react'

const gradeData = [
  { shaft: 'Shaft No.1 - L1', jan: 18, feb: 20, mar: 22, apr: 19, may: 21, avg: 20 },
  { shaft: 'Shaft No.1 - L2', jan: 15, feb: 17, mar: 18, apr: 16, may: 19, avg: 17 },
  { shaft: 'Shaft No.2 - L1', jan: 22, feb: 24, mar: 25, apr: 23, may: 26, avg: 24 },
  { shaft: 'East Drive', jan: 16, feb: 18, mar: 20, apr: 21, may: 22, avg: 19.4 },
  { shaft: 'West Drive', jan: 12, feb: 14, mar: 15, apr: 16, may: 17, avg: 14.8 },
  { shaft: 'New Reef (R3)', jan: null, feb: null, mar: 28, apr: 30, may: 32, avg: 30 },
  { shaft: 'Tailings', jan: 15, feb: 15, mar: 15, apr: 15, may: 15, avg: 15 },
]

const historicalGrades = [
  { year: '2019', avg: 15, samples: 24 },
  { year: '2020', avg: 18, samples: 31 },
  { year: '2021', avg: 25, samples: 28 },
  { year: '2022', avg: 22, samples: 19 },
  { year: '2023', avg: 20, samples: 22 },
  { year: '2024', avg: 23, samples: 26 },
  { year: '2025', avg: 24, samples: 30 },
  { year: '2026', avg: 21, samples: 14 },
]

export default function OreGradesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Ore Grade Tracker</h1>
        <p className="text-text-muted text-sm">Chikonga Mine - Monthly assay results by shaft and drive</p>
      </motion.div>

      {/* Current Month Grades by Shaft */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
        <div className="p-4 border-b border-gold/15 flex items-center gap-3">
          <Mountains size={18} weight="duotone" className="text-gold" />
          <h3 className="text-text-primary font-body font-semibold text-sm">2026 Monthly Grades (g/t)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {['Shaft / Drive', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Average'].map(h => (
                  <th key={h} className={`py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider ${h === 'Shaft / Drive' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gradeData.map((row) => (
                <tr key={row.shaft} className="border-b border-gold/5 hover:bg-gold/[0.03]">
                  <td className="py-2.5 px-3 text-text-primary text-xs font-medium">{row.shaft}</td>
                  {[row.jan, row.feb, row.mar, row.apr, row.may].map((v, i) => (
                    <td key={i} className={`py-2.5 px-3 font-mono text-xs text-center ${v === null ? 'text-text-muted' : v >= 25 ? 'text-gold font-bold' : v >= 18 ? 'text-success' : 'text-text-secondary'}`}>
                      {v !== null ? v : '-'}
                    </td>
                  ))}
                  <td className="py-2.5 px-3 font-mono text-xs text-center text-gold font-bold">{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Historical Grade Progression */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendUp size={18} weight="duotone" className="text-gold" />
          <h3 className="text-text-primary font-body font-semibold text-sm">Historical Grade Progression</h3>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {historicalGrades.map((g) => (
            <div key={g.year} className="border border-gold/15 p-3 text-center">
              <p className="stat-label mb-1">{g.year}</p>
              <p className={`font-mono text-lg font-bold ${g.avg >= 23 ? 'text-gold' : g.avg >= 18 ? 'text-success' : 'text-text-secondary'}`}>{g.avg}</p>
              <p className="text-[9px] text-text-muted font-mono mt-1">{g.samples} samples</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
