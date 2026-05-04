'use client';

import { useState } from 'react';

const mockColumns = [
  { id: 'todo', title: 'To Do', items: [{ id: '1', title: 'Setup Database' }, { id: '2', title: 'Design API' }] },
  { id: 'in-progress', title: 'In Progress', items: [{ id: '3', title: 'Build UI' }] },
  { id: 'done', title: 'Done', items: [{ id: '4', title: 'Gather Requirements' }] }
];

export function KanbanView() {
  const [columns, setColumns] = useState(mockColumns);

  // In a real app we would use dnd-kit or react-beautiful-dnd here
  // For this scaffold we implement the visual state representation

  const handleAddCard = (colId: string) => {
    setColumns(cols => cols.map(c => {
      if (c.id === colId) {
        return { ...c, items: [...c.items, { id: Date.now().toString(), title: 'New Task' }] };
      }
      return c;
    }));
  };

  return (
    <div className="flex-1 w-full overflow-x-auto overflow-y-hidden bg-gray-50 p-6 flex items-start gap-6">
      {columns.map(column => (
        <div key={column.id} className="w-80 shrink-0 bg-gray-100/80 backdrop-blur rounded-lg shadow-sm flex flex-col max-h-full border border-gray-200">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-100 rounded-t-lg">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              {column.title} 
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{column.items.length}</span>
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3 min-h-[150px]">
            {column.items.map(item => (
              <div 
                key={item.id} 
                className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-grab hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                   <p className="text-sm font-medium text-gray-900 leading-snug">{item.title}</p>
                   <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 transition-opacity">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                   </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">U</div>
                  <div className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">High</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200 bg-gray-50/50 rounded-b-lg">
            <button 
              onClick={() => handleAddCard(column.id)}
              className="w-full py-2 flex items-center gap-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded px-2 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add Item
            </button>
          </div>
        </div>
      ))}
      
      <button className="w-80 shrink-0 bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-14 text-gray-500 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-all font-medium">
        + Add Column
      </button>
    </div>
  );
}
