'use client'

import React, { useEffect, useState } from 'react'
import { getAuditLog } from '@/lib/actions/cmsActions'
import { Clock, UserCircle, ListDashes, FileText, ArrowDownRight } from '@phosphor-icons/react'

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getAuditLog()
        setLogs(data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="p-8 text-text-muted font-mono animate-pulse">Loading audit logs...</div>
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div className="mb-8">
        <span className="badge badge-gold mb-4 inline-block">System Admin</span>
        <h1 className="text-gold font-display font-black mb-3">Audit Trail</h1>
        <p className="text-text-secondary">Comprehensive log of all content mutations and version saves across the platform.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gold/10 border-b border-gold/20 text-gold font-mono uppercase text-xs">
              <tr>
                <th className="p-4 whitespace-nowrap"><Clock size={16} className="inline mr-2" />Timestamp</th>
                <th className="p-4"><UserCircle size={16} className="inline mr-2" />User</th>
                <th className="p-4"><ListDashes size={16} className="inline mr-2" />Action</th>
                <th className="p-4"><FileText size={16} className="inline mr-2" />Page Slug</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gold/5 transition-colors group">
                  <td className="p-4 font-mono text-xs text-text-muted whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <p className="text-text-primary text-sm">{log.user_display_name}</p>
                    <p className="text-text-muted text-[10px] font-mono">{log.user_email}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-navy border border-gold/20 text-gold text-xs font-mono">
                      {log.action_type}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {log.page_slug}
                  </td>
                  <td className="p-4 max-w-xs truncate text-xs text-text-muted">
                    {log.action_type === 'version_saved' ? (
                      <span className="flex items-center gap-1 text-success">
                        <ArrowDownRight size={14} /> Full page snapshot saved
                      </span>
                    ) : (
                      <span>Block: {log.target_block_id || 'N/A'}</span>
                    )}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted font-mono">
                    No activity found in the audit log.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
