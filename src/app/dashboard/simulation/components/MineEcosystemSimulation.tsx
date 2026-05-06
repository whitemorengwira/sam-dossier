'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SimulationState } from '../simulation.data'

interface Props {
  state: SimulationState
}

const stageImages = [
  { src: '/simulation/stage-1-extraction.png', alt: 'Underground ore extraction — miners using picks and hand-powered winches in gold-lit tunnels', label: 'EXTRACTION' },
  { src: '/simulation/stage-2-crushing.png', alt: 'Ore crushing — workers feeding raw ore into industrial crusher with conveyor belts', label: 'CRUSHING' },
  { src: '/simulation/stage-3-processing.png', alt: 'CIP Processing — chemical engineers operating carbon-in-pulp gold processing plant', label: 'CIP PROCESSING' },
  { src: '/simulation/stage-4-smelting.png', alt: 'Elution & Smelting — metallurgists pouring molten gold into doré bar molds', label: 'ELUTION & SMELTING' },
  { src: '/simulation/stage-5-delivery.png', alt: 'FGR Delivery — professionals overseeing gold doré bars loaded into armored transport', label: 'FGR DELIVERY' },
]

export default function MineEcosystemSimulation({ state }: Props) {
  const { focusStage } = state
  const idx = Math.max(0, Math.min(focusStage - 1, stageImages.length - 1))
  const current = stageImages[idx]

  return (
    <div className="relative w-full" style={{ background: '#0A1128' }}>
      {/* Stage image carousel */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              priority={idx === 0}
            />

            {/* Cinematic overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(0deg, rgba(10,17,40,0.85) 0%, rgba(10,17,40,0.3) 30%, transparent 60%, rgba(10,17,40,0.15) 100%)',
              }}
            />

            {/* Side vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(10,17,40,0.5) 0%, transparent 15%, transparent 85%, rgba(10,17,40,0.5) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Stage label badge */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
          <motion.div
            key={`badge-${idx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div
              className="px-3 py-1.5"
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span
                className="text-[10px] font-mono tracking-[0.2em] font-bold"
                style={{ color: '#D4AF37' }}
              >
                STAGE {focusStage}
              </span>
            </div>
            <span
              className="text-xs font-mono tracking-widest font-semibold"
              style={{ color: 'rgba(212,175,55,0.8)' }}
            >
              {current.label}
            </span>
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-5 right-5 z-10 flex gap-2">
          {stageImages.map((img, i) => (
            <div
              key={i}
              className="relative transition-all duration-300"
              style={{
                width: 48,
                height: 48,
                border: i === idx ? '2px solid #D4AF37' : '1px solid rgba(212,175,55,0.15)',
                opacity: i === idx ? 1 : 0.5,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
              {i === idx && (
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: 'inset 0 0 12px rgba(212,175,55,0.3)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
