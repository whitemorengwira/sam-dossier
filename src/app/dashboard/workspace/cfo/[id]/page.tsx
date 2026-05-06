'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, DownloadSimple, FilePdf, CaretRight, FileText
} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import {
  getKnownCFODocs, loadLocalCFODocs,
  CFO_CATEGORY_META, CFO_STATUS_META, detectFormat,
  type CFODocument,
} from '@/lib/cfo-documents'
import { getDeletedDocIds } from '@/lib/deleted-docs'

const DocViewerWrapper = dynamic(() => import('@/components/documents/DocViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <p style={{ color: '#80868b', fontSize: 13, fontFamily: 'var(--font-mono)' }}>Loading Document Viewer...</p>
    </div>
  ),
})

export default function CFODocViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [doc, setDoc] = useState<CFODocument | null>(null)
  const [upNextDocs, setUpNextDocs] = useState<CFODocument[]>([])

  useEffect(() => {
    const all = [...loadLocalCFODocs(), ...getKnownCFODocs()]
    const deletedIds = getDeletedDocIds()
    const activeDocs = all.filter(d => !deletedIds.includes(d.id))

    const found = activeDocs.find(d => d.id === params.id)
    if (found) {
      setDoc(found)
      const others = activeDocs.filter(d => d.id !== params.id).slice(0, 3)
      setUpNextDocs(others)
    }
  }, [params.id])

  if (!doc) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Document not found.</p>
      </div>
    )
  }

  const catMeta = CFO_CATEGORY_META[doc.category] || CFO_CATEGORY_META.other
  const statusMeta = CFO_STATUS_META[doc.status] || CFO_STATUS_META['pending-approval']

  // Secure presigned URL via API route
  const secureUrl = `/api/received-docs/view?r2Key=${encodeURIComponent(doc.r2Key)}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      {/* Chrome bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'rgba(10,17,40,0.8)', borderBottom: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/dashboard/workspace/cfo')}
            style={{
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
              color: 'var(--gold)', padding: '6px 8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ color: '#c5221f', display: 'flex', alignItems: 'center' }}><FilePdf size={18} weight="duotone" /></span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {doc.title}
            </h2>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {doc.fileName} &bull; {new Date(doc.uploadedAt).toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Status badge */}
          <span style={{
            padding: '4px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            background: `${statusMeta.colour}15`, color: statusMeta.colour,
            border: `1px solid ${statusMeta.colour}30`,
          }}>
            {statusMeta.label}
          </span>
          {/* Category badge */}
          <span style={{
            padding: '4px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            background: `${catMeta.colour}15`, color: catMeta.colour,
            border: `1px solid ${catMeta.colour}30`,
          }}>
            {catMeta.label}
          </span>
          <a href={secureUrl} download target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
              color: 'var(--gold)', cursor: 'pointer', textDecoration: 'none',
            }}
          >
            <DownloadSimple size={14} /> Download
          </a>
        </div>
      </motion.div>

      {/* Viewer */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 0 75vh', background: '#E8EAED', overflow: 'hidden' }}>
        {doc.fileName.toLowerCase().endsWith('.pdf') ? (
          <iframe 
            src={`${secureUrl}#toolbar=1&navpanes=0&scrollbar=1&zoom=100`} 
            className="w-full h-full border-none bg-slate-900"
            style={{ width: '100%', height: '100%', border: 'none', flex: 1 }}
            title={doc.title}
          />
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <DocViewerWrapper uri={secureUrl} fileName={doc.fileName || doc.title} fileType={doc.fileName.split('.').pop()} />
          </div>
        )}
      </div>

      {/* Up Next Section */}
      {upNextDocs.length > 0 && (
        <div style={{ padding: '32px 24px', background: '#0A1128', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, 
            color: '#D4AF37', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 
          }}>
            Up Next
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {upNextDocs.map(nextDoc => {
              const nextFormat = detectFormat(nextDoc.fileName)
              return (
                <div 
                  key={nextDoc.id}
                  onClick={() => router.push(`/dashboard/workspace/cfo/${nextDoc.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px', background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 6, 
                    background: 'rgba(10,17,40,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: nextFormat === 'pdf' ? '#c5221f' : '#2196F3'
                  }}>
                    {nextFormat === 'pdf' ? <FilePdf size={24} weight="duotone" /> : <FileText size={24} weight="duotone" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {nextDoc.title}
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {nextDoc.fileName}
                    </p>
                  </div>
                  <CaretRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
