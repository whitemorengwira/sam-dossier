'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import InlineEditProvider from '@/components/InlineEditProvider'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
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
      // Local dev bypass if supabase url is placeholder
      if (process.env.NEXT_PUBLIC_SUPABASE_URL === '__REPLACE_ME__') {
        setUserStatus('approved');
        return;
      }
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
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
          <p className="text-slate-300 text-sm mb-6">Your account has been successfully created and is currently awaiting administrator approval. You will receive an email once your access level has been assigned.</p>
          <button onClick={() => {
            const supabase = createClient()
            supabase.auth.signOut().then(() => router.push('/'))
          }} className="text-gold hover:text-gold-light underline underline-offset-4 text-sm font-mono transition-colors">
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
      <PWAInstallPrompt />

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
