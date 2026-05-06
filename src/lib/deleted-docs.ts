const DELETED_DOCS_KEY = 'sam-dossier-deleted-docs'

export function getDeletedDocIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(DELETED_DOCS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function markDocAsDeleted(id: string) {
  if (typeof window === 'undefined') return
  const existing = getDeletedDocIds()
  if (!existing.includes(id)) {
    existing.push(id)
    localStorage.setItem(DELETED_DOCS_KEY, JSON.stringify(existing))
  }
}

export function restoreDeletedDoc(id: string) {
  if (typeof window === 'undefined') return
  const existing = getDeletedDocIds()
  const next = existing.filter(existingId => existingId !== id)
  localStorage.setItem(DELETED_DOCS_KEY, JSON.stringify(next))
}
