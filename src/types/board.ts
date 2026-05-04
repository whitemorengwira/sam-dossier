import type { SharedUser } from '@/types'

/* ── Board Types ──── */
export interface BoardColumn {
  id: string
  name: string
  type: 'status' | 'people' | 'date' | 'text' | 'longtext' | 'numbers' | 'dropdown' | 'checkbox' | 'tags' | 'timeline' | 'priority' | 'link' | 'email' | 'phone' | 'file' | 'rating' | 'formula' | 'autonumber' | 'created_by' | 'created_at' | 'last_updated_by' | 'last_updated_at'
  width?: number
  config?: Record<string, unknown>
}

export interface StatusLabel {
  id: string
  text: string
  colour: string
}

export interface BoardItem {
  id: string
  groupId: string
  name: string
  values: Record<string, unknown>
  subitems?: BoardItem[]
  position: number
}

export interface BoardGroup {
  id: string
  name: string
  colour: string
  collapsed: boolean
  items: BoardItem[]
}

export interface BoardView {
  id: string
  name: string
  type: 'table' | 'kanban' | 'timeline' | 'calendar' | 'chart' | 'form' | 'files' | 'workload'
}

export interface Board {
  id: string
  name: string
  description: string
  favourite: boolean
  columns: BoardColumn[]
  groups: BoardGroup[]
  views: BoardView[]
  statusLabels: StatusLabel[]
}
