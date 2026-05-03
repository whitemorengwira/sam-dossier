'use client'

import { motion } from 'framer-motion'
import { Table, CurrencyCircleDollar } from '@phosphor-icons/react'

const budgetData = [
  { category: 'Mining Equipment Mobilisation', items: [
    { item: 'Excavators (x2)', qty: 2, unitCost: 'R450,000', total: 'R900,000' },
    { item: 'Dump Trucks (x3)', qty: 3, unitCost: 'R350,000', total: 'R1,050,000' },
    { item: 'Compressors and Drills', qty: 1, unitCost: 'R600,000', total: 'R600,000' },
    { item: 'Winches and Hoisting Equipment', qty: 4, unitCost: 'R120,000', total: 'R480,000' },
    { item: 'Safety Equipment and PPE', qty: 1, unitCost: 'R470,000', total: 'R470,000' },
  ], subtotal: 'R3,500,000' },
  { category: 'Processing Plant Scaling', items: [
    { item: 'CIP Plant Installation', qty: 1, unitCost: 'R1,500,000', total: 'R1,500,000' },
    { item: 'Industrial Boilers', qty: 2, unitCost: 'R400,000', total: 'R800,000' },
    { item: 'Leach Tanks (additional x4)', qty: 4, unitCost: 'R75,000', total: 'R300,000' },
    { item: 'Crusher Upgrade', qty: 1, unitCost: 'R400,000', total: 'R400,000' },
  ], subtotal: 'R3,000,000' },
  { category: 'Operational Working Capital', items: [
    { item: 'Diesel and Fuel (6 months)', qty: 6, unitCost: 'R100,000', total: 'R600,000' },
    { item: 'Reagents and Chemicals', qty: 6, unitCost: 'R50,000', total: 'R300,000' },
    { item: 'Workforce Salaries (3 months reserve)', qty: 3, unitCost: 'R200,000', total: 'R600,000' },
  ], subtotal: 'R1,500,000' },
  { category: 'Compliance, Safety and Governance', items: [
    { item: 'SAMREC Competent Persons Report', qty: 1, unitCost: 'R450,000', total: 'R450,000' },
    { item: 'Environmental Impact Assessment', qty: 1, unitCost: 'R250,000', total: 'R250,000' },
    { item: 'Legal and Regulatory Fees', qty: 1, unitCost: 'R300,000', total: 'R300,000' },
  ], subtotal: 'R1,000,000' },
  { category: 'Sales, Off-take and Transport', items: [
    { item: 'FGR Transport and Logistics', qty: 12, unitCost: 'R40,000', total: 'R480,000' },
    { item: 'Export Documentation', qty: 1, unitCost: 'R120,000', total: 'R120,000' },
    { item: 'Off-take Relationship Management', qty: 1, unitCost: 'R400,000', total: 'R400,000' },
  ], subtotal: 'R1,000,000' },
]

export default function BudgetPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Budget Breakdown</h1>
            <p className="text-text-muted text-sm">ZAR 10,000,000 Capital Deployment Schedule</p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyCircleDollar size={16} className="text-gold" />
            <span className="font-mono text-sm text-gold font-bold">R10,000,000</span>
          </div>
        </div>
      </motion.div>

      {budgetData.map((section, si) => (
        <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1, duration: 0.5 }}>
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Table size={18} weight="duotone" className="text-gold" />
                <h3 className="text-text-primary font-body font-semibold text-sm">{section.category}</h3>
              </div>
              <span className="font-mono text-sm text-gold font-bold">{section.subtotal}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Item</th>
                    <th className="text-center py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Qty</th>
                    <th className="text-right py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Unit Cost</th>
                    <th className="text-right py-2.5 px-4 text-gold/60 font-mono text-[10px] uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => (
                    <tr key={item.item} className="border-b border-gold/5 hover:bg-gold/[0.03] transition-colors">
                      <td className="py-2.5 px-4 text-text-secondary text-xs">{item.item}</td>
                      <td className="py-2.5 px-4 text-text-muted font-mono text-xs text-center">{item.qty}</td>
                      <td className="py-2.5 px-4 text-text-muted font-mono text-xs text-right">{item.unitCost}</td>
                      <td className="py-2.5 px-4 text-text-primary font-mono text-xs text-right font-medium">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Grand Total */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="glass-card-heavy p-6 flex items-center justify-between">
        <span className="text-text-primary font-display font-bold text-lg">Grand Total</span>
        <span className="font-mono text-2xl text-gold font-bold">R10,000,000</span>
      </motion.div>
    </div>
  )
}
