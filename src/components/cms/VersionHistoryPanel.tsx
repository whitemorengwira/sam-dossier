'use client'

import React, { useEffect, useState } from 'react'
import { X, ClockCounterClockwise, ArrowCounterClockwise } from '@phosphor-icons/react'
import { getVersionHistory, getVersionById } from '@/lib/actions/cmsActions'
import { useCmsStore } from '@/lib/store/useCmsStore'

interface VersionHistoryPanelProps {
  pageSlug: string
  onClose: () => void
}

export function VersionHistoryPanel({ pageSlug, onClose }: VersionHistoryPanelProps) {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { setBlocks } = useCmsStore()

  useEffect(() => {
    async function load() {
      try {
        const data = await getVersionHistory(pageSlug)
        setHistory(data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [pageSlug])

  const handleRestore = async (id: string) => {
    if (!confirm('This will replace all current content on this page. Continue?')) return
    const version = await getVersionById(id)
    if (version && version.content_json) {
      setBlocks(version.content_json)
      onClose()
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-navy border-l border-gold/20 shadow-2xl z-[200] flex flex-col transform transition-transform">
      <div className="p-4 border-b border-gold/15 flex justify-between items-center bg-gold/5">
        <h3 className="text-gold font-display font-semibold flex items-center gap-2">
          <ClockCounterClockwise size={18} /> Version History
        </h3>
        <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <p className="text-text-muted text-sm text-center">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-text-muted text-sm text-center">No saved versions yet.</p>
        ) : (
          history.map((v, i) => (
            <div key={v.id} className="p-3 border border-gold/10 bg-navy-light/30 rounded-sm hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-gold font-bold">v{v.version_number} {i === 0 && '(Latest)'}</span>
                <button 
                  onClick={() => handleRestore(v.id)}
                  className="text-text-muted hover:text-gold transition-colors"
                  title="Restore this version"
                >
                  <ArrowCounterClockwise size={16} />
                </button>
              </div>
              <p className="text-[10px] text-text-muted font-mono">{new Date(v.saved_at).toLocaleString()}</p>
              <p className="text-xs text-text-secondary mt-1">
                {v.saved_by_display_name ? (
                  <span><strong>{v.saved_by_display_name}</strong> <span className="text-text-muted">({v.saved_by})</span></span>
                ) : v.saved_by}
              </p>
              {v.label && <p className="text-xs text-gold/70 mt-1 italic">"{v.label}"</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
