'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SimulationAction, STAGE_DESCRIPTORS, SimulationState } from '../simulation.data'

interface Props {
  state: SimulationState
  dispatch: React.Dispatch<SimulationAction>
}

const SPEEDS: Array<0.5 | 1 | 2 | 4> = [0.5, 1, 2, 4]

export default function SimulationControls({ state, dispatch }: Props) {
  const [showHelp, setShowHelp] = useState(false)
  const { isPlaying, speed, focusStage, simulatedDays } = state
  const isComplete = simulatedDays >= 30

  return (
    <div
      className="relative"
      style={{ background: 'rgba(10,17,40,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212,175,55,0.06)' }}
    >
      <div className="flex flex-wrap items-center gap-3 p-4">
        {/* Play / Pause */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
          aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          className="flex items-center justify-center w-11 h-11"
          style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)' }}
        >
          {isPlaying ? (
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <rect x={3} y={2} width={4} height={12} stroke="#D4AF37" strokeWidth={1.5} />
              <rect x={9} y={2} width={4} height={12} stroke="#D4AF37" strokeWidth={1.5} />
            </svg>
          ) : (
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <polygon points="3,2 14,8 3,14" stroke="#D4AF37" strokeWidth={1.5} fill="none" />
            </svg>
          )}
        </button>

        {/* Speed selector */}
        <div className="flex gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch({ type: 'SET_SPEED', speed: s })}
              aria-label={`Set speed to ${s}×`}
              className="w-11 h-11 text-xs font-mono transition-all"
              style={{
                border: speed === s ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
                color: speed === s ? '#D4AF37' : '#6B7280',
                background: speed === s ? 'rgba(212,175,55,0.08)' : 'transparent',
              }}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 32, background: 'rgba(212,175,55,0.1)' }} />

        {/* Stage jump */}
        <div className="flex gap-1">
          {STAGE_DESCRIPTORS.map((stage) => (
            <div key={stage.id} className="relative group">
              <button
                onClick={() => dispatch({ type: 'SET_FOCUS_STAGE', stage: stage.id as 1 | 2 | 3 | 4 | 5 })}
                aria-label={`Focus stage ${stage.id}: ${stage.name}`}
                className="w-11 h-11 text-xs font-mono transition-all"
                style={{
                  border: focusStage === stage.id ? '2px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
                  color: focusStage === stage.id ? '#D4AF37' : '#6B7280',
                  background: focusStage === stage.id ? 'rgba(212,175,55,0.12)' : 'transparent',
                }}
              >
                {stage.id}
              </button>
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 whitespace-nowrap pointer-events-none"
                style={{ background: 'rgba(10,17,40,0.95)', border: '1px solid rgba(212,175,55,0.2)', padding: '4px 8px' }}
              >
                <p className="text-xs font-mono" style={{ color: '#D4AF37' }}>{stage.id} — {stage.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex-1 min-w-[80px]">
          <div className="flex justify-between mb-1">
            <span className="text-[9px] font-mono" style={{ color: '#6B7280' }}>Day {Math.min(simulatedDays, 30).toFixed(1)}</span>
            <span className="text-[9px] font-mono" style={{ color: '#6B7280' }}>Day 30</span>
          </div>
          <div style={{ height: 3, background: 'rgba(212,175,55,0.1)' }}>
            <motion.div
              style={{ height: 3, background: '#D4AF37', originX: 0 }}
              animate={{ scaleX: Math.min(simulatedDays / 30, 1) }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          aria-label="Reset simulation cycle"
          className="px-3 h-11 text-xs font-mono transition-all"
          style={{ border: '1px solid rgba(212,175,55,0.15)', color: '#6B7280' }}
        >
          Reset cycle
        </button>

        {/* Help toggle */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          aria-label="Show keyboard shortcuts"
          className="w-8 h-8 text-xs font-mono"
          style={{ border: '1px solid rgba(212,175,55,0.15)', color: '#6B7280' }}
        >
          ?
        </button>
      </div>

      {/* Cycle complete banner */}
      {isComplete && (
        <div className="px-4 pb-3">
          <p className="text-xs font-mono" style={{ color: '#D4AF37' }}>
            Cycle complete — reset to run again
          </p>
        </div>
      )}

      {/* Keyboard shortcuts overlay */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 z-20 p-4 mt-1 w-72"
            style={{ background: 'rgba(10,17,40,0.98)', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-xs font-display mb-3" style={{ color: '#D4AF37' }}>Keyboard Shortcuts</p>
            <div className="space-y-1">
              {[
                ['Space', 'Play / Pause'],
                ['1–5', 'Jump to stage'],
                ['R', 'Reset cycle'],
                [',', 'Decrease speed'],
                ['.', 'Increase speed'],
              ].map(([key, action]) => (
                <div key={key} className="flex justify-between">
                  <kbd className="text-[10px] font-mono px-1" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>{key}</kbd>
                  <span className="text-[10px] font-mono" style={{ color: '#6B7280' }}>{action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
