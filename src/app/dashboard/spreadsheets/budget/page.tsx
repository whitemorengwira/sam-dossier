'use client'

import { motion } from 'framer-motion'
import { Table, CurrencyCircleDollar, Plus, Trash } from '@phosphor-icons/react'
import { useState, useRef } from 'react'

interface BudgetItem {
  item: string
  qty: string
  unitCost: string
  total: string
}

interface BudgetSection {
  category: string
  items: BudgetItem[]
}

const emptySection = (): BudgetSection => ({
  category: '',
  items: [{ item: '', qty: '', unitCost: '', total: '' }],
})

function parseNum(s: string): number {
  return parseFloat(s.replace(/[^0-9.\-]/g, '')) || 0
}

function formatCurrency(n: number): string {
  if (n === 0) return ''
  return 'R' + n.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const DEFAULT_WIDTHS = [300, 60, 120, 120]
const MIN_WIDTH = 50

export default function BudgetPage() {
  const [sections, setSections] = useState<BudgetSection[]>([emptySection()])
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

  const updateItem = (si: number, ii: number, field: keyof BudgetItem, value: string) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== si) return s
      const items = s.items.map((item, j) => {
        if (j !== ii) return item
        const updated = { ...item, [field]: value }
        // Auto-calculate total = qty × unitCost
        if (field === 'qty' || field === 'unitCost') {
          const q = parseNum(field === 'qty' ? value : item.qty)
          const u = parseNum(field === 'unitCost' ? value : item.unitCost)
          if (q && u) updated.total = formatCurrency(q * u)
        }
        return updated
      })
      return { ...s, items }
    }))
  }

  const updateCategory = (si: number, value: string) => {
    setSections(prev => prev.map((s, i) => i === si ? { ...s, category: value } : s))
  }

  const addItem = (si: number) => {
    setSections(prev => prev.map((s, i) => i === si ? { ...s, items: [...s.items, { item: '', qty: '', unitCost: '', total: '' }] } : s))
  }

  const removeItem = (si: number, ii: number) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== si || s.items.length <= 1) return s
      return { ...s, items: s.items.filter((_, j) => j !== ii) }
    }))
  }

  const addSection = () => setSections(prev => [...prev, emptySection()])
  const removeSection = (si: number) => { if (sections.length > 1) setSections(prev => prev.filter((_, i) => i !== si)) }

  // Computed totals
  const sectionSubtotals = sections.map(s => s.items.reduce((sum, item) => sum + parseNum(item.total), 0))
  const grandTotal = sectionSubtotals.reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Budget Breakdown</h1>
            <p className="text-text-muted text-sm">Add categories and line items — totals calculate automatically</p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyCircleDollar size={16} className="text-gold" />
            <span className="font-mono text-sm text-gold font-bold">{grandTotal ? formatCurrency(grandTotal) : '—'}</span>
          </div>
        </div>
      </motion.div>

      {sections.map((section, si) => (
        <motion.div key={si} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.08, duration: 0.5 }}>
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Table size={18} weight="duotone" className="text-gold" />
                <input
                  type="text"
                  value={section.category}
                  onChange={e => updateCategory(si, e.target.value)}
                  placeholder="Category name (e.g. Mining Equipment)"
                  className="bg-transparent border-none outline-none text-text-primary font-body font-semibold text-sm flex-1 placeholder:text-text-muted/50"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-gold font-bold">{sectionSubtotals[si] ? formatCurrency(sectionSubtotals[si]) : '—'}</span>
                {sections.length > 1 && (
                  <button onClick={() => removeSection(si)} className="p-1 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors">
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
                  <col style={{ width: 32 }} />
                </colgroup>
                <thead>
                  <tr className="border-b border-gold/10">
                    {['Item', 'Qty', 'Unit Cost', 'Total'].map((h, hi) => (
                      <th key={h} className={`py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider relative ${hi >= 1 ? 'text-right' : 'text-left'}`}>
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
                  {section.items.map((item, ii) => (
                    <tr key={ii} className="border-b border-gold/5 hover:bg-gold/[0.03] transition-colors group">
                      <td className="py-2 px-4">
                        <input type="text" value={item.item} onChange={e => updateItem(si, ii, 'item', e.target.value)} placeholder="Item description" className="bg-transparent border-none outline-none text-text-secondary text-xs w-full placeholder:text-text-muted/40 focus:text-white" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="text" value={item.qty} onChange={e => updateItem(si, ii, 'qty', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-muted font-mono text-xs text-right w-full placeholder:text-text-muted/40 focus:text-white" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="text" value={item.unitCost} onChange={e => updateItem(si, ii, 'unitCost', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-muted font-mono text-xs text-right w-full placeholder:text-text-muted/40 focus:text-white" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="text" value={item.total} onChange={e => updateItem(si, ii, 'total', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-primary font-mono text-xs text-right w-full font-medium placeholder:text-text-muted/40 focus:text-white" />
                      </td>
                      <td className="py-2 px-1">
                        {section.items.length > 1 && (
                          <button onClick={() => removeItem(si, ii)} className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => addItem(si)} className="flex items-center gap-1.5 px-4 py-2 text-text-muted hover:text-gold text-[11px] transition-colors w-full hover:bg-gold/[0.03]">
              <Plus size={12} /> Add row
            </button>
          </div>
        </motion.div>
      ))}

      <button onClick={addSection} className="flex items-center gap-2 px-4 py-3 border border-dashed border-gold/20 rounded-lg text-text-muted hover:text-gold hover:border-gold/40 text-sm transition-colors w-full justify-center">
        <Plus size={16} /> Add Category
      </button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="glass-card-heavy p-6 flex items-center justify-between">
        <span className="text-text-primary font-display font-bold text-lg">Grand Total</span>
        <span className={`font-mono text-2xl font-bold ${grandTotal ? 'text-gold' : 'text-text-muted'}`}>{grandTotal ? formatCurrency(grandTotal) : '—'}</span>
      </motion.div>
    </div>
  )
}
