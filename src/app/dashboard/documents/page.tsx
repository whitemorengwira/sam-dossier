'use client'

import { useState, useEffect, useMemo } from 'react'
import { MagnifyingGlass, SquaresFour, List, CaretDown, Check } from '@phosphor-icons/react'
import { loadDocuments, saveDocuments, TEAM, TEMPLATES } from '@/lib/documents-data'
import type { GDocsDocument } from '@/types'
import DocumentCard from '@/components/documents/DocumentCard'
import TemplateGallery from '@/components/documents/TemplateGallery'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

const CATEGORIES = ['ALL','POLICY','LEGAL','MINUTES','STRATEGY','FINANCE','GEOLOGICAL','NDA','CORPORATE']

export default function DocumentsPage() {
  const router = useRouter()
  const [docs, setDocs] = useState<GDocsDocument[]>([])
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid'|'list'>('grid')
  const [sort, setSort] = useState<'modified'|'title'>('modified')
  const [owner, setOwner] = useState<'anyone'|'me'|'others'>('anyone')
  const [cat, setCat] = useState('ALL')
  const [showSort, setShowSort] = useState(false)
  const [showOwner, setShowOwner] = useState(false)

  useEffect(() => { setDocs(loadDocuments()) }, [])

  const toggleStar = (id: string) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, starred: !d.starred } : d)
      saveDocuments(next); return next
    })
  }

  const handleCreate = (tplId: string) => {
    const tpl = TEMPLATES.find(t => t.id === tplId)
    const newDoc: GDocsDocument = {
      id: `doc-${Date.now()}`, title: tpl?.title === 'Blank' ? 'Untitled Document' : tpl?.title || 'Untitled Document',
      content: tpl?.preview || '', category: 'corporate', owner: TEAM[0],
      lastModified: new Date().toISOString(), starred: false, shared: [TEAM[0]],
      comments: [], signatureStatus: 'none', isPublished: false,
    }
    const next = [newDoc, ...docs]
    setDocs(next); saveDocuments(next)
    router.push(`/dashboard/documents/${newDoc.id}`)
  }

  const filtered = useMemo(() => {
    let list = [...docs]
    if (search) { const q = search.toLowerCase(); list = list.filter(d => d.title.toLowerCase().includes(q)) }
    if (cat !== 'ALL') list = list.filter(d => d.category === cat.toLowerCase())
    if (owner === 'me') list = list.filter(d => d.owner.id === 'u1')
    if (owner === 'others') list = list.filter(d => d.owner.id !== 'u1')
    list.sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    return list
  }, [docs, search, cat, owner, sort])

  return (
    <div className={styles.page}>
      {/* Search */}
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <MagnifyingGlass size={18} className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Templates */}
      <div className={styles.templateSection}>
        <TemplateGallery onCreate={handleCreate} />
      </div>

      {/* Controls */}
      <div className={styles.controlsRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className={styles.sectionTitle}>Recent documents</span>
          <div className={styles.filterPills}>
            {CATEGORIES.map(c => (
              <button key={c} className={`${styles.filterPill} ${cat === c ? styles.active : ''}`} onClick={() => setCat(c)}>
                {c.charAt(0) + c.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          {/* Owner dropdown */}
          <div className={styles.selectWrapper}>
            <button className={styles.selectBtn} onClick={() => { setShowOwner(!showOwner); setShowSort(false) }}>
              Owned by {owner === 'anyone' ? 'anyone' : owner === 'me' ? 'me' : 'others'} <CaretDown size={12} />
            </button>
            {showOwner && (
              <div className={styles.dropdown}>
                {(['anyone','me','others'] as const).map(o => (
                  <div key={o} className={`${styles.dropdownItem} ${owner === o ? styles.active : ''}`} onClick={() => { setOwner(o); setShowOwner(false) }}>
                    <span className={styles.checkmark}>{owner === o && <Check size={14} />}</span>
                    {o === 'anyone' ? 'Anyone' : o === 'me' ? 'Owned by me' : 'Not owned by me'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort dropdown */}
          <div className={styles.selectWrapper}>
            <button className={styles.selectBtn} onClick={() => { setShowSort(!showSort); setShowOwner(false) }}>
              {sort === 'modified' ? 'Last modified' : 'Title'} <CaretDown size={12} />
            </button>
            {showSort && (
              <div className={styles.dropdown}>
                {([['modified','Last modified'],['title','Title']] as const).map(([k,l]) => (
                  <div key={k} className={`${styles.dropdownItem} ${sort === k ? styles.active : ''}`} onClick={() => { setSort(k as 'modified'|'title'); setShowSort(false) }}>
                    <span className={styles.checkmark}>{sort === k && <Check size={14} />}</span>{l}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* View toggle */}
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${view === 'grid' ? styles.active : ''}`} onClick={() => setView('grid')}><SquaresFour size={16} /></button>
            <button className={`${styles.viewBtn} ${view === 'list' ? styles.active : ''}`} onClick={() => setView('list')}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Document Grid or List */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <div className={styles.emptyTitle}>No documents found</div>
          <div className={styles.emptyText}>Try adjusting your search or filters</div>
        </div>
      ) : view === 'grid' ? (
        <div className={styles.documentGrid}>
          {filtered.map(d => <DocumentCard key={d.id} doc={d} mode="grid" onStar={toggleStar} onMenuOpen={() => {}} />)}
        </div>
      ) : (
        <div className={styles.documentList}>
          <div className={styles.listHeader}>
            <div /><div className={styles.listHeaderCell}>Name</div>
            <div className={styles.listHeaderCell}>Owner</div><div className={styles.listHeaderCell}>Last modified</div><div />
          </div>
          {filtered.map(d => <DocumentCard key={d.id} doc={d} mode="list" onStar={toggleStar} onMenuOpen={() => {}} />)}
        </div>
      )}

      {/* ── FAB — New Document ──── */}
      <button
        onClick={() => handleCreate('tpl-blank')}
        style={{
          position: 'fixed', bottom: 32, right: 32, width: 56, height: 56,
          borderRadius: '50%', background: '#1a73e8', color: '#fff', border: 'none',
          fontSize: 28, fontWeight: 300, cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,115,232,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease', zIndex: 50,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(26,115,232,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,115,232,0.4)' }}
        title="Create new document"
        aria-label="Create new document"
      >
        +
      </button>
    </div>
  )
}
