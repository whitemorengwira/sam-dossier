'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  MagnifyingGlass,
  FileText,
  Scales,
  Buildings,
  CurrencyCircleDollar,
  Users,
  Leaf,
  ArrowRight,
  Mountains,
  ChartLine,
  PenNib,
  CheckCircle,
} from '@phosphor-icons/react'
import { VALIDATED_DOCUMENTS } from '@/lib/validated-documents'
import { loadFinalisedDocuments } from '@/lib/documents-data'
import type { GDocsDocument } from '@/types'

const CATEGORY_META: Record<string, { colour: string; icon: React.ReactNode }> = {
  corporate: { colour: '#D4AF37', icon: <Buildings size={18} weight="duotone" /> },
  legal: { colour: '#e8710a', icon: <Scales size={18} weight="duotone" /> },
  finance: { colour: '#1a73e8', icon: <CurrencyCircleDollar size={18} weight="duotone" /> },
  governance: { colour: '#9334e6', icon: <ShieldCheck size={18} weight="duotone" /> },
  compliance: { colour: '#137333', icon: <Leaf size={18} weight="duotone" /> },
  hr: { colour: '#c5221f', icon: <Users size={18} weight="duotone" /> },
  strategy: { colour: '#ff6f00', icon: <ChartLine size={18} weight="duotone" /> },
  geological: { colour: '#795548', icon: <Mountains size={18} weight="duotone" /> },
}

const CATEGORIES = ['ALL', 'GOVERNANCE', 'LEGAL', 'FINANCE', 'STRATEGY', 'GEOLOGICAL', 'CORPORATE', 'COMPLIANCE', 'HR']

export default function ValidatedDocumentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('ALL')
  const [finalisedDocs, setFinalisedDocs] = useState<GDocsDocument[]>([])

  useEffect(() => {
    setFinalisedDocs(loadFinalisedDocuments())
  }, [])

  // Merge master docs + finalised docs from the vault
  const allDocs = useMemo(() => {
    const masterItems = VALIDATED_DOCUMENTS.map(d => ({
      id: d.id, title: d.title, category: d.category,
      description: d.description, signatureStatus: d.signatureStatus,
      source: 'master' as const,
    }))
    const finItems = finalisedDocs.map(d => ({
      id: d.id, title: d.title, category: d.category || 'corporate',
      description: `Finalised from Document Vault on ${new Date(d.lastModified).toLocaleDateString('en-GB')}`,
      signatureStatus: d.signatureStatus as string,
      source: 'finalised' as const,
    }))
    return [...finItems, ...masterItems]
  }, [finalisedDocs])

  const filtered = useMemo(() => {
    let list = [...allDocs]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(d => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
    }
    if (cat !== 'ALL') {
      list = list.filter(d => d.category === cat.toLowerCase())
    }
    return list
  }, [search, cat, allDocs])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span className="badge badge-gold">Validated Documents</span>
          <span className="badge badge-success">Approved</span>
        </div>
        <h1 className="text-gold font-display font-black" style={{ fontSize: 32, marginBottom: 6 }}>
          Validated Documents Vault
        </h1>
        <p className="text-text-secondary" style={{ fontSize: 15, maxWidth: 600 }}>
          Master corporate documents approved by Socinga Africa. Each document can be opened,
          edited inline, digitally signed, and exported as PDF, Word, or HTML.
        </p>
        <hr className="divider-gold" style={{ marginTop: 20 }} />
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,17,40,0.6)', border: '1px solid rgba(212,175,55,0.2)',
          padding: '8px 14px', flex: '1 1 300px', maxWidth: 400,
        }}>
          <MagnifyingGlass size={16} className="text-gold" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search validated documents..."
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: 13, width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '5px 12px', fontSize: 11, fontWeight: 600,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: cat === c ? 'rgba(212,175,55,0.15)' : 'transparent',
                color: cat === c ? 'var(--gold)' : 'var(--text-muted)',
                border: `1px solid ${cat === c ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {c.charAt(0) + c.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Document Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 16,
      }}>
        {filtered.map((doc, i) => {
          const meta = CATEGORY_META[doc.category] || CATEGORY_META.corporate
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              onClick={() => router.push(`/dashboard/validated-documents/${doc.id}`)}
              className="glass-card group"
              style={{
                cursor: 'pointer',
                transition: 'border-color 0.25s, box-shadow 0.25s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${meta.colour}50`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.12)'
              }}
            >
              {/* Category accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${meta.colour}, transparent)`,
                opacity: 0.6,
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  padding: 10,
                  background: `${meta.colour}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: meta.colour }}>{meta.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 className="text-text-primary font-body" style={{
                    fontWeight: 600, fontSize: 14, marginBottom: 4,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {doc.title}
                  </h4>
                  <p className="text-text-muted" style={{
                    fontSize: 11, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {doc.description}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginTop: 10,
                  }}>
                    <span style={{
                      padding: '2px 8px', fontSize: 9, fontWeight: 700,
                      fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      background: `${meta.colour}15`, color: meta.colour,
                      border: `1px solid ${meta.colour}30`,
                    }}>
                      {doc.category}
                    </span>
                    <span className="text-text-muted" style={{ fontSize: 9, fontFamily: 'var(--font-mono)' }}>
                      <ShieldCheck size={10} weight="fill" style={{ display: 'inline', marginRight: 3, color: '#137333' }} />
                      Validated
                    </span>
                    {doc.signatureStatus === 'pending' && (
                      <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <PenNib size={10} weight="fill" /> Awaiting Signature
                      </span>
                    )}
                    {doc.signatureStatus === 'signed' && (
                      <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#137333', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <CheckCircle size={10} weight="fill" /> Signed
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-text-muted"
                  style={{ flexShrink: 0, marginTop: 4, transition: 'all 0.3s' }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <FileText size={48} className="text-text-muted" style={{ opacity: 0.3, marginBottom: 12 }} />
          <p className="text-text-muted" style={{ fontSize: 14 }}>No matching documents found.</p>
        </div>
      )}
    </div>
  )
}
