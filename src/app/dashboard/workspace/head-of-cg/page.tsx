'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MagnifyingGlass, Plus, ShieldCheck, Crown } from '@phosphor-icons/react'
import { loadDocuments, saveDocuments, TEAM } from '@/lib/documents-data'
import type { GDocsDocument } from '@/types'
import DocumentCard from '@/components/documents/DocumentCard'
import { toast } from 'sonner'
import styles from '../../documents/page.module.css'

export default function HeadOfCGPage() {
  const router = useRouter()
  const [docs, setDocs] = useState<GDocsDocument[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Only load CG documents
    setDocs(loadDocuments().filter(d => d.category === 'corporate-governance'))
  }, [])

  const toggleStar = (id: string) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, starred: !d.starred } : d)
      // Save back to full store
      const allDocs = loadDocuments()
      const updatedAll = allDocs.map(d => next.find(n => n.id === d.id) || d)
      saveDocuments(updatedAll)
      return next
    })
  }

  const handleRename = (id: string, newTitle: string) => {
    setDocs(prev => {
      const next = prev.map(d => d.id === id ? { ...d, title: newTitle } : d)
      const allDocs = loadDocuments()
      const updatedAll = allDocs.map(d => next.find(n => n.id === d.id) || d)
      saveDocuments(updatedAll)
      return next
    })
  }

  const handleDelete = (id: string) => {
    setDocs(prev => {
      const docToDelete = prev.find(d => d.id === id)
      const next = prev.filter(d => d.id !== id)
      const allDocs = loadDocuments().filter(d => d.id !== id)
      saveDocuments(allDocs)
      
      if (docToDelete) {
        toast(`Document "${docToDelete.title}" moved to trash`, {
          action: {
            label: 'Undo',
            onClick: () => {
              setDocs(current => [docToDelete, ...current])
              saveDocuments([docToDelete, ...allDocs])
              toast.success(`Restored "${docToDelete.title}"`)
            }
          }
        })
      }
      return next
    })
  }

  const handleDownload = (id: string) => {
    const docToDownload = docs.find(d => d.id === id)
    if (!docToDownload) return
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = docToDownload.content
    const plainText = tempDiv.textContent || tempDiv.innerText || ''
    const blob = new Blob([plainText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${docToDownload.title}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${docToDownload.title}.txt`)
  }

  const handleCreate = () => {
    const newDoc: GDocsDocument = {
      id: `doc-${Date.now()}`, title: 'Untitled Corporate Governance Document',
      content: '<h1>Corporate Governance</h1><p>Start writing here...</p>', category: 'corporate-governance', owner: TEAM[0],
      lastModified: new Date().toISOString(), starred: false, shared: [TEAM[0]],
      comments: [], signatureStatus: 'none', isPublished: false,
    }
    const allDocs = loadDocuments()
    saveDocuments([newDoc, ...allDocs])
    setDocs([newDoc, ...docs])
    router.push(`/dashboard/documents/${newDoc.id}`)
  }

  const filtered = useMemo(() => {
    if (!search) return docs
    const q = search.toLowerCase()
    return docs.filter(d => d.title.toLowerCase().includes(q))
  }, [docs, search])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{
            padding: '3px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: "var(--font-mono)", textTransform: 'uppercase',
            letterSpacing: '0.5px', background: 'rgba(212,175,55,0.15)',
            color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)',
          }}>Head of CG</span>
          <span style={{
            padding: '3px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: "var(--font-mono)", textTransform: 'uppercase',
            background: 'rgba(156,39,176,0.15)', color: '#9C27B0',
            border: '1px solid rgba(156,39,176,0.3)',
          }}>Corporate Governance</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900,
          color: '#D4AF37', marginBottom: 6, letterSpacing: '-0.5px',
        }}>
          Head of Corporate Governance
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15, color: 'rgba(245,240,232,0.6)',
          maxWidth: 640, lineHeight: 1.6,
        }}>
          Manage, edit, and finalise core corporate governance frameworks, board evaluations, and policy documents.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(10,17,40,0.5)',
            border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <ShieldCheck size={24} weight="duotone" style={{ color: '#D4AF37' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5F0E8', fontFamily: 'var(--font-display)' }}>{docs.length}</div>
              <div style={{ fontSize: 9, color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CG Documents</div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)', marginTop: 20 }} />
      </motion.div>

      {/* Controls */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)',
          padding: '8px 14px', flex: '1 1 300px', maxWidth: 420,
        }}>
          <MagnifyingGlass size={16} style={{ color: '#D4AF37' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search governance documents..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 13, width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        <button onClick={handleCreate}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', fontSize: 12, fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            background: 'linear-gradient(135deg, var(--gold), #c4a030)',
            border: 'none', color: '#0A1128', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Plus size={14} weight="bold" /> New CG Document
        </button>
      </motion.div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map(doc => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            mode="grid"
            onStar={toggleStar}
            onRename={handleRename}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '64px 20px', textAlign: 'center', background: 'rgba(10,17,40,0.4)', border: '1px solid rgba(212,175,55,0.12)' }}>
          <ShieldCheck size={36} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: 8 }} />
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No corporate governance documents found.</p>
        </div>
      )}
    </div>
  )
}
