"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TableView from '@/components/boards/TableView';
import KanbanView from '@/components/boards/KanbanView';

export default function BoardDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('table');

  return (
    <div className="flex flex-col h-full w-full bg-[#0E0E0E] text-gray-100 overflow-hidden">
      {/* Board Header */}
      <div className="border-b border-[#333] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/workspace/boards" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">Main Project Board (Mock)</h1>
        </div>

        {/* Views Tabs */}
        <div className="flex items-center gap-6">
          <button 
            className={`pb-2 border-b-2 font-medium ${activeTab === 'table' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('table')}
          >
            Main Table
          </button>
          <button 
            className={`pb-2 border-b-2 font-medium ${activeTab === 'kanban' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('kanban')}
          >
            Kanban
          </button>
          <button 
            className={`pb-2 border-b-2 font-medium ${activeTab === 'gantt' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('gantt')}
          >
            Gantt
          </button>
        </div>
      </div>

      {/* Board Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'table' && <TableView />}
        {activeTab === 'kanban' && <KanbanView />}
        {activeTab === 'gantt' && (
          <div className="h-full flex items-center justify-center text-gray-400">
            Gantt view coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
