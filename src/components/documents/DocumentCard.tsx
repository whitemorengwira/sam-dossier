'use client'

import { useRouter } from 'next/navigation'
import { FileText, Star, DotsThree, Users, PenNib, CheckCircle } from '@phosphor-icons/react'
import type { GDocsDocument } from '@/types'
import styles from './DocumentCard.module.css'

const CAT_COLOURS: Record<string, string> = {
  policy: '#1a73e8', legal: '#e8710a', minutes: '#9334e6', strategy: '#137333',
  finance: '#c5221f', geological: '#795548', nda: '#f4b400', corporate: '#5f6368',
}

const CAT_LABELS: Record<string, string> = {
  policy: 'POLICY', legal: 'LEGAL', minutes: 'MINUTES', strategy: 'STRATEGY',
  finance: 'FINANCE', geological: 'GEOLOGICAL', nda: 'NDA', corporate: 'CORPORATE',
}

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface Props {
  doc: GDocsDocument; mode: 'grid' | 'list'
  onStar: (id: string) => void; onMenuOpen: (id: string, e: React.MouseEvent) => void
}

export default function DocumentCard({ doc, mode, onStar, onMenuOpen }: Props) {
  const router = useRouter()
  const go = () => router.push(`/dashboard/documents/${doc.id}`)
  const colour = CAT_COLOURS[doc.category] || '#5f6368'
  const label = CAT_LABELS[doc.category] || doc.category

  if (mode === 'list') {
    return (
      <div className={styles.listRow} onClick={go}>
        <div className={styles.listIcon}>
          <FileText size={20} weight="duotone" style={{ color: colour }} />
        </div>
        <div className={styles.listTitle}>
          {doc.title}
          {doc.shared.length > 1 && <span className={styles.sharedIcon}><Users size={12} /></span>}
        </div>
        <div className={styles.listOwner}>{doc.owner.name}</div>
        <div className={styles.listDate}>{formatRelativeDate(doc.lastModified)}</div>
        <button className={styles.listMenu} onClick={e => { e.stopPropagation(); onMenuOpen(doc.id, e); }} aria-label="Options">
          <DotsThree weight="bold" />
        </button>
      </div>
    )
  }

  return (
    <div className={styles.gridCard} onClick={go}>
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailContent} dangerouslySetInnerHTML={{ __html: doc.content.slice(0, 500) }} />
        <div className={styles.categoryBadge} style={{ color: colour }}>{label}</div>
      </div>

      {/* Signature badge */}
      {doc.signatureStatus === 'pending' && <div className={styles.signBadge}><PenNib size={10} weight="fill" /> Sign</div>}
      {doc.signatureStatus === 'signed' && <div className={`${styles.signBadge} ${styles.signed}`}><CheckCircle size={10} weight="fill" /> Signed</div>}

      <button className={`${styles.starButton} ${doc.starred ? styles.starred : ''}`} onClick={e => { e.stopPropagation(); onStar(doc.id); }} aria-label="Star">
        <Star size={14} weight={doc.starred ? 'fill' : 'regular'} />
      </button>
      <button className={styles.menuButton} onClick={e => { e.stopPropagation(); onMenuOpen(doc.id, e); }} aria-label="Options">
        <DotsThree weight="bold" />
      </button>

      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{doc.title}</div>
        <div className={styles.cardMeta}>
          <div className={styles.cardTypeIcon}><FileText size={14} weight="duotone" style={{ color: colour }} /></div>
          <span className={styles.cardOwner}>{doc.owner.name}</span>
          <span className={styles.cardDate}>{formatRelativeDate(doc.lastModified)}</span>
        </div>
      </div>
    </div>
  )
}
