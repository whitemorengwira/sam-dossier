'use client';

interface PDFToolbarProps {
  activeTool?: string;
  onToolSelect?: (tool: string) => void;
}

export function PDFToolbar({ activeTool = 'select', onToolSelect = () => {} }: PDFToolbarProps) {
  const tools = [
    { id: 'select', label: 'Select', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
    { id: 'text', label: 'Text', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' },
    { id: 'highlight', label: 'Highlight', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
    { id: 'rectangle', label: 'Shape', icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
    { id: 'freehand', label: 'Draw', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
    { id: 'signature', label: 'Sign', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="h-14 bg-gray-800 text-white flex items-center px-4 shadow-md shrink-0 justify-between">
      <div className="flex items-center gap-2 border-r border-gray-600 pr-4">
        <span className="font-bold tracking-tight px-2">PDF Editor</span>
      </div>
      
      <div className="flex items-center gap-1 mx-4 flex-1 justify-center">
        {tools.map(t => (
          <button
            key={t.id}
            onClick={() => onToolSelect(t.id)}
            className={`p-2 rounded flex flex-col items-center justify-center gap-1 w-14 h-12 transition-colors ${
              activeTool === t.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
            }`}
            title={t.label}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={t.icon}></path>
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 pl-4 border-l border-gray-600">
        <button className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors">
          Download
        </button>
        <button className="px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
