import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import AdminUserList from './AdminUserList';

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const isAdmin = session?.user?.user_metadata?.role === 'admin'
  let users: any[] = []
  let errorMsg = null

  if (isAdmin) {
    try {
      const adminClient = createAdminClient()
      const { data, error } = await adminClient.auth.admin.listUsers()
      if (error) {
        errorMsg = error.message
      } else {
        users = data.users
      }
    } catch (e: unknown) {
      errorMsg = (e instanceof Error ? e.message : String(e)) || 'Error fetching users.'
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2 uppercase flex items-center gap-3">
          <span className="text-gold">🛡</span> Admin Portal
        </h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
          User Access & Approvals
        </p>
      </div>

      <div className="bg-onyx border border-gold/20 p-8 rounded-lg">
        {!isAdmin ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6 border border-danger/30">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-danger font-serif text-xl mb-2">Access Denied</h2>
            <p className="text-slate-400 text-sm">
              You must have an <strong>admin</strong> role to view this page. 
              Currently, your role is {session?.user?.user_metadata?.role || 'undefined'}.
            </p>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-12">
             <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/30">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-gold font-serif text-xl mb-4">Configuration Required</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              To manage users, you must configure the <code>SUPABASE_SERVICE_ROLE_KEY</code> in your environment variables. 
              <br/><br/>
              <span className="text-danger">Error: {errorMsg}</span>
            </p>
          </div>
        ) : (
          <AdminUserList users={users} />
        )}
      </div>
    </div>
  );
}
