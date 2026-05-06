'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, DownloadSimple, FilePdf,
} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import {
  getKnownCFODocs, loadLocalCFODocs,
  CFO_CATEGORY_META, CFO_STATUS_META,
  type CFODocument,
} from '@/lib/cfo-documents'

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

  useEffect(() => {
    const all = [...loadLocalCFODocs(), ...getKnownCFODocs()]
    const found = all.find(d => d.id === params.id)
    if (found) setDoc(found)
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
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
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
      <div style={{ flex: 1, background: '#E8EAED', overflow: 'hidden' }}>
        <DocViewerWrapper uri={secureUrl} fileName={doc.fileName || doc.title} fileType="pdf" />
      </div>
    </div>
  )
}
