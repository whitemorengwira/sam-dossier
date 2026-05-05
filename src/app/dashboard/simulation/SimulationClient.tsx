'use client'
import { useReducer, useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  SimulationState,
  SimulationAction,
  SIMULATION_PARAMS,
} from './simulation.data'
import SimulationControls from './components/SimulationControls'
import LiveSimulationMetrics from './components/LiveSimulationMetrics'

const MineEcosystemSimulation = dynamic(() => import('./components/MineEcosystemSimulation'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ aspectRatio: '16/9', background: '#0A1128', border: '1px solid rgba(212,175,55,0.06)' }}
    >
      <div className="text-center">
        <div className="mb-3" style={{ width: 40, height: 40, border: '1px solid rgba(212,175,55,0.3)', margin: '0 auto' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.3) 50%, rgba(212,175,55,0.1) 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </div>
        <p className="text-xs font-mono" style={{ color: '#6B7280' }}>Loading simulation...</p>
      </div>
    </div>
  ),
})

function computeGrade(simulatedDays: number): number {
  const { min, max, periodDays } = SIMULATION_PARAMS.gradeOscillation
  const mid = (min + max) / 2
  const amp = (max - min) / 2
  return mid + amp * Math.sin((simulatedDays / periodDays) * 2 * Math.PI)
}

function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying }

    case 'SET_SPEED':
      return { ...state, speed: action.speed }

    case 'SET_FOCUS_STAGE':
      return { ...state, focusStage: action.stage }

    case 'TICK': {
      if (!state.isPlaying) return state
      const prevDays = state.simulatedDays
      const newDays = Math.min(prevDays + (action.deltaSeconds / 60) * state.speed, SIMULATION_PARAMS.daysPerCycle)
      if (newDays === prevDays) return state

      const avgGrade = computeGrade(newDays)
      const tonnesHoisted = newDays * SIMULATION_PARAMS.oreFeedTonnesPerDay
      const gramsContained = tonnesHoisted * avgGrade
      const gramsRecovered = gramsContained * SIMULATION_PARAMS.recoveryRate
      const ouncesRecovered = gramsRecovered / 31.1035
      const revenueUsd = ouncesRecovered * SIMULATION_PARAMS.goldPriceUsdPerOz
      const revenueZar = revenueUsd * SIMULATION_PARAMS.fxZarPerUsd
      const waterReclaimedKl = newDays * SIMULATION_PARAMS.waterReclamationKlPerDay
      const tailingsDepositedTonnes = tonnesHoisted * SIMULATION_PARAMS.tailingsDepositionFraction

      return {
        ...state,
        simulatedDays: newDays,
        tonnesHoisted,
        averageGrade: avgGrade,
        gramsContained,
        gramsRecovered,
        ouncesRecovered,
        revenueUsd,
        revenueZar,
        waterReclaimedKl,
        tailingsDepositedTonnes,
        isPlaying: newDays >= SIMULATION_PARAMS.daysPerCycle ? false : state.isPlaying,
      }
    }

    case 'RESET':
      return {
        ...state,
        simulatedDays: 0,
        tonnesHoisted: 0,
        averageGrade: computeGrade(0),
        gramsContained: 0,
        gramsRecovered: 0,
        ouncesRecovered: 0,
        revenueUsd: 0,
        revenueZar: 0,
        waterReclaimedKl: 0,
        tailingsDepositedTonnes: 0,
        isPlaying: false,
      }

    default:
      return state
  }
}

const initialState: SimulationState = {
  isPlaying: false,
  speed: 1,
  focusStage: 1,
  simulatedDays: 0,
  tonnesHoisted: 0,
  averageGrade: computeGrade(0),
  gramsContained: 0,
  gramsRecovered: 0,
  ouncesRecovered: 0,
  revenueUsd: 0,
  revenueZar: 0,
  waterReclaimedKl: 0,
  tailingsDepositedTonnes: 0,
}

function useSimulationClock(dispatch: React.Dispatch<SimulationAction>, isPlaying: boolean) {
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  const tick = useCallback((timestamp: number) => {
    if (lastTimeRef.current !== null) {
      const delta = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1)
      dispatch({ type: 'TICK', deltaSeconds: delta })
    }
    lastTimeRef.current = timestamp
    rafRef.current = requestAnimationFrame(tick)
  }, [dispatch])

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, tick])
}

export default function SimulationClient() {
  const [state, dispatch] = useReducer(simulationReducer, initialState)
  const prefersReducedMotion = useReducedMotion() ?? false

  useSimulationClock(dispatch, state.isPlaying)

  // Keyboard shortcuts
  useEffect(() => {
    const SPEED_ORDER: Array<0.5 | 1 | 2 | 4> = [0.5, 1, 2, 4]

    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          dispatch({ type: 'TOGGLE_PLAY' })
          break
        case '1': dispatch({ type: 'SET_FOCUS_STAGE', stage: 1 }); break
        case '2': dispatch({ type: 'SET_FOCUS_STAGE', stage: 2 }); break
        case '3': dispatch({ type: 'SET_FOCUS_STAGE', stage: 3 }); break
        case '4': dispatch({ type: 'SET_FOCUS_STAGE', stage: 4 }); break
        case '5': dispatch({ type: 'SET_FOCUS_STAGE', stage: 5 }); break
        case 'r':
        case 'R':
          dispatch({ type: 'RESET' })
          break
        case ',': {
          const idx = SPEED_ORDER.indexOf(state.speed)
          if (idx > 0) dispatch({ type: 'SET_SPEED', speed: SPEED_ORDER[idx - 1] })
          break
        }
        case '.': {
          const idx = SPEED_ORDER.indexOf(state.speed)
          if (idx < SPEED_ORDER.length - 1) dispatch({ type: 'SET_SPEED', speed: SPEED_ORDER[idx + 1] })
          break
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [state.speed])

  return (
    <div className="space-y-0 my-8">
      <div style={{ border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="px-4 pt-4 pb-0" style={{ background: 'rgba(10,17,40,0.6)' }}>
          <h2 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#D4AF37', opacity: 0.7 }}>
            Live Mine Ecosystem Simulation — Chikonga Mine
          </h2>
        </div>

        <SimulationControls state={state} dispatch={dispatch} />

        <MineEcosystemSimulation state={state} />

        <LiveSimulationMetrics state={state} reducedMotion={prefersReducedMotion} />
      </div>
    </div>
  )
}
