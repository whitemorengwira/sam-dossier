'use client'
import { motion } from 'framer-motion'
import { SIMULATION_PARAMS } from '../../simulation.data'

interface AmbientProps {
  tailingsDepositedTonnes: number
  reducedMotion: boolean
}

export default function TailingsStorageFacility({ tailingsDepositedTonnes, reducedMotion }: AmbientProps) {
  const maxTailings = SIMULATION_PARAMS.daysPerCycle * SIMULATION_PARAMS.oreFeedTonnesPerDay * SIMULATION_PARAMS.tailingsDepositionFraction
  const fillFraction = Math.min(tailingsDepositedTonnes / maxTailings, 1)
  const maxFillHeight = 60
  const fillHeight = fillFraction * maxFillHeight

  return (
    <g role="img" aria-label="Tailings storage facility">
      <title>Tailings Storage Facility</title>
      <desc>Tailings storage dam that fills progressively as ore is processed. Water is reclaimed for reuse in the plant.</desc>

      {/* Embankment walls */}
      <polygon
        points="1480,880 1760,880 1730,800 1510,800"
        fill="#1a1a1a"
        stroke="#6B7280"
        strokeWidth={1}
      />

      {/* Tailings fill */}
      <clipPath id="tsf-clip">
        <polygon points="1480,880 1760,880 1730,800 1510,800" />
      </clipPath>
      <motion.rect
        x={1480}
        y={880 - fillHeight}
        width={280}
        height={fillHeight}
        fill="#8B7355"
        fillOpacity={0.5}
        clipPath="url(#tsf-clip)"
        animate={{ height: fillHeight, y: 880 - fillHeight }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Water surface shimmer */}
      {!reducedMotion && fillHeight > 10 && (
        <motion.line
          x1={1490}
          y1={880 - fillHeight + 3}
          x2={1750}
          y2={880 - fillHeight + 3}
          stroke="#3B82F6"
          strokeWidth={1}
          strokeOpacity={0.4}
          animate={{ strokeOpacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <text x={1620} y={895} fill="#6B7280" fontSize={8} fontFamily="sans-serif" textAnchor="middle">TAILINGS STORAGE</text>
      <text x={1620} y={905} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">
        {tailingsDepositedTonnes.toFixed(0)} t deposited
      </text>
    </g>
  )
}
