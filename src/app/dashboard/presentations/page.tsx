"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as fabric from 'fabric';

export default function PresentationEditorPage() {
  const [activeRibbon, setActiveRibbon] = useState('home');
  const [activeSlide, setActiveSlide] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true,
    });
    
    setFabricCanvas(canvas);

    // Initial default slide
    if (activeSlide === 1) {
      const title = new fabric.IText('SAM Dossier', {
        left: 200,
        top: 150,
        fontFamily: 'Helvetica',
        fontSize: 48,
        fontWeight: 'light',
        fill: '#333333',
      });
      const subtitle = new fabric.IText('The Future of Mining Management', {
        left: 200,
        top: 220,
        fontFamily: 'Helvetica',
        fontSize: 24,
        fill: '#B7472A',
      });
      const topBar = new fabric.Rect({
        left: 0,
        top: 0,
        width: 800,
        height: 10,
        fill: '#B7472A',
        selectable: false
      });
      
      canvas.add(topBar, title, subtitle);
    }

    return () => {
      canvas.dispose();
    };
  }, [activeSlide]);

  const addTextBox = () => {
    if (!fabricCanvas) return;
    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontFamily: 'Helvetica',
      fontSize: 20,
      fill: '#333333',
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.requestRenderAll();
  };

  const addShape = () => {
    if (!fabricCanvas) return;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#4A90E2',
      width: 100,
      height: 100,
      rx: 5,
      ry: 5
    });
    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect);
    fabricCanvas.requestRenderAll();
  };

  const deleteSelected = () => {
    if (!fabricCanvas) return;
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach(obj => fabricCanvas.remove(obj));
      fabricCanvas.discardActiveObject();
      fabricCanvas.requestRenderAll();
    }
  };

  const slides = [
    { id: 1, title: 'SAM Dossier: The Future of Mining' },
    { id: 2, title: 'Financial Projections' },
    { id: 3, title: 'Geological Analysis' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F3F2F1] text-gray-800 font-sans">
      {/* Top Title Bar */}
      <div className="h-12 bg-[#B7472A] text-white flex items-center justify-between px-4 text-sm font-semibold select-none">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/documents" className="hover:text-gray-300">
            ← Home
          </Link>
          <div className="flex items-center gap-2">
            <span>PowerPoint</span>
            <span className="text-gray-300 font-normal">|</span>
            <span>Investor Pitch Deck.pptx</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white text-[#B7472A] px-4 py-1.5 rounded-sm hover:bg-gray-100 transition-colors">
            ▶ Present
          </button>
          <button className="flex items-center gap-2 hover:bg-[#A33F25] px-3 py-1.5 rounded-sm transition-colors">
            Share
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white border border-white">AG</div>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="bg-white border-b border-gray-300 flex px-2 text-sm select-none">
        <button className="px-4 py-2 hover:bg-gray-100 text-[#B7472A]">File</button>
        {['Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Review', 'View'].map(tab => {
          const id = tab.toLowerCase().replace(' ', '');
          const isActive = activeRibbon === id;
          return (
            <button 
              key={id}
              onClick={() => setActiveRibbon(id)}
              className={`px-4 py-2 ${isActive ? 'bg-white text-[#B7472A] border-b-2 border-[#B7472A]' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Ribbon Content */}
      <div className="h-24 bg-white border-b border-gray-300 shadow-sm flex items-center px-4 gap-6 select-none overflow-x-auto">
        {activeRibbon === 'home' && (
          <>
            <div className="flex flex-col gap-1 items-center px-2 border-r border-gray-200">
              <div className="flex items-center gap-1">
                <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded text-[#B7472A]">
                  <span className="text-xl">📋</span>
                  <span className="text-xs">Paste</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded">
                <span className="text-xl">✨</span>
                <span className="text-xs">New Slide</span>
              </button>
              <div className="flex flex-col gap-1">
                <button className="text-xs text-left px-2 hover:bg-gray-100 rounded">Layout ▾</button>
                <button className="text-xs text-left px-2 hover:bg-gray-100 rounded">Reset</button>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-r border-gray-200 pr-4">
              <div className="flex gap-1 mb-1">
                <select className="border border-gray-300 rounded px-2 py-0.5 text-xs bg-white w-32 outline-none"><option>Calibri (Body)</option></select>
                <select className="border border-gray-300 rounded px-2 py-0.5 text-xs bg-white w-14 outline-none"><option>24</option></select>
                <button className="px-2 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded text-xs">A^</button>
                <button className="px-2 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded text-xs">Av</button>
              </div>
              <div className="flex gap-1">
                <button className="px-2 font-bold hover:bg-gray-100 rounded text-sm border border-transparent hover:border-gray-300">B</button>
                <button className="px-2 italic hover:bg-gray-100 rounded text-sm border border-transparent hover:border-gray-300">I</button>
                <button className="px-2 underline hover:bg-gray-100 rounded text-sm border border-transparent hover:border-gray-300">U</button>
                <button className="px-2 line-through hover:bg-gray-100 rounded text-sm border border-transparent hover:border-gray-300">S</button>
                <button className="px-2 hover:bg-gray-100 rounded text-sm border border-transparent hover:border-gray-300 text-red-600 font-bold border-b-2 border-b-red-600">A ▾</button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded border-r border-gray-200 pr-4">
              <span className="text-xl">⭐</span>
              <span className="text-xs mt-1">Designer</span>
            </div>
          </>
        )}

        {activeRibbon === 'insert' && (
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded">
              <span className="text-xl">🖼️</span>
              <span className="text-xs">Pictures</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded" onClick={addShape}>
              <span className="text-xl">🔷</span>
              <span className="text-xs">Shapes</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded">
              <span className="text-xl">📊</span>
              <span className="text-xs">Chart</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded" onClick={addTextBox}>
              <span className="text-xl">T</span>
              <span className="text-xs">Text Box</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-300 overflow-y-auto py-4 flex flex-col gap-4">
          {slides.map(slide => (
            <div 
              key={slide.id} 
              className="flex px-2 cursor-pointer group"
              onClick={() => setActiveSlide(slide.id)}
            >
              <div className="w-6 text-xs text-gray-500 font-medium text-right pr-2 pt-1">
                {slide.id}
              </div>
              <div className={`w-36 h-20 bg-white border-2 rounded shadow-sm flex items-center justify-center p-2 text-center overflow-hidden transition-all ${activeSlide === slide.id ? 'border-[#B7472A]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                <span className="text-[8px] text-gray-600 line-clamp-3 leading-tight font-medium">
                  {slide.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#E1DFDD] flex flex-col items-center justify-center overflow-auto p-8 relative">
          
          {/* Main Slide Canvas */}
          <div className="w-[800px] h-[450px] bg-white shadow-lg border border-gray-300 relative select-none" tabIndex={0} onKeyDown={(e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') deleteSelected();
          }}>
            <canvas ref={canvasRef} width="800" height="450" className="w-full h-full block" />
          </div>
        </div>

        {/* AI Designer Panel */}
        {activeRibbon === 'home' && (
          <div className="w-72 bg-white border-l border-gray-300 flex flex-col shadow-xl z-10">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="text-yellow-500">⭐</span> Designer
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-sm text-gray-600 mb-4">Select a design idea to instantly update your slide.</p>
              
              <div className="border border-[#B7472A] p-1 rounded cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-full h-24 bg-gray-800 relative overflow-hidden flex items-center justify-center p-2">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B7472A] rounded-bl-full opacity-80"></div>
                  <div className="text-left w-full z-10">
                    <div className="text-[10px] text-white font-light">SAM Dossier</div>
                    <div className="text-[8px] text-gray-300">The Future of Mining Management</div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 hover:border-gray-400 p-1 rounded cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-full h-24 bg-[#B7472A] relative overflow-hidden flex items-center justify-center p-2">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <div className="text-center w-full z-10">
                    <div className="text-[12px] text-white font-bold tracking-widest uppercase">SAM Dossier</div>
                    <div className="w-8 h-[1px] bg-white mx-auto my-1"></div>
                    <div className="text-[8px] text-gray-200 uppercase tracking-widest">Mining Management</div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 hover:border-gray-400 p-1 rounded cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-full h-24 bg-white relative flex">
                  <div className="w-1/3 bg-gray-900 h-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div className="w-2/3 h-full flex flex-col justify-center px-2">
                    <div className="text-[10px] text-gray-900 font-bold">SAM Dossier</div>
                    <div className="text-[7px] text-[#B7472A]">The Future of Mining Management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar & Notes Area Toggle */}
      <div className="h-8 bg-gray-100 border-t border-gray-300 flex items-center justify-between px-4 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>Slide {activeSlide} of 3</span>
          <button className="hover:text-gray-900 flex items-center gap-1">
            <span className="text-green-600">✓</span> English (U.K.)
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-400 pb-0.5">Notes</button>
          <div className="flex gap-2 text-base">
            <button className="hover:text-gray-900 bg-gray-200 hover:bg-gray-300 w-6 h-6 flex items-center justify-center rounded">◫</button>
            <button className="hover:text-gray-900 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded">▦</button>
            <button className="hover:text-gray-900 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded">📖</button>
            <button className="hover:text-gray-900 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded">▶</button>
          </div>
          <div className="flex items-center gap-2">
            <span>-</span>
            <input type="range" min="10" max="200" defaultValue="70" className="w-24 h-1 bg-gray-300 rounded appearance-none" />
            <span>+</span>
            <span className="w-8 text-right">70%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
