'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House,
  PresentationChart,
  Robot,
  FileText,
  Hammer,
  ChartLine,
  CurrencyCircleDollar,
  Mountains,
  Scales,
  Warning,
  SignOut as SignOutIcon,
  CaretLeft,
  Kanban,
  CalendarDots,
  Users,
  Clock,
  Folder,
  PencilLine,
  Table,
  GameController,
  Globe,
  Rocket,
  Flag,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navigation: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Overview', href: '/dashboard/overview', icon: <House size={20} weight="duotone" /> },
      { label: 'Investor Pitch Deck', href: '/dashboard/pitch-deck', icon: <PresentationChart size={20} weight="duotone" /> },
      { label: 'AI Assistant', href: '/dashboard/ai-assistant', icon: <Robot size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Investment Dossier',
    items: [
      { label: 'Executive Summary', href: '/dashboard/dossier/executive-summary', icon: <FileText size={20} weight="duotone" /> },
      { label: 'Chikonga Mine Profile', href: '/dashboard/dossier/chikonga-profile', icon: <Hammer size={20} weight="duotone" /> },
      { label: 'Investment Case', href: '/dashboard/dossier/investment-case', icon: <ChartLine size={20} weight="duotone" /> },
      { label: 'Financial Model', href: '/dashboard/dossier/financial-model', icon: <CurrencyCircleDollar size={20} weight="duotone" /> },
      { label: 'Geological Report', href: '/dashboard/dossier/geological-report', icon: <Mountains size={20} weight="duotone" /> },
      { label: 'Legal Structure', href: '/dashboard/dossier/legal-structure', icon: <Scales size={20} weight="duotone" /> },
      { label: 'Risk Matrix', href: '/dashboard/dossier/risk-matrix', icon: <Warning size={20} weight="duotone" /> },
      { label: 'Exit Strategy', href: '/dashboard/dossier/exit-strategy', icon: <SignOutIcon size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Project Boards', href: '/dashboard/workspace/boards', icon: <Kanban size={20} weight="duotone" /> },
      { label: 'Timeline / Gantt', href: '/dashboard/workspace/timeline', icon: <Clock size={20} weight="duotone" /> },
      { label: 'Team', href: '/dashboard/workspace/team', icon: <Users size={20} weight="duotone" /> },
      { label: 'Calendar', href: '/dashboard/workspace/calendar', icon: <CalendarDots size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Document Vault',
    items: [
      { label: 'Documents', href: '/dashboard/documents', icon: <Folder size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Spreadsheets',
    items: [
      { label: 'Budget Breakdown', href: '/dashboard/spreadsheets/budget', icon: <Table size={20} weight="duotone" /> },
      { label: 'Cash Flow Model', href: '/dashboard/spreadsheets/cashflow', icon: <Table size={20} weight="duotone" /> },
      { label: 'Ore Grade Tracker', href: '/dashboard/spreadsheets/ore-grades', icon: <Table size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Mining Simulation',
    items: [
      { label: 'Mine Simulator', href: '/dashboard/simulation', icon: <GameController size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Mining Mandate',
    items: [
      { label: 'South Africa', href: '/dashboard/mining-mandate/south-africa', icon: <Flag size={20} weight="duotone" /> },
      { label: 'Zimbabwe', href: '/dashboard/mining-mandate/zimbabwe', icon: <Flag size={20} weight="duotone" /> },
      { label: 'Mozambique', href: '/dashboard/mining-mandate/mozambique', icon: <Flag size={20} weight="duotone" /> },
      { label: 'Malawi', href: '/dashboard/mining-mandate/malawi', icon: <Flag size={20} weight="duotone" /> },
      { label: 'Zambia', href: '/dashboard/mining-mandate/zambia', icon: <Flag size={20} weight="duotone" /> },
      { label: 'Ghana', href: '/dashboard/mining-mandate/ghana', icon: <Globe size={20} weight="duotone" /> },
    ],
  },
  {
    title: '2027 Launch',
    items: [
      { label: 'Launch Workspace', href: '/dashboard/launch-2027', icon: <Rocket size={20} weight="duotone" /> },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out',
        'bg-navy border-r border-gold/25',
        collapsed ? 'w-[60px]' : 'w-[260px]'
      )}
    >
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gold/15 shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shrink-0">
          <span className="text-onyx font-bold text-sm font-display">S</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h5 className="text-gold font-display text-sm font-bold tracking-wide leading-tight">
              SAM Dossier
            </h5>
            <p className="text-[10px] text-text-secondary font-mono leading-tight">
              Socinga Africa Mining
            </p>
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <h6 className="px-3 mb-2 text-[10px] font-mono text-text-muted uppercase tracking-[0.12em]">
                {group.title}
              </h6>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 text-[13px] font-body transition-all duration-200',
                        'hover:bg-gold/[0.08] group',
                        isActive
                          ? 'text-gold bg-gold/[0.06] border-l-2 border-gold shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]'
                          : 'text-text-secondary border-l-2 border-transparent'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className={cn(
                        'shrink-0 transition-colors',
                        isActive ? 'text-gold' : 'text-text-secondary group-hover:text-gold/80'
                      )}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Collapse Toggle ──────────────────────────────────────────── */}
      <div className="border-t border-gold/15 p-2 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-3 py-2 text-xs',
            'text-text-muted hover:text-gold transition-colors'
          )}
        >
          <CaretLeft
            size={16}
            className={cn('transition-transform duration-300', collapsed && 'rotate-180')}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
