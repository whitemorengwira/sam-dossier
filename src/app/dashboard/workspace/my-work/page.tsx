import { loadBoard } from '@/lib/board-data'
import { CheckCircle, Clock } from '@phosphor-icons/react/dist/ssr'
import type { BoardItem, BoardGroup } from '@/types/board'

export default function MyWorkPage() {
  const board = loadBoard()
  
  // Extract all items assigned to user (mock user 'u1')
  const myItems: Array<{ item: BoardItem; group: BoardGroup }> = []
  board.groups.forEach(g => {
    g.items.forEach(i => {
      const people = i.values['col-people'] as string[] | undefined
      if (people && people.includes('u1')) {
        myItems.push({ item: i, group: g })
      }
    })
  })

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)]">
      <div className="py-6 border-b border-gold/15 mb-6">
        <h1 className="text-3xl font-bold text-gold font-display mb-2 flex items-center gap-3">
          <CheckCircle size={32} weight="duotone" />
          My Work
        </h1>
        <p className="text-text-muted">Items assigned to you across all project boards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Clock size={24} weight="duotone" className="text-gold" /> 
            Due this week
          </h2>
          
          <div className="bg-navy border border-gold/20 rounded-lg overflow-hidden">
            {myItems.map(({ item, group }, idx) => (
              <div key={item.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gold/5 transition-colors cursor-pointer ${idx !== myItems.length - 1 ? 'border-b border-gold/10' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-4 h-4 rounded-full border border-gold/30 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{item.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 bg-navy border border-gold/20 rounded text-gold">
                        {board.name}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.colour }} />
                        {group.name}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:w-[150px] justify-end">
                  {!!item.values['col-date'] && (
                    <span className="text-xs font-mono text-danger">
                      {new Date(item.values['col-date'] as string).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {myItems.length === 0 && (
              <div className="p-8 text-center text-text-muted">
                No items assigned to you.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-navy border border-gold/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-gold/10 pb-2">Status Summary</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#fdab3d]" /> Working on it
                </span>
                <span className="font-mono text-gold font-bold">
                  {myItems.filter(i => i.item.values['col-status'] === 'st-2').length}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#c4c4c4]" /> Not Started
                </span>
                <span className="font-mono text-text-muted">
                  {myItems.filter(i => i.item.values['col-status'] === 'st-1').length}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#e2445c]" /> Stuck
                </span>
                <span className="font-mono text-danger">
                  {myItems.filter(i => i.item.values['col-status'] === 'st-4').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
