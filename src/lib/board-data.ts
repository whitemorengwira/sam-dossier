import type { Board, BoardColumn, BoardGroup, BoardItem, StatusLabel, BoardView } from '@/types/board'
import { TEAM } from './documents-data'

/* ── Default Status Labels ──── */
export const DEFAULT_STATUSES: StatusLabel[] = [
  { id: 'st-1', text: 'Not Started', colour: '#c4c4c4' },
  { id: 'st-2', text: 'Working on it', colour: '#fdab3d' },
  { id: 'st-3', text: 'Done', colour: '#00c875' },
  { id: 'st-4', text: 'Stuck', colour: '#e2445c' },
  { id: 'st-5', text: 'In Review', colour: '#0086c0' },
]

export const PRIORITY_LABELS: StatusLabel[] = [
  { id: 'pr-1', text: 'Critical', colour: '#333333' },
  { id: 'pr-2', text: 'High', colour: '#e2445c' },
  { id: 'pr-3', text: 'Medium', colour: '#fdab3d' },
  { id: 'pr-4', text: 'Low', colour: '#579bfc' },
]

/* ── Default Columns ──── */
const DEFAULT_COLUMNS: BoardColumn[] = [
  { id: 'col-status', name: 'Status', type: 'status', width: 140 },
  { id: 'col-people', name: 'Assignee', type: 'people', width: 120 },
  { id: 'col-date', name: 'Due Date', type: 'date', width: 120 },
  { id: 'col-priority', name: 'Priority', type: 'priority', width: 120 },
  { id: 'col-text', name: 'Notes', type: 'text', width: 200 },
  { id: 'col-timeline', name: 'Timeline', type: 'timeline', width: 160 },
]

/* ── Sample Board Data ──── */
export const SAMPLE_BOARD: Board = {
  id: 'board-1',
  name: 'SAM Dossier — Project Tracker',
  description: 'Main project board for Socinga Africa Mining investment operations',
  favourite: true,
  columns: DEFAULT_COLUMNS,
  statusLabels: DEFAULT_STATUSES,
  views: [
    { id: 'v-table', name: 'Main Table', type: 'table' },
    { id: 'v-kanban', name: 'Kanban', type: 'kanban' },
    { id: 'v-timeline', name: 'Timeline', type: 'timeline' },
    { id: 'v-calendar', name: 'Calendar', type: 'calendar' },
    { id: 'v-chart', name: 'Chart', type: 'chart' },
  ],
  groups: [
    {
      id: 'grp-1', name: 'Pre-Production', colour: '#0086c0', collapsed: false,
      items: [
        { id: 'item-1', groupId: 'grp-1', name: 'Complete geological survey report', position: 0, values: { 'col-status': 'st-3', 'col-people': ['u2'], 'col-date': '2026-04-15', 'col-priority': 'pr-2', 'col-text': 'Mengxi prospect survey complete' } },
        { id: 'item-2', groupId: 'grp-1', name: 'Secure mining licence renewal', position: 1, values: { 'col-status': 'st-2', 'col-people': ['u1', 'u3'], 'col-date': '2026-05-30', 'col-priority': 'pr-1', 'col-text': 'Awaiting ZMDC approval' } },
        { id: 'item-3', groupId: 'grp-1', name: 'Equipment procurement — CIP plant', position: 2, values: { 'col-status': 'st-2', 'col-people': ['u4'], 'col-date': '2026-06-15', 'col-priority': 'pr-2', 'col-text': 'Vendor quotes received' } },
        { id: 'item-4', groupId: 'grp-1', name: 'Finalise investor MoU — Zedek Mining', position: 3, values: { 'col-status': 'st-3', 'col-people': ['u1'], 'col-date': '2026-01-12', 'col-priority': 'pr-1', 'col-text': 'Signed' } },
      ],
    },
    {
      id: 'grp-2', name: 'Operations', colour: '#00c875', collapsed: false,
      items: [
        { id: 'item-5', groupId: 'grp-2', name: 'Monthly gold production reporting', position: 0, values: { 'col-status': 'st-2', 'col-people': ['u2'], 'col-date': '2026-05-05', 'col-priority': 'pr-3', 'col-text': 'April figures pending' } },
        { id: 'item-6', groupId: 'grp-2', name: 'Health & safety audit — Q2', position: 1, values: { 'col-status': 'st-1', 'col-people': ['u3'], 'col-date': '2026-06-01', 'col-priority': 'pr-2' } },
        { id: 'item-7', groupId: 'grp-2', name: 'Off-take agreement — Chrome buyer', position: 2, values: { 'col-status': 'st-4', 'col-people': ['u1', 'u4'], 'col-date': '2026-05-20', 'col-priority': 'pr-1', 'col-text': 'Price negotiation stalled' } },
      ],
    },
    {
      id: 'grp-3', name: 'Legal & Compliance', colour: '#e2445c', collapsed: false,
      items: [
        { id: 'item-8', groupId: 'grp-3', name: 'Draft NDA for Antimony supplier', position: 0, values: { 'col-status': 'st-3', 'col-people': ['u2'], 'col-date': '2026-04-01', 'col-priority': 'pr-3', 'col-text': 'Completed and signed' } },
        { id: 'item-9', groupId: 'grp-3', name: 'ESG compliance framework', position: 1, values: { 'col-status': 'st-1', 'col-people': ['u3'], 'col-date': '2026-07-01', 'col-priority': 'pr-3' } },
        { id: 'item-10', groupId: 'grp-3', name: 'Policy documents digitisation', position: 2, values: { 'col-status': 'st-2', 'col-people': ['u1'], 'col-date': '2026-05-15', 'col-priority': 'pr-2', 'col-text': 'Uploaded to SAM Dossier' } },
      ],
    },
  ],
}

/* ── Persistence ──── */
const BOARD_KEY = 'sam-dossier-boards-v1'

export function loadBoard(): Board {
  if (typeof window === 'undefined') return SAMPLE_BOARD
  try {
    const saved = localStorage.getItem(BOARD_KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return SAMPLE_BOARD
}

export function saveBoard(board: Board) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(BOARD_KEY, JSON.stringify(board)) } catch { /* ignore */ }
}

export function getStatusLabel(board: Board, id: unknown): StatusLabel | undefined {
  return board.statusLabels.find(s => s.id === id)
}

export function getPriorityLabel(id: unknown): StatusLabel | undefined {
  return PRIORITY_LABELS.find(p => p.id === id)
}

export function getTeamMember(id: string) {
  return TEAM.find(t => t.id === id)
}
