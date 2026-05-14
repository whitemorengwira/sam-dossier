"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HyperFormula } from 'hyperformula';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { toast } from 'sonner';
import {
  saveSpreadsheet,
  goLiveSpreadsheet,
  listSpreadsheets,
  loadSpreadsheet,
  deleteSpreadsheet,
  type SpreadsheetRecord,
} from '@/lib/actions/spreadsheetActions';

// ─── Grid Config ──────────────────────────────────────────────────────────────
const INITIAL_COLS = 26;
const INITIAL_ROWS = 100;
const MIN_COL_W = 50;
const DEFAULT_COL_W = 130;
const ROW_NUM_W = 46;
const ROW_H = 75;
const HEADER_H = 26;

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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SpreadsheetPage() {
  // ─── State ───
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
  const [spreadsheetId, setSpreadsheetId] = useState(() => generateId());

  // Sidebar + save state
  const [showSidebar, setShowSidebar] = useState(false);
  const [savedSheets, setSavedSheets] = useState<SpreadsheetRecord[]>([]);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

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

  // Load saved spreadsheets list
  const refreshSavedList = useCallback(async () => {
    try {
      const list = await listSpreadsheets();
      setSavedSheets(list as SpreadsheetRecord[]);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { refreshSavedList(); }, [refreshSavedList]);

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
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        try { hf.setCellContents({ sheet: 0, col: c, row: r }, [['']]); } catch {}
      }
    }
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

  // ─── Save & Go Live ───
  const getGridDataMap = (): Record<string, string> => {
    const map: Record<string, string> = {};
    if (yGridRef.current) {
      Array.from(yGridRef.current.keys()).forEach(key => {
        map[key] = yGridRef.current!.get(key) || '';
      });
    }
    return map;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSpreadsheet(spreadsheetId, {
        title: docTitle,
        gridData: getGridDataMap(),
        colWidths,
        numCols,
        numRows,
        isLive,
      });
      setLastSaved(new Date().toLocaleTimeString());
      toast.success('Spreadsheet saved');
      refreshSavedList();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleGoLive = async () => {
    setPublishing(true);
    try {
      // Save first
      await saveSpreadsheet(spreadsheetId, {
        title: docTitle,
        gridData: getGridDataMap(),
        colWidths,
        numCols,
        numRows,
        isLive: true,
      });
      await goLiveSpreadsheet(spreadsheetId);
      setIsLive(true);
      toast.success('Spreadsheet is now LIVE — visible to all team members');
      refreshSavedList();
    } catch (err: any) {
      toast.error(err.message || 'Failed to publish');
    } finally {
      setPublishing(false);
    }
  };

  const handleLoadSheet = async (record: SpreadsheetRecord) => {
    const id = record.page_slug.replace('spreadsheet-', '');
    try {
      const data = await loadSpreadsheet(id);
      if (!data) { toast.error('Could not load spreadsheet'); return; }
      const content = data.content_json as SpreadsheetRecord['content_json'];

      setSpreadsheetId(id);
      setDocTitle(content.title || 'Untitled spreadsheet');
      setIsLive(content.isLive || false);
      if (content.colWidths) setColWidths(content.colWidths);
      if (content.numCols) setNumCols(content.numCols);
      if (content.numRows) setNumRows(content.numRows);

      // Clear current grid
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          try { hf.setCellContents({ sheet: 0, col: c, row: r }, [['']]); } catch {}
        }
      }
      if (yGridRef.current) yGridRef.current.doc?.transact(() => {
        Array.from(yGridRef.current!.keys()).forEach(k => yGridRef.current!.delete(k));
      });

      // Load grid data
      if (content.gridData && yGridRef.current) {
        ydocRef.current?.transact(() => {
          Object.entries(content.gridData).forEach(([key, val]) => {
            if (val) {
              const [rStr, cStr] = key.split(',');
              try { hf.setCellContents({ sheet: 0, row: parseInt(rStr), col: parseInt(cStr) }, [[val]]); } catch {}
              yGridRef.current!.set(key, val);
            }
          });
        });
      }
      refreshSheetData();
      setShowSidebar(false);
      toast.success(`Loaded "${content.title}"`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load');
    }
  };

  const handleDeleteSheet = async (record: SpreadsheetRecord) => {
    const id = record.page_slug.replace('spreadsheet-', '');
    if (!confirm(`Delete "${record.content_json?.title || 'Untitled'}"? This cannot be undone.`)) return;
    try {
      await deleteSpreadsheet(id);
      toast.success('Deleted');
      refreshSavedList();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const handleNewSheet = () => {
    // Clear everything
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        try { hf.setCellContents({ sheet: 0, col: c, row: r }, [['']]); } catch {}
      }
    }
    if (yGridRef.current) {
      ydocRef.current?.transact(() => {
        Array.from(yGridRef.current!.keys()).forEach(k => yGridRef.current!.delete(k));
      });
    }
    setSpreadsheetId(generateId());
    setDocTitle('Untitled spreadsheet');
    setIsLive(false);
    setLastSaved(null);
    setColWidths(Array(INITIAL_COLS).fill(DEFAULT_COL_W));
    setNumCols(INITIAL_COLS);
    setNumRows(INITIAL_ROWS);
    refreshSheetData();
    setShowSidebar(false);
    toast.success('New spreadsheet created');
  };

  // Active cell position info
  const { col: activeCol, row: activeRow } = parseCellRef(activeCell);

  return (
    <div className="flex h-screen bg-white text-[#202124] text-[13px]" style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>

      {/* ─── Saved Documents Sidebar ─── */}
      <div className={`shrink-0 border-r border-[#dadce0] bg-[#f8f9fa] transition-all duration-300 overflow-hidden ${showSidebar ? 'w-[280px]' : 'w-0'}`}>
        <div className="w-[280px] h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#dadce0]">
            <h3 className="text-[14px] font-medium text-[#202124]">Saved Spreadsheets</h3>
            <button onClick={() => setShowSidebar(false)} className="p-1 hover:bg-[#e8eaed] rounded-full text-[#5f6368]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* New sheet button */}
          <button onClick={handleNewSheet} className="flex items-center gap-2 mx-3 mt-3 mb-2 px-3 py-2.5 bg-white border border-[#dadce0] rounded-lg hover:shadow-sm hover:border-[#1a73e8] transition-all text-[13px] text-[#1a73e8] font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Spreadsheet
          </button>

          {/* Saved sheets list */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
            {savedSheets.length === 0 && (
              <p className="text-[12px] text-[#5f6368] text-center py-6">No saved spreadsheets yet.<br />Click Save to store your work.</p>
            )}
            {savedSheets.map((sheet) => {
              const content = sheet.content_json as SpreadsheetRecord['content_json'];
              const sheetId = sheet.page_slug.replace('spreadsheet-', '');
              const isCurrent = sheetId === spreadsheetId;
              const isSheetLive = content?.isLive;
              return (
                <div
                  key={sheet.id}
                  className={`group flex items-start gap-2 p-2.5 rounded-lg cursor-pointer transition-all ${
                    isCurrent ? 'bg-[#e8f0fe] border border-[#1a73e8]/30' : 'hover:bg-white hover:shadow-sm border border-transparent'
                  }`}
                  onClick={() => handleLoadSheet(sheet)}
                >
                  {/* Green sheets icon */}
                  <svg width="20" height="26" viewBox="0 0 28 38" fill="none" className="shrink-0 mt-0.5">
                    <rect x="1" y="1" width="26" height="36" rx="3" fill="#0F9D58" />
                    <rect x="5" y="8" width="18" height="2.5" rx="1" fill="white" />
                    <rect x="5" y="13" width="18" height="2.5" rx="1" fill="white" />
                    <rect x="5" y="18" width="18" height="2.5" rx="1" fill="white" />
                    <rect x="5" y="23" width="8" height="2.5" rx="1" fill="white" />
                    <line x1="13" y1="8" x2="13" y2="26" stroke="#0F9D58" strokeWidth="1.5" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[13px] font-medium text-[#202124] truncate">{content?.title || 'Untitled'}</p>
                      {isSheetLive && (
                        <span className="shrink-0 text-[9px] font-bold bg-[#0f9d58] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5f6368] mt-0.5">
                      {sheet.saved_by_display_name} &middot; {new Date(sheet.saved_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteSheet(sheet); }}
                    className="p-1 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[#5f6368] hover:text-red-500"
                    title="Delete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Main Spreadsheet Area ─── */}
      <div className="flex-1 flex flex-col min-w-0" onKeyDown={handleKeyDown} tabIndex={0}>

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
                    onKeyDown={e => { if (e.key === 'Enter') setEditingTitle(false); e.stopPropagation(); }}
                    className="text-lg font-normal border border-blue-500 rounded px-1 outline-none min-w-[200px]"
                  />
                ) : (
                  <span className="text-lg font-normal cursor-pointer hover:border-b border-gray-300 truncate" onClick={() => setEditingTitle(true)}>{docTitle}</span>
                )}
                <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">.xlsx</span>
                {isLive && (
                  <span className="text-[10px] font-bold bg-[#0f9d58] text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Live</span>
                )}
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
          <div className="flex items-center gap-2 shrink-0">
            {lastSaved && <span className="text-[11px] text-[#5f6368]">Saved {lastSaved}</span>}
            {/* Saved docs toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="px-3 py-1.5 text-[13px] text-[#5f6368] hover:bg-[#f1f3f4] rounded-md transition-colors flex items-center gap-1.5 border border-[#dadce0]"
              title="Saved spreadsheets"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>
              My Sheets
            </button>
            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 text-[13px] text-[#1a73e8] hover:bg-[#e8f0fe] rounded-md transition-colors font-medium flex items-center gap-1.5 border border-[#1a73e8]/30 disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
              {saving ? 'Saving...' : 'Save'}
            </button>
            {/* Go Live */}
            <button
              onClick={handleGoLive}
              disabled={publishing}
              className="px-4 py-1.5 text-[13px] bg-[#0f9d58] hover:bg-[#0b8a4a] text-white rounded-md transition-colors font-medium flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
              {publishing ? 'Publishing...' : 'Go Live'}
            </button>
            {/* Collaborators */}
            <div className="flex -space-x-1.5 ml-1">
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
            <button className="px-1.5 py-0.5 hover:bg-[#e8eaed] text-[#5f6368]">&minus;</button>
            <span className="px-2 py-0.5 text-[12px] text-[#202124] border-x border-[#dadce0] min-w-[28px] text-center">10</span>
            <button className="px-1.5 py-0.5 hover:bg-[#e8eaed] text-[#5f6368]">+</button>
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
          <button onClick={() => setShowImport(true)} className="px-2 py-1 hover:bg-[#e8eaed] rounded text-[12px] text-[#5f6368] flex items-center gap-1" title="Import file">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Import
          </button>
        </div>

        {/* ─── Formula Bar ─── */}
        <div className="flex items-center border-b border-[#dadce0] bg-white shrink-0">
          <div className="flex items-center border-r border-[#dadce0]">
            <input
              type="text"
              value={activeCell}
              onChange={e => {
                const ref = e.target.value.toUpperCase();
                if (/^[A-Z]+\d+$/.test(ref)) handleCellClick(ref);
              }}
              className="w-[72px] h-[32px] text-center text-[13px] font-normal border-none outline-none bg-white text-[#202124] px-2"
              onKeyDown={e => e.stopPropagation()}
            />
            <div className="w-px h-4 bg-[#dadce0]" />
            <div className="w-4 flex items-center justify-center">
              <svg width="8" height="5" viewBox="0 0 8 5" fill="#5f6368"><path d="M0 0l4 5 4-5z" /></svg>
            </div>
          </div>
          <div className="flex items-center px-2 border-r border-[#dadce0] h-[32px]">
            <span className="text-[#5f6368] text-[15px] italic font-serif">fx</span>
          </div>
          <input
            ref={formulaInputRef}
            type="text"
            value={formulaValue}
            onChange={e => { setFormulaValue(e.target.value); if (!editingCell) setEditingCell(activeCell); }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitEdit(); } e.stopPropagation(); }}
            className="flex-1 h-[32px] px-2 text-[13px] font-normal outline-none border-none min-w-0"
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
                  <th className="bg-[#f8f9fa] border-b border-r border-[#e8e8e8] sticky left-0 z-20" style={{ height: HEADER_H, width: ROW_NUM_W }} />
                  {Array.from({ length: numCols }, (_, ci) => {
                    const isActiveCol = activeCol === ci;
                    return (
                      <th
                        key={ci}
                        className={`text-[11px] font-normal border-b border-r border-[#e8e8e8] relative select-none ${
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
                        className={`text-[11px] font-normal text-center border-b border-r border-[#e8e8e8] sticky left-0 z-[5] select-none ${
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
                            className={`border-b border-r border-[#e8e8e8] relative p-0 overflow-visible`}
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
                                onKeyDown={e => e.stopPropagation()}
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
                                  className={`px-1.5 truncate text-[13px] ${isNumber ? 'text-right' : 'text-left'}`}
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
          <div className="flex-1" />
        </div>
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
