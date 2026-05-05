'use client'

import React, { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCmsStore } from '@/lib/store/useCmsStore'
import { DotsSix, Trash, Copy, Plus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface EditableBlockProps {
  id: string
  children: React.ReactNode
}

export function EditableBlock({ id, children }: EditableBlockProps) {
  const { removeBlock, duplicateBlock, selectBlock, selectedBlockId } = useCmsStore()
  const [editingMode, setEditingMode] = useState(false)
  const isSelected = selectedBlockId === id

  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)

    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!editingMode) {
    return <div id={`block-${id}`}>{children}</div>
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this section?')) {
      removeBlock(id)
    }
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    duplicateBlock(id)
  }

  const handleAddBelow = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Dispatch event to open block picker modal with index
    window.dispatchEvent(new CustomEvent('sam-open-block-picker', { detail: { afterId: id } }))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectBlock(id)}
      className={cn(
        "relative group transition-all duration-200 outline outline-2 outline-transparent outline-offset-4 rounded-lg my-2",
        isDragging && "opacity-40 scale-[0.98] z-50",
        isSelected && "outline-gold/60 bg-gold/[0.02]",
        !isSelected && "hover:outline-gold/20"
      )}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "absolute -left-10 top-2 p-1.5 cursor-grab active:cursor-grabbing text-text-muted hover:text-gold hover:bg-gold/10 rounded transition-all opacity-0 group-hover:opacity-100",
          isSelected && "opacity-100"
        )}
      >
        <DotsSix size={20} weight="bold" />
      </div>

      {/* Top Right Controls */}
      <div className={cn(
        "absolute -right-2 -top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10",
        isSelected && "opacity-100"
      )}>
        <button
          onClick={handleDuplicate}
          className="p-1.5 bg-navy border border-gold/20 text-text-secondary hover:text-gold hover:bg-gold/10 rounded-sm shadow-lg transition-colors"
          title="Duplicate Section"
        >
          <Copy size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 bg-navy border border-danger/40 text-danger hover:bg-danger/20 rounded-sm shadow-lg transition-colors"
          title="Delete Section"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Actual Content */}
      <div className="relative pointer-events-none">
        {/* We disable pointer events on children in edit mode so they don't capture clicks meant for selecting the block,
            UNLESS we want inline editing to be clickable. We'll handle inline editing separately via context. */}
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>

      {/* Add Below Control */}
      <div className={cn(
        "absolute left-1/2 -bottom-4 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10",
        isSelected && "opacity-100"
      )}>
        <button
          onClick={handleAddBelow}
          className="flex items-center justify-center w-6 h-6 bg-navy border border-gold text-gold hover:bg-gold hover:text-navy rounded-full shadow-lg transition-all"
          title="Add Block Below"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>
    </div>
  )
}
