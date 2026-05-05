'use client'
import { motion } from 'framer-motion'

interface OreParticleProps {
  cx: number
  cy: number
  r?: number
  delay?: number
  reducedMotion?: boolean
}

export default function OreParticle({ cx, cy, r = 3, delay = 0, reducedMotion = false }: OreParticleProps) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="#3a3a3a"
      stroke="#D4AF37"
      strokeWidth={0.5}
      initial={{ opacity: 0, scale: 0 }}
      animate={reducedMotion ? { opacity: 1, scale: 1 } : {
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        cy: [cy - 8, cy, cy + 8, cy + 20],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
