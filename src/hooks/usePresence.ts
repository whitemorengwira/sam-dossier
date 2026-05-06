'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { TEAM } from '@/lib/documents-data'

/* ── Presence System ─────────────────────────────────────────────────
   Tracks which team members are online/offline using a combination of:
   1. Real Supabase auth session for the current user
   2. LocalStorage heartbeat for simulating presence across tabs
   3. Randomized presence for other team members (since this is a demo platform)
   ──────────────────────────────────────────────────────────────────── */

const PRESENCE_KEY = 'sam-dossier-presence'
const HEARTBEAT_INTERVAL = 10_000 // 10 seconds
const OFFLINE_THRESHOLD = 30_000 // 30 seconds without heartbeat = offline

export interface PresenceUser {
  id: string
  name: string
  email: string
  avatar: string
  isOnline: boolean
  lastSeen: string  // ISO timestamp
  status?: 'active' | 'idle' | 'away'
  currentPage?: string
}

interface PresenceStore {
  [userId: string]: {
    lastHeartbeat: number
    status: 'active' | 'idle' | 'away'
    currentPage?: string
  }
}

function loadPresenceStore(): PresenceStore {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(PRESENCE_KEY) || '{}')
  } catch { return {} }
}

function savePresenceStore(store: PresenceStore) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(PRESENCE_KEY, JSON.stringify(store)) } catch { /* ignore */ }
}

/** Simulated presence — some team members are randomly online */
function getSimulatedOnlineMembers(): Set<string> {
  // Deterministic based on current hour so it doesn't flicker every render
  const hour = new Date().getHours()
  const day = new Date().getDate()
  const seed = hour * 100 + day

  // Always-on members (the core team who are "always working")
  const alwaysOn = new Set(['u1', 'u2', 'u3']) // Whitemore, Jabulile, Shingirai

  // Randomly online based on time
  const others = ['u4', 'u5', 'u6'] // Michael, Patience, Olwethu
  others.forEach((id, i) => {
    if ((seed + i * 37) % 3 !== 0) alwaysOn.add(id)
  })

  return alwaysOn
}

export function usePresence(currentPage?: string) {
  const [users, setUsers] = useState<PresenceUser[]>([])
  const [currentUserId, setCurrentUserId] = useState<string>('u1')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Detect current user from Supabase auth
  useEffect(() => {
    async function detectUser() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          // Match to team member
          const member = TEAM.find(t => t.email === user.email || user.email?.includes(t.name.split(' ')[0].toLowerCase()))
          if (member) setCurrentUserId(member.id)
        }
      } catch { /* use default */ }
    }
    detectUser()
  }, [])

  // Heartbeat: register current user as online
  const heartbeat = useCallback(() => {
    const store = loadPresenceStore()
    store[currentUserId] = {
      lastHeartbeat: Date.now(),
      status: document.hidden ? 'idle' : 'active',
      currentPage: currentPage || window.location.pathname,
    }
    savePresenceStore(store)
  }, [currentUserId, currentPage])

  // Update presence list
  const updatePresence = useCallback(() => {
    const store = loadPresenceStore()
    const now = Date.now()
    const simulatedOnline = getSimulatedOnlineMembers()

    const presenceList: PresenceUser[] = TEAM.map(member => {
      const storeEntry = store[member.id]
      const isCurrentUser = member.id === currentUserId
      const isSimulatedOnline = simulatedOnline.has(member.id)

      let isOnline: boolean
      let status: 'active' | 'idle' | 'away' = 'active'
      let lastSeen = new Date().toISOString()

      if (isCurrentUser) {
        isOnline = true
        status = document.hidden ? 'idle' : 'active'
      } else if (storeEntry && (now - storeEntry.lastHeartbeat) < OFFLINE_THRESHOLD) {
        isOnline = true
        status = storeEntry.status
        lastSeen = new Date(storeEntry.lastHeartbeat).toISOString()
      } else {
        isOnline = isSimulatedOnline
        status = isOnline ? 'active' : 'away'
        // Stagger last-seen times for offline members
        if (!isOnline) {
          const minutesAgo = Math.floor(Math.random() * 120) + 10
          lastSeen = new Date(now - minutesAgo * 60_000).toISOString()
        }
      }

      return {
        id: member.id,
        name: member.name,
        email: member.email,
        avatar: member.avatar || member.name.split(' ').map(n => n[0]).join(''),
        isOnline,
        lastSeen,
        status,
        currentPage: storeEntry?.currentPage,
      }
    })

    setUsers(presenceList)
  }, [currentUserId])

  useEffect(() => {
    // Initial heartbeat + update
    heartbeat()
    updatePresence()

    // Set up recurring heartbeat
    intervalRef.current = setInterval(() => {
      heartbeat()
      updatePresence()
    }, HEARTBEAT_INTERVAL)

    // Visibility change handler
    const handleVisibility = () => {
      heartbeat()
      updatePresence()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [heartbeat, updatePresence])

  const onlineUsers = users.filter(u => u.isOnline)
  const offlineUsers = users.filter(u => !u.isOnline)

  return {
    users,
    onlineUsers,
    offlineUsers,
    onlineCount: onlineUsers.length,
    totalCount: users.length,
    currentUserId,
  }
}

/** Format "last seen" as relative time */
export function formatLastSeen(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
