'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AmbientProps {
  simulatedDays: number
  reducedMotion: boolean
}

export default function LogisticsConvoy({ simulatedDays, reducedMotion }: AmbientProps) {
  const [truckKey, setTruckKey] = useState(0)
  const dispatchCount = Math.floor(simulatedDays / 10)

  useEffect(() => {
    setTruckKey(dispatchCount)
  }, [dispatchCount])

  if (reducedMotion) {
    return (
      <g role="img" aria-label="Logistics convoy dispatching doré bars to refinery">
        <title>Logistics Convoy</title>
        <text x={1750} y={895} fill="#6B7280" fontSize={8} fontFamily="sans-serif" textAnchor="middle">REFINERY DISPATCH</text>
        <text x={1750} y={905} fill="#D4AF37" fontSize={7} fontFamily="sans-serif" textAnchor="middle">{dispatchCount} dispatch{dispatchCount !== 1 ? 'es' : ''}</text>
      </g>
    )
  }

  return (
    <g role="img" aria-label="Logistics convoy dispatching doré bars to refinery">
      <title>Logistics Convoy</title>
      <desc>An armoured courier vehicle departs site every 10 simulated days carrying doré bars to the Fidelity Gold Refinery.</desc>

      {/* Road */}
      <line x1={1550} y1={900} x2={1920} y2={900} stroke="#1E2A3A" strokeWidth={8} />
      <line x1={1550} y1={900} x2={1920} y2={900} stroke="#6B7280" strokeWidth={0.5} strokeOpacity={0.3} strokeDasharray="20 10" />

      <text x={1700} y={920} fill="#6B7280" fontSize={7} fontFamily="sans-serif" textAnchor="middle">
        {dispatchCount} DORÉ DISPATCH{dispatchCount !== 1 ? 'ES' : ''}
      </text>

      <AnimatePresence mode="wait">
        {dispatchCount > 0 && (
          <motion.g
            key={truckKey}
            initial={{ x: 0 }}
            animate={{ x: 400 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeIn' }}
          >
            {/* Truck body */}
            <rect x={1560} y={882} width={48} height={16} fill="#1E2A3A" stroke="#D4AF37" strokeWidth={1} strokeOpacity={0.6} />
            {/* Cab */}
            <rect x={1596} y={876} width={12} height={8} fill="#0A1128" stroke="#D4AF37" strokeWidth={0.5} />
            {/* Cargo marking */}
            <text x={1584} y={893} fill="#D4AF37" fontSize={6} fontFamily="sans-serif" textAnchor="middle" opacity={0.8}>AU</text>
            {/* Wheels */}
            <circle cx={1572} cy={898} r={4} fill="#3a3a3a" stroke="#6B7280" strokeWidth={0.5} />
            <circle cx={1596} cy={898} r={4} fill="#3a3a3a" stroke="#6B7280" strokeWidth={0.5} />
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  )
}
