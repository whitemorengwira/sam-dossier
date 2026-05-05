'use client'

import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useCmsStore } from '@/lib/store/useCmsStore'

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const { blocks, setBlocks, reorderBlocks } = useCmsStore()
  const [isClient, setIsClient] = useState(false)
  const [editingMode, setEditingMode] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)

    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)
      reorderBlocks(oldIndex, newIndex)
    }
  }

  if (!isClient) return <>{children}</>

  if (!editingMode) {
    return <>{children}</>
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="cms-provider-wrapper relative pb-32">
          {children}
        </div>
      </SortableContext>
    </DndContext>
  )
}
