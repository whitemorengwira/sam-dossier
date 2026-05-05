'use client'
import { motion } from 'framer-motion'

interface ConveyorBeltProps {
  x: number
  y: number
  width: number
  reducedMotion?: boolean
}

export default function ConveyorBelt({ x, y, width, reducedMotion = false }: ConveyorBeltProps) {
  const stripes = Array.from({ length: Math.ceil(width / 20) + 2 }, (_, i) => i)

  return (
    <g role="img" aria-label="Conveyor belt">
      <title>Conveyor Belt</title>
      {/* Belt body */}
      <rect x={x} y={y} width={width} height={12} fill="#1a1a2e" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.3} />
      <rect x={x} y={y + 16} width={width} height={6} fill="#1a1a2e" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} />
      {/* Moving stripes */}
      <clipPath id={`belt-clip-${x}-${y}`}>
        <rect x={x} y={y} width={width} height={12} />
      </clipPath>
      <g clipPath={`url(#belt-clip-${x}-${y})`}>
        <motion.g
          animate={reducedMotion ? {} : { x: [0, -20] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        >
          {stripes.map((i) => (
            <line
              key={i}
              x1={x + i * 20 + 10}
              y1={y}
              x2={x + i * 20}
              y2={y + 12}
              stroke="#D4AF37"
              strokeWidth={1}
              strokeOpacity={0.15}
            />
          ))}
        </motion.g>
      </g>
      {/* Rollers */}
      <circle cx={x} cy={y + 9} r={4} fill="#0A1128" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.4} />
      <circle cx={x + width} cy={y + 9} r={4} fill="#0A1128" stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.4} />
    </g>
  )
}
