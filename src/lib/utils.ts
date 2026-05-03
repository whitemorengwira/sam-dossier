import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility: merge Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency (ZAR or USD)
 */
export function formatCurrency(value: number, currency: 'ZAR' | 'USD' = 'ZAR'): string {
  const prefix = currency === 'ZAR' ? 'R' : '$'
  return `${prefix}${value.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('en-ZA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format a weight in KG
 */
export function formatKg(value: number): string {
  return `${value.toFixed(1)} KG`
}

/**
 * Convert KG of gold to troy ounces
 */
export function kgToOz(kg: number): number {
  return kg * 32.1507
}

/**
 * Calculate gold revenue from KG output
 */
export function calculateGoldRevenue(kgPerMonth: number, pricePerOzUsd: number): { usd: number; zar: number } {
  const ozPerMonth = kgToOz(kgPerMonth)
  const usd = ozPerMonth * pricePerOzUsd
  const zar = usd * 18.20 // Exchange rate assumption
  return { usd, zar }
}

/**
 * Truncate text to a given length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '…'
}

/**
 * Generate initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }) as T
}
