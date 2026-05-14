'use client'

import { motion } from 'framer-motion'
import { Mountains, Plus, Trash, CalendarPlus } from '@phosphor-icons/react'
import { useState, useRef } from 'react'

interface GradeRow {
  shaft: string
  values: string[]
}

const DEFAULT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

function parseNum(s: string): number {
  return parseFloat(s.replace(/[^0-9.\-]/g, '')) || 0
}

const MIN_WIDTH = 50
const DEFAULT_NAME_WIDTH = 160
const DEFAULT_MONTH_WIDTH = 70
const DEFAULT_AVG_WIDTH = 80

export default function OreGradesPage() {
  const [months, setMonths] = useState(DEFAULT_MONTHS)
  const [rows, setRows] = useState<GradeRow[]>(
    Array.from({ length: 5 }, () => ({ shaft: '', values: Array(DEFAULT_MONTHS.length).fill('') }))
  )
  const [colWidths, setColWidths] = useState([DEFAULT_NAME_WIDTH, ...DEFAULT_MONTHS.map(() => DEFAULT_MONTH_WIDTH), DEFAULT_AVG_WIDTH])
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

  const updateRow = (i: number, field: 'shaft', value: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  const updateValue = (rowIdx: number, monthIdx: number, value: string) => {
    setRows(prev => prev.map((r, i) => {
      if (i !== rowIdx) return r
      const values = [...r.values]
      values[monthIdx] = value
      return { ...r, values }
    }))
  }

  const addRow = () => setRows(prev => [...prev, { shaft: '', values: Array(months.length).fill('') }])

  const removeRow = (i: number) => {
    if (rows.length > 1) setRows(prev => prev.filter((_, idx) => idx !== i))
  }

  const addMonth = () => {
    const nextMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const next = nextMonths[months.length % 12] || `M${months.length + 1}`
    setMonths(prev => [...prev, next])
    setRows(prev => prev.map(r => ({ ...r, values: [...r.values, ''] })))
    setColWidths(prev => [...prev.slice(0, -1), DEFAULT_MONTH_WIDTH, prev[prev.length - 1]])
  }

  // Compute averages
  const averages = rows.map(row => {
    const nums = row.values.map(parseNum).filter(n => n > 0)
    return nums.length > 0 ? (nums.reduce((a, b) => a + b, 0) / nums.length) : 0
  })

  // Overall average
  const allNums = rows.flatMap(r => r.values.map(parseNum).filter(n => n > 0))
  const overallAvg = allNums.length > 0 ? (allNums.reduce((a, b) => a + b, 0) / allNums.length) : 0

  const gradeColor = (v: number) => {
    if (v >= 25) return 'text-gold font-bold'
    if (v >= 18) return 'text-success'
    if (v > 0) return 'text-text-secondary'
    return 'text-text-muted/30'
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Ore Grade Tracker</h1>
            <p className="text-text-muted text-sm">Enter assay results — averages calculate automatically</p>
          </div>
          {overallAvg > 0 && (
            <div className="text-right">
              <p className="stat-label">Overall Average</p>
              <p className={`font-mono text-xl font-bold ${gradeColor(overallAvg)}`}>{overallAvg.toFixed(1)} g/t</p>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
        <div className="p-4 border-b border-gold/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mountains size={18} weight="duotone" className="text-gold" />
            <h3 className="text-text-primary font-body font-semibold text-sm">Monthly Grades (g/t)</h3>
          </div>
          <button onClick={addMonth} className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/20 rounded-lg text-gold text-[11px] hover:bg-gold/10 transition-colors">
            <CalendarPlus size={14} /> Add Month
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
              <col style={{ width: 32 }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gold/20">
                <th className="py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider text-left relative">
                  Shaft / Drive
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-gold/30" onMouseDown={e => onResizeStart(0, e)} />
                </th>
                {months.map((m, mi) => (
                  <th key={mi} className="py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider text-center relative">
                    {m}
                    <div className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-gold/30" onMouseDown={e => onResizeStart(mi + 1, e)} />
                  </th>
                ))}
                <th className="py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider text-center relative">
                  Average
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-gold/30" onMouseDown={e => onResizeStart(months.length + 1, e)} />
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gold/5 hover:bg-gold/[0.03] group">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={row.shaft}
                      onChange={e => updateRow(i, 'shaft', e.target.value)}
                      placeholder="Shaft / Drive name"
                      className="bg-transparent border-none outline-none text-text-primary text-xs font-medium w-full placeholder:text-text-muted/40 focus:text-white"
                    />
                  </td>
                  {months.map((_, mi) => (
                    <td key={mi} className="py-2 px-3">
                      <input
                        type="text"
                        value={row.values[mi] || ''}
                        onChange={e => updateValue(i, mi, e.target.value)}
                        placeholder="-"
                        className={`bg-transparent border-none outline-none font-mono text-xs text-center w-full placeholder:text-text-muted/40 focus:text-white ${gradeColor(parseNum(row.values[mi] || ''))}`}
                      />
                    </td>
                  ))}
                  <td className={`py-2 px-3 font-mono text-xs text-center font-bold ${gradeColor(averages[i])}`}>
                    {averages[i] > 0 ? averages[i].toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-1">
                    {rows.length > 1 && (
                      <button onClick={() => removeRow(i)} className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
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
          <Plus size={12} /> Add shaft / drive
        </button>
      </motion.div>
    </div>
  )
}
