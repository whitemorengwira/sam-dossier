"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PdfEditorPage() {
  const [activeTool, setActiveTool] = useState('edit');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfDocState, setPdfDocState] = useState<PDFDocument | null>(null);

  // Generate initial PDF with pdf-lib
  useEffect(() => {
    const initPdf = async () => {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      const page = pdfDoc.addPage([600, 800]);
      const { height } = page.getSize();

      page.drawText('CONFIDENTIALITY AGREEMENT', {
        x: 50,
        y: height - 100,
        size: 24,
        font: timesRomanBold,
        color: rgb(0, 0, 0),
      });

      page.drawText('This Confidentiality Agreement (the "Agreement") is entered into', {
        x: 50,
        y: height - 150,
        size: 14,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText('by and between SAM Dossier and the undersigned party.', {
        x: 50,
        y: height - 170,
        size: 14,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText('Agreed and Accepted:', {
        x: 50,
        y: height - 300,
        size: 14,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawLine({
        start: { x: 50, y: height - 350 },
        end: { x: 250, y: height - 350 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      
      page.drawText('Signature', {
        x: 50,
        y: height - 365,
        size: 10,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      setPdfDocState(pdfDoc);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
    };

    initPdf();
  }, []);

  const handleSignDocument = async () => {
    if (!pdfDocState) return;
    
    // Simulate signing by writing onto the PDF using pdf-lib
    const pages = pdfDocState.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    
    const helveticaOblique = await pdfDocState.embedFont(StandardFonts.HelveticaOblique);
    
    firstPage.drawText('Signed securely via SAM DOSSIER', {
      x: 60,
      y: height - 345,
      size: 16,
      font: helveticaOblique,
      color: rgb(0, 0.3, 0.8),
    });

    const pdfBytes = await pdfDocState.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    setPdfUrl(URL.createObjectURL(blob));
    setActiveTool('edit'); // switch out of sign mode
  };

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-gray-100 font-sans">
      {/* Top Chrome / Global Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-[#3E3E3E]">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/documents" className="text-gray-400 hover:text-white font-medium">
            ← Home
          </Link>
          <div className="h-4 w-[1px] bg-gray-600"></div>
          <span className="font-semibold text-white tracking-wide">Acrobat Pro Tools</span>
          <span className="text-sm text-gray-400 ml-2">SAM_DOSSIER_Contract.pdf</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#3E3E3E] rounded text-gray-300 transition-colors" title="Save">💾</button>
          <button className="p-2 hover:bg-[#3E3E3E] rounded text-gray-300 transition-colors" title="Print">🖨️</button>
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-medium transition-colors">
            Share
          </button>
          <button 
            className={`p-2 rounded text-xl transition-colors ${showAiAssistant ? 'bg-indigo-600 text-white' : 'hover:bg-[#3E3E3E] text-gray-300'}`} 
            onClick={() => setShowAiAssistant(!showAiAssistant)}
            title="AI Assistant"
          >
            ✨
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar / All Tools View */}
        <div className="w-64 bg-[#252525] border-r border-[#3E3E3E] flex flex-col">
          <div className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">All Tools</div>
          <nav className="flex-1 overflow-y-auto px-2 space-y-1">
            <ToolButton icon="✏️" label="Edit PDF" active={activeTool === 'edit'} onClick={() => setActiveTool('edit')} />
            <ToolButton icon="🔄" label="Convert PDF" active={activeTool === 'convert'} onClick={() => setActiveTool('convert')} />
            <ToolButton icon="📄" label="Organize Pages" active={activeTool === 'organize'} onClick={() => setActiveTool('organize')} />
            <ToolButton icon="✍️" label="Fill & Sign" active={activeTool === 'sign'} onClick={() => setActiveTool('sign')} />
            <ToolButton icon="🔒" label="Protect" active={activeTool === 'protect'} onClick={() => setActiveTool('protect')} />
            <ToolButton icon="📦" label="Combine Files" active={activeTool === 'combine'} onClick={() => setActiveTool('combine')} />
            <ToolButton icon="🗜️" label="Compress PDF" active={activeTool === 'compress'} onClick={() => setActiveTool('compress')} />
          </nav>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-[#121212] overflow-auto flex items-center justify-center relative p-8">
          
          <div className="bg-white shadow-2xl relative w-full max-w-4xl h-full flex flex-col">
            
            {/* Top Toolbar overlay if in sign mode */}
            {activeTool === 'sign' && (
              <div className="bg-yellow-100 p-3 text-yellow-800 flex justify-between items-center text-sm font-medium shrink-0">
                <span>Fill & Sign Mode Active. Click below to apply signature.</span>
                <button onClick={handleSignDocument} className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
                  Apply Signature
                </button>
              </div>
            )}

            {/* Native PDF Render using pdf-lib generated blob URL */}
            <div className="flex-1 w-full bg-gray-200">
              {pdfUrl ? (
                <iframe src={pdfUrl} className="w-full h-full border-none" title="PDF Preview" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">Generating PDF engine...</div>
              )}
            </div>

          </div>
        </div>

        {/* AI Assistant Side Panel */}
        {showAiAssistant && (
          <div className="w-80 bg-[#252525] border-l border-[#3E3E3E] flex flex-col shadow-xl">
            <div className="p-4 border-b border-[#3E3E3E] flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-indigo-400">✨</span> AI Assistant
              </h3>
              <button onClick={() => setShowAiAssistant(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
              <div className="bg-[#1E1E1E] p-3 rounded-lg border border-[#3E3E3E]">
                <p className="text-gray-300">Hello! I can analyze this PDF for you. Would you like me to:</p>
                <ul className="mt-2 space-y-2">
                  <li><button className="text-indigo-400 hover:text-indigo-300 text-left">Generate a summary</button></li>
                  <li><button className="text-indigo-400 hover:text-indigo-300 text-left">Extract key dates and parties</button></li>
                  <li><button className="text-indigo-400 hover:text-indigo-300 text-left">Find liability clauses</button></li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">U</div>
                <div className="bg-blue-600 p-3 rounded-lg rounded-tl-none">
                  <p className="text-white">Please generate a summary of this agreement.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">✨</div>
                <div className="bg-[#1E1E1E] p-3 rounded-lg rounded-tl-none border border-[#3E3E3E]">
                  <p className="text-gray-300">This is a standard Confidentiality Agreement between SAM Dossier and an unnamed party. It establishes the rules for protecting shared confidential information during a project.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#3E3E3E]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  className="w-full bg-[#1E1E1E] border border-[#3E3E3E] rounded-md py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button className="absolute right-2 top-1.5 text-indigo-400 hover:text-indigo-300">
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolButton({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
        active 
          ? 'bg-[#3E3E3E] text-white shadow-inner' 
          : 'text-gray-400 hover:bg-[#2D2D2D] hover:text-gray-200'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
