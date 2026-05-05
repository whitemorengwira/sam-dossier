"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BoardItem, BoardColumn, StatusLabel } from '@/types/board';

// Mock data until DB is hooked up
const mockColumns: BoardColumn[] = [
  { id: 'c1', name: 'Person', type: 'people', width: 120 },
  { id: 'c2', name: 'Status', type: 'status', width: 140 },
  { id: 'c3', name: 'Date', type: 'date', width: 120 },
];

const mockItems: BoardItem[] = [
  { id: 'i1', groupId: 'g1', name: 'Complete Phase 1 Pitch Deck', position: 0, values: { c1: 'AG', c2: 'Working on it', c3: 'May 10' } },
  { id: 'i2', groupId: 'g1', name: 'Review geological survey', position: 1, values: { c1: 'SM', c2: 'Stuck', c3: 'May 12' } },
];

const getStatusColor = (status: string) => {
  if (status === 'Done') return 'bg-green-500';
  if (status === 'Working on it') return 'bg-orange-500';
  if (status === 'Stuck') return 'bg-red-500';
  return 'bg-gray-500';
};

export default function TableView() {
  const [columns, setColumns] = useState<BoardColumn[]>(mockColumns);
  const [items, setItems] = useState<BoardItem[]>(mockItems);
  
  // Yjs real-time state references
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const yArrayRef = useRef<Y.Array<BoardItem> | null>(null);

  useEffect(() => {
    // 1. Initialize Yjs document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // 2. Initialize WebRTC Provider for peer-to-peer syncing
    // In production, this would use y-websocket + Supabase
    const provider = new WebrtcProvider('sam-dossier-board-room-v1', ydoc, {
      signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com']
    });
    providerRef.current = provider;

    // 3. Define the shared data structure
    const yItems = ydoc.getArray<BoardItem>('board-items');
    yArrayRef.current = yItems;

    // 4. Observe changes from other peers
    yItems.observe(() => {
      setItems(yItems.toArray());
    });

    // 5. Seed initial data if the room is empty
    if (yItems.length === 0) {
      ydoc.transact(() => {
        yItems.insert(0, mockItems);
      });
    } else {
      // Load existing state from peers
      setItems(yItems.toArray());
    }

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  const handleItemNameChange = (id: string, newName: string) => {
    if (!yArrayRef.current || !ydocRef.current) return;
    const yItems = yArrayRef.current;
    
    ydocRef.current.transact(() => {
      const arr = yItems.toArray();
      const idx = arr.findIndex(i => i.id === id);
      if (idx !== -1) {
        const updatedItem = { ...arr[idx], name: newName };
        yItems.delete(idx, 1);
        yItems.insert(idx, [updatedItem]);
      }
    });
  };

  const handleAddItem = () => {
    if (!yArrayRef.current || !ydocRef.current) return;
    const newItem: BoardItem = {
      id: `i${Date.now()}`,
      groupId: 'g1',
      name: 'New Item',
      position: items.length,
      values: {}
    };
    ydocRef.current.transact(() => {
      yArrayRef.current!.push([newItem]);
    });
  };

  const addColumn = (type: BoardColumn['type'], name: string) => {
    const newCol: BoardColumn = {
      id: `c${Date.now()}`,
      name,
      type,
      width: 140
    };
    setColumns([...columns, newCol]);
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-md h-full flex flex-col">
      <div className="p-4 border-b border-[#333]">
        <h2 className="text-lg font-medium text-blue-400">To Do (Group 1)</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#333] text-sm text-gray-400">
              <th className="p-3 w-8"></th>
              <th className="p-3 border-r border-[#333]">Item</th>
              {columns.map(col => (
                <th key={col.id} className="p-3 border-r border-[#333] text-center font-medium" style={{ width: col.width }}>
                  {col.name}
                </th>
              ))}
              <th className="p-3 w-16 border-l border-[#333] text-center">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="w-8 h-8 rounded-md bg-[#252525] hover:bg-[#333] flex items-center justify-center text-lg transition-colors mx-auto outline-none">
                      +
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="min-w-[180px] bg-[#1E1E1E] border border-[#333] rounded-md p-1 shadow-xl z-50 text-sm text-gray-200" sideOffset={5}>
                      <DropdownMenu.Item className="px-3 py-2 hover:bg-[#2A2A2A] rounded cursor-pointer outline-none flex items-center gap-2" onClick={() => addColumn('status', 'New Status')}>
                        <span className="w-4 h-4 rounded-sm bg-orange-500"></span> Status
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-3 py-2 hover:bg-[#2A2A2A] rounded cursor-pointer outline-none flex items-center gap-2" onClick={() => addColumn('text', 'Text')}>
                        <span className="text-gray-400">T</span> Text
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-3 py-2 hover:bg-[#2A2A2A] rounded cursor-pointer outline-none flex items-center gap-2" onClick={() => addColumn('people', 'People')}>
                        <span className="text-gray-400">👤</span> Person
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-3 py-2 hover:bg-[#2A2A2A] rounded cursor-pointer outline-none flex items-center gap-2" onClick={() => addColumn('date', 'Date')}>
                        <span className="text-gray-400">📅</span> Date
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-3 py-2 hover:bg-[#2A2A2A] rounded cursor-pointer outline-none flex items-center gap-2" onClick={() => addColumn('numbers', 'Numbers')}>
                        <span className="text-gray-400">#</span> Numbers
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[#333] hover:bg-[#252525] group cursor-pointer">
                <td className="p-3 border-l-4 border-l-blue-400"></td>
                <td className="p-3 border-r border-[#333] group-hover:bg-[#2A2A2A] transition-colors">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => handleItemNameChange(item.id, e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-white"
                  />
                </td>
                
                {/* Dynamically render columns based on type */}
                {columns.map(col => {
                  const val = item.values[col.id] as string | undefined;
                  
                  if (col.type === 'status') {
                    return (
                      <td key={col.id} className="p-0 border-r border-[#333]">
                        <div className={`${getStatusColor(val || '')} text-white w-full h-full min-h-[40px] p-3 text-center text-sm font-medium transition-transform hover:scale-[1.02]`}>
                          {val || '-'}
                        </div>
                      </td>
                    );
                  }
                  
                  if (col.type === 'people') {
                    return (
                      <td key={col.id} className="p-3 border-r border-[#333] text-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 mx-auto flex items-center justify-center text-xs text-white">
                          {val || '?'}
                        </div>
                      </td>
                    );
                  }
                  
                  return (
                    <td key={col.id} className="p-3 text-center text-sm border-r border-[#333]">
                      {val || '-'}
                    </td>
                  );
                })}
                <td className="border-l border-[#333]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={handleAddItem}
        className="p-3 text-sm text-gray-400 hover:text-white hover:bg-[#252525] text-left border-b border-[#333]"
      >
        + Add Item
      </button>
    </div>
  );
}
