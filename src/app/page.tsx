'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type AuthMode = 'login' | 'signup' | 'verify-sent' | 'forgot-password' | 'reset-sent'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
      x: number; y: number; size: number; speedY: number; opacity: number; drift: number
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
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      })
      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize) }
  }, [])

  /* ── Login handler ────────────────────────────────────────────── */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === '__REPLACE_ME__') {
      setTimeout(() => { router.push('/dashboard/overview') }, 800)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard/overview')
      router.refresh()
    } catch {
      setError('Authentication service unavailable. Please try again.')
      setLoading(false)
    }
  }

  /* ── Signup handler (email + password + confirm → verification email) ── */
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setError('')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === '__REPLACE_ME__') {
      setTimeout(() => { setLoading(false); setMode('verify-sent') }, 1000)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/overview`,
        },
      })

      if (signupError) {
        setError(signupError.message)
        setLoading(false)
        return
      }

      setLoading(false)
      setMode('verify-sent')
    } catch {
      setError('Service unavailable. Please try again.')
      setLoading(false)
    }
  }

  /* ── Reset password handler ─────────────────────────────────────── */
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    setLoading(true)
    setError('')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === '__REPLACE_ME__') {
      setTimeout(() => { setLoading(false); setMode('reset-sent') }, 1000)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (resetError) {
        setError(resetError.message)
        setLoading(false)
        return
      }

      setLoading(false)
      setMode('reset-sent')
    } catch {
      setError('Service unavailable. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-onyx">
      {/* ── Deep mine shaft background ──────────────────────────── */}
      <div className="absolute inset-0">
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

      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* ── Centre content ─────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-gold-glow">
            <span className="text-onyx font-display text-3xl font-black">S</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-center mb-2 text-gold font-display font-black tracking-[-0.02em]" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>
          SAM DOSSIER
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mb-10 font-heading text-lg tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>
          CORPORATE ECOSYSTEM
        </motion.p>

        {/* ── Auth Panel ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="w-full max-w-[380px]">
          <div className="glass-card-heavy p-8">

            {/* ═══ LOGIN ═══ */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input" required autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="password" className="label">Password</label>
                  <div className="relative">
                    <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="input pr-10" required autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors" tabIndex={-1}>
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-sm font-body">{error}</motion.p>
                )}

                <button type="submit" disabled={loading} className="btn-gold w-full py-3 mt-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" />
                      Authenticating…
                    </span>
                  ) : 'Access Dossier'}
                </button>

                <div className="flex flex-col gap-3 pt-2">
                  <button type="button" onClick={() => { setMode('forgot-password'); setError('') }} className="text-sm text-right text-text-muted hover:text-gold transition-colors font-body">
                    Forgot password?
                  </button>
                  <div className="text-center pt-2 border-t border-white/5">
                    <button type="button" onClick={() => { setMode('signup'); setError('') }} className="text-sm text-gold hover:text-gold-light transition-colors font-body underline underline-offset-4">
                      Create an account
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ═══ SIGNUP ═══ */}
            {mode === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="text-center mb-2">
                  <h2 className="text-white font-display text-lg mb-1">Create Account</h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Set up your credentials to access the dossier.</p>
                </div>

                <div>
                  <label htmlFor="signup-email" className="label">Email Address</label>
                  <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input" required autoComplete="email" />
                </div>

                <div>
                  <label htmlFor="signup-password" className="label">Password</label>
                  <div className="relative">
                    <input id="signup-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="input pr-10" required minLength={6} autoComplete="new-password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors" tabIndex={-1}>
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>Minimum 6 characters</p>
                </div>

                <div>
                  <label htmlFor="signup-confirm" className="label">Confirm Password</label>
                  <div className="relative">
                    <input id="signup-confirm" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="input pr-10" required minLength={6} autoComplete="new-password" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors" tabIndex={-1}>
                      {showConfirmPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-sm font-body">{error}</motion.p>
                )}

                <button type="submit" disabled={loading} className="btn-gold w-full py-3 mt-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" />
                      Creating Account…
                    </span>
                  ) : 'Sign Up'}
                </button>

                <div className="text-center pt-2">
                  <button type="button" onClick={() => { setMode('login'); setError('') }} className="text-sm text-gold hover:text-gold-light transition-colors font-body underline underline-offset-4">
                    Already have an account? Log in
                  </button>
                </div>
              </form>
            )}

            {/* ═══ VERIFICATION SENT ═══ */}
            {mode === 'verify-sent' && (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 mx-auto bg-gold/10 border border-gold/30 flex items-center justify-center mb-4" style={{ fontSize: '28px' }}>
                  ✉️
                </div>
                <h2 className="text-white font-display text-lg">Check Your Email</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We have sent a verification link to<br />
                  <span className="text-gold font-medium">{email}</span>
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Click the link in the email to verify your account and gain access to the dossier.
                </p>

                <div className="pt-4 space-y-3">
                  <button type="button" onClick={() => { setMode('login'); setError('') }} className="btn-gold w-full py-3">
                    Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setLoading(true)
                      try {
                        const { createClient } = await import('@/lib/supabase/client')
                        const supabase = createClient()
                        await supabase.auth.resend({ type: 'signup', email })
                      } catch { /* ignore */ }
                      setLoading(false)
                    }}
                    disabled={loading}
                    className="text-sm text-gold hover:text-gold-light transition-colors font-body underline underline-offset-4"
                  >
                    {loading ? 'Resending…' : 'Resend verification email'}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ FORGOT PASSWORD ═══ */}
            {mode === 'forgot-password' && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="text-center mb-2">
                  <h2 className="text-white font-display text-lg mb-1">Reset Password</h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Enter your email to receive a recovery link.</p>
                </div>

                <div>
                  <label htmlFor="reset-email" className="label">Email Address</label>
                  <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input" required autoComplete="email" />
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-sm font-body">{error}</motion.p>
                )}

                <button type="submit" disabled={loading} className="btn-gold w-full py-3 mt-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" />
                      Sending Link…
                    </span>
                  ) : 'Send Reset Link'}
                </button>

                <div className="text-center pt-2 border-t border-white/5">
                  <button type="button" onClick={() => { setMode('login'); setError('') }} className="text-sm text-gold hover:text-gold-light transition-colors font-body underline underline-offset-4">
                    Back to Login
                  </button>
                </div>
              </form>
            )}

            {/* ═══ RESET LINK SENT ═══ */}
            {mode === 'reset-sent' && (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 mx-auto bg-gold/10 border border-gold/30 flex items-center justify-center mb-4" style={{ fontSize: '28px' }}>
                  ✉️
                </div>
                <h2 className="text-white font-display text-lg">Check Your Email</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We have sent a password reset link to<br />
                  <span className="text-gold font-medium">{email}</span>
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Click the link in the email to set a new password.
                </p>

                <div className="pt-4">
                  <button type="button" onClick={() => { setMode('login'); setError('') }} className="btn-gold w-full py-3">
                    Back to Login
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }} className="mt-8 text-center text-xs font-body font-light" style={{ color: 'var(--text-muted)' }}>
          By invitation only — Socinga Africa Holdings
        </motion.p>
      </div>
    </main>
  )
}
