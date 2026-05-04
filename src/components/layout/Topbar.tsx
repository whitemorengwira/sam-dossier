'use client'

import { Bell, MagnifyingGlass, List, SignOut, PencilSimple } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TopbarProps {
  sidebarCollapsed?: boolean
  onToggleMobile?: () => void
}

interface UserInfo {
  email: string
  initials: string
  displayName: string
}

export default function Topbar({ sidebarCollapsed, onToggleMobile }: TopbarProps) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser?.email) {
          const parts = authUser.email.split('@')[0].split(/[._-]/)
          const initials = parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : authUser.email.slice(0, 2).toUpperCase()
          const displayName = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
          setUser({ email: authUser.email, initials, displayName })
        } else {
          setUser({ email: 'admin@socinga.africa', initials: 'SA', displayName: 'Admin' })
        }
      } catch {
        setUser({ email: 'admin@socinga.africa', initials: 'SA', displayName: 'Admin' })
      }
    }
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch { /* ignore */ }
    router.push('/')
    router.refresh()
  }

  // Broadcast edit mode to the whole app via a custom event
  const toggleEditMode = () => {
    const next = !editMode
    setEditMode(next)
    window.dispatchEvent(new CustomEvent('sam-edit-mode', { detail: { enabled: next } }))
    // Also set a global flag for components that mount later
    ;(window as unknown as Record<string, boolean>).__samEditMode = next
  }

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
        <button onClick={onToggleMobile} className="lg:hidden text-text-secondary hover:text-gold transition-colors">
          <List size={24} />
        </button>
        <div className="relative hidden md:block">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search dossier, documents, tasks…"
            className={cn('input pl-9 w-64 lg:w-80 text-sm', 'bg-navy-light/50 border-gold/10', 'focus:w-96 transition-all duration-300')}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Edit Mode Toggle */}
        <button
          onClick={toggleEditMode}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-all',
            editMode
              ? 'bg-gold/20 border-gold/60 text-gold'
              : 'bg-transparent border-gold/20 text-text-muted hover:text-gold hover:border-gold/40'
          )}
          title={editMode ? 'Exit edit mode' : 'Enter edit mode — edit any text on the page'}
        >
          <PencilSimple size={14} weight={editMode ? 'fill' : 'regular'} />
          {editMode ? 'Editing' : 'Edit'}
        </button>

        {/* Live gold price */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gold/[0.06] border border-gold/20">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-gold">Au: $3,200/oz</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowMenu(false) }}
            className="relative p-2 text-text-secondary hover:text-gold transition-colors"
          >
            <Bell size={20} weight="duotone" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-navy border border-gold/20 shadow-xl z-50 flex flex-col max-h-[400px]">
              <div className="px-4 py-3 border-b border-gold/15 flex justify-between items-center bg-gold/5">
                <span className="text-sm font-semibold text-gold">Notifications</span>
                <span className="text-xs text-text-muted cursor-pointer hover:text-gold">Mark all as read</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gold/5 hover:bg-gold/5 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold text-text-primary">Sam Dossier Team</span>
                    <span className="text-[10px] text-text-muted">10m ago</span>
                  </div>
                  <p className="text-xs text-text-secondary">Patience Ngwira assigned you to <strong>Complete geological survey report</strong></p>
                </div>
                <div className="px-4 py-3 border-b border-gold/5 hover:bg-gold/5 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold text-text-primary">System Alert</span>
                    <span className="text-[10px] text-text-muted">1h ago</span>
                  </div>
                  <p className="text-xs text-text-secondary">Document <strong>Mining Mandate — Zambia</strong> was signed.</p>
                </div>
                <div className="px-4 py-3 hover:bg-gold/5 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold text-text-primary">Olwethu Mlokoti</span>
                    <span className="text-[10px] text-text-muted">2h ago</span>
                  </div>
                  <p className="text-xs text-text-secondary">Left a comment on <strong>Executive Summary</strong></p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gold/15 text-center bg-gold/5">
                <span className="text-xs text-gold font-medium cursor-pointer hover:underline">View all notifications</span>
              </div>
            </div>
          )}
        </div>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 pl-3 border-l border-gold/15 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center">
              <span className="text-xs font-mono text-gold font-bold">
                {user?.initials || 'SA'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-text-primary leading-tight">
                {user?.displayName || 'Admin'}
              </p>
              <p className="text-[10px] text-text-muted font-mono">
                {user?.email || 'admin@socinga.africa'}
              </p>
            </div>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-navy border border-gold/20 shadow-xl z-50">
              <div className="px-4 py-3 border-b border-gold/15">
                <p className="text-sm text-text-primary font-medium">{user?.displayName}</p>
                <p className="text-xs text-text-muted font-mono">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-gold hover:bg-gold/[0.06] transition-all"
              >
                <SignOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
