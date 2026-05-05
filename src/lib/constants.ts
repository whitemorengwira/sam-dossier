/**
 * SAM Dossier — Application Constants
 * British English throughout
 */

export const APP_NAME = 'SAM Dossier'
export const APP_DESCRIPTION = 'Socinga Africa Mining — Institutional-Grade Investment Dossier'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sam-dossier.vercel.app'
export const R2_BASE_URL = process.env.NEXT_PUBLIC_GLOBAL_R2_URL || 'https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev'

/** Gold market constants */
export const GOLD_PRICE_USD_PER_OZ = 3200
export const KG_TO_OZ = 32.1507
export const EXCHANGE_RATE_USD_ZAR = 18.20

/** Production targets */
export const CURRENT_OUTPUT_KG = 5
export const TARGET_OUTPUT_KG = 15
export const INVESTMENT_ZAR = 500_000_000
export const INVESTMENT_USD = 27_472_527

/** Company details */
export const COMPANY = {
  name: 'Socinga Africa Holdings',
  regNo: '2013/227290/07',
  fspNo: '46620',
  address: '24 Kemphaan Street, Florida Lake, Roodepoort, 1709, Johannesburg, South Africa',
  phone: '+27 87 153 5807',
  email: 'info@socinga.africa',
  website: 'https://www.socinga.africa',
} as const

/** Mine details */
export const CHIKONGA = {
  name: 'Chikonga Mine',
  location: 'Mutare, Manicaland Province',
  country: 'Zimbabwe',
  area: '45 hectares',
  claims: 4,
  established: 2005,
  owner: 'Hilltouch Investments',
  directors: ['Mr Lufeyi Shato', 'Mrs Joyce Kujenga'],
} as const

/** Status options for tasks */
export const TASK_STATUSES = [
  { value: 'not_started', label: 'Not Started', colour: '#6B7280' },
  { value: 'in_progress', label: 'In Progress', colour: '#3B82F6' },
  { value: 'review', label: 'Under Review', colour: '#F59E0B' },
  { value: 'done', label: 'Done', colour: '#22C55E' },
  { value: 'blocked', label: 'Blocked', colour: '#EF4444' },
] as const

/** Priority levels */
export const PRIORITIES = [
  { value: 'critical', label: 'Critical', colour: '#EF4444' },
  { value: 'high', label: 'High', colour: '#F59E0B' },
  { value: 'medium', label: 'Medium', colour: '#3B82F6' },
  { value: 'low', label: 'Low', colour: '#6B7280' },
] as const

/** Document categories */
export const DOC_CATEGORIES = [
  { value: 'legal', label: 'Legal' },
  { value: 'financial', label: 'Financial' },
  { value: 'geological', label: 'Geological' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'mandate', label: 'Mandate' },
] as const
