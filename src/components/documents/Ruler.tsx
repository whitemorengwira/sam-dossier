'use client'

import { useState, useRef, useCallback } from 'react'

interface RulerProps {
  visible: boolean
  marginLeft: number
  marginRight: number
  pageWidth: number
  onMarginChange: (left: number, right: number) => void
}

export default function Ruler({ visible, marginLeft, marginRight, pageWidth, onMarginChange }: RulerProps) {
  const rulerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)

  if (!visible) return null

  const totalCm = Math.round(pageWidth / 37.8) // px to cm approx
  const marks = Array.from({ length: totalCm + 1 }, (_, i) => i)

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', background: '#fff',
      borderBottom: '1px solid #e0e0e0', padding: '0', userSelect: 'none',
    }}>
      <div
        ref={rulerRef}
        style={{
          width: pageWidth, height: 20, position: 'relative',
          background: '#f8f9fa', borderLeft: '1px solid #dadce0', borderRight: '1px solid #dadce0',
        }}
      >
        {/* Tick marks */}
        {marks.map(cm => {
          const x = (cm / totalCm) * 100
          return (
            <div key={cm} style={{ position: 'absolute', left: `${x}%`, top: 0, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 1, height: cm % 1 === 0 ? 10 : 5, background: '#80868b' }} />
              {cm > 0 && cm < totalCm && (
                <span style={{ fontSize: 8, color: '#80868b', marginTop: 1, fontFamily: 'sans-serif' }}>{cm}</span>
              )}
            </div>
          )
        })}

        {/* Left indent handle */}
        <div
          style={{
            position: 'absolute', left: `${(marginLeft / pageWidth) * 100}%`,
            top: 8, width: 0, height: 0,
            borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
            borderBottom: '8px solid #1a73e8',
            cursor: 'ew-resize', transform: 'translateX(-6px)', zIndex: 2,
          }}
          onMouseDown={() => setDragging('left')}
          title="Left indent"
        />

        {/* Right indent handle */}
        <div
          style={{
            position: 'absolute', right: `${(marginRight / pageWidth) * 100}%`,
            top: 8, width: 0, height: 0,
            borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
            borderBottom: '8px solid #1a73e8',
            cursor: 'ew-resize', transform: 'translateX(6px)', zIndex: 2,
          }}
          onMouseDown={() => setDragging('right')}
          title="Right indent"
        />

        {/* Margin shading */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${(marginLeft / pageWidth) * 100}%`, background: '#e8eaed',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: `${(marginRight / pageWidth) * 100}%`, background: '#e8eaed',
        }} />
      </div>
    </div>
  )
}
