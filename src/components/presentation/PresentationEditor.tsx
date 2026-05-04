'use client';

import { useState } from 'react';
import { PresentationToolbar } from './PresentationToolbar';
import { SlidesSidebar } from './SlidesSidebar';
import { SlideCanvas } from './SlideCanvas';
import { AIGenerateDialog } from './AIGenerateDialog';

export interface Slide {
  id: string;
  title: string;
  content: string[];
  notes: string;
}

export interface PresentationEditorProps {
  initialSlides?: Slide[];
}

export function PresentationEditor({ initialSlides }: PresentationEditorProps = {}) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides || [
    { id: '1', title: 'Welcome', content: ['Start editing your presentation'], notes: '' }
  ]);
  const [activeSlideId, setActiveSlideId] = useState('1');
  const [isAIGenerateOpen, setIsAIGenerateOpen] = useState(false);

  const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0];

  const handleAIGenerate = (generatedSlides: any[]) => {
    const newSlides: Slide[] = generatedSlides.map((gs, i) => ({
      id: `ai-${Date.now()}-${i}`,
      title: gs.title || 'Untitled',
      content: gs.content || [],
      notes: gs.notes || '',
    }));
    
    if (newSlides.length > 0) {
      setSlides(newSlides);
      setActiveSlideId(newSlides[0].id);
    }
  };

  const addSlide = () => {
    const newId = `slide-${Date.now()}`;
    setSlides([...slides, { id: newId, title: 'New Slide', content: [], notes: '' }]);
    setActiveSlideId(newId);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f1f3f4]">
      {/* Top Toolbar */}
      <div className="bg-white border-b flex items-center justify-between px-4 py-2">
        <PresentationToolbar />
        <button 
          onClick={() => setIsAIGenerateOpen(true)}
          className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-purple-700"
        >
          ✨ Generate with AI
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Thumbnails */}
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="p-2 border-b">
            <button 
              onClick={addSlide}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm py-2 rounded flex items-center justify-center gap-1"
            >
              + New Slide
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                onClick={() => setActiveSlideId(slide.id)}
                className={`relative group cursor-pointer aspect-video rounded border-2 transition-colors ${
                  activeSlideId === slide.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="absolute -left-6 top-1 text-xs text-gray-500 font-medium">
                  {index + 1}
                </div>
                <div className="p-2 w-full h-full text-center flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-xs font-semibold truncate w-full">{slide.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 overflow-auto flex flex-col items-center justify-start p-8">
          <div className="aspect-video w-full max-w-4xl bg-white shadow-lg flex flex-col items-center justify-center p-12 text-center relative border border-gray-100">
             <h1 className="text-4xl font-bold text-gray-800 mb-8">{activeSlide.title}</h1>
             <ul className="text-xl text-gray-600 space-y-4 text-left list-disc pl-8">
               {activeSlide.content.map((item, i) => (
                 <li key={i}>{item}</li>
               ))}
             </ul>
             {!activeSlide.title && activeSlide.content.length === 0 && (
                <div className="text-gray-400">Empty Slide</div>
             )}
          </div>
        </div>
      </div>

      <AIGenerateDialog 
        isOpen={isAIGenerateOpen}
        onClose={() => setIsAIGenerateOpen(false)}
        onGenerate={handleAIGenerate}
      />
    </div>
  );
}
