"use client";

import React from 'react';
import { BoardItem } from '@/types/board';

// Mock data
const mockItems: BoardItem[] = [
  { id: 'i1', groupId: 'g1', name: 'Complete Phase 1 Pitch Deck', position: 0, values: { c1: 'AG', c2: 'Working on it', c3: 'May 10' } },
  { id: 'i2', groupId: 'g1', name: 'Review geological survey', position: 1, values: { c1: 'SM', c2: 'Stuck', c3: 'May 12' } },
  { id: 'i3', groupId: 'g1', name: 'Financial Model Draft', position: 2, values: { c1: 'FD', c2: 'Done', c3: 'May 8' } },
];

const getStatusColor = (status: string) => {
  if (status === 'Done') return 'bg-green-500';
  if (status === 'Working on it') return 'bg-orange-500';
  if (status === 'Stuck') return 'bg-red-500';
  return 'bg-gray-500';
};

export default function KanbanView() {
  const statuses = ['Working on it', 'Stuck', 'Done', 'Not Started'];
  
  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4">
      {statuses.map(status => {
        const columnItems = mockItems.filter(item => item.values.c2 === status || (status === 'Not Started' && !item.values.c2));
        
        return (
          <div key={status} className="flex-shrink-0 w-80 flex flex-col bg-[#1A1A1A] border border-[#333] rounded-md h-full max-h-full">
            {/* Column Header */}
            <div className={`p-3 rounded-t-md border-b border-[#333] ${getStatusColor(status)} bg-opacity-20`}>
              <h3 className="font-semibold text-gray-200 flex justify-between items-center">
                {status}
                <span className="text-xs bg-[#333] px-2 py-1 rounded text-gray-300">{columnItems.length}</span>
              </h3>
            </div>
            
            {/* Column Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {columnItems.map(item => (
                <div key={item.id} className="bg-[#222] border border-[#444] rounded p-3 hover:border-gray-400 cursor-pointer transition-colors shadow-sm">
                  <p className="text-sm font-medium text-gray-100 mb-3">{item.name}</p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#333] border border-[#555] inline-block"></span>
                      Group 1
                    </span>
                    
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 border border-[#222] flex items-center justify-center text-[10px] text-white">
                        {item.values.c1 as string}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Column Footer */}
            <div className="p-3 border-t border-[#333]">
              <button className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 w-full">
                <span>+</span> Add item
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
