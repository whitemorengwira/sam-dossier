// src/components/signing/SignaturePad.tsx
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface SignaturePadProps {
  onSave?: (signatureDataUrl: string) => void;
  onClear?: () => void;
}

export function SignaturePad({ onSave, onClear }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set proper canvas dimensions based on CSS size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
  }, []);

  useEffect(() => {
    initCanvas();
    // Re-init on resize for responsive behavior
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear?.();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave?.(canvas.toDataURL('image/png'));
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full" ref={containerRef}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white w-full">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: 200, touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair"
        />
      </div>
      
      <div className="flex gap-4 w-full justify-center flex-wrap">
        <button 
          onClick={handleClear}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 min-w-[80px]"
        >
          Clear
        </button>
        <button 
          onClick={handleSave}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 min-w-[140px]"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
