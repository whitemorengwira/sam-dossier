'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, DownloadSimple, ArrowSquareOut, FilePdf, FileHtml,
  MicrosoftWordLogo, MicrosoftPowerpointLogo, Table, Image as ImageIcon,
  File, LinkSimple,
} from '@phosphor-icons/react'
import {
  getKnownReceivedDocs, loadLocalReceivedDocs, getViewerUrl,
  type ReceivedDoc,
} from '@/lib/received-documents'

const FORMAT_META: Record<string, { colour: string; icon: React.ReactNode; label: string }> = {
  pdf:   { colour: '#c5221f', icon: <FilePdf size={18} weight="duotone" />, label: 'PDF' },
  html:  { colour: '#e8710a', icon: <FileHtml size={18} weight="duotone" />, label: 'HTML' },
  docx:  { colour: '#1a73e8', icon: <MicrosoftWordLogo size={18} weight="duotone" />, label: 'Word' },
  pptx:  { colour: '#d14524', icon: <MicrosoftPowerpointLogo size={18} weight="duotone" />, label: 'PowerPoint' },
  xlsx:  { colour: '#137333', icon: <Table size={18} weight="duotone" />, label: 'Excel' },
  image: { colour: '#9334e6', icon: <ImageIcon size={18} weight="duotone" />, label: 'Image' },
  link:  { colour: '#D4AF37', icon: <LinkSimple size={18} weight="duotone" />, label: 'Link' },
  other: { colour: '#5f6368', icon: <File size={18} weight="duotone" />, label: 'File' },
}

export default function ReceivedDocViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [doc, setDoc] = useState<ReceivedDoc | null>(null)

  useEffect(() => {
    const all = [...loadLocalReceivedDocs(), ...getKnownReceivedDocs()]
    const found = all.find(d => d.id === params.id)
    if (found) setDoc(found)
  }, [params.id])

  if (!doc) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p className="text-text-muted font-mono">Document not found.</p>
      </div>
    )
  }

  const meta = FORMAT_META[doc.format] || FORMAT_META.other
  const viewUrl = getViewerUrl(doc)

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
          <button onClick={() => router.push('/dashboard/received-docs')}
            style={{
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
              color: 'var(--gold)', padding: '6px 8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ color: meta.colour, display: 'flex', alignItems: 'center' }}>{meta.icon}</span>
          <div>
            <h2 className="text-text-primary font-display" style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              {doc.title}
            </h2>
            <span className="text-text-muted" style={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}>
              {doc.fileName} &bull; {meta.label} &bull; {new Date(doc.uploadedAt).toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={doc.publicUrl} download target="_blank" rel="noopener noreferrer"
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
          <a href={doc.publicUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
              color: 'var(--gold)', cursor: 'pointer', textDecoration: 'none',
            }}
          >
            <ArrowSquareOut size={14} /> Open Original
          </a>
          <span style={{
            padding: '4px 10px', fontSize: 9, fontWeight: 700,
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            background: `${meta.colour}15`, color: meta.colour,
            border: `1px solid ${meta.colour}30`,
          }}>
            {meta.label}
          </span>
        </div>
      </motion.div>

      {/* Viewer */}
      <div style={{ flex: 1, background: '#E8EAED', overflow: 'hidden' }}>
        {doc.format === 'image' ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 32 }}>
            <img src={doc.publicUrl} alt={doc.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
            />
          </div>
        ) : (
          <iframe
            src={viewUrl}
            title={doc.title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
      </div>
    </div>
  )
}
