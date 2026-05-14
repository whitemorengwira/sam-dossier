"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HyperFormula } from 'hyperformula';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const INITIAL_COLS = 26; // A-Z
const INITIAL_ROWS = 100;
const MIN_COL_WIDTH = 40;
const DEFAULT_COL_WIDTH = 120;
const ROW_HEIGHT = 28;

function colLabel(index: number): string {
  let label = '';
  let i = index;
  while (i >= 0) {
    label = String.fromCharCode(65 + (i % 26)) + label;
    i = Math.floor(i / 26) - 1;
  }
  return label;
}

export default function SpreadsheetPage() {
  const [activeCell, setActiveCell] = useState('A1');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [formulaValue, setFormulaValue] = useState('');
  const [numCols, setNumCols] = useState(INITIAL_COLS);
  const [numRows, setNumRows] = useState(INITIAL_ROWS);
  const [colWidths, setColWidths] = useState<number[]>(Array(INITIAL_COLS).fill(DEFAULT_COL_WIDTH));
  const [selection, setSelection] = useState<{ start: string; end: string } | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>(() =>
    Array(INITIAL_ROWS).fill(null).map(() => Array(INITIAL_COLS).fill(''))
  );

  const editInputRef = useRef<HTMLInputElement>(null);
  const formulaInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const resizingCol = useRef<{ col: number; startX: number; startW: number } | null>(null);

  // HyperFormula engine
  const hf = useMemo(() => {
    const instance = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
    instance.addSheet('Sheet1');
    return instance;
  }, []);

  // Yjs refs
  const ydocRef = useRef<Y.Doc | null>(null);
  const yGridRef = useRef<Y.Map<string> | null>(null);

  const refreshSheetData = useCallback(() => {
    const newData = Array(numRows).fill(null).map(() => Array(numCols).fill(''));
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        try {
          const val = hf.getCellValue({ sheet: 0, col: c, row: r });
          newData[r][c] = val !== null && val !== undefined ? String(val) : '';
        } catch { /* empty */ }
      }
    }
    setSheetData(newData);
  }, [hf, numRows, numCols]);

  // Setup Yjs collaboration
  useEffect(() => {
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const provider = new WebrtcProvider('sam-dossier-spreadsheet-v2', ydoc, {
      signaling: ['wss://signaling.yjs.dev']
    });

    const yGrid = ydoc.getMap<string>('grid-data');
    yGridRef.current = yGrid;

    yGrid.observe(() => {
      Array.from(yGrid.keys()).forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        try {
          hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]);
        } catch { /* expand later */ }
      });
      refreshSheetData();
    });

    if (Array.from(yGrid.keys()).length > 0) {
      Array.from(yGrid.keys()).forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        try {
          hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]);
        } catch { /* empty */ }
      });
      refreshSheetData();
    }

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [hf, refreshSheetData]);

  // Parse cell reference
  const parseCellRef = (ref: string) => {
    const match = ref.match(/^([A-Z]+)(\d+)$/);
    if (!match) return { col: 0, row: 0 };
    let colIdx = 0;
    for (let i = 0; i < match[1].length; i++) {
      colIdx = colIdx * 26 + (match[1].charCodeAt(i) - 64);
    }
    return { col: colIdx - 1, row: parseInt(match[2]) - 1 };
  };

  const setCellValue = (cellId: string, value: string) => {
    const { col, row } = parseCellRef(cellId);
    try {
      hf.setCellContents({ sheet: 0, col, row }, [[value]]);
    } catch { /* empty */ }
    if (yGridRef.current) {
      if (value) {
        yGridRef.current.set(`${row},${col}`, value);
      } else {
        yGridRef.current.delete(`${row},${col}`);
      }
    }
    refreshSheetData();
  };

  const commitEdit = () => {
    if (editingCell) {
      setCellValue(editingCell, formulaValue);
      setEditingCell(null);
    }
  };

  const startEdit = (cellId: string, initialValue?: string) => {
    const { col, row } = parseCellRef(cellId);
    const formula = hf.getCellFormula({ sheet: 0, col, row });
    const rawValue = initialValue !== undefined ? initialValue : (formula ? `=${formula}` : (sheetData[row]?.[col] || ''));
    setEditingCell(cellId);
    setFormulaValue(rawValue);
    setActiveCell(cellId);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleCellClick = (cellId: string) => {
    if (editingCell && editingCell !== cellId) {
      commitEdit();
    }
    setActiveCell(cellId);
    const { col, row } = parseCellRef(cellId);
    const formula = hf.getCellFormula({ sheet: 0, col, row });
    setFormulaValue(formula ? `=${formula}` : (sheetData[row]?.[col] || ''));
    setEditingCell(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { col, row } = parseCellRef(activeCell);

    if (editingCell) {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitEdit();
        const nextRow = Math.min(row + 1, numRows - 1);
        const nextCell = `${colLabel(col)}${nextRow + 1}`;
        handleCellClick(nextCell);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        commitEdit();
        const nextCol = Math.min(col + 1, numCols - 1);
        const nextCell = `${colLabel(nextCol)}${row + 1}`;
        handleCellClick(nextCell);
      } else if (e.key === 'Escape') {
        setEditingCell(null);
        const formula = hf.getCellFormula({ sheet: 0, col, row });
        setFormulaValue(formula ? `=${formula}` : (sheetData[row]?.[col] || ''));
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      startEdit(activeCell);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const nextCol = e.shiftKey ? Math.max(col - 1, 0) : Math.min(col + 1, numCols - 1);
      handleCellClick(`${colLabel(nextCol)}${row + 1}`);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleCellClick(`${colLabel(col)}${Math.min(row + 2, numRows)}`);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleCellClick(`${colLabel(col)}${Math.max(row, 1)}`);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleCellClick(`${colLabel(Math.min(col + 1, numCols - 1))}${row + 1}`);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleCellClick(`${colLabel(Math.max(col - 1, 0))}${row + 1}`);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      setCellValue(activeCell, '');
      setFormulaValue('');
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      startEdit(activeCell, e.key);
    }
  };

  // Column resize handlers
  const onResizeStart = (colIdx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizingCol.current = { col: colIdx, startX: e.clientX, startW: colWidths[colIdx] };

    const onMove = (ev: MouseEvent) => {
      if (!resizingCol.current) return;
      const diff = ev.clientX - resizingCol.current.startX;
      const newW = Math.max(MIN_COL_WIDTH, resizingCol.current.startW + diff);
      setColWidths(prev => prev.map((w, i) => i === resizingCol.current!.col ? newW : w));
    };
    const onUp = () => {
      resizingCol.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  // Auto-expand rows when editing near the bottom
  useEffect(() => {
    const { row } = parseCellRef(activeCell);
    if (row >= numRows - 5) setNumRows(prev => prev + 50);
  }, [activeCell, numRows]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 font-sans" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Top Chrome */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-700 text-lg">←</Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">Untitled Spreadsheet</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">.xlsx</span>
            </div>
            <div className="flex text-sm text-gray-600 gap-3 mt-1">
              {['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Extensions', 'Help'].map(m => (
                <span key={m} className="hover:bg-gray-100 px-1.5 rounded cursor-pointer">{m}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] border-2 border-white">AG</div>
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] border-2 border-white">SM</div>
          </div>
          <button className="px-5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
            Share
          </button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center gap-1 px-3 py-1 border-b border-gray-200 bg-[#f8f9fa] text-gray-600 shrink-0 text-sm overflow-x-auto">
        <button className="p-1 hover:bg-gray-200 rounded" title="Undo">↩</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Redo">↪</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Print">🖨</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <span className="border border-gray-300 bg-white px-2 py-0.5 rounded text-xs">Arial</span>
        <span className="border border-gray-300 bg-white px-1.5 py-0.5 rounded text-xs w-8 text-center">10</span>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-200 rounded font-bold" title="Bold">B</button>
        <button className="p-1 hover:bg-gray-200 rounded italic" title="Italic">I</button>
        <button className="p-1 hover:bg-gray-200 rounded underline" title="Underline">U</button>
        <button className="p-1 hover:bg-gray-200 rounded line-through" title="Strikethrough">S</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-200 rounded" title="Align Left">≡</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Align Center">☰</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Align Right">≡</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-200 rounded" title="Currency">$</button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Percent">%</button>
        <button className="p-1 hover:bg-gray-200 rounded text-[10px]" title="Decimal">.0</button>
      </div>

      {/* Formula Bar */}
      <div className="flex items-center px-3 py-1 border-b border-gray-300 bg-white gap-2 shrink-0">
        <div className="w-14 text-center text-xs font-medium border border-gray-300 rounded px-1 py-0.5 text-gray-600 bg-gray-50 shrink-0">
          {activeCell}
        </div>
        <div className="text-gray-400 italic text-xs shrink-0">fx</div>
        <input
          ref={formulaInputRef}
          type="text"
          value={formulaValue}
          onChange={e => {
            setFormulaValue(e.target.value);
            if (!editingCell) setEditingCell(activeCell);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commitEdit();
            }
          }}
          className="flex-1 focus:outline-none text-sm font-mono border-none min-w-0"
          placeholder="Enter value or formula (e.g. =SUM(A1:A10))"
        />
      </div>

      {/* Grid */}
      <div ref={gridRef} className="flex-1 overflow-auto bg-white relative select-none" style={{ cursor: resizingCol.current ? 'col-resize' : undefined }}>
        <table className="border-collapse" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: 46 }} />
            {Array.from({ length: numCols }, (_, i) => (
              <col key={i} style={{ width: colWidths[i] || DEFAULT_COL_WIDTH }} />
            ))}
          </colgroup>

          {/* Column headers */}
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-gray-100 border border-gray-300 w-[46px] h-[24px] sticky left-0 z-20" />
              {Array.from({ length: numCols }, (_, ci) => (
                <th
                  key={ci}
                  className={`bg-gray-100 border border-gray-300 text-xs text-gray-600 font-medium h-[24px] relative select-none ${
                    parseCellRef(activeCell).col === ci ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                  }`}
                >
                  {colLabel(ci)}
                  {/* Resize handle */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-blue-400/40 z-10"
                    onMouseDown={e => onResizeStart(ci, e)}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: numRows }, (_, ri) => (
              <tr key={ri}>
                {/* Row header */}
                <td
                  className={`bg-gray-100 border border-gray-300 text-xs text-gray-600 font-medium text-center sticky left-0 z-[5] select-none ${
                    parseCellRef(activeCell).row === ri ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                  }`}
                  style={{ height: ROW_HEIGHT }}
                >
                  {ri + 1}
                </td>
                {Array.from({ length: numCols }, (_, ci) => {
                  const cellId = `${colLabel(ci)}${ri + 1}`;
                  const isActive = activeCell === cellId;
                  const isEditing = editingCell === cellId;
                  const cellValue = sheetData[ri]?.[ci] || '';
                  const isNumber = cellValue !== '' && !isNaN(Number(cellValue));

                  return (
                    <td
                      key={ci}
                      className={`border border-gray-200 relative ${isActive ? 'outline outline-2 outline-blue-500 outline-offset-[-1px] z-[2]' : ''}`}
                      style={{ height: ROW_HEIGHT, padding: 0, overflow: 'hidden' }}
                      onClick={() => handleCellClick(cellId)}
                      onDoubleClick={() => startEdit(cellId)}
                    >
                      {isEditing ? (
                        <input
                          ref={editInputRef}
                          type="text"
                          value={formulaValue}
                          onChange={e => setFormulaValue(e.target.value)}
                          className="absolute inset-0 px-1.5 text-sm font-mono outline-none border-2 border-blue-500 bg-white z-10"
                          style={{ width: '100%', height: '100%' }}
                          autoFocus
                        />
                      ) : (
                        <div
                          className={`px-1.5 truncate text-sm leading-[${ROW_HEIGHT}px] h-full flex items-center ${
                            isNumber ? 'justify-end font-mono' : 'justify-start'
                          }`}
                          style={{ lineHeight: `${ROW_HEIGHT}px` }}
                        >
                          {cellValue}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sheet Tabs */}
      <div className="flex items-center h-8 border-t border-gray-300 bg-gray-50 text-sm shrink-0">
        <button className="px-3 text-gray-500 hover:bg-gray-200 h-full text-base" title="Add Sheet">+</button>
        <div className="h-full bg-white border-r border-t-2 border-t-blue-500 border-gray-300 px-5 flex items-center text-xs font-medium shadow-sm text-blue-700">
          Sheet1
        </div>
      </div>
    </div>
  );
}
