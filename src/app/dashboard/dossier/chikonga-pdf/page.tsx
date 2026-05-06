'use client';

import React from 'react';
import { DownloadSimple, MagnifyingGlassPlus } from '@phosphor-icons/react';

export default function ChikongaPdfPage() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col bg-onyx-light border border-gold/20 rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex justify-between items-center p-4 bg-onyx border-b border-gold/20 shrink-0">
        <div>
          <h1 className="text-xl font-serif text-gold flex items-center gap-2">
            <span className="text-2xl">📄</span> Chikonga Mine Profile (Original PDF)
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">
            Investment Dossier / Official Document
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mr-4 bg-onyx-light px-3 py-1.5 rounded border border-white/5">
            <MagnifyingGlassPlus size={16} className="text-gold" />
            <span>Use PDF toolbar to zoom</span>
          </div>
          <a 
            href="/documents/socinga-africa/chikonga_mine_profile.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold font-mono bg-gold text-onyx px-4 py-2 rounded hover:bg-gold-light transition-colors"
          >
            <DownloadSimple size={18} weight="bold" />
            Download / Pop Out
          </a>
        </div>
      </div>
      
      {/* PDF Viewer - using native browser iframe for best performance and zoom controls */}
      <iframe 
        src="/documents/socinga-africa/chikonga_mine_profile.pdf#toolbar=1&navpanes=0&scrollbar=1&zoom=100" 
        className="w-full h-full flex-1 border-none bg-slate-900"
        title="Chikonga Mine Profile PDF"
      />
    </div>
  );
}
