'use client'
import { motion } from 'framer-motion'
import ConveyorBelt from '../primitives/ConveyorBelt'
import OreParticle from '../primitives/OreParticle'

interface StageProps {
  active: boolean
  simulatedDays: number
  reducedMotion: boolean
}

export default function ComminutionStage({ active, simulatedDays: _simulatedDays, reducedMotion }: StageProps) {
  const opacity = active ? 1 : 0.4
  const balls = [0, 72, 144, 216, 288]

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Comminution Stage: Jaw crusher and ball mill"
    >
      <title>Stage 3 — Comminution</title>
      <desc>Primary jaw crushing reduces ROM ore, followed by ball milling to achieve the target grind size.</desc>

      {/* Jaw crusher housing */}
      <rect x={760} y={280} width={80} height={100} fill="#0A1128" stroke="#D4AF37" strokeWidth={1} strokeOpacity={0.4} />
      <text x={800} y={273} fill="#D4AF37" fontSize={8} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>CRUSHER</text>

      {/* Jaw (reciprocating) */}
      <motion.polygon
        points="775,310 835,310 820,370 790,370"
        fill="#1E2A3A"
        stroke="#6B7280"
        strokeWidth={1}
        animate={reducedMotion ? {} : { points: ['775,310 835,310 820,370 790,370', '780,310 830,310 820,370 790,370', '775,310 835,310 820,370 790,370'] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ore entering crusher */}
      <OreParticle cx={795} cy={290} r={5} delay={0} reducedMotion={reducedMotion} />
      <OreParticle cx={810} cy={288} r={4} delay={0.4} reducedMotion={reducedMotion} />

      {/* Ore exiting crusher (smaller) */}
      <OreParticle cx={796} cy={375} r={2.5} delay={0.8} reducedMotion={reducedMotion} />
      <OreParticle cx={808} cy={378} r={2} delay={1.0} reducedMotion={reducedMotion} />

      {/* Conveyor from crusher to mill */}
      <ConveyorBelt x={840} y={370} width={80} reducedMotion={reducedMotion} />

      {/* Ball mill (cutaway cylinder) */}
      <ellipse cx={980} cy={360} rx={60} ry={50} fill="#0A1128" stroke="#D4AF37" strokeWidth={1} strokeOpacity={0.4} />
      <ellipse cx={980} cy={360} rx={55} ry={45} fill="none" stroke="#1E2A3A" strokeWidth={2} />
      <text x={980} y={280} fill="#D4AF37" fontSize={8} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>BALL MILL</text>

      {/* Rotating balls inside mill */}
      <clipPath id="mill-clip">
        <ellipse cx={980} cy={360} rx={55} ry={45} />
      </clipPath>
      <motion.g
        clipPath="url(#mill-clip)"
        animate={reducedMotion ? {} : { rotate: 360 }}
        style={{ originX: '980px', originY: '360px' }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {balls.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <circle
              key={i}
              cx={980 + 35 * Math.cos(rad)}
              cy={360 + 35 * Math.sin(rad)}
              r={7}
              fill="#3a3a3a"
              stroke="#6B7280"
              strokeWidth={0.5}
            />
          )
        })}
      </motion.g>

      {/* Fine ore particles exiting mill */}
      <OreParticle cx={1035} cy={355} r={1.5} delay={0.2} reducedMotion={reducedMotion} />
      <OreParticle cx={1038} cy={360} r={1.5} delay={0.5} reducedMotion={reducedMotion} />

      <text x={880} y={275} fill="#D4AF37" fontSize={10} fontFamily="'Playfair Display', serif" textAnchor="middle" opacity={0.7}>
        3 — COMMINUTION
      </text>
    </motion.g>
  )
}
