'use client'

import { motion } from 'framer-motion'
import { Mountains, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

interface GradeRow {
  shaft: string
  jan: string
  feb: string
  mar: string
  apr: string
  may: string
  avg: string
}

const emptyGradeRow = (): GradeRow => ({
  shaft: '',
  jan: '',
  feb: '',
  mar: '',
  apr: '',
  may: '',
  avg: '',
})

export default function OreGradesPage() {
  const [rows, setRows] = useState<GradeRow[]>(
    Array.from({ length: 5 }, () => emptyGradeRow())
  )

  const updateRow = (i: number, field: keyof GradeRow, value: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  const addRow = () => setRows(prev => [...prev, emptyGradeRow()])

  const removeRow = (i: number) => {
    if (rows.length <= 1) return
    setRows(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Ore Grade Tracker</h1>
        <p className="text-text-muted text-sm">Enter monthly assay results by shaft and drive below</p>
      </motion.div>

      {/* Current Month Grades by Shaft */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
        <div className="p-4 border-b border-gold/15 flex items-center gap-3">
          <Mountains size={18} weight="duotone" className="text-gold" />
          <h3 className="text-text-primary font-body font-semibold text-sm">Monthly Grades (g/t)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                {['Shaft / Drive', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Average', ''].map(h => (
                  <th key={h} className={`py-3 px-3 text-gold font-mono text-[10px] uppercase tracking-wider ${h === 'Shaft / Drive' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gold/5 hover:bg-gold/[0.03]">
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.shaft} onChange={e => updateRow(i, 'shaft', e.target.value)} placeholder="Shaft / Drive name" className="bg-transparent border-none outline-none text-text-primary text-xs font-medium w-36 placeholder:text-text-muted/40" />
                  </td>
                  {(['jan', 'feb', 'mar', 'apr', 'may'] as const).map(month => (
                    <td key={month} className="py-2.5 px-3">
                      <input type="text" value={row[month]} onChange={e => updateRow(i, month, e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-xs text-center w-12 text-text-secondary placeholder:text-text-muted/40" />
                    </td>
                  ))}
                  <td className="py-2.5 px-3">
                    <input type="text" value={row.avg} onChange={e => updateRow(i, 'avg', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none font-mono text-xs text-center w-12 text-gold font-bold placeholder:text-text-muted/40" />
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
          <Plus size={12} /> Add shaft / drive
        </button>
      </motion.div>
    </div>
  )
}
