'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './cinematic.module.css'

type VisualTheme = 'shaft' | 'ore' | 'carbon' | 'data' | 'quartz' | 'machinery'

interface VisualBreakProps {
  theme: VisualTheme
  caption?: string
  height?: string
}

export function VisualBreak({ theme, caption, height = '280px' }: VisualBreakProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const viewH = window.innerHeight
        if (rect.top < viewH && rect.bottom > 0) {
          setOffset((viewH - rect.top) * 0.08)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className={`${styles.visualBreak} ${styles[`vb_${theme}`]}`} style={{ height }}>
      <div
        className={styles.vbParallax}
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
      <div className={styles.vbOverlay} />
      {caption && (
        <div className={styles.vbCaption}>
          <span className={styles.vbCaptionDot} />
          {caption}
        </div>
      )}
    </div>
  )
}
