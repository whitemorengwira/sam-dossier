'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { GameController, ArrowRight, Lightning, Drop, Factory, Scales } from '@phosphor-icons/react'

const SimulationClient = dynamic(() => import('./SimulationClient'), { ssr: false })

const stages = [
  { id: 'extraction', name: 'Extraction', icon: <Lightning size={24} weight="duotone" />, desc: 'Ore is extracted from underground shafts via stoping method. Hand-powered winches hoist ore to surface. Target: 4-10 tonnes/day.', metrics: { input: '10 tonnes/day raw ore', output: '10 tonnes hauled to surface', grade: '15-25 g/t' }, colour: 'from-info/30 to-info/5' },
  { id: 'crushing', name: 'Crushing', icon: <Factory size={24} weight="duotone" />, desc: 'Raw ore is fed through the primary crusher to reduce particle size. Crushed material is prepared for the stamp mill and further grinding.', metrics: { input: '10 tonnes crushed ore', output: '10 tonnes ground material', grade: 'Particle size reduced' }, colour: 'from-warning/30 to-warning/5' },
  { id: 'processing', name: 'CIP Processing', icon: <Drop size={24} weight="duotone" />, desc: 'Ground ore enters the Carbon-in-Pulp (CIP) plant. Cyanide solution dissolves gold from ore. Activated carbon strips absorb the gold. Recovery rate: 90-95%.', metrics: { input: '10 tonnes processed', output: '~16g gold recovered', grade: '90-95% recovery' }, colour: 'from-gold/30 to-gold/5' },
  { id: 'elution', name: 'Elution and Smelting', icon: <Scales size={24} weight="duotone" />, desc: 'Gold is stripped from loaded carbon in the elution plant using heated caustic cyanide solution. The gold-bearing solution is then electrowon and smelted into dore bars.', metrics: { input: 'Loaded carbon', output: 'Gold dore bars', grade: '~90% purity' }, colour: 'from-success/30 to-success/5' },
  { id: 'refinery', name: 'FGR Delivery', icon: <GameController size={24} weight="duotone" />, desc: 'Gold dore is delivered exclusively to Zimbabwe Fidelity Gold Refinery (FGR), the sole authorised buyer and exporter. Final refining to 99.99% purity. Payment settled within 48 hours.', metrics: { input: 'Gold dore bars', output: 'Refined gold (99.99%)', grade: 'FGR settlement' }, colour: 'from-purple-500/30 to-purple-500/5' },
]

export default function SimulationPage() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-gold font-display font-black text-2xl mb-1">Mine Simulation</h1>
        <p className="text-text-muted text-sm">Interactive shaft-to-gold-bar lifecycle - Chikonga Mine</p>
      </motion.div>

      {/* Stage Progress Bar */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStage(i)}
                className={`flex-1 p-3 border text-center transition-all duration-300 ${i === activeStage ? 'border-gold/50 bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-gold/10 hover:border-gold/25'}`}
              >
                <div className={`mx-auto mb-2 ${i === activeStage ? 'text-gold' : 'text-text-muted'}`}>{stage.icon}</div>
                <p className={`text-[10px] font-mono ${i === activeStage ? 'text-gold' : 'text-text-muted'}`}>{stage.name}</p>
              </button>
              {i < stages.length - 1 && <ArrowRight size={14} className="text-gold/30 mx-1 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Active Stage Detail */}
      <motion.div key={activeStage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card p-8 lg:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 bg-gradient-to-br ${stages[activeStage].colour}`}>
            <span className="text-gold">{stages[activeStage].icon}</span>
          </div>
          <div>
            <span className="badge badge-gold text-[9px] mb-1">Stage {activeStage + 1} of {stages.length}</span>
            <h2 className="text-gold font-display font-bold text-xl">{stages[activeStage].name}</h2>
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed mb-8">{stages[activeStage].desc}</p>

        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gold/15 p-4">
            <p className="stat-label mb-1">Input</p>
            <p className="font-mono text-xs text-text-primary">{stages[activeStage].metrics.input}</p>
          </div>
          <div className="border border-gold/15 p-4">
            <p className="stat-label mb-1">Output</p>
            <p className="font-mono text-xs text-gold">{stages[activeStage].metrics.output}</p>
          </div>
          <div className="border border-gold/15 p-4">
            <p className="stat-label mb-1">Key Metric</p>
            <p className="font-mono text-xs text-success">{stages[activeStage].metrics.grade}</p>
          </div>
        </div>
      </motion.div>

      {/* Mine Ecosystem Simulation */}
      <SimulationClient />

      {/* Monthly Production Calculator */}
      <div className="glass-card p-8 lg:p-10">
        <h3 className="text-gold font-display font-bold text-lg mb-6">Monthly Production Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Ore Processed', value: '300 tonnes', sub: '10t/day x 30 days' },
            { label: 'Average Grade', value: '20 g/t', sub: 'Blended average' },
            { label: 'Contained Gold', value: '6,000g', sub: '300t x 20 g/t' },
            { label: 'Recovery at 92%', value: '5,520g', sub: '5.52 KG' },
            { label: 'Revenue at $3,200/oz', value: '$567,910', sub: '177.5 oz x $3,200' },
          ].map((m) => (
            <div key={m.label} className="border border-gold/15 p-4 text-center">
              <p className="stat-label mb-1">{m.label}</p>
              <p className="font-mono text-sm text-gold font-bold">{m.value}</p>
              <p className="text-[9px] text-text-muted font-mono mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
