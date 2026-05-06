'use client'

import Link from 'next/link'
import {
  House,
  PresentationChart,
  Sparkle,
  FileText,
  Hammer,
  ChartLine,
  CurrencyCircleDollar,
  Kanban,
  Users,
  Folder,
  Table,
  GameController,
  ShieldCheck,
  Rocket,
  Globe,
  ArrowRight,
} from '@phosphor-icons/react'

const SOCINGA_ICON = 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/socinga-logos/png/sa-icon-dark-ui.png'

interface QuickCard {
  label: string
  description: string
  href: string
  icon: React.ReactNode
  accent: string
}

const quickCards: QuickCard[] = [
  {
    label: 'Live Dashboard',
    description: 'Real-time mine output, gold price, and KPI overview.',
    href: '/dashboard/overview',
    icon: <House size={24} weight="duotone" />,
    accent: 'rgba(212,175,55,0.15)',
  },
  {
    label: 'Investment Dossier',
    description: 'Executive summary, financials, geological data, and legal structure.',
    href: '/dashboard/dossier/executive-summary',
    icon: <FileText size={24} weight="duotone" />,
    accent: 'rgba(212,175,55,0.12)',
  },
  {
    label: 'Investor Pitch Deck',
    description: 'Board-ready presentation for capital deployment.',
    href: '/dashboard/pitch-deck',
    icon: <PresentationChart size={24} weight="duotone" />,
    accent: 'rgba(100,180,255,0.12)',
  },
  {
    label: 'Lisa AI Assistant',
    description: 'Conversational analyst with full dossier access.',
    href: '/dashboard/ai-assistant',
    icon: <Sparkle size={24} weight="duotone" />,
    accent: 'rgba(180,130,255,0.12)',
  },
  {
    label: 'Project Boards',
    description: 'Kanban boards, tasks, and team collaboration.',
    href: '/dashboard/workspace/boards',
    icon: <Kanban size={24} weight="duotone" />,
    accent: 'rgba(80,200,120,0.12)',
  },
  {
    label: 'Document Vault',
    description: 'Validated documents, eSignatures, and corporate records.',
    href: '/dashboard/validated-documents',
    icon: <ShieldCheck size={24} weight="duotone" />,
    accent: 'rgba(255,180,80,0.12)',
  },
  {
    label: 'Mine Simulator',
    description: 'Interactive mining process simulation.',
    href: '/dashboard/simulation',
    icon: <GameController size={24} weight="duotone" />,
    accent: 'rgba(255,100,100,0.12)',
  },
  {
    label: 'SAM-X Platform',
    description: 'External-facing mining intelligence platform.',
    href: '/samx-app',
    icon: <Globe size={24} weight="duotone" />,
    accent: 'rgba(100,220,255,0.12)',
  },
]

const pillars = [
  { label: 'Mining & Refining', icon: <Hammer size={18} weight="duotone" /> },
  { label: 'Financial Services', icon: <CurrencyCircleDollar size={18} weight="duotone" /> },
  { label: 'Creative Studios', icon: <PresentationChart size={18} weight="duotone" /> },
  { label: 'Social Impact', icon: <Users size={18} weight="duotone" /> },
]

export default function DashboardHomePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-gold/20" style={{
        background: `
          radial-gradient(ellipse at 30% 100%, rgba(212,175,55,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(139,90,0,0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(10,17,40,0.95) 0%, rgba(13,13,13,0.98) 100%)
        `,
      }}>
        {/* Decorative gold line at top */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="flex flex-col md:flex-row items-center gap-8 px-8 py-12 md:py-16">
          <div className="shrink-0">
            <img
              src={SOCINGA_ICON}
              alt="Socinga Africa Mining"
              className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-[10px] font-mono text-gold/70 uppercase tracking-[0.2em] mb-2">
              Investment Dossier Platform
            </p>
            <h1 className="text-gold font-display font-black text-3xl md:text-4xl tracking-tight leading-tight mb-3">
              SOCINGA AFRICA MINING
            </h1>
            <p className="text-text-secondary font-body text-sm md:text-base max-w-xl leading-relaxed">
              Institutional-grade mining investment platform for <span className="text-gold font-medium">Chikonga Mine</span>,
              Manicaland Province, Zimbabwe. Secured capital deployment into de-risked, high-yield mineral assets.
            </p>

            {/* Pillars */}
            <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
              {pillars.map((p) => (
                <span key={p.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-gold/80 border border-gold/20 rounded-full bg-gold/[0.04]">
                  {p.icon}
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Figures ──────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Output', value: '5 KG', sub: 'per month' },
          { label: 'Target Output', value: '15+ KG', sub: 'post-investment' },
          { label: 'Gold Price', value: '~$3,200', sub: 'per troy ounce' },
          { label: 'Capital Required', value: 'R500M', sub: 'Phase 1 deployment' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gold/15 p-5 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.06)]"
            style={{ background: 'rgba(10,17,40,0.45)' }}
          >
            <p className="text-2xl md:text-3xl font-mono font-bold text-gold tracking-tight">{stat.value}</p>
            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-1">{stat.label}</p>
            <p className="text-[9px] font-body text-text-muted/60 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* ── Quick Access Cards ───────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-display font-bold text-gold">Quick Access</h2>
          <Link href="/dashboard/overview" className="text-xs font-mono text-text-muted hover:text-gold transition-colors flex items-center gap-1">
            Go to Dashboard <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative rounded-lg border border-white/[0.06] p-5 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_4px_30px_rgba(212,175,55,0.08)] hover:-translate-y-0.5"
              style={{ background: card.accent }}
            >
              <div className="flex items-start gap-3">
                <span className="text-gold/80 group-hover:text-gold transition-colors shrink-0 mt-0.5">
                  {card.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-display font-semibold text-text-primary group-hover:text-gold transition-colors leading-tight">
                    {card.label}
                  </h3>
                  <p className="text-[11px] font-body text-text-muted mt-1.5 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="absolute top-4 right-4 text-text-muted/30 group-hover:text-gold/60 transition-all duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Secondary Links ──────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/dossier/chikonga-profile"
          className="group flex items-center gap-3 rounded-lg border border-white/[0.06] p-4 hover:border-gold/20 transition-all duration-300"
          style={{ background: 'rgba(10,17,40,0.3)' }}
        >
          <Hammer size={20} weight="duotone" className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
          <div>
            <p className="text-sm font-body text-text-primary group-hover:text-gold transition-colors">Chikonga Mine Profile</p>
            <p className="text-[10px] text-text-muted">Asset details &amp; operational data</p>
          </div>
        </Link>
        <Link
          href="/dashboard/dossier/financial-model"
          className="group flex items-center gap-3 rounded-lg border border-white/[0.06] p-4 hover:border-gold/20 transition-all duration-300"
          style={{ background: 'rgba(10,17,40,0.3)' }}
        >
          <ChartLine size={20} weight="duotone" className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
          <div>
            <p className="text-sm font-body text-text-primary group-hover:text-gold transition-colors">Financial Model</p>
            <p className="text-[10px] text-text-muted">Revenue projections &amp; ROI analysis</p>
          </div>
        </Link>
        <Link
          href="/dashboard/workspace/team"
          className="group flex items-center gap-3 rounded-lg border border-white/[0.06] p-4 hover:border-gold/20 transition-all duration-300"
          style={{ background: 'rgba(10,17,40,0.3)' }}
        >
          <Users size={20} weight="duotone" className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
          <div>
            <p className="text-sm font-body text-text-primary group-hover:text-gold transition-colors">Leadership Team</p>
            <p className="text-[10px] text-text-muted">Executive profiles &amp; contact</p>
          </div>
        </Link>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="text-center pt-6 border-t border-white/[0.04]">
        <p className="text-[10px] font-mono text-text-muted/50 tracking-wide">
          SOCINGA AFRICA HOLDINGS &nbsp;·&nbsp; CONFIDENTIAL &nbsp;·&nbsp; BY INVITATION ONLY
        </p>
      </footer>
    </div>
  )
}
