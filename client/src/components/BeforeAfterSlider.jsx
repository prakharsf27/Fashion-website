import React, { useState, useRef, useCallback } from 'react';
import { Columns, SplitSquareVertical, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage, outfitName }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'side-by-side'
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* View Mode Switcher Header */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] uppercase tracking-widest text-atelier-500 font-semibold">
            Visual Comparison Mode:
          </span>
          <div className="inline-flex border border-atelier-300 bg-atelier-100 p-0.5">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all ${
                viewMode === 'slider' 
                  ? 'bg-atelier-950 text-white shadow-sm' 
                  : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <SplitSquareVertical className="w-3 h-3" />
              <span>Interactive Slider</span>
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all ${
                viewMode === 'side-by-side' 
                  ? 'bg-atelier-950 text-white shadow-sm' 
                  : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Side-by-Side</span>
            </button>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-wider text-atelier-400 font-mono hidden sm:inline">
          {viewMode === 'slider' ? 'Drag slider left / right' : 'Dual editorial view'}
        </span>
      </div>

      {/* Render View Mode */}
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-w-2xl bg-atelier-200 border border-atelier-300 shadow-editorial overflow-hidden select-none cursor-ew-resize group"
        >
          {/* After (Virtual Try-On) Image - Base Layer */}
          <img
            src={afterImage}
            alt="AI Virtual Try-On Result"
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          />

          {/* After Tag */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-atelier-950/85 backdrop-blur-md text-ivory-50 text-[10px] uppercase tracking-widest font-semibold flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-champagne-300" />
            <span>AI Virtual Try-On</span>
          </div>

          {/* Before (Original User Photo) Image - Clipped Overlay */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="Original User Photo"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none'
              }}
            />

            {/* Before Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/85 backdrop-blur-md text-atelier-900 text-[10px] uppercase tracking-widest font-semibold shadow-sm">
              Original Portrait
            </div>
          </div>

          {/* Divider Line & Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl pointer-events-none z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Circular Handle Knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-atelier-950 text-white border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
              <div className="flex items-center space-x-0.5 text-champagne-300">
                <span className="text-[10px] font-bold">‹</span>
                <span className="text-[10px] font-bold">›</span>
              </div>
            </div>
          </div>

          {/* Bottom caption bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-atelier-950/80 via-atelier-950/40 to-transparent p-4 z-10 text-white flex items-center justify-between">
            <span className="text-xs font-serif tracking-wider font-light">
              Garment: {outfitName}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-champagne-300">
              {sliderPosition < 50 ? 'Revealing Try-On' : 'Revealing Original'}
            </span>
          </div>
        </div>
      ) : (
        /* Side by Side Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {/* Original Photo */}
          <div className="flex flex-col bg-white border border-atelier-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-atelier-100 border-b border-atelier-200 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-atelier-800">
                Original User Photo
              </span>
              <span className="text-[10px] font-mono text-atelier-500">Source</span>
            </div>
            <div className="relative aspect-[3/4] bg-atelier-200 overflow-hidden">
              <img
                src={beforeImage}
                alt="Original Portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* AI Virtual Try-On Result */}
          <div className="flex flex-col bg-white border border-atelier-300 shadow-editorial overflow-hidden ring-1 ring-champagne-400">
            <div className="p-3 bg-atelier-950 text-white border-b border-atelier-900 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest font-semibold flex items-center space-x-1.5 text-champagne-200">
                <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
                <span>AI Virtual Try-On</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-mono text-champagne-400">
                Synthesized
              </span>
            </div>
            <div className="relative aspect-[3/4] bg-atelier-200 overflow-hidden">
              <img
                src={afterImage}
                alt="AI Virtual Try-On"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
