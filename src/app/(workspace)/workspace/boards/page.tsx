"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function BoardsListPage() {
  const [boards, setBoards] = useState([
    { id: '1', name: 'Main Project Board', description: 'Central tracker for all tasks.' },
    { id: '2', name: 'Marketing Campaign', description: 'Q3 Marketing launch.' }
  ]);

  return (
    <div className="p-8 w-full max-w-6xl mx-auto text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Boards</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
          + New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(board => (
          <Link href={`/workspace/boards/${board.id}`} key={board.id}>
            <div className="bg-[#1A1A1A] border border-[#333] hover:border-blue-500 rounded-lg p-6 cursor-pointer transition-all duration-200">
              <h2 className="text-xl font-semibold mb-2">{board.name}</h2>
              <p className="text-gray-400 text-sm">{board.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
