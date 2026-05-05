'use client'
import { motion } from 'framer-motion'
import KpiTicker from './primitives/KpiTicker'
import { SimulationState } from '../simulation.data'

interface Props {
  state: SimulationState
  reducedMotion?: boolean
}

interface KpiCardProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  isPlaying: boolean
  reducedMotion: boolean
  delay?: number
}

function KpiCard({ label, value, prefix = '', suffix = '', decimals = 0, isPlaying, reducedMotion, delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      className="flex-1 min-w-[120px] p-3 relative"
      style={{ background: 'rgba(10,17,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212,175,55,0.06)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Live indicator */}
      <div className="absolute top-2 right-2">
        <motion.div
          style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }}
          animate={isPlaying && !reducedMotion ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <p className="text-[9px] uppercase tracking-widest mb-1 font-mono" style={{ color: '#6B7280' }}>{label}</p>
      <div className="text-lg font-display font-bold" style={{ color: '#D4AF37' }}>
        <KpiTicker value={value} prefix={prefix} suffix={suffix} decimals={decimals} reducedMotion={reducedMotion} />
      </div>
    </motion.div>
  )
}

export default function LiveSimulationMetrics({ state, reducedMotion = false }: Props) {
  const {
    isPlaying,
    tonnesHoisted,
    averageGrade,
    gramsRecovered,
    ouncesRecovered,
    revenueUsd,
    revenueZar,
    waterReclaimedKl,
  } = state

  const gramsDisplay = gramsRecovered >= 1000 ? gramsRecovered / 1000 : gramsRecovered
  const gramsSuffix = gramsRecovered >= 1000 ? ' kg' : ' g'

  return (
    <div
      className="p-4"
      style={{ background: 'rgba(10,17,40,0.5)', border: '1px solid rgba(212,175,55,0.06)', borderTop: 'none' }}
    >
      <p className="text-[9px] uppercase tracking-widest mb-3 font-mono" style={{ color: '#6B7280' }}>
        Live Simulation Metrics
      </p>
      <div className="flex flex-wrap gap-2">
        <KpiCard label="Tonnes Hoisted" value={tonnesHoisted} suffix=" t" decimals={1} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0} />
        <KpiCard label="Avg Grade" value={averageGrade} suffix=" g/t" decimals={1} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.08} />
        <KpiCard label="Gold Recovered" value={gramsDisplay} suffix={gramsSuffix} decimals={gramsRecovered >= 1000 ? 2 : 0} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.16} />
        <KpiCard label="Ounces" value={ouncesRecovered} suffix=" oz" decimals={2} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.24} />
        <KpiCard label="Revenue USD" value={revenueUsd} prefix="$" decimals={0} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.32} />
        <KpiCard label="Revenue ZAR" value={revenueZar} prefix="R" decimals={0} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.40} />
        <KpiCard label="Water Reclaimed" value={waterReclaimedKl} suffix=" kL" decimals={1} isPlaying={isPlaying} reducedMotion={reducedMotion} delay={0.48} />
      </div>
    </div>
  )
}
