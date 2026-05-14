'use client'

import { motion } from 'framer-motion'
import { ChartLineUp, TrendUp, TrendDown, Plus, Trash } from '@phosphor-icons/react'
import { useState, useRef } from 'react'

interface CashFlowRow {
  month: string
  phase: string
  revenue: string
  opex: string
  capex: string
}

const emptyRow = (i: number): CashFlowRow => ({
  month: `Month ${i + 1}`,
  phase: '',
  revenue: '',
  opex: '',
  capex: '',
})

function parseNum(s: string): number {
  return parseFloat(s.replace(/[^0-9.\-]/g, '')) || 0
}

function formatR(n: number): string {
  if (n === 0) return '-'
  const prefix = n < 0 ? '-R' : 'R'
  return prefix + Math.abs(n).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const DEFAULT_WIDTHS = [80, 80, 110, 110, 110, 110, 110]
const MIN_WIDTH = 50
const COL_HEADERS = ['Month', 'Phase', 'Revenue', 'OPEX', 'CAPEX', 'Net CF', 'Cumulative']

export default function CashFlowPage() {
  const [rows, setRows] = useState<CashFlowRow[]>(
    Array.from({ length: 12 }, (_, i) => emptyRow(i))
  )
  const [colWidths, setColWidths] = useState(DEFAULT_WIDTHS)
  const resizing = useRef<{ col: number; startX: number; startW: number } | null>(null)

  const onResizeStart = (colIdx: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizing.current = { col: colIdx, startX: e.clientX, startW: colWidths[colIdx] }
    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return
      const diff = ev.clientX - resizing.current.startX
      setColWidths(prev => prev.map((w, i) => i === resizing.current!.col ? Math.max(MIN_WIDTH, resizing.current!.startW + diff) : w))
    }
    const onUp = () => { resizing.current = null; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const updateRow = (i: number, field: keyof CashFlowRow, value: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  const addRow = () => setRows(prev => [...prev, emptyRow(prev.length)])
  const removeRow = (i: number) => { if (rows.length > 1) setRows(prev => prev.filter((_, idx) => idx !== i)) }

  // Auto-calculate Net CF and Cumulative
  const computed = rows.map(row => {
    const rev = parseNum(row.revenue)
    const opex = parseNum(row.opex)
    const capex = parseNum(row.capex)
    const netCf = rev - opex - capex
    return { netCf, rev, opex, capex }
  })

  let cumulative = 0
  const cumulatives = computed.map(c => {
    cumulative += c.netCf
    return cumulative
  })

  // Summary stats
  const hasData = computed.some(c => c.rev || c.opex || c.capex)
  const breakevenMonth = cumulatives.findIndex((c, i) => i > 0 && cumulatives[i - 1] < 0 && c >= 0)
  const yearEndCf = cumulatives[Math.min(11, cumulatives.length - 1)] || 0
  const peakCapexIdx = computed.reduce((maxI, c, i, arr) => c.capex > (arr[maxI]?.capex || 0) ? i : maxI, 0)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Cash Flow Model</h1>
        <p className="text-text-muted text-sm">Enter revenue, OPEX, and CAPEX — Net CF and Cumulative calculate automatically</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Breakeven Month</p>
          <p className={`font-mono text-2xl font-bold ${hasData && breakevenMonth >= 0 ? 'text-gold' : 'text-text-muted'}`}>
            {hasData && breakevenMonth >= 0 ? `Month ${breakevenMonth + 1}` : '—'}
          </p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Year 1 Net Cash Flow</p>
          <p className={`font-mono text-2xl font-bold ${hasData ? (yearEndCf >= 0 ? 'text-success' : 'text-danger') : 'text-text-muted'}`}>
            {hasData ? formatR(yearEndCf) : '—'}
          </p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="stat-label mb-1">Peak CAPEX Month</p>
          <p className={`font-mono text-2xl font-bold ${hasData && computed[peakCapexIdx]?.capex ? 'text-warning' : 'text-text-muted'}`}>
            {hasData && computed[peakCapexIdx]?.capex ? rows[peakCapexIdx].month : '—'}
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
              <col style={{ width: 32 }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gold/20">
                {COL_HEADERS.map((h, hi) => (
                  <th key={h} className="text-left py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider relative">
                    {h}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-gold/30"
                      onMouseDown={e => onResizeStart(hi, e)}
                    />
                  </th>
                ))}
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const c = computed[i]
                const netCf = c.rev || c.opex || c.capex ? c.netCf : 0
                const cum = c.rev || c.opex || c.capex ? cumulatives[i] : 0
                const hasRow = c.rev || c.opex || c.capex
                const isNeg = netCf < 0

                return (
                  <tr key={i} className="border-b border-gold/5 hover:bg-gold/[0.03] group">
                    <td className="py-2 px-3">
                      <input type="text" value={row.month} onChange={e => updateRow(i, 'month', e.target.value)} className="bg-transparent border-none outline-none font-mono text-text-primary text-xs font-medium w-full focus:text-white" />
                    </td>
                    <td className="py-2 px-3">
                      <input type="text" value={row.phase} onChange={e => updateRow(i, 'phase', e.target.value)} placeholder="—" className="bg-transparent border-none outline-none text-text-secondary text-xs w-full placeholder:text-text-muted/40 focus:text-white" />
                    </td>
                    <td className="py-2 px-3">
                      <input type="text" value={row.revenue} onChange={e => updateRow(i, 'revenue', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-secondary text-xs w-full placeholder:text-text-muted/40 focus:text-white" />
                    </td>
                    <td className="py-2 px-3">
                      <input type="text" value={row.opex} onChange={e => updateRow(i, 'opex', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-muted text-xs w-full placeholder:text-text-muted/40 focus:text-white" />
                    </td>
                    <td className="py-2 px-3">
                      <input type="text" value={row.capex} onChange={e => updateRow(i, 'capex', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-text-muted text-xs w-full placeholder:text-text-muted/40 focus:text-white" />
                    </td>
                    <td className={`py-2 px-3 font-mono text-xs font-medium ${hasRow ? (isNeg ? 'text-danger' : 'text-success') : 'text-text-muted/30'}`}>
                      {hasRow ? (
                        <span className="flex items-center gap-1">
                          {isNeg ? <TrendDown size={10} /> : <TrendUp size={10} />}
                          {formatR(netCf)}
                        </span>
                      ) : '-'}
                    </td>
                    <td className={`py-2 px-3 font-mono text-xs font-medium ${hasRow ? (cum < 0 ? 'text-danger/70' : 'text-gold') : 'text-text-muted/30'}`}>
                      {hasRow ? formatR(cum) : '-'}
                    </td>
                    <td className="py-2 px-1">
                      {rows.length > 1 && (
                        <button onClick={() => removeRow(i)} className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash size={12} />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
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
