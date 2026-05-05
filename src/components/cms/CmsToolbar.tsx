'use client'

import React, { useEffect, useState } from 'react'
import { useCmsStore } from '@/lib/store/useCmsStore'
import { FloppyDisk, ArrowUUpLeft, ArrowUUpRight, ClockCounterClockwise, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { VersionHistoryPanel } from './VersionHistoryPanel'

interface CmsToolbarProps {
  pageSlug: string
  onSave: () => Promise<void>
  onDiscard: () => void
}

export function CmsToolbar({ pageSlug, onSave, onDiscard }: CmsToolbarProps) {
  const { past, future, undo, redo } = useCmsStore()
  const [isSaving, setIsSaving] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  // Listen for Ctrl+Z / Cmd+Z globally if editingMode is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const handleSave = async () => {
    setIsSaving(true)
    await onSave()
    setIsSaving(false)
  }

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-[100] h-12 bg-navy border-b border-gold/20 shadow-xl flex items-center justify-between px-6 transition-all">
        <div className="flex items-center gap-4">
          <span className="text-gold font-mono text-xs font-bold uppercase tracking-widest border border-gold/30 px-2 py-1 bg-gold/10">
            Edit Mode
          </span>
          <div className="flex items-center gap-2 border-l border-gold/20 pl-4">
            <button
              onClick={undo}
              disabled={past.length === 0}
              className="p-1.5 text-text-secondary hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <ArrowUUpLeft size={18} />
            </button>
            <button
              onClick={redo}
              disabled={future.length === 0}
              className="p-1.5 text-text-secondary hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Redo (Ctrl+Shift+Z)"
            >
              <ArrowUUpRight size={18} />
            </button>
            <span className="text-[10px] font-mono text-text-muted ml-2">
              {past.length} changes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-secondary hover:text-gold transition-colors"
          >
            <ClockCounterClockwise size={16} />
            History
          </button>
          
          <button
            onClick={onDiscard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-danger hover:bg-danger/10 transition-colors"
          >
            <X size={16} />
            Discard
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving || past.length === 0}
            className={cn(
              "btn-gold px-4 py-1.5 text-xs flex items-center gap-2",
              isSaving && "opacity-70 cursor-wait"
            )}
          >
            <FloppyDisk size={16} />
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      {historyOpen && (
        <VersionHistoryPanel
          pageSlug={pageSlug}
          onClose={() => setHistoryOpen(false)}
        />
      )}
    </>
  )
}
