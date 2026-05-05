'use client'

import React, { useEffect, useState } from 'react'
import { X, Cardholder, TextT, Image as ImageIcon, Columns, ListNumbers, Table, WarningCircle, Minus } from '@phosphor-icons/react'
import { useCmsStore, BlockType, BlockData } from '@/lib/store/useCmsStore'

const BLOCKS = [
  { type: 'TextBlock', icon: TextT, label: 'Text Block' },
  { type: 'StatCard', icon: ListNumbers, label: 'Stat Card' },
  { type: 'TeamMemberCard', icon: Cardholder, label: 'Team Member' },
  { type: 'ImageBanner', icon: ImageIcon, label: 'Image Banner' },
  { type: 'TwoColumnLayout', icon: Columns, label: 'Two Column Layout' },
  { type: 'CalloutBox', icon: WarningCircle, label: 'Callout Box' },
  { type: 'Divider', icon: Minus, label: 'Divider' },
  { type: 'RichTable', icon: Table, label: 'Rich Table' },
] as const

export function BlockPickerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [insertAfterId, setInsertAfterId] = useState<string | null>(null)
  const { addBlock, blocks } = useCmsStore()

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setInsertAfterId(detail?.afterId || null)
      setIsOpen(true)
    }
    window.addEventListener('sam-open-block-picker', handler)
    return () => window.removeEventListener('sam-open-block-picker', handler)
  }, [])

  if (!isOpen) return null

  const handleSelect = (type: BlockType) => {
    const newBlock: BlockData = {
      id: crypto.randomUUID(),
      type,
      props: getDefaultProps(type)
    }
    
    if (insertAfterId) {
      const idx = blocks.findIndex(b => b.id === insertAfterId)
      addBlock(newBlock, idx !== -1 ? idx + 1 : undefined)
    } else {
      addBlock(newBlock)
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-navy border border-gold/30 shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col rounded-sm overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gold/15 bg-gold/[0.03]">
          <div>
            <h2 className="text-gold font-display font-semibold text-lg">Insert Block</h2>
            <p className="text-xs text-text-muted mt-0.5">Select a pre-styled block template to insert.</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {BLOCKS.map(block => {
            const Icon = block.icon
            return (
              <button
                key={block.type}
                onClick={() => handleSelect(block.type)}
                className="flex flex-col items-center justify-center gap-3 p-4 border border-gold/20 bg-navy-light/30 hover:bg-gold/10 hover:border-gold/60 transition-all rounded-sm group"
              >
                <Icon size={32} className="text-text-secondary group-hover:text-gold transition-colors" weight="duotone" />
                <span className="text-xs font-medium text-text-primary group-hover:text-gold text-center">{block.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getDefaultProps(type: BlockType): Record<string, any> {
  switch (type) {
    case 'TextBlock': return { text: '<h2>New Heading</h2><p>Start typing your content here...</p>' }
    case 'StatCard': return { label: 'New Metric', value: '0.00', trend: '+0%', bgColour: '#0A1128', borderColour: 'rgba(212,175,55,0.2)' }
    case 'TeamMemberCard': return { name: 'Full Name', title: 'Job Title', role: 'Role description...', initials: 'FN' }
    case 'ImageBanner': return { src: '', alt: 'Banner image', overlayText: '' }
    case 'TwoColumnLayout': return { col1Html: '<p>Left content</p>', col2Html: '<p>Right content</p>' }
    case 'CalloutBox': return { title: 'Important', content: 'Take note of this information.', type: 'info' }
    case 'Divider': return { style: 'solid', colour: 'rgba(212,175,55,0.25)' }
    case 'RichTable': return { data: [['Header 1', 'Header 2'], ['Row 1', 'Data 1']] }
    default: return {}
  }
}
