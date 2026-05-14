'use client'

import { motion } from 'framer-motion'
import { Table, CurrencyCircleDollar, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

interface BudgetItem {
  item: string
  qty: string
  unitCost: string
  total: string
}

interface BudgetSection {
  category: string
  items: BudgetItem[]
  subtotal: string
}

const emptySection = (): BudgetSection => ({
  category: '',
  items: [{ item: '', qty: '', unitCost: '', total: '' }],
  subtotal: '',
})

export default function BudgetPage() {
  const [sections, setSections] = useState<BudgetSection[]>([emptySection()])

  const updateSection = (si: number, field: keyof BudgetSection, value: string) => {
    setSections(prev => prev.map((s, i) => i === si ? { ...s, [field]: value } : s))
  }

  const updateItem = (si: number, ii: number, field: keyof BudgetItem, value: string) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== si) return s
      const items = s.items.map((item, j) => j === ii ? { ...item, [field]: value } : item)
      return { ...s, items }
    }))
  }

  const addItem = (si: number) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== si) return s
      return { ...s, items: [...s.items, { item: '', qty: '', unitCost: '', total: '' }] }
    }))
  }

  const removeItem = (si: number, ii: number) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== si || s.items.length <= 1) return s
      return { ...s, items: s.items.filter((_, j) => j !== ii) }
    }))
  }

  const addSection = () => setSections(prev => [...prev, emptySection()])

  const removeSection = (si: number) => {
    if (sections.length <= 1) return
    setSections(prev => prev.filter((_, i) => i !== si))
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Budget Breakdown</h1>
            <p className="text-text-muted text-sm">Add your budget categories and line items below</p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyCircleDollar size={16} className="text-gold" />
            <span className="font-mono text-sm text-text-muted">Enter data to begin</span>
          </div>
        </div>
      </motion.div>

      {sections.map((section, si) => (
        <motion.div key={si} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1, duration: 0.5 }}>
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Table size={18} weight="duotone" className="text-gold" />
                <input
                  type="text"
                  value={section.category}
                  onChange={e => updateSection(si, 'category', e.target.value)}
                  placeholder="Category name (e.g. Mining Equipment)"
                  className="bg-transparent border-none outline-none text-text-primary font-body font-semibold text-sm flex-1 placeholder:text-text-muted/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={section.subtotal}
                  onChange={e => updateSection(si, 'subtotal', e.target.value)}
                  placeholder="Subtotal"
                  className="bg-transparent border-none outline-none font-mono text-sm text-gold font-bold text-right w-32 placeholder:text-gold/30"
                />
                {sections.length > 1 && (
                  <button onClick={() => removeSection(si)} className="p-1 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors">
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Item</th>
                    <th className="text-center py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Qty</th>
                    <th className="text-right py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Unit Cost</th>
                    <th className="text-right py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Total</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, ii) => (
                    <tr key={ii} className="border-b border-gold/5 hover:bg-gold/[0.03] transition-colors">
                      <td className="py-2.5 px-4">
                        <input type="text" value={item.item} onChange={e => updateItem(si, ii, 'item', e.target.value)} placeholder="Item description" className="bg-transparent border-none outline-none text-text-secondary text-xs w-full placeholder:text-text-muted/40" />
                      </td>
                      <td className="py-2.5 px-4">
                        <input type="text" value={item.qty} onChange={e => updateItem(si, ii, 'qty', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-muted font-mono text-xs text-center w-full placeholder:text-text-muted/40" />
                      </td>
                      <td className="py-2.5 px-4">
                        <input type="text" value={item.unitCost} onChange={e => updateItem(si, ii, 'unitCost', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-muted font-mono text-xs text-right w-full placeholder:text-text-muted/40" />
                      </td>
                      <td className="py-2.5 px-4">
                        <input type="text" value={item.total} onChange={e => updateItem(si, ii, 'total', e.target.value)} placeholder="-" className="bg-transparent border-none outline-none text-text-primary font-mono text-xs text-right w-full font-medium placeholder:text-text-muted/40" />
                      </td>
                      <td className="py-2.5 px-1">
                        {section.items.length > 1 && (
                          <button onClick={() => removeItem(si, ii)} className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100" style={{ opacity: 1 }}>
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

      {/* Grand Total */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="glass-card-heavy p-6 flex items-center justify-between">
        <span className="text-text-primary font-display font-bold text-lg">Grand Total</span>
        <span className="font-mono text-2xl text-text-muted">—</span>
      </motion.div>
    </div>
  )
}
