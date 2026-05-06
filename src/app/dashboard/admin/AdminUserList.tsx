'use client'

import React, { useState } from 'react'
import { approveUser, deleteUser, createUser } from './actions'

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
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [roles, setRoles] = useState<Record<string, string>>({})

  // Quick-add form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState('investor')
  const [addLoading, setAddLoading] = useState(false)

  const pendingUsers = users.filter((u) => !u.user_metadata?.is_approved)
  const activeUsers = users.filter((u) => u.user_metadata?.is_approved)

  const handleRoleChange = (userId: string, role: string) => {
    setRoles(prev => ({ ...prev, [userId]: role }))
  }

  const handleApprove = async (userId: string) => {
    const selectedRole = roles[userId] || 'investor'
    setLoadingId(userId)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await approveUser(userId, selectedRole)
      if (!res.success) throw new Error(res.error)
      setSuccessMsg('User approved successfully.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  const handleReject = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user entirely?')) return
    setLoadingId(userId)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await deleteUser(userId)
      if (!res.success) throw new Error(res.error)
      setSuccessMsg('User removed successfully.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail || !newPassword) {
      setError('Email and password are required.')
      return
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setAddLoading(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const res = await createUser(newEmail, newPassword, newRole)
      if (!res.success) throw new Error(res.error)
      setSuccessMsg(`User ${newEmail} created and approved as ${newRole}.`)
      setNewEmail('')
      setNewPassword('')
      setNewRole('investor')
      setShowAddForm(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* MESSAGES */}
      {error && (
        <div className="bg-danger/20 border border-danger/50 text-danger px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-900/30 border border-green-500/40 text-green-400 px-4 py-3 rounded text-sm">
          {successMsg}
        </div>
      )}

      {/* QUICK ADD USER */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-gold/20 pb-2">
          <h2 className="text-gold font-serif text-xl">Quick Add User</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs bg-gold hover:bg-gold-light text-onyx font-bold py-1.5 px-4 rounded transition-colors uppercase tracking-widest"
          >
            {showAddForm ? 'Cancel' : '+ Add User'}
          </button>
        </div>
        <p className="text-slate-400 text-xs mb-4">
          Create a user account directly — bypasses email verification and rate limits. The user will be pre-approved and can log in immediately.
        </p>

        {showAddForm && (
          <form onSubmit={handleCreateUser} className="bg-white/[0.02] border border-white/10 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-mono uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-onyx border border-white/20 text-white text-sm rounded px-3 py-2 outline-none focus:border-gold transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-mono uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-onyx border border-white/20 text-white text-sm rounded px-3 py-2 outline-none focus:border-gold transition-colors"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-mono uppercase tracking-wider mb-1.5">Role</label>
                <select
                  className="w-full bg-onyx border border-white/20 text-white text-sm rounded px-3 py-2 outline-none focus:border-gold transition-colors"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="investor">Investor</option>
                  <option value="team">Team Member</option>
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={addLoading}
                className="text-xs bg-gold hover:bg-gold-light text-onyx font-bold py-2 px-6 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
              >
                {addLoading ? 'Creating...' : 'Create & Approve User'}
              </button>
            </div>
          </form>
        )}
      </div>

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
                {activeUsers.map(user => {
                  const currentRole = user.user_metadata?.role || 'viewer'
                  const selectedRole = roles[user.id]
                  const hasChanged = selectedRole !== undefined && selectedRole !== currentRole
                  return (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-white">{user.email}</td>
                      <td className="py-4 px-4">
                        <select
                          className="bg-onyx border border-white/20 text-white text-sm rounded focus:ring-gold focus:border-gold px-2 py-1 outline-none"
                          value={selectedRole ?? currentRole}
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
                        {hasChanged && (
                          <button
                            onClick={() => handleApprove(user.id)}
                            disabled={loadingId === user.id}
                            className="text-xs bg-gold hover:bg-gold-light text-onyx font-bold py-1.5 px-4 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
                          >
                            {loadingId === user.id ? 'Saving...' : 'Save'}
                          </button>
                        )}
                        <button 
                          onClick={() => handleReject(user.id)}
                          disabled={loadingId === user.id}
                          className="text-xs text-slate-500 hover:text-danger transition-colors uppercase tracking-widest disabled:opacity-50"
                        >
                          {loadingId === user.id ? '...' : 'Revoke'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
