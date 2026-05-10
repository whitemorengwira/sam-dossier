import { create } from 'zustand'

export type BlockType = 
  | 'StatCard'
  | 'TeamMemberCard'
  | 'TextBlock'
  | 'ImageBanner'
  | 'TwoColumnLayout'
  | 'CalloutBox'
  | 'Divider'
  | 'RichTable'

export interface BlockData {
  id: string
  type: BlockType
  props: Record<string, unknown>
}

interface CmsState {
  blocks: BlockData[]
  past: BlockData[][]
  future: BlockData[][]
  selectedBlockId: string | null
  
  // Actions
  setBlocks: (blocks: BlockData[]) => void
  addBlock: (block: BlockData, index?: number) => void
  updateBlock: (id: string, newProps: Record<string, unknown>) => void
  removeBlock: (id: string) => void
  reorderBlocks: (fromIndex: number, toIndex: number) => void
  duplicateBlock: (id: string) => void
  
  selectBlock: (id: string | null) => void
  undo: () => void
  redo: () => void
  clearHistory: () => void
}

const MAX_HISTORY = 50

export const useCmsStore = create<CmsState>((set, get) => ({
  blocks: [],
  past: [],
  future: [],
  selectedBlockId: null,

  setBlocks: (blocks) => set({ blocks, past: [], future: [] }),

  addBlock: (block, index) => set((state) => {
    const newBlocks = [...state.blocks]
    if (index !== undefined) {
      newBlocks.splice(index, 0, block)
    } else {
      newBlocks.push(block)
    }
    return pushHistory(state, newBlocks)
  }),

  updateBlock: (id, newProps) => set((state) => {
    const newBlocks = state.blocks.map(b => 
      b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b
    )
    return pushHistory(state, newBlocks)
  }),

  removeBlock: (id) => set((state) => {
    const newBlocks = state.blocks.filter(b => b.id !== id)
    return pushHistory(state, newBlocks)
  }),

  reorderBlocks: (fromIndex, toIndex) => set((state) => {
    const newBlocks = [...state.blocks]
    const [moved] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, moved)
    return pushHistory(state, newBlocks)
  }),

  duplicateBlock: (id) => set((state) => {
    const blockIndex = state.blocks.findIndex(b => b.id === id)
    if (blockIndex === -1) return state
    const original = state.blocks[blockIndex]
    const duplicate: BlockData = {
      ...original,
      id: crypto.randomUUID(),
    }
    const newBlocks = [...state.blocks]
    newBlocks.splice(blockIndex + 1, 0, duplicate)
    return pushHistory(state, newBlocks)
  }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  undo: () => set((state) => {
    if (state.past.length === 0) return state
    const previous = state.past[state.past.length - 1]
    const newPast = state.past.slice(0, -1)
    return {
      past: newPast,
      blocks: previous,
      future: [state.blocks, ...state.future],
      selectedBlockId: null
    }
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state
    const next = state.future[0]
    const newFuture = state.future.slice(1)
    return {
      past: [...state.past, state.blocks],
      blocks: next,
      future: newFuture,
      selectedBlockId: null
    }
  }),

  clearHistory: () => set({ past: [], future: [] })
}))

// Helper to push to history stack
function pushHistory(state: CmsState, newBlocks: BlockData[]): Partial<CmsState> {
  const newPast = [...state.past, state.blocks].slice(-MAX_HISTORY)
  return {
    blocks: newBlocks,
    past: newPast,
    future: []
  }
}
