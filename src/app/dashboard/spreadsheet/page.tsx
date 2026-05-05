"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { HyperFormula } from 'hyperformula';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export default function SpreadsheetPage() {
  const [activeCell, setActiveCell] = useState('A1');
  const [formulaValue, setFormulaValue] = useState('');

  // Generate grid
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const rows = Array.from({ length: 20 }, (_, i) => i + 1);

  // Initialize HyperFormula
  const hf = useMemo(() => {
    const hfInstance = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
    hfInstance.addSheet('Sheet1');
    return hfInstance;
  }, []);

  const [sheetData, setSheetData] = useState<string[][]>(Array(20).fill(null).map(() => Array(10).fill('')));
  
  // Yjs references
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const yGridRef = useRef<Y.Map<string> | null>(null);

  const refreshSheetData = () => {
    const newSheetData = Array(20).fill(null).map(() => Array(10).fill(''));
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 10; c++) {
        const val = hf.getCellValue({ sheet: 0, col: c, row: r });
        newSheetData[r][c] = val !== null && val !== undefined ? String(val) : '';
      }
    }
    setSheetData(newSheetData);
  };

  // Seed initial data and setup Yjs
  useEffect(() => {
    // 1. Setup Yjs
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const provider = new WebrtcProvider('sam-dossier-spreadsheet-v1', ydoc, {
      signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com']
    });
    providerRef.current = provider;

    const yGrid = ydoc.getMap<string>('grid-data');
    yGridRef.current = yGrid;

    // 2. Observe remote changes
    yGrid.observe((event) => {
      let changed = false;
      event.keysChanged.forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]);
        changed = true;
      });
      if (changed) refreshSheetData();
    });

    // 3. Seed data if room is empty
    if (Array.from(yGrid.keys()).length === 0) {
      ydoc.transact(() => {
        yGrid.set('1,0', 'Total Revenue');
        yGrid.set('1,1', '1250000');
        yGrid.set('1,2', '=B2*1.1'); // Note: B2 is actually r:1, c:1 in 0-index. Hyperformula uses B2. Wait, initial was B3. We use standard excel ref.
        yGrid.set('2,0', 'Equipment');
        yGrid.set('2,1', '450000');
        yGrid.set('2,2', '500000');
        yGrid.set('3,0', 'Net Profit');
        yGrid.set('3,1', '=B2-B3');
        yGrid.set('3,2', '=C2-C3');
      });
    } else {
      // Load from peers
      Array.from(yGrid.keys()).forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]);
      });
      refreshSheetData();
    }

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [hf]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormulaValue(val);
  };

  const applyFormula = () => {
    const colIndex = cols.indexOf(activeCell.charAt(0));
    const rowIndex = parseInt(activeCell.substring(1)) - 1;
    
    if (colIndex >= 0 && rowIndex >= 0) {
      hf.setCellContents({ sheet: 0, col: colIndex, row: rowIndex }, [[formulaValue]]);
      
      // Sync to peers
      if (yGridRef.current) {
        yGridRef.current.set(`${rowIndex},${colIndex}`, formulaValue);
      }
      
      refreshSheetData();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 font-sans">
      {/* Top Chrome / File Menu */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/documents" className="text-gray-500 hover:text-gray-800">
            ←
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">Financial Projections Q3</span>
              <span className="text-yellow-400">⭐</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">.xlsx</span>
            </div>
            <div className="flex text-sm text-gray-600 gap-3 mt-1">
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">File</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Edit</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">View</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Insert</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Format</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Data</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Tools</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Extensions</span>
              <span className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">Help</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">AG</div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">SM</div>
          </div>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors flex items-center gap-2 shadow-sm">
            <span>🔒</span> Share
          </button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-gray-200 bg-[#f8f9fa] text-gray-700">
        <button className="p-1 hover:bg-gray-200 rounded">↩️</button>
        <button className="p-1 hover:bg-gray-200 rounded">↪️</button>
        <button className="p-1 hover:bg-gray-200 rounded">🖨️</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded text-sm font-bold">100%</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded">💲</button>
        <button className="p-1 hover:bg-gray-200 rounded text-sm font-serif italic">fx</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <span className="text-sm font-medium border border-gray-300 bg-white px-2 py-0.5 rounded">Arial</span>
        <span className="text-sm border border-gray-300 bg-white px-2 py-0.5 rounded">10</span>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
        <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
        <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
        <button className="p-1 hover:bg-gray-200 rounded line-through">S</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded" title="Fill Color">🎨</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Borders">🔲</button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded" title="Insert Chart">📊</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Filter">🔽</button>
      </div>

      {/* Formula Bar */}
      <div className="flex items-center px-4 py-1.5 border-b border-gray-300 bg-white gap-2">
        <div className="flex items-center justify-center w-10 text-sm font-medium border border-gray-300 rounded px-1 text-gray-600 bg-gray-50">
          {activeCell}
        </div>
        <div className="text-gray-400 italic text-sm">fx</div>
        <input 
          type="text" 
          value={formulaValue}
          onChange={handleFormulaChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFormula();
          }}
          className="flex-1 focus:outline-none text-sm font-mono border-none" 
          placeholder="Enter formula or value (e.g., =SUM(A1:A5))"
        />
      </div>

      {/* Main Grid Area */}
      <div className="flex-1 overflow-auto bg-white flex flex-col relative">
        <div className="flex">
          {/* Top-left empty corner */}
          <div className="w-12 h-6 border-b border-r border-gray-300 bg-gray-100 flex-shrink-0 sticky top-0 left-0 z-20"></div>
          
          {/* Column Headers */}
          <div className="flex sticky top-0 z-10">
            {cols.map(col => (
              <div key={col} className="w-28 h-6 border-b border-r border-gray-300 bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-medium flex-shrink-0">
                {col}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col relative">
          {rows.map(row => (
            <div key={row} className="flex h-6">
              {/* Row Header */}
              <div className="w-12 h-6 border-b border-r border-gray-300 bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-medium flex-shrink-0 sticky left-0 z-10">
                {row}
              </div>
              
              {/* Cells */}
              <div className="flex">
                {cols.map((col, colIndex) => {
                  const cellId = `${col}${row}`;
                  const isActive = activeCell === cellId;
                  const rowIndex = row - 1;
                  
                  const cellValue = sheetData[rowIndex]?.[colIndex] || '';
                  
                  let className = 'w-28 h-6 border-b border-r border-gray-200 px-1 text-sm outline-none overflow-hidden whitespace-nowrap text-right';
                  
                  // Simple styling heuristics for the demo
                  if (isNaN(Number(cellValue)) && cellValue.length > 0) {
                    className = className.replace('text-right', 'text-left');
                  }

                  if (isActive) {
                    className += ' border-2 border-blue-500 z-10 shadow-[0_0_0_1px_rgba(59,130,246,0.5)] bg-blue-50';
                  }

                  return (
                    <div 
                      key={cellId} 
                      className={className}
                      onClick={() => {
                        setActiveCell(cellId);
                        // Show raw formula if it exists, otherwise evaluated value
                        const formula = hf.getCellFormula({ sheet: 0, col: colIndex, row: rowIndex });
                        setFormulaValue(formula ? `=${formula}` : cellValue);
                      }}
                    >
                      {cellValue}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mock Chart Overlay */}
        <div className="absolute top-24 left-96 w-96 h-64 bg-white border border-gray-300 shadow-lg rounded p-4 z-20 cursor-move">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Q3 Revenue vs Expenses</h3>
          <div className="h-48 w-full flex items-end justify-around pb-2 border-b border-l border-gray-400">
            <div className="w-12 bg-green-500 h-[80%] rounded-t relative group"><div className="hidden group-hover:block absolute -top-6 left-0 bg-black text-white text-xs p-1 rounded">1.25M</div></div>
            <div className="w-12 bg-red-500 h-[40%] rounded-t relative group"><div className="hidden group-hover:block absolute -top-6 left-0 bg-black text-white text-xs p-1 rounded">600K</div></div>
            <div className="w-12 bg-green-500 h-[90%] rounded-t relative group"><div className="hidden group-hover:block absolute -top-6 left-0 bg-black text-white text-xs p-1 rounded">1.4M</div></div>
            <div className="w-12 bg-red-500 h-[45%] rounded-t relative group"><div className="hidden group-hover:block absolute -top-6 left-0 bg-black text-white text-xs p-1 rounded">700K</div></div>
          </div>
          <div className="flex justify-around text-xs text-gray-500 mt-2">
            <span>July</span>
            <span>August</span>
          </div>
        </div>
      </div>

      {/* Sheet Tabs */}
      <div className="flex items-center h-10 border-t border-gray-300 bg-gray-50 text-sm">
        <button className="px-4 text-gray-500 hover:bg-gray-200 h-full text-lg">+</button>
        <button className="px-4 text-gray-500 hover:bg-gray-200 h-full text-lg">☰</button>
        <div className="h-full bg-white border-r border-t-2 border-t-blue-500 border-gray-300 px-6 flex items-center font-medium shadow-sm text-blue-700">
          Sheet1
        </div>
        <div className="h-full px-6 flex items-center text-gray-600 hover:bg-gray-200 border-r border-gray-300 cursor-pointer">
          Sheet2
        </div>
      </div>
    </div>
  );
}
