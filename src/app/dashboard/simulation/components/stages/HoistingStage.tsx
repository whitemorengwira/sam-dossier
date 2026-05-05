'use client'
import { motion } from 'framer-motion'

interface StageProps {
  active: boolean
  simulatedDays: number
  reducedMotion: boolean
}

export default function HoistingStage({ active, simulatedDays, reducedMotion }: StageProps) {
  const opacity = active ? 1 : 0.4
  const stockpileHeight = Math.min((simulatedDays / 30) * 40, 40)

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Hoisting Stage: Shaft skip hoist and surface stockpile"
    >
      <title>Stage 2 — Hoisting &amp; Haulage</title>
      <desc>A skip hoist carries ore up the vertical shaft to the surface stockpile for onward haulage to the ROM bin.</desc>

      {/* Shaft walls */}
      <rect x={480} y={200} width={4} height={520} fill="#1E2A3A" stroke="#6B7280" strokeWidth={0.5} />
      <rect x={536} y={200} width={4} height={520} fill="#1E2A3A" stroke="#6B7280" strokeWidth={0.5} />

      {/* Headgear frame */}
      <line x1={480} y1={200} x2={510} y2={150} stroke="#D4AF37" strokeWidth={1.5} strokeOpacity={0.6} />
      <line x1={540} y1={200} x2={510} y2={150} stroke="#D4AF37" strokeWidth={1.5} strokeOpacity={0.6} />
      <circle cx={510} cy={148} r={5} fill="#D4AF37" fillOpacity={0.5} />
      <text x={510} y={140} fill="#D4AF37" fontSize={8} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>SHAFT</text>

      {/* Animated skip */}
      <motion.g
        animate={reducedMotion ? { y: -300 } : {
          y: [-520, -520, -500, 0, 0],
          rotate: [0, 0, 30, 0, 0],
        }}
        style={{ originX: '510px', originY: '720px' }}
        transition={{
          duration: 13,
          repeat: Infinity,
          times: [0, 0.6, 0.65, 0.9, 1],
          ease: 'easeInOut',
        }}
      >
        <rect x={494} y={700} width={32} height={20} fill="#1E2A3A" stroke="#D4AF37" strokeWidth={1} />
        <rect x={498} y={704} width={24} height={12} fill="#3a3a3a" opacity={0.6} />
      </motion.g>

      {/* Rope */}
      <motion.line
        x1={510}
        y1={148}
        x2={510}
        y2={700}
        stroke="#6B7280"
        strokeWidth={1}
        animate={reducedMotion ? {} : {
          y2: [200, 200, 200, 720, 720],
        }}
        transition={{ duration: 13, repeat: Infinity, times: [0, 0.6, 0.65, 0.9, 1], ease: 'easeInOut' }}
      />

      {/* Surface stockpile (triangle that grows) */}
      <polygon
        points={`540,720 ${580 + stockpileHeight * 1.5},720 ${560 + stockpileHeight * 0.75},${720 - stockpileHeight}`}
        fill="#3a3a3a"
        stroke="#D4AF37"
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
      <text x={575} y={730} fill="#6B7280" fontSize={8} fontFamily="sans-serif" textAnchor="middle">ROM STOCKPILE</text>

      {/* Haul truck */}
      <motion.g
        animate={reducedMotion ? {} : {
          x: [0, 80, 80, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x={545} y={705} width={28} height={12} fill="#1E2A3A" stroke="#6B7280" strokeWidth={0.5} />
        <rect x={548} y={708} width={20} height={7} fill="#0A1128" />
        <circle cx={551} cy={717} r={2.5} fill="#6B7280" />
        <circle cx={568} cy={717} r={2.5} fill="#6B7280" />
      </motion.g>

      <text x={510} y={195} fill="#D4AF37" fontSize={10} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        2 — HOISTING
      </text>
    </motion.g>
  )
}
