'use client'

import { motion } from 'framer-motion'
import { ChartLineUp, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

interface CashFlowRow {
  month: string
  phase: string
  revenue: string
  opex: string
  capex: string
  netCf: string
  cumCf: string
}

const emptyRow = (i: number): CashFlowRow => ({
  month: `Month ${i + 1}`,
  phase: '',
  revenue: '',
  opex: '',
  capex: '',
  netCf: '',
  cumCf: '',
})

export default function CashFlowPage() {
  const [rows, setRows] = useState<CashFlowRow[]>(
    Array.from({ length: 12 }, (_, i) => emptyRow(i))
  )

  const updateRow = (i: number, field: keyof CashFlowRow, value: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  const addRow = () => {
    setRows(prev => [...prev, emptyRow(prev.length)])
  }

  const removeRow = (i: number) => {
    if (rows.length <= 1) return
    setRows(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Cash Flow Model</h1>
        <p className="text-text-muted text-sm">Enter your monthly cash flow projections below</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Breakeven Month</p>
          <p className="font-mono text-2xl text-text-muted">—</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Year 1 Net Cash Flow</p>
          <p className="font-mono text-2xl text-text-muted">—</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Peak CAPEX Month</p>
          <p className="font-mono text-2xl text-text-muted">—</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {['Month', 'Phase', 'Revenue', 'OPEX', 'CAPEX', 'Net CF', 'Cumulative', ''].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gold/5 hover:bg-gold/[0.03]">
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.month} onChange={e => updateRow(i, 'month', e.target.value)} className="bg-transparent border-none outline-none font-mono text-text-primary text-xs font-medium w-20 placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.phase} onChange={e => updateRow(i, 'phase', e.target.value)} placeholder="Phase" className="bg-transparent border-none outline-none text-text-secondary text-xs w-20 placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.revenue} onChange={e => updateRow(i, 'revenue', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-secondary text-xs w-24 placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.opex} onChange={e => updateRow(i, 'opex', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-muted text-xs w-24 placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.capex} onChange={e => updateRow(i, 'capex', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-muted text-xs w-24 placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.netCf} onChange={e => updateRow(i, 'netCf', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-xs font-medium w-24 text-text-secondary placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.cumCf} onChange={e => updateRow(i, 'cumCf', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-xs font-medium w-24 text-text-secondary placeholder:text-text-muted/40" />
                  </td>
                  <td className="py-2.5 px-1">
                    {rows.length > 1 && (
                      <button onClick={() => removeRow(i)} className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors">
                        <Trash size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addRow} className="flex items-center gap-1.5 px-4 py-2 text-text-muted hover:text-gold text-[11px] transition-colors w-full hover:bg-gold/[0.03]">
          <Plus size={12} /> Add month
        </button>
      </motion.div>
    </div>
  )
}
