'use client'

import { useRef, useState } from 'react'
import { Plus, CaretLeft, CaretRight, CaretDown } from '@phosphor-icons/react'
import { TEMPLATES } from '@/lib/documents-data'
import styles from './TemplateGallery.module.css'

interface Props { onCreate: (templateId: string) => void }

export default function TemplateGallery({ onCreate }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState(false)

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeader}>
        <div className={styles.galleryTitle}>
          Start a new document
          <button className={`${styles.collapseBtn} ${collapsed ? styles.collapsed : ''}`} onClick={() => setCollapsed(!collapsed)}>
            <CaretDown size={16} />
          </button>
        </div>
        <span className={styles.galleryLink}>Template gallery →</span>
      </div>

      {!collapsed && (
        <div className={styles.scrollContainer}>
          <div className={styles.scrollTrack} ref={trackRef}>
            {TEMPLATES.map(tpl => (
              <div key={tpl.id} className={styles.templateCard} onClick={() => onCreate(tpl.id)}>
                <div className={styles.templateThumb}>
                  {tpl.id === 'tpl-blank' ? (
                    <div className={`${styles.templateThumb} ${styles.blankThumb}`}>
                      <Plus size={36} className={styles.blankIcon} />
                    </div>
                  ) : (
                    <div className={`${styles.templateThumb} ${styles.previewThumb}`}>
                      <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: tpl.preview }} />
                    </div>
                  )}
                </div>
                <div className={styles.templateLabel}>{tpl.title}</div>
                {tpl.category && <div className={styles.templateCategory}>{tpl.category}</div>}
              </div>
            ))}
          </div>
          <button className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`} onClick={() => scroll(-1)}><CaretLeft size={16} /></button>
          <button className={`${styles.scrollArrow} ${styles.scrollArrowRight}`} onClick={() => scroll(1)}><CaretRight size={16} /></button>
        </div>
      )}
    </div>
  )
}
