'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House,
  PresentationChart,
  Sparkle,
  FileText,
  Hammer,
  ChartLine,
  CurrencyCircleDollar,
  Mountains,
  Scales,
  Warning,
  FilePdf,
  ProjectorScreen,
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
  CheckCircle,
  ShieldCheck,
  Tray,
  MapPin,
  CalendarBlank,
  Wrench,
  Microscope,
  ArrowSquareOut,
  Crown,
  X,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState, useEffect, useCallback } from 'react'

const SIDEBAR_EDITS_KEY = 'sam-dossier-sidebar-edits'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  external?: boolean
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
      { label: 'Socinga Africa Group', href: 'https://www.socinga.africa/', icon: <ArrowSquareOut size={20} weight="duotone" />, external: true },
      { label: 'SAM-X Platform', href: '/samx-app', icon: <Globe size={20} weight="duotone" /> },
      { label: 'Investor Pitch Deck', href: '/dashboard/pitch-deck', icon: <PresentationChart size={20} weight="duotone" /> },
      { label: 'Lisa AI', href: '/dashboard/ai-assistant', icon: <Sparkle size={20} weight="duotone" /> },
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
      { label: 'CFO', href: '/dashboard/workspace/cfo', icon: <CurrencyCircleDollar size={20} weight="duotone" /> },
      { label: 'Board Chair', href: '/dashboard/workspace/board-chair', icon: <Crown size={20} weight="duotone" /> },
      { label: 'Head of CG', href: '/dashboard/workspace/head-of-cg', icon: <ShieldCheck size={20} weight="duotone" /> },
      { label: 'Research & Development', href: '/dashboard/research-development', icon: <Microscope size={20} weight="duotone" /> },
      { label: 'Tools Hub', href: '/dashboard/tools', icon: <Wrench size={20} weight="duotone" /> },
      { label: 'My Work', href: '/dashboard/workspace/my-work', icon: <CheckCircle size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Document Vault',
    items: [
      { label: 'Documents', href: '/dashboard/documents', icon: <Folder size={20} weight="duotone" /> },
      { label: 'Validated Docs', href: '/dashboard/validated-documents', icon: <ShieldCheck size={20} weight="duotone" /> },
      { label: 'Received External', href: '/dashboard/received-docs', icon: <Tray size={20} weight="duotone" /> },
      { label: 'PDF Editor (Pro)', href: '/dashboard/pdf-editor', icon: <FilePdf size={20} weight="duotone" /> },
      { label: 'Presentations', href: '/dashboard/presentations', icon: <ProjectorScreen size={20} weight="duotone" /> },
    ],
  },
  {
    title: 'Spreadsheets',
    items: [
      { label: 'Master Editor', href: '/dashboard/spreadsheet', icon: <Table size={20} weight="duotone" /> },
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
  {
    title: 'Administration',
    items: [
      { label: 'Admin Portal', href: '/dashboard/admin', icon: <ShieldCheck size={20} weight="duotone" /> },
    ],
  },
]

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [groupTitles, setGroupTitles] = useState<Record<string, string>>(() => {
    // Load persisted sidebar title edits
    if (typeof window === 'undefined') return {}
    try {
      return JSON.parse(localStorage.getItem(SIDEBAR_EDITS_KEY) || '{}')
    } catch { return {} }
  })

  // Listen for the global edit-mode toggle
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setEditMode(detail.enabled)
    }
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  // Helper: get the display title for a group (persisted or default)
  const getTitle = useCallback((defaultTitle: string) => {
    return groupTitles[defaultTitle] || defaultTitle
  }, [groupTitles])

  // Handle blur on an editable title — persist the change
  const handleTitleBlur = useCallback((defaultTitle: string, e: React.FocusEvent<HTMLHeadingElement>) => {
    const newText = e.currentTarget.textContent?.trim() || defaultTitle
    setGroupTitles(prev => {
      const next = { ...prev }
      if (newText === defaultTitle) {
        delete next[defaultTitle]
      } else {
        next[defaultTitle] = newText
      }
      try { localStorage.setItem(SIDEBAR_EDITS_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  return (
    <>
    {/* Mobile backdrop */}
    <div
      className={cn(
        'fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
        mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={onCloseMobile}
    />
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out',
        'bg-navy border-r border-gold/25',
        // Mobile: 280px, slide in/out
        'w-[280px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        // Desktop: normal collapse, always visible
        collapsed ? 'lg:w-[60px]' : 'lg:w-[260px]',
        'lg:translate-x-0'
      )}
    >
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <Link href="/dashboard" className="flex items-center gap-3 px-4 h-16 border-b border-gold/15 shrink-0 hover:bg-gold/[0.04] transition-colors">
        <img
          src="https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/socinga-logos/png/sa-icon-dark-ui.png"
          alt="Socinga Africa"
          className="w-8 h-8 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]"
        />
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
      </Link>

      {/* Mobile close button */}
      <button
        className="lg:hidden absolute top-4 right-3 z-50 w-8 h-8 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
        onClick={onCloseMobile}
      >
        <X size={20} weight="bold" />
      </button>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <h6
                className={cn(
                  'px-3 mb-2 text-[10px] font-mono text-text-muted uppercase tracking-[0.12em] transition-all duration-200',
                  editMode && 'cursor-text hover:shadow-[0_0_0_2px_rgba(212,175,55,0.4)] rounded-sm shadow-[0_0_0_1px_rgba(212,175,55,0.15)]'
                )}
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => handleTitleBlur(group.title, e)}
                onFocus={(e) => {
                  if (editMode) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.6)'
                }}
                style={{ outline: 'none' }}
                data-no-edit="true"
              >
                {getTitle(group.title)}
              </h6>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href} onClick={() => onCloseMobile?.()}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 text-[13px] font-body transition-all duration-200',
                          'hover:bg-gold/[0.08] group',
                          'text-text-secondary border-l-2 border-transparent'
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <span className="shrink-0 transition-colors text-text-secondary group-hover:text-gold/80">
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </a>
                    ) : (
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
                    )}
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
        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-gold/10 text-center">
            <p className="text-[10px] text-slate-500 font-mono">
              Meticulously built by{' '}
              <a 
                href="https://nwhite.systems/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors font-bold tracking-wide"
              >
                N.White Systems
              </a>
            </p>
          </div>
        )}
      </div>
    </aside>
    </>
  )
}
