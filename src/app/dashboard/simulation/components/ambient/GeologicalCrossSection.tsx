'use client'
import { motion } from 'framer-motion'

interface AmbientProps {
  simulatedDays: number
  reducedMotion: boolean
}

export default function GeologicalCrossSection({ simulatedDays: _simulatedDays, reducedMotion }: AmbientProps) {
  return (
    <g role="img" aria-label="Geological cross-section showing ore body and reef structure">
      <title>Geological Cross-Section</title>
      <desc>Stylised cross-section of country rock with a quartz-vein gold reef, showing the ore body before and after stoping.</desc>

      {/* Country rock layers */}
      <rect x={0} y={620} width={1920} height={460} fill="#0A0A0A" />
      {/* Rock strata */}
      <path d="M0,640 Q480,620 960,645 Q1440,665 1920,640 L1920,680 Q1440,700 960,685 Q480,665 0,680 Z" fill="#0F0F1A" />
      <path d="M0,700 Q480,685 960,710 Q1440,725 1920,700 L1920,750 Q1440,760 960,745 Q480,725 0,750 Z" fill="#121218" />
      <path d="M0,780 Q480,765 960,785 Q1440,800 1920,780 L1920,840 Q1440,845 960,830 Q480,810 0,840 Z" fill="#0F0F18" />

      {/* Quartz vein (gold reef) */}
      <motion.path
        d="M100,750 Q300,730 500,755 Q700,775 900,750 Q1100,725 1300,748 Q1500,768 1700,745 Q1800,735 1920,748"
        fill="none"
        stroke="#D4AF37"
        strokeWidth={3}
        strokeOpacity={0.35}
        strokeDasharray="8 4"
        animate={reducedMotion ? {} : {
          strokeDashoffset: [0, -24],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Gold specks in reef */}
      {[200, 400, 600, 800, 1000, 1200, 1400, 1600].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={748 + Math.sin(i * 1.2) * 8}
          r={2}
          fill="#D4AF37"
          fillOpacity={0.5}
        />
      ))}

      {/* Rock texture lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1={i * 160}
          y1={650}
          x2={i * 160 + 80}
          y2={1080}
          stroke="#1E2A3A"
          strokeWidth={0.5}
          strokeOpacity={0.3}
        />
      ))}

      {/* Ground surface line */}
      <line x1={0} y1={720} x2={1920} y2={720} stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="20 10" />
      <text x={40} y={715} fill="#6B7280" fontSize={9} fontFamily="sans-serif">SURFACE</text>
      <text x={40} y={745} fill="#6B7280" fontSize={9} fontFamily="sans-serif">UNDERGROUND</text>
    </g>
  )
}
