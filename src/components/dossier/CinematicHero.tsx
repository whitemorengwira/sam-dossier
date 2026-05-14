'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './cinematic.module.css'

type HeroTheme = 'executive' | 'investment' | 'financial' | 'geological' | 'legal' | 'risk'

interface CinematicHeroProps {
  theme: HeroTheme
  badge: string
  badgeVariant?: string
  title: React.ReactNode
  subtitle: string
}

export function CinematicHero({ theme, badge, badgeVariant = 'badge-gold', title, subtitle }: CinematicHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setOffset(Math.max(0, -rect.top * 0.3))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className={`${styles.hero} ${styles[`hero_${theme}`]}`}>
      {/* Parallax visual layer */}
      <div
        className={styles.heroVisual}
        style={{ transform: `translateY(${offset}px)` }}
      />

      {/* Animated particle grid overlay */}
      <div className={styles.heroGrid} />

      {/* Gradient overlay */}
      <div className={styles.heroOverlay} />

      {/* Content */}
      <div className={styles.heroContent}>
        <span className={`badge ${badgeVariant} ${styles.heroBadge}`}>{badge}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </div>
  )
}
