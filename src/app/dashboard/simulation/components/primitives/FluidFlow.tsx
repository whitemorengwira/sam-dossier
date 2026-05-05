'use client'
import { motion } from 'framer-motion'

interface FluidFlowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  reducedMotion?: boolean
  id: string
}

export default function FluidFlow({ x1, y1, x2, y2, color = '#3B82F6', reducedMotion = false, id }: FluidFlowProps) {
  const isHorizontal = Math.abs(x2 - x1) > Math.abs(y2 - y1)

  return (
    <g role="img" aria-label="Fluid flow pipe">
      <title>Water Reclamation Pipe</title>
      <defs>
        <linearGradient id={`fluid-${id}`} x1="0%" y1="0%" x2={isHorizontal ? '100%' : '0%'} y2={isHorizontal ? '0%' : '100%'} gradientUnits="userSpaceOnUse">
          <motion.stop
            offset="0%"
            stopColor={color}
            stopOpacity={0.8}
            animate={reducedMotion ? {} : { offset: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <stop offset="50%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      {/* Pipe casing */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E2A3A" strokeWidth={8} />
      {/* Fluid */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#fluid-${id})`} strokeWidth={4} />
      {/* Pipe border */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={0.5} strokeOpacity={0.3} />
    </g>
  )
}
