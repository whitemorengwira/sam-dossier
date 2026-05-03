'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  FileText,
  Kanban,
  Folder,
  GameController,
  Table,
  Rocket,
  ArrowRight,
  TrendUp,
  MapPin,
  CurrencyCircleDollar,
  ChartLine,
  Hammer,
  Target,
} from '@phosphor-icons/react'

/* ── Animated Counter Component ─────────────────────────────────── */
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
}: {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  const formatted = count.toLocaleString('en-ZA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="font-mono text-gold">
      {prefix}{formatted}{suffix}
    </span>
  )
}

/* ── Metric Card ────────────────────────────────────────────────── */
function MetricCard({
  icon,
  label,
  value,
  prefix = '',
  suffix = '',
  colour = 'gold',
}: {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  colour?: string
}) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="text-gold/60">{icon}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
      </div>
      <div className="stat-value text-2xl">
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  )
}

/* ── Quick Access Tile ──────────────────────────────────────────── */
const tiles = [
  {
    title: 'Investment Dossier',
    description: 'Complete investment thesis, financials, and mine profile.',
    href: '/dashboard/dossier/executive-summary',
    icon: <FileText size={28} weight="duotone" />,
    accentColour: 'from-gold/20 to-gold/5',
    borderAccent: 'hover:border-gold/50',
  },
  {
    title: 'Project Boards',
    description: 'Monday.com-style task management and Kanban boards.',
    href: '/dashboard/workspace/boards',
    icon: <Kanban size={28} weight="duotone" />,
    accentColour: 'from-info/20 to-info/5',
    borderAccent: 'hover:border-info/50',
  },
  {
    title: 'Document Vault',
    description: 'Legal documents, agreements, and eSignature workflows.',
    href: '/dashboard/documents',
    icon: <Folder size={28} weight="duotone" />,
    accentColour: 'from-success/20 to-success/5',
    borderAccent: 'hover:border-success/50',
  },
  {
    title: 'Mine Simulation',
    description: 'Interactive 3D mine ecosystem — shaft to gold bar.',
    href: '/dashboard/simulation',
    icon: <GameController size={28} weight="duotone" />,
    accentColour: 'from-warning/20 to-warning/5',
    borderAccent: 'hover:border-warning/50',
  },
  {
    title: 'Spreadsheets',
    description: 'Budget breakdown, cash flow models, and ore grade data.',
    href: '/dashboard/spreadsheets/budget',
    icon: <Table size={28} weight="duotone" />,
    accentColour: 'from-purple-500/20 to-purple-500/5',
    borderAccent: 'hover:border-purple-500/50',
  },
  {
    title: 'Launch 2027',
    description: 'Socinga Africa official launch planning workspace.',
    href: '/dashboard/launch-2027',
    icon: <Rocket size={28} weight="duotone" />,
    accentColour: 'from-rose-500/20 to-rose-500/5',
    borderAccent: 'hover:border-rose-500/50',
  },
]

/* ── Main Overview Page ────────────────────────────────────────── */
export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* ── Zone 1: Cinematic Hero Banner ────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden h-[340px]"
        style={{
          background: `
            linear-gradient(135deg, rgba(10,17,40,0.95) 0%, rgba(10,17,40,0.7) 50%, rgba(10,17,40,0.85) 100%),
            linear-gradient(180deg, #0A1128 0%, #121212 100%)
          `,
        }}
      >
        {/* Background gold gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-8 lg:px-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="pulse-dot" />
              <span className="badge badge-gold">Live Dashboard</span>
            </div>
            <h1 className="text-gold font-display font-black text-4xl lg:text-5xl tracking-tight mb-2">
              CHIKONGA MINE
            </h1>
            <p className="text-text-secondary font-heading text-xl italic">
              Manicaland Province, Zimbabwe
            </p>
          </div>

          {/* Right side animated stats */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="text-right">
              <div className="text-3xl font-mono font-bold">
                <AnimatedCounter target={5} suffix=" KG" />
              </div>
              <p className="stat-label mt-1">Current Output / Month</p>
            </div>
            <div className="w-px h-16 bg-gold/25" />
            <div className="text-right">
              <div className="text-3xl font-mono font-bold">
                <AnimatedCounter target={15} suffix="+ KG" />
              </div>
              <p className="stat-label mt-1">Target Output / Month</p>
            </div>
            <div className="w-px h-16 bg-gold/25" />
            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-gold">
                R500M
              </div>
              <p className="stat-label mt-1">USD 27.5M Investment</p>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-onyx to-transparent" />
      </motion.section>

      {/* ── Zone 2: Key Metrics Row ─────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        <MetricCard
          icon={<TrendUp size={20} weight="duotone" />}
          label="Gold Price Today"
          value={3200}
          prefix="~$"
          suffix="/oz"
        />
        <MetricCard
          icon={<CurrencyCircleDollar size={20} weight="duotone" />}
          label="Current Monthly Revenue"
          value={514400}
          prefix="~$"
        />
        <MetricCard
          icon={<ChartLine size={20} weight="duotone" />}
          label="Target Monthly Revenue"
          value={1543200}
          prefix="~$"
        />
        <MetricCard
          icon={<Target size={20} weight="duotone" />}
          label="Investment Required"
          value={500}
          prefix="R"
          suffix="M"
        />
        <MetricCard
          icon={<Hammer size={20} weight="duotone" />}
          label="Projected ROI"
          value={3}
          suffix="-yr horizon"
        />
        <MetricCard
          icon={<MapPin size={20} weight="duotone" />}
          label="Mine Location"
          value={0}
          prefix=""
          suffix=""
        />
      </motion.section>

      {/* Fix last card — replace counter with static text for location */}

      {/* ── Zone 3: Quick Access Grid ──────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-gold">Quick Access</h2>
            <p className="text-sm text-text-muted mt-1">Navigate to core platform areas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
            >
              <Link
                href={tile.href}
                className={`glass-card group flex flex-col h-full ${tile.borderAccent}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${tile.accentColour}`}>
                    <span className="text-gold">{tile.icon}</span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
                <h4 className="text-text-primary font-body font-semibold text-sm mb-1">
                  {tile.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {tile.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Zone 4: Activity Feed + Pending Actions ─────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Activity Feed */}
        <div className="glass-card">
          <h3 className="text-sm font-body font-semibold text-text-primary mb-4 flex items-center gap-2">
            <div className="pulse-dot" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { text: 'Geological Report uploaded to Document Vault', time: '2 hours ago', type: 'document' },
              { text: 'Task "Book flights to Mutare" marked as In Progress', time: '4 hours ago', type: 'task' },
              { text: 'Financial Model spreadsheet updated', time: '6 hours ago', type: 'spreadsheet' },
              { text: 'NDA sent for electronic signature', time: '1 day ago', type: 'signature' },
              { text: 'Mine simulation data refreshed', time: '1 day ago', type: 'simulation' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 border border-gold/10 hover:border-gold/25 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-gold/40 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary/90 leading-relaxed">{item.text}</p>
                  <p className="text-[10px] text-text-muted font-mono mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="glass-card">
          <h3 className="text-sm font-body font-semibold text-text-primary mb-4">
            Pending Actions
          </h3>
          <div className="space-y-3">
            {[
              { text: 'Sign Shareholder Agreement', status: 'Awaiting Signature', urgent: true },
              { text: 'Review Investment Term Sheet', status: 'Pending Review', urgent: true },
              { text: 'Complete site visit briefing pack', status: 'Due 25 May', urgent: false },
              { text: 'Book accommodation in Mutare', status: 'Due 15 May', urgent: false },
              { text: 'Commission independent geologist', status: 'Due 22 May', urgent: false },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-gold/10 hover:border-gold/25 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.urgent ? 'bg-danger animate-pulse' : 'bg-warning/60'
                    }`}
                  />
                  <p className="text-xs text-text-primary/90 truncate">{item.text}</p>
                </div>
                <span
                  className={`badge text-[10px] shrink-0 ${
                    item.urgent ? 'badge-danger' : 'badge-warning'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
