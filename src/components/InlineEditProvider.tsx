'use client'

import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'sam-dossier-edits'

function loadEdits(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch { return {} }
}

function saveEdits(edits: Record<string, string>) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(edits)) } catch { /* ignore */ }
}

/**
 * InlineEditProvider
 * 
 * When the Topbar "Edit" button is toggled, this component
 * makes ALL text elements on the dashboard editable by adding
 * contentEditable to headings, paragraphs, spans, td, th, li, label, etc.
 * 
 * Changes are auto-saved to localStorage keyed by a stable path.
 * When edit mode is off, the edits persist visually.
 */
export default function InlineEditProvider() {
  const [editMode, setEditMode] = useState(false)

  // Listen for the custom event from the Topbar
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setEditMode(detail.enabled)
    }
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  // Apply saved edits on mount
  useEffect(() => {
    const edits = loadEdits()
    Object.entries(edits).forEach(([key, value]) => {
      const el = document.querySelector(`[data-edit-key="${key}"]`) as HTMLElement
      if (el) el.textContent = value
    })
  }, [])

  // Toggle contentEditable on all text elements in the main content area
  const applyEditability = useCallback((enable: boolean) => {
    const mainContent = document.querySelector('main')
    if (!mainContent) return

    const EDITABLE_TAGS = ['H1','H2','H3','H4','H5','H6','P','SPAN','TD','TH','LI','LABEL','A','STRONG','EM','B','I','SMALL','DT','DD','FIGCAPTION','BLOCKQUOTE','CAPTION']
    
    const elements = mainContent.querySelectorAll(EDITABLE_TAGS.join(','))
    
    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement
      
      // Skip if it's an interactive element
      if (htmlEl.closest('button') || htmlEl.closest('input') || htmlEl.closest('select') || htmlEl.closest('textarea')) return
      // Skip if it already has contentEditable set explicitly to false
      if (htmlEl.getAttribute('data-no-edit') === 'true') return
      
      if (enable) {
        // Generate a stable key from text content + tag + index
        const key = htmlEl.getAttribute('data-edit-key') || `${htmlEl.tagName}-${index}-${(htmlEl.textContent || '').slice(0, 20).replace(/\s+/g, '_')}`
        htmlEl.setAttribute('data-edit-key', key)
        htmlEl.contentEditable = 'true'
        htmlEl.style.outline = 'none'
        htmlEl.style.cursor = 'text'
        
        // Visual hint
        htmlEl.style.boxShadow = '0 0 0 1px rgba(212, 175, 55, 0.15)'
        htmlEl.style.borderRadius = '2px'
        htmlEl.style.transition = 'box-shadow 0.2s ease'
        
        // On hover, show stronger outline
        htmlEl.addEventListener('mouseenter', handleHoverIn)
        htmlEl.addEventListener('mouseleave', handleHoverOut)
        htmlEl.addEventListener('blur', handleBlur)
        htmlEl.addEventListener('focus', handleFocus)
      } else {
        htmlEl.contentEditable = 'false'
        htmlEl.style.cursor = ''
        htmlEl.style.boxShadow = ''
        htmlEl.style.borderRadius = ''
        htmlEl.removeEventListener('mouseenter', handleHoverIn)
        htmlEl.removeEventListener('mouseleave', handleHoverOut)
        htmlEl.removeEventListener('blur', handleBlur)
        htmlEl.removeEventListener('focus', handleFocus)
      }
    })
  }, [])

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => applyEditability(editMode), 100)
    return () => clearTimeout(timeout)
  }, [editMode, applyEditability])

  // Also re-apply when route changes (new content loads)
  useEffect(() => {
    if (!editMode) return
    const observer = new MutationObserver(() => {
      applyEditability(true)
    })
    const main = document.querySelector('main')
    if (main) {
      observer.observe(main, { childList: true, subtree: true })
    }
    return () => observer.disconnect()
  }, [editMode, applyEditability])

  return null // This is a headless provider
}

function handleHoverIn(this: HTMLElement) {
  if (this.contentEditable === 'true') {
    this.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.4)'
  }
}

function handleHoverOut(this: HTMLElement) {
  if (this.contentEditable === 'true' && document.activeElement !== this) {
    this.style.boxShadow = '0 0 0 1px rgba(212, 175, 55, 0.15)'
  }
}

function handleFocus(this: HTMLElement) {
  this.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.6)'
}

function handleBlur(this: HTMLElement) {
  this.style.boxShadow = '0 0 0 1px rgba(212, 175, 55, 0.15)'
  // Save the edit
  const key = this.getAttribute('data-edit-key')
  if (key && this.textContent) {
    const edits = loadEdits()
    edits[key] = this.textContent
    saveEdits(edits)
  }
}
