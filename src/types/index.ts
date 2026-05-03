/**
 * SAM Dossier — TypeScript Type Definitions
 */

export interface Profile {
  id: string
  full_name: string | null
  role: 'admin' | 'team' | 'investor' | 'viewer'
  title: string | null
  avatar_url: string | null
  department: string | null
  created_at: string
}

export interface Document {
  id: string
  title: string
  category: 'legal' | 'financial' | 'geological' | 'minutes' | 'mandate'
  file_url: string | null
  html_content: string | null
  status: 'draft' | 'pending_signature' | 'signed' | 'approved'
  requires_signature: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Signature {
  id: string
  document_id: string
  signer_id: string
  signer_name: string
  signer_email: string
  signer_title: string
  signature_data: string
  signed_at: string
  ip_address: string | null
}

export interface Task {
  id: string
  board_id: string
  title: string
  description: string | null
  status: 'not_started' | 'in_progress' | 'review' | 'done' | 'blocked'
  priority: 'critical' | 'high' | 'medium' | 'low'
  assignee_id: string | null
  due_date: string | null
  tags: string[]
  position: number
  group_name: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  entity_type: 'task' | 'document'
  entity_id: string
  author_id: string
  content: string
  created_at: string
}

export interface Spreadsheet {
  id: string
  title: string
  category: 'budget' | 'cashflow' | 'ore-grades' | 'expenses'
  data: unknown
  columns: unknown
  created_by: string | null
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'task' | 'signature' | 'comment' | 'alert'
  read: boolean
  link: string | null
  created_at: string
}

export interface MineSimulation {
  id: string
  phase: 'pre-production' | 'production' | 'post-production'
  current_output_kg: number
  target_output_kg: number
  month_label: string
  cumulative_revenue_usd: number
  headcount: number
  equipment_status: unknown
  updated_at: string
}

/** Navigation item for sidebar */
export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

/** Team member for executive profiles */
export interface TeamMember {
  name: string
  title: string
  department: string
  bio: string
  imageUrl: string
}
