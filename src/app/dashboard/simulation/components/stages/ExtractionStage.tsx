'use client'
import { motion } from 'framer-motion'
import OreParticle from '../primitives/OreParticle'

interface StageProps {
  active: boolean
  simulatedDays: number
  reducedMotion: boolean
}

export default function ExtractionStage({ active, simulatedDays, reducedMotion }: StageProps) {
  const opacity = active ? 1 : 0.4
  const hopperFill = Math.min(simulatedDays / 30, 1)
  const particles = [0, 0.3, 0.6, 0.9, 1.2, 1.5]
  const sparkTrigger = Math.floor(simulatedDays * 100) % 12 < 3

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Extraction Stage: Underground stoping and ore hoisting"
    >
      <title>Stage 1 — Extraction</title>
      <desc>Underground stope where ore is extracted via hand-powered winches and hoisted to the surface.</desc>

      {/* Stope void */}
      <polygon
        points="120,820 200,800 280,810 300,900 80,900"
        fill="#0A0A0A"
        stroke="#D4AF37"
        strokeWidth={1}
        strokeOpacity={0.3}
      />

      {/* Rock face */}
      <line x1={280} y1={810} x2={300} y2={900} stroke="#6B7280" strokeWidth={2} />

      {/* Schematic miner 1 */}
      <g transform="translate(140, 860)">
        <circle cx={0} cy={-20} r={5} fill="none" stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={-15} x2={0} y2={0} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={-8} y1={-10} x2={8} y2={-10} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={0} x2={-6} y2={15} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={0} x2={6} y2={15} stroke="#EDEDED" strokeWidth={1.5} />
      </g>

      {/* Schematic miner 2 */}
      <g transform="translate(220, 855)">
        <circle cx={0} cy={-20} r={5} fill="none" stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={-15} x2={0} y2={0} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={-8} y1={-10} x2={8} y2={-10} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={0} x2={-6} y2={15} stroke="#EDEDED" strokeWidth={1.5} />
        <line x1={0} y1={0} x2={6} y2={15} stroke="#EDEDED" strokeWidth={1.5} />
      </g>

      {/* Windlass 1 */}
      <rect x={125} y={830} width={20} height={12} fill="#1E2A3A" stroke="#D4AF37" strokeWidth={0.5} />
      <motion.rect
        x={132}
        y={833}
        width={6}
        height={6}
        fill="#D4AF37"
        fillOpacity={0.6}
        animate={reducedMotion ? {} : { rotate: 360 }}
        style={{ originX: '135px', originY: '836px' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Windlass 2 */}
      <rect x={205} y={825} width={20} height={12} fill="#1E2A3A" stroke="#D4AF37" strokeWidth={0.5} />
      <motion.rect
        x={212}
        y={828}
        width={6}
        height={6}
        fill="#D4AF37"
        fillOpacity={0.6}
        animate={reducedMotion ? {} : { rotate: 360 }}
        style={{ originX: '215px', originY: '831px' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1.5 }}
      />

      {/* Ore hopper */}
      <polygon points="150,900 250,900 240,940 160,940" fill="#1a1a2e" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.4} />
      {/* Hopper fill */}
      <clipPath id="hopper-clip">
        <polygon points="150,900 250,900 240,940 160,940" />
      </clipPath>
      <rect
        x={150}
        y={940 - 40 * hopperFill}
        width={100}
        height={40 * hopperFill}
        fill="#3a3a3a"
        clipPath="url(#hopper-clip)"
      />

      {/* Ore particles falling */}
      {!reducedMotion && particles.map((delay, i) => (
        <OreParticle key={i} cx={180 + (i % 3) * 12} cy={820} r={3} delay={delay} reducedMotion={reducedMotion} />
      ))}

      {/* Pickaxe sparks */}
      {!reducedMotion && sparkTrigger && (
        <>
          <motion.circle cx={285} cy={835} r={2} fill="#D4AF37" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.4 }} />
          <motion.circle cx={290} cy={830} r={1.5} fill="#D4AF37" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.4, delay: 0.1 }} />
          <motion.circle cx={283} cy={840} r={1} fill="#D4AF37" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.4, delay: 0.05 }} />
        </>
      )}

      {/* Stage label */}
      <text x={190} y={800} fill="#D4AF37" fontSize={10} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        1 — EXTRACTION
      </text>
    </motion.g>
  )
}
