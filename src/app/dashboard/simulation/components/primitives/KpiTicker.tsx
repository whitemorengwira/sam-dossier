'use client'
import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, animate, motion } from 'framer-motion'

interface KpiTickerProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  reducedMotion?: boolean
  className?: string
}

export default function KpiTicker({ value, prefix = '', suffix = '', decimals = 0, reducedMotion = false, className = '' }: KpiTickerProps) {
  const motionVal = useMotionValue(0)
  const prevVal = useRef(0)

  useEffect(() => {
    if (reducedMotion) {
      motionVal.set(value)
      prevVal.current = value
      return
    }
    const ctrl = animate(motionVal, value, { duration: 0.6, ease: 'easeOut', from: prevVal.current })
    prevVal.current = value
    return () => ctrl.stop()
  }, [value, reducedMotion, motionVal])

  const display = useTransform(motionVal, (v) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(v)
    return `${prefix}${formatted}${suffix}`
  })

  return <motion.span className={className}>{display}</motion.span>
}
