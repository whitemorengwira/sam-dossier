'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import InlineEditProvider from '@/components/InlineEditProvider'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userStatus, setUserStatus] = useState<'loading' | 'approved' | 'pending' | 'unauthenticated'>('loading')
  const [userRole, setUserRole] = useState<string>('')

  useEffect(() => {
    async function checkAuth() {
      // Local dev bypass if supabase url is placeholder or missing
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === '__REPLACE_ME__') {
        setUserStatus('approved');
        return;
      }
      try {
        const supabase = createClient()
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          setUserStatus('unauthenticated')
          router.push('/')
          return
        }
        
        const meta = session.user.user_metadata || {}
        
        // Auto-approve the admin
        if (session.user.email === 'hello@nwhite.systems') {
          setUserStatus('approved')
          setUserRole('admin')
          return
        }
        
        if (meta.is_approved === true || meta.role === 'admin') {
          setUserStatus('approved')
          setUserRole(meta.role || 'viewer')
        } else {
          setUserStatus('pending')
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        // If Supabase is misconfigured, fallback to unauthenticated so they don't get stuck
        setUserStatus('unauthenticated')
        router.push('/')
      }
    }
    checkAuth()
  }, [router])

  if (userStatus === 'loading') {
    return <div className="min-h-screen bg-onyx flex items-center justify-center text-gold font-mono">Loading Workspace...</div>
  }

  if (userStatus === 'pending') {
    return (
      <div className="min-h-screen bg-onyx flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-onyx-light border border-gold/30 rounded-lg p-8 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">⏳</span>
          </div>
          <h2 className="text-gold font-serif text-2xl font-bold mb-4">Account Pending Approval</h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Your account has been successfully created and is currently awaiting administrator approval.
            Once approved, you will be able to access the full SAM Dossier platform.
          </p>

          <div className="bg-gold/5 border border-gold/20 rounded p-4 text-left space-y-2 mb-6">
            <h3 className="text-gold text-xs font-mono uppercase tracking-widest">While you wait</h3>
            <ul className="text-xs leading-relaxed space-y-1.5 text-slate-400">
              <li className="flex gap-2"><span className="text-gold">•</span> Ensure you have verified your email address by clicking the link sent to your inbox.</li>
              <li className="flex gap-2"><span className="text-gold">•</span> The administrator has been notified of your request and will action it shortly.</li>
              <li className="flex gap-2"><span className="text-gold">•</span> Once approved, simply return here and log in with your credentials.</li>
            </ul>
          </div>

          <button onClick={() => {
            const supabase = createClient()
            supabase.auth.signOut().then(() => router.push('/'))
          }} className="btn-gold w-full py-3 text-sm">
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-onyx">
      <Toaster position="bottom-right" richColors theme="dark" />
      {/* Inline edit engine */}
      <InlineEditProvider />

      {/* Sidebar */}
      <Sidebar />

      {/* Topbar */}
      <Topbar
        sidebarCollapsed={sidebarCollapsed}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'ml-[60px]' : 'ml-[260px]'
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
