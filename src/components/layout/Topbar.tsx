'use client'

import { Bell, MagnifyingGlass, List } from '@phosphor-icons/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TopbarProps {
  sidebarCollapsed?: boolean
  onToggleMobile?: () => void
}

export default function Topbar({ sidebarCollapsed, onToggleMobile }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6',
        'bg-navy/80 backdrop-blur-xl border-b border-gold/15',
        'transition-all duration-300',
        sidebarCollapsed ? 'left-[60px]' : 'left-[260px]'
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobile}
          className="lg:hidden text-text-secondary hover:text-gold transition-colors"
        >
          <List size={24} />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search dossier, documents, tasks…"
            className={cn(
              'input pl-9 w-64 lg:w-80 text-sm',
              'bg-navy-light/50 border-gold/10',
              'focus:w-96 transition-all duration-300'
            )}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Live gold price indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gold/[0.06] border border-gold/20">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-gold">
            Au: $3,200/oz
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:text-gold transition-colors">
          <Bell size={20} weight="duotone" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-gold/15">
          <div className="w-8 h-8 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center">
            <span className="text-xs font-mono text-gold font-bold">SA</span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-text-primary leading-tight">Admin</p>
            <p className="text-[10px] text-text-muted font-mono">Socinga Africa</p>
          </div>
        </div>
      </div>
    </header>
  )
}
