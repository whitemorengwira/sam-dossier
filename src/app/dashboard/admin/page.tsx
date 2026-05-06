import React from 'react';

export default function AdminPage() {
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

      <div className="bg-onyx border border-gold/20 p-8 rounded-lg text-center">
        <h2 className="text-gold font-serif text-xl mb-4">Pending Approvals</h2>
        <p className="text-slate-300 text-sm mb-6">
          To approve users and assign roles, you must configure the <code>SUPABASE_SERVICE_ROLE_KEY</code> in your environment variables. Once configured, this panel will display all pending users.
        </p>
        <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/30">
          <span className="text-2xl">🔒</span>
        </div>
      </div>
    </div>
  );
}
