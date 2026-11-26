import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ExternalLink, ArrowRight, Layers, Eye } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { KolorsProvider } from '../services/KolorsProvider';

export default function KolorsShowcase() {
  const { showcaseList, setActiveView, setSelectedOutfit, outfits } = useTryOn();
  const [activeItem, setActiveItem] = useState(0);

  if (!showcaseList || showcaseList.length === 0) return null;

  const current = showcaseList[activeItem] || showcaseList[0];

  return (
    <section className="py-20 bg-atelier-100 border-t border-atelier-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-atelier-500 font-semibold mb-1">
              <span>Virtual Try-On Gallery</span>
              <span>•</span>
              <span>Before & After</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light">
              Try-On Results
            </h2>
            <p className="text-xs sm:text-sm text-atelier-600 font-light mt-1 max-w-xl leading-relaxed">
              Explore results generated with our virtual styling workflow, comparing source portraits, garment references, and the final fitted look.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {showcaseList.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => setActiveItem(idx)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                  activeItem === idx
                    ? 'bg-atelier-950 text-white shadow-sm font-semibold'
                    : 'bg-white text-atelier-700 border border-atelier-200 hover:border-atelier-400'
                }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Showcase Feature: 3-Image Triptych Display */}
        {current && (
          <div className="bg-white border border-atelier-300 p-6 sm:p-8 shadow-editorial">
            
            {/* Meta Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-atelier-100 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-mono">
                  {current.category}
                </span>
                <h3 className="font-serif text-2xl text-atelier-950 font-normal">
                  {current.outfitName}
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-atelier-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Verified Kolors Inference</span>
              </div>
            </div>

            {/* 3-Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. Person Photograph */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-atelier-700">
                    1. Person Photograph
                  </span>
                  <span className="text-[9px] uppercase font-mono text-atelier-400">Input</span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border border-atelier-200 overflow-hidden">
                  <img
                    src={current.personImage}
                    alt="Person Photograph"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* 2. Garment Reference */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-atelier-700">
                    2. Garment Reference
                  </span>
                  <span className="text-[9px] uppercase font-mono text-atelier-400">Reference</span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border border-atelier-200 overflow-hidden">
                  <img
                    src={current.garmentImage}
                    alt={current.outfitName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* 3. AI-Generated Kolors Result */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-champagne-600 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>3. Kolors AI Result</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-champagne-100 text-champagne-800">
                    Generated
                  </span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border-2 border-champagne-400/80 shadow-md overflow-hidden">
                  <img
                    src={current.resultImage}
                    alt="Kolors Try-On Result"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

            </div>

            {/* Notes & Actions Bar */}
            <div className="mt-6 pt-5 border-t border-atelier-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-atelier-600 font-light italic">
                "{current.notes || 'Full preservation of pose, drape geometry, and ambient shadows.'}"
              </p>

              <div className="flex items-center space-x-3">
                <a
                  href={KolorsProvider.spaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-atelier-300 hover:border-atelier-900 text-atelier-800 text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-colors"
                >
                  <span>Open Kolors Space</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const found = outfits.find(o => o.name === current.outfitName);
                    if (found) setSelectedOutfit(found);
                    setActiveView('tryon');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Try This Look
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
