'use client';

import { useState } from 'react';

const mockRows = [
  { id: '1', name: 'Develop API routes', status: 'Working on it', owner: 'Sam', timeline: 'May 4 - May 10' },
  { id: '2', name: 'Design Database Schema', status: 'Done', owner: 'Alex', timeline: 'May 1 - May 3' },
  { id: '3', name: 'Frontend PDF Integration', status: 'Stuck', owner: 'Jordan', timeline: 'May 5 - May 15' },
];

export function BoardView() {
  const [rows, setRows] = useState(mockRows);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-500 text-white';
      case 'Working on it': return 'bg-yellow-400 text-gray-900';
      case 'Stuck': return 'bg-red-500 text-white';
      default: return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="w-full bg-white flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Main Table</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 font-medium">
            New Item
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="p-3 w-10 text-center"><input type="checkbox" className="rounded" /></th>
              <th className="p-3 font-semibold text-gray-600 border-r w-[400px]">Item Name</th>
              <th className="p-3 font-semibold text-gray-600 border-r w-32 text-center">Owner</th>
              <th className="p-3 font-semibold text-gray-600 border-r w-40 text-center">Status</th>
              <th className="p-3 font-semibold text-gray-600 border-r w-48 text-center">Timeline</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/50 group">
                <td className="p-3 text-center border-l-[6px] border-l-blue-400">
                  <input type="checkbox" className="rounded opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
                <td className="p-3 border-r font-medium text-gray-800">{row.name}</td>
                <td className="p-3 border-r text-center">
                  <div className="inline-flex w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 items-center justify-center text-xs font-bold border border-indigo-200">
                    {row.owner.charAt(0)}
                  </div>
                </td>
                <td className="border-r relative p-0 h-full w-40 cursor-pointer hover:opacity-90">
                  <div className={`absolute inset-0 flex items-center justify-center font-semibold text-sm ${getStatusColor(row.status)}`}>
                    {row.status}
                  </div>
                </td>
                <td className="p-3 border-r text-center text-sm text-gray-600 font-medium">
                  {row.timeline}
                </td>
                <td className="p-3 text-center text-gray-400 cursor-pointer hover:text-gray-800">
                  ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-3 border-l-[6px] border-l-transparent text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Add item
        </div>
      </div>
    </div>
  );
}
