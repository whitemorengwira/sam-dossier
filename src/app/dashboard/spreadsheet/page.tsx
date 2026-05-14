"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HyperFormula } from 'hyperformula';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// ─── Grid Config ──────────────────────────────────────────────────────────────
const INITIAL_COLS = 26;
const INITIAL_ROWS = 100;
const MIN_COL_W = 30;
const DEFAULT_COL_W = 100;
const ROW_NUM_W = 46;
const ROW_H = 25;
const HEADER_H = 25;

function colLabel(i: number): string {
  let s = '';
  let n = i;
  while (n >= 0) { s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26) - 1; }
  return s;
}

function parseCellRef(ref: string) {
  const m = ref.match(/^([A-Z]+)(\d+)$/);
  if (!m) return { col: 0, row: 0 };
  let c = 0;
  for (let i = 0; i < m[1].length; i++) c = c * 26 + (m[1].charCodeAt(i) - 64);
  return { col: c - 1, row: parseInt(m[2]) - 1 };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SpreadsheetPage() {
  const [activeCell, setActiveCell] = useState('A1');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [formulaValue, setFormulaValue] = useState('');
  const [numCols, setNumCols] = useState(INITIAL_COLS);
  const [numRows, setNumRows] = useState(INITIAL_ROWS);
  const [colWidths, setColWidths] = useState<number[]>(() => Array(INITIAL_COLS).fill(DEFAULT_COL_W));
  const [sheetData, setSheetData] = useState<string[][]>(() =>
    Array(INITIAL_ROWS).fill(null).map(() => Array(INITIAL_COLS).fill(''))
  );
  const [showImport, setShowImport] = useState(false);
  const [docTitle, setDocTitle] = useState('Untitled spreadsheet');
  const [editingTitle, setEditingTitle] = useState(false);

  const editInputRef = useRef<HTMLInputElement>(null);
  const formulaInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resizingCol = useRef<{ col: number; startX: number; startW: number } | null>(null);

  // HyperFormula
  const hf = useMemo(() => {
    const inst = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
    inst.addSheet('Sheet1');
    return inst;
  }, []);

  // Yjs
  const ydocRef = useRef<Y.Doc | null>(null);
  const yGridRef = useRef<Y.Map<string> | null>(null);

  const refreshSheetData = useCallback(() => {
    const d = Array(numRows).fill(null).map(() => Array(numCols).fill(''));
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        try {
          const v = hf.getCellValue({ sheet: 0, col: c, row: r });
          d[r][c] = v !== null && v !== undefined ? String(v) : '';
        } catch { /* empty */ }
      }
    }
    setSheetData(d);
  }, [hf, numRows, numCols]);

  useEffect(() => {
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    const provider = new WebrtcProvider('sam-dossier-spreadsheet-v3', ydoc, {
      signaling: ['wss://signaling.yjs.dev']
    });
    const yGrid = ydoc.getMap<string>('grid-data');
    yGridRef.current = yGrid;

    yGrid.observe(() => {
      Array.from(yGrid.keys()).forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        try { hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]); } catch {}
      });
      refreshSheetData();
    });

    if (Array.from(yGrid.keys()).length > 0) {
      Array.from(yGrid.keys()).forEach(key => {
        const [rStr, cStr] = key.split(',');
        const val = yGrid.get(key) || '';
        try { hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]); } catch {}
      });
      refreshSheetData();
    }

    return () => { provider.destroy(); ydoc.destroy(); };
  }, [hf, refreshSheetData]);

  // ─── Cell Operations ───
  const setCellValue = (cellId: string, value: string) => {
    const { col, row } = parseCellRef(cellId);
    try { hf.setCellContents({ sheet: 0, col, row }, [[value]]); } catch {}
    if (yGridRef.current) {
      if (value) yGridRef.current.set(`${row},${col}`, value);
      else yGridRef.current.delete(`${row},${col}`);
    }
    refreshSheetData();
  };

  const commitEdit = () => {
    if (editingCell) { setCellValue(editingCell, formulaValue); setEditingCell(null); }
  };

  const startEdit = (cellId: string, initialValue?: string) => {
    const { col, row } = parseCellRef(cellId);
    const formula = hf.getCellFormula({ sheet: 0, col, row });
    const raw = initialValue !== undefined ? initialValue : (formula ? `=${formula}` : (sheetData[row]?.[col] || ''));
    setEditingCell(cellId);
    setFormulaValue(raw);
    setActiveCell(cellId);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleCellClick = (cellId: string) => {
    if (editingCell && editingCell !== cellId) commitEdit();
    setActiveCell(cellId);
    const { col, row } = parseCellRef(cellId);
    const formula = hf.getCellFormula({ sheet: 0, col, row });
    setFormulaValue(formula ? `=${formula}` : (sheetData[row]?.[col] || ''));
    setEditingCell(null);
  };

  // ─── Keyboard ───
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { col, row } = parseCellRef(activeCell);
    if (editingCell) {
      if (e.key === 'Enter') { e.preventDefault(); commitEdit(); handleCellClick(`${colLabel(col)}${Math.min(row + 2, numRows)}`); }
      else if (e.key === 'Tab') { e.preventDefault(); commitEdit(); handleCellClick(`${colLabel(Math.min(col + 1, numCols - 1))}${row + 1}`); }
      else if (e.key === 'Escape') { setEditingCell(null); const f = hf.getCellFormula({ sheet: 0, col, row }); setFormulaValue(f ? `=${f}` : (sheetData[row]?.[col] || '')); }
      return;
    }
    if (e.key === 'Enter' || e.key === 'F2') { e.preventDefault(); startEdit(activeCell); }
    else if (e.key === 'Tab') { e.preventDefault(); handleCellClick(`${colLabel(e.shiftKey ? Math.max(col - 1, 0) : Math.min(col + 1, numCols - 1))}${row + 1}`); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); handleCellClick(`${colLabel(col)}${Math.min(row + 2, numRows)}`); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); handleCellClick(`${colLabel(col)}${Math.max(row, 1)}`); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); handleCellClick(`${colLabel(Math.min(col + 1, numCols - 1))}${row + 1}`); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); handleCellClick(`${colLabel(Math.max(col - 1, 0))}${row + 1}`); }
    else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); setCellValue(activeCell, ''); setFormulaValue(''); }
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { startEdit(activeCell, e.key); }
  };

  // ─── Column Resize ───
  const onResizeStart = (ci: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    resizingCol.current = { col: ci, startX: e.clientX, startW: colWidths[ci] };
    const onMove = (ev: MouseEvent) => {
      if (!resizingCol.current) return;
      const nw = Math.max(MIN_COL_W, resizingCol.current.startW + (ev.clientX - resizingCol.current.startX));
      setColWidths(prev => prev.map((w, i) => i === resizingCol.current!.col ? nw : w));
    };
    const onUp = () => { resizingCol.current = null; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.body.style.cursor = 'col-resize';
  };

  // Auto-expand
  useEffect(() => {
    const { row } = parseCellRef(activeCell);
    if (row >= numRows - 5) setNumRows(p => p + 50);
  }, [activeCell, numRows]);

  // ─── File Import ───
  const handleFileImport = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
      Papa.parse(file, {
        complete: (result) => {
          loadData(result.data as string[][]);
          setDocTitle(file.name.replace(/\.[^.]+$/, ''));
          setShowImport(false);
        }
      });
    } else {
      // xlsx, xls, ods, etc.
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 }) as string[][];
        loadData(json);
        setDocTitle(file.name.replace(/\.[^.]+$/, ''));
        setShowImport(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const loadData = (data: string[][]) => {
    const maxR = Math.max(data.length, numRows);
    const maxC = Math.max(data.reduce((m, r) => Math.max(m, r.length), 0), numCols);
    if (maxR > numRows) setNumRows(maxR + 20);
    if (maxC > numCols) {
      setNumCols(maxC);
      setColWidths(prev => [...prev, ...Array(maxC - prev.length).fill(DEFAULT_COL_W)]);
    }
    // Clear existing
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        try { hf.setCellContents({ sheet: 0, col: c, row: r }, [['']]); } catch {}
      }
    }
    // Load new
    if (ydocRef.current && yGridRef.current) {
      ydocRef.current.transact(() => {
        data.forEach((row, ri) => {
          row.forEach((cell, ci) => {
            const val = cell != null ? String(cell) : '';
            if (val) {
              try { hf.setCellContents({ sheet: 0, col: ci, row: ri }, [[val]]); } catch {}
              yGridRef.current!.set(`${ri},${ci}`, val);
            }
          });
        });
      });
    }
    refreshSheetData();
  };

  // Active cell position info
  const { col: activeCol, row: activeRow } = parseCellRef(activeCell);

  return (
    <div className="flex flex-col h-screen bg-white text-[#202124] text-[13px]" onKeyDown={handleKeyDown} tabIndex={0} style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-white shrink-0">
        <div className="flex items-center gap-3">
          {/* Sheets icon */}
          <Link href="/dashboard" className="shrink-0">
            <svg width="28" height="38" viewBox="0 0 28 38" fill="none">
              <rect x="1" y="1" width="26" height="36" rx="3" fill="#0F9D58" />
              <rect x="5" y="8" width="18" height="3" rx="1" fill="white" />
              <rect x="5" y="14" width="18" height="3" rx="1" fill="white" />
              <rect x="5" y="20" width="18" height="3" rx="1" fill="white" />
              <rect x="5" y="26" width="8" height="3" rx="1" fill="white" />
              <line x1="13" y1="8" x2="13" y2="29" stroke="#0F9D58" strokeWidth="1.5" />
            </svg>
          </Link>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              {editingTitle ? (
                <input
                  autoFocus
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditingTitle(false); }}
                  className="text-lg font-normal border border-blue-500 rounded px-1 outline-none min-w-[200px]"
                />
              ) : (
                <span className="text-lg font-normal cursor-pointer hover:border-b border-gray-300 truncate" onClick={() => setEditingTitle(true)}>{docTitle}</span>
              )}
              <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">.xlsx</span>
            </div>
            <div className="flex text-[13px] text-[#5f6368] gap-0.5 mt-0.5">
              {['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Extensions', 'Help'].map(m => (
                <button key={m} className="px-2 py-0.5 rounded hover:bg-[#f1f3f4] transition-colors"
                  onClick={() => { if (m === 'File') setShowImport(true); }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex -space-x-1.5">
            <div className="w-7 h-7 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-[11px] border-2 border-white font-medium">AG</div>
            <div className="w-7 h-7 rounded-full bg-[#0f9d58] flex items-center justify-center text-white text-[11px] border-2 border-white font-medium">SM</div>
          </div>
          <button className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1765cc] text-white rounded-full text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
            Share
          </button>
        </div>
      </div>

      {/* ─── Toolbar ─── */}
      <div className="flex items-center gap-0.5 px-2 py-1 border-b border-[#dadce0] bg-[#f9fbfd] shrink-0 overflow-x-auto">
        <button className="p-1.5 hover:bg-[#e8eaed] rounded" title="Undo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M3 10h10a5 5 0 010 10H9" /><polyline points="3 10 7 6" /><polyline points="3 10 7 14" /></svg></button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded" title="Redo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M21 10H11a5 5 0 000 10h4" /><polyline points="21 10 17 6" /><polyline points="21 10 17 14" /></svg></button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded" title="Print"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="px-2 py-0.5 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368]" title="Zoom">100%</button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="px-2 py-0.5 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368] border border-[#dadce0] bg-white min-w-[90px] text-left" title="Font">Arial</button>
        <div className="flex items-center border border-[#dadce0] rounded bg-white">
          <button className="px-1 py-0.5 hover:bg-[#e8eaed] text-[#5f6368]">−</button>
          <span className="px-2 py-0.5 text-[12px] text-[#202124] border-x border-[#dadce0] min-w-[28px] text-center">10</span>
          <button className="px-1 py-0.5 hover:bg-[#e8eaed] text-[#5f6368]">+</button>
        </div>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="p-1.5 hover:bg-[#e8eaed] rounded font-bold text-[14px] text-[#5f6368]" title="Bold">B</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded italic text-[14px] text-[#5f6368]" title="Italic">I</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[14px] text-[#5f6368]" title="Underline" style={{ textDecoration: 'underline' }}>U</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[14px] text-[#5f6368] line-through" title="Strikethrough">S</button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[14px] text-[#5f6368]" title="Text color">A<span className="block h-0.5 w-3 bg-[#202124] -mt-0.5" /></button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded" title="Fill color"><svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 000 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5zM2 20h20v4H2z" /></svg></button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="p-1.5 hover:bg-[#e8eaed] rounded" title="Borders"><svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" /></svg></button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368]" title="Currency">$</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368]" title="Percent">%</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[10px] text-[#5f6368]" title="Decimals">.0</button>
        <button className="p-1.5 hover:bg-[#e8eaed] rounded text-[10px] text-[#5f6368]" title="123 format">123</button>
        <div className="h-5 w-px bg-[#dadce0] mx-1" />
        {/* Import button */}
        <button onClick={() => setShowImport(true)} className="px-2 py-1 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368] flex items-center gap-1" title="Import file">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Import
        </button>
      </div>

      {/* ─── Formula Bar ─── */}
      <div className="flex items-center border-b border-[#dadce0] bg-white shrink-0">
        <div className="flex items-center border-r border-[#dadce0]">
          <select
            value={activeCell}
            onChange={e => handleCellClick(e.target.value)}
            className="w-[70px] h-[30px] text-center text-[13px] font-normal border-none outline-none bg-white text-[#202124] cursor-pointer appearance-none px-2"
            style={{ WebkitAppearance: 'none' }}
          >
            <option value={activeCell}>{activeCell}</option>
          </select>
          <div className="w-px h-4 bg-[#dadce0]" />
          <div className="w-4 flex items-center justify-center">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="#5f6368"><path d="M0 0l4 5 4-5z" /></svg>
          </div>
        </div>
        <div className="flex items-center px-2 border-r border-[#dadce0] h-[30px]">
          <span className="text-[#5f6368] text-[15px] italic font-serif">fx</span>
        </div>
        <input
          ref={formulaInputRef}
          type="text"
          value={formulaValue}
          onChange={e => { setFormulaValue(e.target.value); if (!editingCell) setEditingCell(activeCell); }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitEdit(); } }}
          className="flex-1 h-[30px] px-2 text-[13px] font-normal outline-none border-none min-w-0"
          placeholder=""
        />
      </div>

      {/* ─── Grid ─── */}
      <div ref={gridRef} className="flex-1 overflow-auto bg-white relative select-none" style={{ cursor: resizingCol.current ? 'col-resize' : undefined }}>
        <div className="inline-block min-w-full">
          <table className="border-collapse" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: ROW_NUM_W }} />
              {Array.from({ length: numCols }, (_, i) => (
                <col key={i} style={{ width: colWidths[i] || DEFAULT_COL_W }} />
              ))}
            </colgroup>

            {/* Column Headers */}
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="bg-[#f8f9fa] border-b border-r border-[#e2e3e3] sticky left-0 z-20" style={{ height: HEADER_H, width: ROW_NUM_W }} />
                {Array.from({ length: numCols }, (_, ci) => {
                  const isActiveCol = activeCol === ci;
                  return (
                    <th
                      key={ci}
                      className={`text-[11px] font-medium border-b border-r border-[#e2e3e3] relative select-none ${
                        isActiveCol ? 'bg-[#d3e3fd] text-[#1a73e8]' : 'bg-[#f8f9fa] text-[#5f6368]'
                      }`}
                      style={{ height: HEADER_H }}
                    >
                      {colLabel(ci)}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-[3px] cursor-col-resize hover:bg-[#1a73e8] z-10"
                        onMouseDown={e => onResizeStart(ci, e)}
                      />
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: numRows }, (_, ri) => {
                const isActiveRow = activeRow === ri;
                return (
                  <tr key={ri}>
                    <td
                      className={`text-[11px] font-medium text-center border-b border-r border-[#e2e3e3] sticky left-0 z-[5] select-none ${
                        isActiveRow ? 'bg-[#d3e3fd] text-[#1a73e8]' : 'bg-[#f8f9fa] text-[#5f6368]'
                      }`}
                      style={{ height: ROW_H, width: ROW_NUM_W }}
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
                          className={`border-b border-r border-[#e8eaed] relative p-0 overflow-visible`}
                          style={{ height: ROW_H }}
                          onClick={() => handleCellClick(cellId)}
                          onDoubleClick={() => startEdit(cellId)}
                        >
                          {isEditing ? (
                            <input
                              ref={editInputRef}
                              type="text"
                              value={formulaValue}
                              onChange={e => setFormulaValue(e.target.value)}
                              autoFocus
                              className="absolute inset-[-1px] px-2 text-[13px] outline-none border-2 border-[#1a73e8] bg-white z-10 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                              style={{ width: 'calc(100% + 2px)', height: 'calc(100% + 2px)' }}
                            />
                          ) : (
                            <>
                              {isActive && (
                                <>
                                  <div className="absolute inset-[-1px] border-2 border-[#1a73e8] pointer-events-none z-[1]" />
                                  <div className="absolute right-[-4px] bottom-[-4px] w-[7px] h-[7px] bg-[#1a73e8] border border-white cursor-crosshair z-[2]" />
                                </>
                              )}
                              <div
                                className={`px-2 truncate text-[13px] ${isNumber ? 'text-right' : 'text-left'}`}
                                style={{ lineHeight: `${ROW_H}px` }}
                              >
                                {cellValue}
                              </div>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Sheet Tabs ─── */}
      <div className="flex items-center h-[37px] border-t border-[#dadce0] bg-[#f9fbfd] shrink-0">
        <button className="px-3 h-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors" title="Add sheet">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
        <button className="px-3 h-full text-[#5f6368] hover:bg-[#e8eaed] transition-colors" title="All sheets">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <div className="h-full bg-white border-x border-[#dadce0] px-4 flex items-center text-[13px] font-medium text-[#202124] cursor-pointer relative">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a73e8]" />
          Sheet1
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#5f6368" className="ml-2"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
        {/* Scrollbar area */}
        <div className="flex-1" />
      </div>

      {/* ─── Import Modal ─── */}
      {showImport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setShowImport(false)}>
          <div className="bg-white rounded-lg shadow-2xl w-[480px] max-w-[90vw]" onClick={e => e.stopPropagation()} style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0]">
              <h2 className="text-[16px] font-medium text-[#202124]">Import file</h2>
              <button onClick={() => setShowImport(false)} className="p-1 hover:bg-[#f1f3f4] rounded-full text-[#5f6368]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-[#1a73e8]', 'bg-[#e8f0fe]'); }}
                onDragLeave={e => { e.currentTarget.classList.remove('border-[#1a73e8]', 'bg-[#e8f0fe]'); }}
                onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-[#1a73e8]', 'bg-[#e8f0fe]'); if (e.dataTransfer.files[0]) handleFileImport(e.dataTransfer.files[0]); }}
                className="border-2 border-dashed border-[#dadce0] rounded-lg py-12 px-6 text-center cursor-pointer hover:border-[#1a73e8] hover:bg-[#f8f9fe] transition-colors"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="1.5" className="mx-auto mb-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <p className="text-[14px] text-[#202124] font-medium mb-1">Drag a file here, or click to browse</p>
                <p className="text-[12px] text-[#5f6368]">Supports .xlsx, .xls, .csv, .tsv, .ods files</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.tsv,.ods,.txt"
                className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleFileImport(e.target.files[0]); }}
              />
            </div>
            <div className="flex justify-end gap-2 px-6 py-3 border-t border-[#dadce0] bg-[#f8f9fa] rounded-b-lg">
              <button onClick={() => setShowImport(false)} className="px-4 py-2 text-[13px] text-[#1a73e8] hover:bg-[#e8f0fe] rounded font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
