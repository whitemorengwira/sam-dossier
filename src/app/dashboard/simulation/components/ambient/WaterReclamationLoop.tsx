'use client'
import FluidFlow from '../primitives/FluidFlow'

interface AmbientProps {
  waterReclaimedKl: number
  reducedMotion: boolean
}

export default function WaterReclamationLoop({ waterReclaimedKl, reducedMotion }: AmbientProps) {
  return (
    <g role="img" aria-label="Water reclamation loop returning process water to the plant">
      <title>Water Reclamation Loop</title>
      <desc>Reclaimed water is pumped from the tailings dam back to the processing plant, reducing fresh-water consumption.</desc>

      {/* Pipe from TSF to plant */}
      <FluidFlow x1={1480} y1={840} x2={1080} y2={840} color="#3B82F6" reducedMotion={reducedMotion} id="water-return-h" />
      <FluidFlow x1={1080} y1={840} x2={1080} y2={360} color="#3B82F6" reducedMotion={reducedMotion} id="water-return-v" />

      {/* Pump symbol */}
      <circle cx={1280} cy={840} r={8} fill="#0A1128" stroke="#3B82F6" strokeWidth={1} strokeOpacity={0.6} />
      <text x={1280} y={844} fill="#3B82F6" fontSize={7} fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">P</text>

      <text x={1280} y={860} fill="#3B82F6" fontSize={7} fontFamily="sans-serif" textAnchor="middle" opacity={0.6}>
        {waterReclaimedKl.toFixed(0)} kL reclaimed
      </text>
    </g>
  )
}
