'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, FileText, FilePdf, PencilLine, Clock, MagnifyingGlass, FunnelSimple, DownloadSimple, Eye } from '@phosphor-icons/react'

type DocStatus = 'signed' | 'pending_signature' | 'draft' | 'final'

interface Document {
  id: string; name: string; category: string; status: DocStatus
  uploadedBy: string; date: string; size: string
}

const statusConfig: Record<DocStatus, { label: string; cls: string }> = {
  signed: { label: 'Signed', cls: 'badge-success' },
  pending_signature: { label: 'Pending Signature', cls: 'badge-warning' },
  draft: { label: 'Draft', cls: 'badge-info' },
  final: { label: 'Final', cls: 'badge-gold' },
}

const documents: Document[] = [
  { id: '1', name: 'Shareholder Agreement - Chikonga Mine', category: 'Legal', status: 'pending_signature', uploadedBy: 'Olwethu Mlokoti', date: '2 May 2026', size: '2.4 MB' },
  { id: '2', name: 'Investment Term Sheet - R500M', category: 'Finance', status: 'pending_signature', uploadedBy: 'Michael Dotsey', date: '1 May 2026', size: '890 KB' },
  { id: '3', name: 'Non-Disclosure Agreement (NDA)', category: 'Legal', status: 'signed', uploadedBy: 'Olwethu Mlokoti', date: '28 Apr 2026', size: '340 KB' },
  { id: '4', name: 'Chikonga Mine Geological Report', category: 'Geology', status: 'final', uploadedBy: 'Shingirai Muyenda', date: '25 Apr 2026', size: '5.3 MB' },
  { id: '5', name: 'Mining Pitch Deck 2026', category: 'Sales', status: 'final', uploadedBy: 'Jabulile Dladla', date: '20 Apr 2026', size: '12.1 MB' },
  { id: '6', name: 'SOCINGA Strategic Operations Policy', category: 'Governance', status: 'final', uploadedBy: 'Jabulile Dladla', date: '30 Apr 2026', size: '40 KB' },
  { id: '7', name: 'Financial Policy Framework', category: 'Finance', status: 'final', uploadedBy: 'Michael Dotsey', date: '30 Apr 2026', size: '16 KB' },
  { id: '8', name: 'ZEDEK Mining MoU', category: 'Legal', status: 'signed', uploadedBy: 'Shingirai Muyenda', date: '15 Apr 2026', size: '14.1 MB' },
  { id: '9', name: 'ARES Antimony Letter of Intent', category: 'Sales', status: 'signed', uploadedBy: 'Shingirai Muyenda', date: '9 Dec 2025', size: '184 KB' },
  { id: '10', name: 'Ecosystem Organogram', category: 'Governance', status: 'final', uploadedBy: 'Jabulile Dladla', date: '28 Apr 2026', size: '186 KB' },
  { id: '11', name: 'Company Establishment Policy', category: 'Governance', status: 'draft', uploadedBy: 'Jabulile Dladla', date: '28 Apr 2026', size: '22 KB' },
  { id: '12', name: 'Budget Meeting Minutes - 2 May 2026', category: 'Finance', status: 'final', uploadedBy: 'Michael Dotsey', date: '2 May 2026', size: '584 KB' },
]

const categories = ['All', 'Legal', 'Finance', 'Geology', 'Sales', 'Governance']

export default function DocumentsPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = documents.filter(d => {
    if (filter !== 'All' && d.category !== filter) return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const pendingCount = documents.filter(d => d.status === 'pending_signature').length

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gold font-display font-black text-2xl mb-1">Document Vault</h1>
            <p className="text-text-muted text-sm">{documents.length} documents | {pendingCount} pending signature</p>
          </div>
          <button className="btn-gold px-4 py-2 text-sm flex items-center gap-2">
            <Folder size={16} weight="duotone" /> Upload Document
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-9 w-full text-sm" />
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 text-xs font-mono transition-colors ${filter === cat ? 'bg-gold/20 text-gold border border-gold/40' : 'text-text-muted border border-gold/10 hover:border-gold/25'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="glass-card p-4 flex items-center gap-4 group hover:border-gold/40 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shrink-0">
              <FilePdf size={20} weight="duotone" className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-text-primary text-sm font-body font-medium truncate">{doc.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-text-muted text-[10px] font-mono">{doc.category}</span>
                <span className="text-text-muted text-[10px]">|</span>
                <span className="text-text-muted text-[10px] font-mono">{doc.uploadedBy}</span>
                <span className="text-text-muted text-[10px]">|</span>
                <span className="text-text-muted text-[10px] font-mono">{doc.date}</span>
              </div>
            </div>
            <span className={`badge text-[9px] shrink-0 ${statusConfig[doc.status].cls}`}>{statusConfig[doc.status].label}</span>
            <span className="text-text-muted text-[10px] font-mono w-16 text-right shrink-0">{doc.size}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button className="p-1.5 text-text-muted hover:text-gold transition-colors"><Eye size={14} /></button>
              <button className="p-1.5 text-text-muted hover:text-gold transition-colors"><DownloadSimple size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
