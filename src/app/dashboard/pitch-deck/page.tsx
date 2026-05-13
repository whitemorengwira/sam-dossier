'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash, DownloadSimple, Globe, FloppyDisk,
  PencilSimple, X, CheckCircle, Clock, User, Archive,
  ArrowLeft, FilePlus, List
} from '@phosphor-icons/react'
import {
  listPitchDecks, savePitchDeck, deletePitchDeck, publishPitchDeck,
  PitchDeck, PitchSlide
} from '@/lib/actions/pitchDeckActions'
import { toast } from 'sonner'

// ── Slide canvas ──────────────────────────────────────────────────────────────

function SlideEditor({
  slide,
  onChange,
}: {
  slide: PitchSlide
  onChange: (updated: PitchSlide) => void
}) {
  return (
    <div className="bg-white shadow-lg aspect-video w-full max-w-4xl flex flex-col p-10 relative border border-gray-100 mx-auto">
      {/* Title */}
      <input
        className="text-3xl font-bold text-gray-800 border-0 border-b-2 border-transparent focus:border-blue-300 outline-none w-full mb-6 bg-transparent transition-colors placeholder-gray-300"
        placeholder="Slide title…"
        value={slide.title}
        onChange={e => onChange({ ...slide, title: e.target.value })}
      />
      {/* Bullet points */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {slide.content.map((line, i) => (
          <div key={i} className="flex items-start gap-2 group">
            <span className="text-blue-400 mt-1.5 text-sm shrink-0">•</span>
            <input
              className="flex-1 text-lg text-gray-600 border-0 border-b border-transparent focus:border-blue-200 outline-none bg-transparent transition-colors placeholder-gray-300"
              placeholder="Add a point…"
              value={line}
              onChange={e => {
                const next = [...slide.content]
                next[i] = e.target.value
                onChange({ ...slide, content: next })
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const next = [...slide.content]
                  next.splice(i + 1, 0, '')
                  onChange({ ...slide, content: next })
                }
                if (e.key === 'Backspace' && line === '' && slide.content.length > 1) {
                  const next = slide.content.filter((_, j) => j !== i)
                  onChange({ ...slide, content: next })
                }
              }}
            />
            <button
              onClick={() => {
                const next = slide.content.filter((_, j) => j !== i)
                onChange({ ...slide, content: next.length ? next : [''] })
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange({ ...slide, content: [...slide.content, ''] })}
          className="text-sm text-blue-400 hover:text-blue-600 mt-2 flex items-center gap-1 transition-colors"
        >
          <Plus size={14} /> Add point
        </button>
      </div>
    </div>
  )
}

// ── Deck list view ────────────────────────────────────────────────────────────

function DeckCard({
  deck,
  onOpen,
  onDelete,
  onPublish,
}: {
  deck: PitchDeck
  onOpen: () => void
  onDelete: () => void
  onPublish: () => void
}) {
  const isLive = deck.status === 'live'
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {isLive ? 'Live' : 'Draft'}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">{deck.slides.length} slides</span>
          </div>
          <h3 className="font-bold text-gray-800 text-base truncate">{deck.name}</h3>
          {deck.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{deck.description}</p>}
        </div>
      </div>

      {/* Attribution seal */}
      <div className="text-[11px] text-gray-400 space-y-0.5">
        {deck.created_by_display_name && (
          <div className="flex items-center gap-1.5">
            <User size={11} />
            <span>Created by <strong className="text-gray-600">{deck.created_by_display_name}</strong></span>
          </div>
        )}
        {deck.last_edited_by_display_name && deck.last_edited_by_display_name !== deck.created_by_display_name && (
          <div className="flex items-center gap-1.5">
            <PencilSimple size={11} />
            <span>Last edited by <strong className="text-gray-600">{deck.last_edited_by_display_name}</strong></span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span>{new Date(deck.updated_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button onClick={onOpen} className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm py-1.5 rounded font-medium transition-colors flex items-center justify-center gap-1.5">
          <PencilSimple size={14} /> Edit
        </button>
        {!isLive ? (
          <button onClick={onPublish} className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 text-sm py-1.5 rounded font-medium transition-colors flex items-center justify-center gap-1.5">
            <Globe size={14} /> Go Live
          </button>
        ) : (
          <span className="flex-1 text-center text-[11px] text-green-600 font-medium flex items-center justify-center gap-1">
            <CheckCircle size={13} /> Published
          </span>
        )}
        <button onClick={onDelete} className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-colors">
          <Archive size={16} />
        </button>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PitchDeckPage() {
  const [decks, setDecks] = useState<PitchDeck[]>([])
  const [loadingDecks, setLoadingDecks] = useState(true)
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null)
  const [deckName, setDeckName] = useState('')
  const [deckDesc, setDeckDesc] = useState('')
  const [slides, setSlides] = useState<PitchSlide[]>([])
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showNewDeckModal, setShowNewDeckModal] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')
  const [editingName, setEditingName] = useState(false)

  const loadDecks = useCallback(async () => {
    setLoadingDecks(true)
    const list = await listPitchDecks()
    setDecks(list)
    setLoadingDecks(false)
  }, [])

  useEffect(() => { loadDecks() }, [loadDecks])

  const activeSlide = slides.find(s => s.id === activeSlideId) ?? slides[0] ?? null

  function openDeck(deck: PitchDeck) {
    setActiveDeckId(deck.id)
    setDeckName(deck.name)
    setDeckDesc(deck.description || '')
    const loaded = deck.slides.length > 0 ? deck.slides : []
    setSlides(loaded)
    setActiveSlideId(loaded[0]?.id ?? null)
  }

  function createNewDeck() {
    const name = newDeckName.trim() || 'Untitled Deck'
    const firstSlide: PitchSlide = { id: `slide-${Date.now()}`, title: '', content: [''], notes: '' }
    setActiveDeckId(null)
    setDeckName(name)
    setDeckDesc('')
    setSlides([firstSlide])
    setActiveSlideId(firstSlide.id)
    setShowNewDeckModal(false)
    setNewDeckName('')
  }

  function addSlide() {
    const id = `slide-${Date.now()}`
    const newSlide: PitchSlide = { id, title: '', content: [''], notes: '' }
    setSlides(prev => [...prev, newSlide])
    setActiveSlideId(id)
  }

  function deleteSlide(id: string) {
    if (slides.length <= 1) { toast.error('A deck must have at least one slide.'); return }
    const next = slides.filter(s => s.id !== id)
    setSlides(next)
    if (activeSlideId === id) setActiveSlideId(next[0]?.id ?? null)
  }

  function updateSlide(updated: PitchSlide) {
    setSlides(prev => prev.map(s => s.id === updated.id ? updated : s))
  }

  async function handleSave(publish = false) {
    setSaving(true)
    try {
      const saved = await savePitchDeck(deckName || 'Untitled Deck', slides, {
        id: activeDeckId || undefined,
        description: deckDesc || undefined,
        status: publish ? 'live' : 'draft',
      })
      setActiveDeckId(saved.id)
      toast.success(publish ? 'Deck is now live!' : 'Deck saved successfully')
      await loadDecks()
    } catch (e: any) {
      toast.error(`Save failed: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Archive this deck? It will be removed from the list.')) return
    await deletePitchDeck(id)
    toast.success('Deck archived')
    await loadDecks()
  }

  async function handlePublish(id: string) {
    await publishPitchDeck(id)
    toast.success('Deck is now live!')
    await loadDecks()
  }

  // ── Editor view ──────────────────────────────────────────────────────────────
  if (activeDeckId !== null || slides.length > 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-4 shrink-0 flex-wrap">
          <button onClick={() => { setActiveDeckId(null); setSlides([]) }} className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 hover:bg-gray-100 rounded">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            {editingName ? (
              <input
                autoFocus
                className="text-base font-bold text-gray-800 border-b border-blue-400 outline-none bg-transparent w-full max-w-xs"
                value={deckName}
                onChange={e => setDeckName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={e => { if (e.key === 'Enter') setEditingName(false) }}
              />
            ) : (
              <button onClick={() => setEditingName(true)} className="flex items-center gap-2 group text-left">
                <span className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{deckName || 'Untitled Deck'}</span>
                <PencilSimple size={13} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              </button>
            )}
            <p className="text-[11px] text-gray-400">{slides.length} slide{slides.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-sm flex items-center gap-2 rounded font-medium transition-colors disabled:opacity-50"
            >
              <FloppyDisk size={15} /> {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm flex items-center gap-2 rounded font-medium transition-colors disabled:opacity-50"
            >
              <Globe size={15} /> Go Live
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Slide thumbnails */}
          <div className="w-56 bg-white border-r flex flex-col shrink-0">
            <div className="p-2 border-b">
              <button onClick={addSlide} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm py-2 rounded flex items-center justify-center gap-1.5 font-medium transition-colors">
                <Plus size={14} weight="bold" /> New Slide
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideId(slide.id)}
                  className={`relative group cursor-pointer aspect-video rounded border-2 transition-colors ${
                    activeSlideId === slide.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-blue-200'
                  }`}
                >
                  <div className="absolute -left-5 top-1 text-[10px] text-gray-400 font-mono">{index + 1}</div>
                  <div className="p-2 w-full h-full flex flex-col justify-center overflow-hidden">
                    <p className="text-[10px] font-semibold text-gray-700 line-clamp-2 leading-tight">
                      {slide.title || <span className="text-gray-300 italic">Empty slide</span>}
                    </p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); deleteSlide(slide.id) }}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 flex flex-col items-center justify-start p-8">
            {activeSlide ? (
              <SlideEditor
                slide={activeSlide}
                onChange={updated => updateSlide(updated)}
              />
            ) : (
              <div className="text-gray-400 text-sm mt-20">Select or create a slide</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Deck list view ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-gold">Mining Division</span>
          </div>
          <h1 className="text-gold font-display font-black text-2xl">Pitch Decks</h1>
          <p className="text-text-muted text-sm mt-1">Create, edit, and publish investor pitch decks. All saved versions are visible to the team.</p>
        </div>
        <button
          onClick={() => setShowNewDeckModal(true)}
          className="btn-gold px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <FilePlus size={16} weight="bold" /> New Deck
        </button>
      </div>

      {/* Deck grid */}
      {loadingDecks ? (
        <div className="text-text-muted font-mono text-sm animate-pulse py-12 text-center">Loading decks…</div>
      ) : decks.length === 0 ? (
        <div className="border-2 border-dashed border-gold/20 rounded-xl py-20 flex flex-col items-center gap-4 text-center">
          <List size={40} className="text-gold/30" />
          <p className="text-text-muted font-mono text-sm">No pitch decks yet.</p>
          <button onClick={() => setShowNewDeckModal(true)} className="btn-gold px-6 py-2 text-sm flex items-center gap-2">
            <FilePlus size={15} /> Create your first deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {decks.map(deck => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onOpen={() => openDeck(deck)}
              onDelete={() => handleDelete(deck.id)}
              onPublish={() => handlePublish(deck.id)}
            />
          ))}
        </div>
      )}

      {/* New Deck Modal */}
      <AnimatePresence>
        {showNewDeckModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b flex items-center justify-between bg-gray-50">
                <h2 className="text-base font-bold text-gray-800">New Pitch Deck</h2>
                <button onClick={() => setShowNewDeckModal(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Deck Name</label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Investor Series A 2026"
                    value={newDeckName}
                    onChange={e => setNewDeckName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') createNewDeck() }}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-400">The deck will start blank. You can add slides, title them, and write bullet points — no coding required.</p>
              </div>
              <div className="p-4 border-t bg-gray-50 flex gap-3 justify-end">
                <button onClick={() => setShowNewDeckModal(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">Cancel</button>
                <button onClick={createNewDeck} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm rounded font-medium transition-colors flex items-center gap-2">
                  <FilePlus size={15} /> Create Deck
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
