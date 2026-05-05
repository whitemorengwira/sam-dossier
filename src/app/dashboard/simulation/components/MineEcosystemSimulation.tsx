'use client'
import { useReducedMotion } from 'framer-motion'
import { SimulationState } from '../simulation.data'
import GeologicalCrossSection from './ambient/GeologicalCrossSection'
import TailingsStorageFacility from './ambient/TailingsStorageFacility'
import WaterReclamationLoop from './ambient/WaterReclamationLoop'
import LogisticsConvoy from './ambient/LogisticsConvoy'
import ExtractionStage from './stages/ExtractionStage'
import HoistingStage from './stages/HoistingStage'
import ComminutionStage from './stages/ComminutionStage'
import ConcentrationStage from './stages/ConcentrationStage'
import SmeltingStage from './stages/SmeltingStage'

interface Props {
  state: SimulationState
}

export default function MineEcosystemSimulation({ state }: Props) {
  const prefersReducedMotion = useReducedMotion() ?? false

  const { focusStage, simulatedDays, tailingsDepositedTonnes, waterReclaimedKl } = state

  return (
    <div className="relative w-full" style={{ background: '#0A1128' }}>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ display: 'block', aspectRatio: '16/9' }}
        role="img"
        aria-label="Animated Socinga Africa Mining ecosystem simulation. Use the Simulation controls below to interact."
      >
        <title>Socinga Africa Mining Ecosystem Simulation</title>
        <desc>
          A full animated simulation of the Chikonga gold mine, from underground extraction through smelting to doré dispatch.
          Stages: Extraction, Hoisting, Comminution, Hydrometallurgy, and Smelting, with tailings management and water reclamation.
        </desc>

        {/* Background */}
        <rect width={1920} height={1080} fill="#0A1128" />

        {/* Subtle grid */}
        <defs>
          <pattern id="grid" width={80} height={80} patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#D4AF37" strokeWidth={0.1} strokeOpacity={0.1} />
          </pattern>
        </defs>
        <rect width={1920} height={1080} fill="url(#grid)" />

        {/* Ambient: geological cross-section (background) */}
        <GeologicalCrossSection simulatedDays={simulatedDays} reducedMotion={prefersReducedMotion} />

        {/* Stage 1: Extraction */}
        <ExtractionStage
          active={focusStage === 1}
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Stage 2: Hoisting */}
        <HoistingStage
          active={focusStage === 2}
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Stage 3: Comminution */}
        <ComminutionStage
          active={focusStage === 3}
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Stage 4: Concentration / Hydrometallurgy */}
        <ConcentrationStage
          active={focusStage === 4}
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Stage 5: Smelting */}
        <SmeltingStage
          active={focusStage === 5}
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Ambient: Tailings Storage Facility */}
        <TailingsStorageFacility
          tailingsDepositedTonnes={tailingsDepositedTonnes}
          reducedMotion={prefersReducedMotion}
        />

        {/* Ambient: Water Reclamation Loop */}
        <WaterReclamationLoop
          waterReclaimedKl={waterReclaimedKl}
          reducedMotion={prefersReducedMotion}
        />

        {/* Ambient: Logistics Convoy */}
        <LogisticsConvoy
          simulatedDays={simulatedDays}
          reducedMotion={prefersReducedMotion}
        />

        {/* Process flow connections */}
        {/* Extraction → Hoisting */}
        <line x1={300} y1={870} x2={484} y2={720} stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="6 4" />
        {/* Hoisting → Comminution */}
        <line x1={580} y1={720} x2={760} y2={380} stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="6 4" />
        {/* Comminution → Concentration */}
        <line x1={1040} y1={360} x2={1080} y2={360} stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} />
        {/* Concentration → Smelting */}
        <line x1={1540} y1={345} x2={1480} y2={345} stroke="#D4AF37" strokeWidth={0.5} strokeOpacity={0.2} />

        {/* Stage focus indicators */}
        {[1, 2, 3, 4, 5].map((s) => {
          const positions: Record<number, { x: number; y: number }> = {
            1: { x: 190, y: 788 },
            2: { x: 510, y: 148 },
            3: { x: 880, y: 268 },
            4: { x: 1200, y: 265 },
            5: { x: 1520, y: 267 },
          }
          const pos = positions[s]
          if (focusStage !== s) return null
          return (
            <g key={s}>
              <rect
                x={pos.x - 30}
                y={pos.y - 6}
                width={60}
                height={12}
                fill="none"
                stroke="#D4AF37"
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
