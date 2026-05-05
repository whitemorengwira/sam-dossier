'use client'
import { motion } from 'framer-motion'

interface StageProps {
  active: boolean
  simulatedDays: number
  reducedMotion: boolean
}

export default function SmeltingStage({ active, simulatedDays, reducedMotion }: StageProps) {
  const opacity = active ? 1 : 0.4
  const barCount = Math.floor(simulatedDays / 5)
  const isPouringPeriod = (simulatedDays % 5) < 0.5 && simulatedDays > 0.5

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Smelting Stage: Induction furnace and doré bar casting"
    >
      <title>Stage 5 — Smelting &amp; Doré</title>
      <desc>Gold sludge is smelted in an induction furnace and cast into doré bars for dispatch to the refinery.</desc>

      {/* Furnace housing */}
      <rect x={1480} y={290} width={80} height={100} fill="#0A0A0A" stroke="#D4AF37" strokeWidth={1} strokeOpacity={0.5} />
      <text x={1520} y={283} fill="#D4AF37" fontSize={8} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        FURNACE
      </text>

      {/* Furnace glow */}
      <motion.ellipse
        cx={1520}
        cy={340}
        rx={30}
        ry={25}
        fill="#FF6B1A"
        animate={reducedMotion ? { opacity: 0.6 } : {
          opacity: [0.6, 1.0, 0.6],
          rx: [30, 32, 30],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Inner furnace */}
      <ellipse cx={1520} cy={340} rx={20} ry={18} fill="#FF6B1A" fillOpacity={0.8} />

      {/* Crucible tipping during pour */}
      {!reducedMotion && isPouringPeriod && (
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -40, -40, 0] }}
          style={{ originX: '1510px', originY: '330px' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          {/* Crucible */}
          <polygon points="1505,310 1530,310 1525,330 1510,330" fill="#1E2A3A" stroke="#D4AF37" strokeWidth={1} />
          {/* Molten gold stream */}
          <motion.rect
            x={1508}
            y={330}
            width={6}
            height={20}
            fill="#FF6B1A"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </motion.g>
      )}

      {/* Doré bar mould */}
      <rect x={1570} y={380} width={50} height={15} fill="#1E2A3A" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.4} />
      <text x={1595} y={408} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">MOULD</text>

      {/* Stacked doré bars */}
      {Array.from({ length: Math.min(barCount, 6) }, (_, i) => (
        <motion.rect
          key={i}
          x={1572}
          y={373 - i * 6}
          width={46}
          height={5}
          fill="#D4AF37"
          fillOpacity={0.7}
          stroke="#D4AF37"
          strokeWidth={0.3}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {barCount > 0 && (
        <text x={1595} y={365 - Math.min(barCount, 6) * 6} fill="#D4AF37" fontSize={7} fontFamily="sans-serif" textAnchor="middle" opacity={0.7}>
          {barCount} BAR{barCount !== 1 ? 'S' : ''}
        </text>
      )}

      <text x={1520} y={275} fill="#D4AF37" fontSize={10} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        5 — SMELTING
      </text>
    </motion.g>
  )
}
