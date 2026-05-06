'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { approveUser, deleteUser } from './actions'

type User = {
  id: string
  email: string
  created_at: string
  user_metadata: {
    role?: string
    is_approved?: boolean
    [key: string]: any
  }
}

export default function AdminUserList({ users }: { users: User[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Use local state for dropdowns so we don't have to keep it in the component list state
  // We'll manage selected roles by user id
  const [roles, setRoles] = useState<Record<string, string>>({})

  const pendingUsers = users.filter((u) => !u.user_metadata?.is_approved)
  const activeUsers = users.filter((u) => u.user_metadata?.is_approved)

  const handleRoleChange = (userId: string, role: string) => {
    setRoles(prev => ({ ...prev, [userId]: role }))
  }

  const handleApprove = async (userId: string) => {
    // Default to 'investor' if no role selected
    const selectedRole = roles[userId] || 'investor'
    setLoadingId(userId)
    setError(null)
    try {
      const res = await approveUser(userId, selectedRole)
      if (!res.success) throw new Error(res.error)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  const handleReject = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user request entirely?')) return
    setLoadingId(userId)
    setError(null)
    try {
      const res = await deleteUser(userId)
      if (!res.success) throw new Error(res.error)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-12">
      {error && (
        <div className="bg-danger/20 border border-danger/50 text-danger px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* PENDING APPROVALS */}
      <div>
        <h2 className="text-gold font-serif text-xl mb-4 border-b border-gold/20 pb-2">Pending Approvals ({pendingUsers.length})</h2>
        {pendingUsers.length === 0 ? (
          <p className="text-slate-400 text-sm italic">No pending users at this time.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4 font-normal">Email</th>
                  <th className="py-3 px-4 font-normal">Requested At</th>
                  <th className="py-3 px-4 font-normal">Role Assignment</th>
                  <th className="py-3 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingUsers.map(user => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{user.email}</td>
                    <td className="py-4 px-4 text-slate-400">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <select 
                        className="bg-onyx border border-white/20 text-white text-sm rounded focus:ring-gold focus:border-gold px-2 py-1 outline-none"
                        value={roles[user.id] || 'investor'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={loadingId === user.id}
                      >
                        <option value="investor">Investor</option>
                        <option value="team">Team Member</option>
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right space-x-3">
                      <button 
                        onClick={() => handleReject(user.id)}
                        disabled={loadingId === user.id}
                        className="text-xs text-danger hover:text-red-400 transition-colors uppercase tracking-widest disabled:opacity-50"
                      >
                        Deny
                      </button>
                      <button 
                        onClick={() => handleApprove(user.id)}
                        disabled={loadingId === user.id}
                        className="text-xs bg-gold hover:bg-gold-light text-onyx font-bold py-1.5 px-4 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
                      >
                        {loadingId === user.id ? 'Approving...' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ACTIVE USERS */}
      <div>
        <h2 className="text-white font-serif text-xl mb-4 border-b border-white/10 pb-2">Active Users ({activeUsers.length})</h2>
        {activeUsers.length === 0 ? (
          <p className="text-slate-400 text-sm italic">No active users.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4 font-normal">Email</th>
                  <th className="py-3 px-4 font-normal">Role</th>
                  <th className="py-3 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeUsers.map(user => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-white">{user.email}</td>
                    <td className="py-4 px-4 text-gold uppercase tracking-wider text-xs">{user.user_metadata?.role || 'user'}</td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => handleReject(user.id)}
                        disabled={loadingId === user.id}
                        className="text-xs text-slate-500 hover:text-danger transition-colors uppercase tracking-widest disabled:opacity-50"
                      >
                        {loadingId === user.id ? '...' : 'Revoke'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
