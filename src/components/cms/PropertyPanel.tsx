'use client'

import React, { useEffect, useState } from 'react'
import { useCmsStore } from '@/lib/store/useCmsStore'
import { HexColorPicker } from 'react-colorful'
import { X, TextAa, PaintBucket, Image as ImageIcon, TextB as TextBolder, TextItalic } from '@phosphor-icons/react'

export function PropertyPanel() {
  const { blocks, selectedBlockId, updateBlock, selectBlock } = useCmsStore()
  const [editingMode, setEditingMode] = useState(false)

  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)

    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  if (!editingMode || !selectedBlockId) return null

  const block = blocks.find(b => b.id === selectedBlockId)
  if (!block) return null

  const handleChange = (key: string, value: any) => {
    updateBlock(selectedBlockId, { [key]: value })
  }

  return (
    <div className="fixed right-6 top-32 w-80 bg-navy/95 backdrop-blur-xl border border-gold/30 shadow-2xl z-[200] flex flex-col rounded-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gold/15 bg-gold/5">
        <h3 className="text-gold font-display font-semibold text-sm">Properties: {block.type}</h3>
        <button onClick={() => selectBlock(null)} className="text-text-muted hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[60vh] space-y-6">
        
        {/* Dynamic fields based on block type properties */}
        {Object.entries(block.props).map(([key, value]) => {
          
          if (typeof value === 'string' && value.startsWith('#')) {
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-mono text-text-muted uppercase tracking-wider">{key}</label>
                <div className="custom-color-picker-wrapper">
                  <HexColorPicker color={value} onChange={(c) => handleChange(key, c)} style={{ width: '100%', height: '120px' }} />
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={value as any}
                    onChange={e => handleChange(key, e.target.value)}
                    className="flex-1 bg-onyx border border-gold/20 text-white text-xs px-2 py-1 font-mono"
                  />
                </div>
                {/* Swatches */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['#0A1128', '#121212', '#D4AF37', '#FFFFFF', '#050810'].map(swatch => (
                    <button
                      key={swatch}
                      onClick={() => handleChange(key, swatch)}
                      className="w-6 h-6 rounded-full border border-gold/20 hover:scale-110 transition-transform"
                      style={{ backgroundColor: swatch }}
                      title={swatch}
                    />
                  ))}
                </div>
              </div>
            )
          }

          if (key === 'text' || key.includes('Html')) {
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-mono text-text-muted uppercase tracking-wider">{key} (HTML)</label>
                <textarea
                  value={value as any}
                  onChange={e => handleChange(key, e.target.value)}
                  className="w-full bg-onyx border border-gold/20 text-white text-sm p-3 min-h-[120px] resize-y focus:outline-none focus:border-gold/60"
                />
              </div>
            )
          }

          if (key === 'src' || key === 'image') {
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={value as any}
                  onChange={e => handleChange(key, e.target.value)}
                  className="w-full bg-onyx border border-gold/20 text-white text-xs px-3 py-2"
                  placeholder="https://..."
                />
                <button 
                  onClick={() => alert('Image upload integration via /api/upload to be wired up here.')}
                  className="w-full py-1.5 border border-gold/30 text-gold text-xs hover:bg-gold/10 transition-colors flex justify-center items-center gap-2"
                >
                  <ImageIcon size={14} /> Upload to R2
                </button>
              </div>
            )
          }

          if (typeof value === 'number' && key.toLowerCase().includes('opacity')) {
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-mono text-text-muted uppercase tracking-wider">{key}</label>
                <input
                  type="range"
                  min="0" max="1" step="0.05"
                  value={value as any}
                  onChange={e => handleChange(key, parseFloat(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="text-right text-xs text-gold font-mono">{Math.round(value * 100)}%</div>
              </div>
            )
          }

          // Fallback text input
          return (
            <div key={key} className="space-y-2">
              <label className="text-xs font-mono text-text-muted uppercase tracking-wider">{key}</label>
              <input
                type="text"
                value={value as any}
                onChange={e => handleChange(key, e.target.value)}
                className="w-full bg-onyx border border-gold/20 text-white text-sm px-3 py-2"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
