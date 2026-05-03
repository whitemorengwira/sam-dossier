'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Gold particle dust effect ────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      size: number
      speedY: number
      opacity: number
      drift: number
    }

    const particles: Particle[] = []
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.2 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
      })
    }

    let animId: number

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
        ctx.fill()

        p.y -= p.speedY
        p.x += p.drift

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* ── Login handler ────────────────────────────────────────────── */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // For now, without Supabase connection, allow admin login
    // This will be replaced with proper Supabase Auth
    if (email && password) {
      // Simulate auth — replace with Supabase once connected
      setTimeout(() => {
        router.push('/dashboard/overview')
      }, 800)
    } else {
      setError('Invalid credentials. Please check your email and password.')
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-onyx">
      {/* ── Deep mine shaft background ──────────────────────────── */}
      <div className="absolute inset-0">
        {/* Geological texture gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 120%, rgba(212,175,55,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(139,90,0,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 60%, rgba(212,175,55,0.04) 0%, transparent 50%),
              linear-gradient(180deg, #050810 0%, #0A1128 30%, #0D0D0D 70%, #060606 100%)
            `,
          }}
        />

        {/* Gold vein streaks */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.5) 40.5%, transparent 41%),
              linear-gradient(225deg, transparent 55%, rgba(212,175,55,0.3) 55.5%, transparent 56%),
              linear-gradient(160deg, transparent 70%, rgba(180,140,30,0.4) 70.2%, transparent 70.5%)
            `,
          }}
        />
      </div>

      {/* ── Particle canvas ────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* ── Centre content ─────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-gold-glow">
            <span className="text-onyx font-display text-3xl font-black">S</span>
          </div>
        </motion.div>

        {/* Tagline — letter by letter reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-2 text-gold font-display font-black tracking-[-0.02em]"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          CHIKONGA MINE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-10 font-heading text-lg tracking-widest"
          style={{ color: 'var(--text-secondary)' }}
        >
          ZW$500 MILLION INVESTMENT DOSSIER
        </motion.p>

        {/* ── Login Panel ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full max-w-[380px]"
        >
          <div className="glass-card-heavy p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-danger text-sm font-body"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" />
                    Authenticating…
                  </span>
                ) : (
                  'Access Dossier'
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 text-center text-xs font-body font-light"
          style={{ color: 'var(--text-muted)' }}
        >
          By invitation only — Socinga Africa Holdings
        </motion.p>
      </div>
    </main>
  )
}
