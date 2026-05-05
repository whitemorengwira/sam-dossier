'use client'
import { motion } from 'framer-motion'

interface StageProps {
  active: boolean
  simulatedDays: number
  reducedMotion: boolean
}

function FloatCell({ x, y, delay = 0, reducedMotion }: { x: number; y: number; delay?: number; reducedMotion: boolean }) {
  const bubbles = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1]
  return (
    <g>
      <rect x={x} y={y} width={50} height={80} fill="#0A1128" stroke="#3B82F6" strokeWidth={0.5} strokeOpacity={0.4} />
      {/* Froth layer */}
      <rect x={x} y={y} width={50} height={15} fill="#F5F0E8" fillOpacity={0.08} />
      {!reducedMotion && bubbles.map((d, i) => (
        <motion.circle
          key={i}
          cx={x + 5 + (i * 7) % 45}
          cy={y + 80}
          r={2.5}
          fill="white"
          fillOpacity={0.5}
          animate={{ cy: [y + 75, y + 15], opacity: [0.5, 0.8, 0] }}
          transition={{ duration: 2 + (i % 3) * 0.3, delay: d + delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </g>
  )
}

export default function ConcentrationStage({ active, simulatedDays, reducedMotion }: StageProps) {
  const opacity = active ? 1 : 0.4
  const cipGoldTint = Math.min(simulatedDays / 30, 1)
  const cipColor = `rgb(${Math.round(0 + cipGoldTint * 58)}, ${Math.round(0 + cipGoldTint * 42)}, 0)`
  const cathodeThickness = Math.min(simulatedDays / 30 * 8, 8)

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Concentration Stage: Flotation, cyanide leaching, CIP, and electrowinning"
    >
      <title>Stage 4 — Hydrometallurgy</title>
      <desc>Cyanide leaching, Carbon-in-Pulp adsorption, and electrowinning recover gold from the ore slurry.</desc>

      {/* Section label */}
      <text x={1200} y={273} fill="#D4AF37" fontSize={10} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        4 — HYDROMETALLURGY
      </text>

      {/* Flotation cells */}
      <text x={1110} y={298} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">FLOTATION</text>
      <FloatCell x={1080} y={305} delay={0} reducedMotion={reducedMotion} />
      <FloatCell x={1135} y={305} delay={0.5} reducedMotion={reducedMotion} />
      <FloatCell x={1190} y={305} delay={1} reducedMotion={reducedMotion} />

      {/* Cyanide leach tank (ellipse top-down view) */}
      <text x={1290} y={298} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">LEACH TANK</text>
      <ellipse cx={1290} cy={345} rx={40} ry={25} fill="#0A1128" stroke="#10B981" strokeWidth={0.5} strokeOpacity={0.4} />
      <motion.ellipse
        cx={1290}
        cy={345}
        rx={25}
        ry={15}
        fill="none"
        stroke="#10B981"
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="5 3"
        animate={reducedMotion ? {} : { rotate: 360 }}
        style={{ originX: '1290px', originY: '345px' }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* CIP cascade tanks */}
      <text x={1390} y={298} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">CIP CASCADE</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={1350 + i * 35} y={305 + i * 8} width={30} height={50} fill="#0A0A0A" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.3} />
          {/* Carbon granules */}
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <circle
              key={j}
              cx={1358 + i * 35 + (j % 3) * 7}
              cy={315 + i * 8 + Math.floor(j / 3) * 8}
              r={3}
              fill={cipColor}
            />
          ))}
        </g>
      ))}

      {/* Electrowinning cell */}
      <text x={1490} y={298} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">ELECTROWINNING</text>
      <rect x={1460} y={305} width={70} height={70} fill="#0A1128" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.4} />
      {/* Cathode plates */}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={1470 + i * 20} y={315} width={6} height={50} fill="#1E2A3A" stroke="#6B7280" strokeWidth={0.5} />
          {/* Gold deposition */}
          <rect
            x={1470 + i * 20}
            y={315}
            width={cathodeThickness}
            height={50}
            fill="#D4AF37"
            fillOpacity={0.4}
          />
        </g>
      ))}
    </motion.g>
  )
}
