import React, { useState } from 'react';
import { Sparkles, Check, ChevronRight, Layers, Info, ShieldCheck, Key, Settings2, ExternalLink } from 'lucide-react';
import PhotoUploader from '../components/PhotoUploader';
import KolorsHandoff from '../components/KolorsHandoff';
import KolorsShowcase from '../components/KolorsShowcase';
import { useTryOn } from '../context/TryOnContext';
import { KolorsProvider } from '../services/KolorsProvider';

export default function TryOnPage() {
  const {
    outfits,
    selectedOutfit,
    setSelectedOutfit,
    userPhotoPreview,
    executeTryOn,
    isProcessing,
    processingStage,
    aiStatus,
    openOutfitDetail
  } = useTryOn();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showApiSettings, setShowApiSettings] = useState(false);

  const categories = ['All', ...Array.from(new Set(outfits.map(o => o.category).filter(Boolean)))];

  const filteredOutfits = outfits.filter(o => 
    categoryFilter === 'All' || 
    o.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
    categoryFilter.toLowerCase().includes(o.category.toLowerCase())
  );

  const canProceed = Boolean(userPhotoPreview && selectedOutfit);

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-16 relative">
      
      {/* Couture Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-atelier-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in text-white">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border-2 border-champagne-400/30 animate-ping absolute inset-0" />
            <div className="w-24 h-24 rounded-full border-t-2 border-r-2 border-champagne-300 animate-spin flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-champagne-400 animate-pulse" />
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-atelier text-champagne-300 font-semibold mb-2">
            Kwai Kolors Virtual Try-On In Progress
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light mb-3">
            Synthesizing Your Couture Look
          </h2>

          <p className="text-sm font-light text-atelier-300 max-w-md mx-auto mb-6 h-8 animate-fade-in">
            {processingStage || 'Analyzing silhouette posture & lighting contours...'}
          </p>

          <div className="w-64 h-1 bg-atelier-800 rounded-full overflow-hidden">
            <div className="h-full bg-champagne-400 animate-[pulse_1.5s_ease-in-out_infinite] w-full" />
          </div>

          <p className="text-[10px] text-atelier-500 font-mono mt-6 uppercase tracking-wider">
            Kwai Kolors Neural Diffusion Pipeline • High-Fidelity Draping
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Status Indicator */}
        <div className="border-b border-atelier-200/90 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-atelier text-champagne-600 font-semibold mb-2">
                <span>The Interactive Dressing Room</span>
                <span>•</span>
                <span>Powered by Kwai Kolors</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl text-atelier-950 font-light tracking-tight">
                Virtual Try-On Studio
              </h1>
              <p className="text-xs sm:text-sm text-atelier-600 font-light mt-1 max-w-2xl leading-relaxed">
                Upload your portrait, select a haute couture garment from the wardrobe, and launch the 
                <strong className="text-atelier-900 font-medium"> official Kwai Kolors Virtual Try-On</strong> workflow.
              </p>
            </div>

            {/* AI Status Badge & Settings Toggle */}
            <div className="flex items-center space-x-3">
              <a
                href={KolorsProvider.spaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-atelier-100 hover:bg-atelier-200 border border-atelier-300 text-[11px] text-atelier-800 font-mono flex items-center space-x-2 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Kwai Kolors Space</span>
                <ExternalLink className="w-3 h-3 text-atelier-500" />
              </a>
              
              <button
                onClick={() => setShowApiSettings(!showApiSettings)}
                className="p-2 bg-atelier-100 hover:bg-atelier-200 border border-atelier-300 text-atelier-700 hover:text-atelier-950 transition-colors"
                title="View Kolors Architecture & Provider Info"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expandable Architecture & Provider Info */}
          {showApiSettings && (
            <div className="mt-4 p-4 bg-white border border-atelier-300 text-xs shadow-sm max-w-xl animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold uppercase tracking-wider text-atelier-900 flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-champagne-600" />
                  <span>Kwai Kolors Provider Architecture</span>
                </span>
                <span className="text-[10px] text-atelier-500 font-mono">Handoff Mode</span>
              </div>
              <p className="text-atelier-600 font-light mb-3">
                Because the official public Hugging Face Space disables embedding and direct Gradio API calls, 
                The Fit Room integrates a manual handoff concierge: you download the prepared person and garment assets, 
                run inference on the official Space, and upload the generated result.
              </p>
              <div className="text-[11px] bg-atelier-100 p-2.5 border border-atelier-200 text-atelier-700">
                <strong className="font-medium text-atelier-900">Future API Ready:</strong> 
                The frontend uses the <code>KolorsProvider</code> adapter. Once official documented API access is released by Kwai, the backend mode can be toggled without rewriting frontend components.
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Core Architecture: Section A (User Photo) + Section B (Outfit Selection) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Section A: Upload Your Photograph */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-atelier-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-atelier-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block">
                  Step 01
                </span>
                <h2 className="font-serif text-2xl text-atelier-950 font-normal">
                  Upload Your Photograph
                </h2>
              </div>
              <span className="w-8 h-8 rounded-full bg-atelier-100 text-atelier-800 text-xs font-serif flex items-center justify-center font-bold">
                A
              </span>
            </div>

            <PhotoUploader />
          </div>

          {/* Section B: Select Your Outfit */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-atelier-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-atelier-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block">
                    Step 02
                  </span>
                  <h2 className="font-serif text-2xl text-atelier-950 font-normal">
                    Select Your Outfit
                  </h2>
                </div>
                <span className="w-8 h-8 rounded-full bg-atelier-100 text-atelier-800 text-xs font-serif flex items-center justify-center font-bold">
                  B
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                      categoryFilter === cat
                        ? 'bg-atelier-950 text-white font-semibold'
                        : 'bg-atelier-100 text-atelier-700 hover:bg-atelier-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Horizontal Scroll / Grid Showcase of Outfits */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[440px] overflow-y-auto pr-1">
                {filteredOutfits.map((outfit) => {
                  const isSelected = selectedOutfit && selectedOutfit.id === outfit.id;
                  return (
                    <div
                      key={outfit.id}
                      onClick={() => setSelectedOutfit(outfit)}
                      className={`group cursor-pointer relative border transition-all duration-300 p-2 flex flex-col bg-atelier-50 ${
                        isSelected 
                          ? 'border-atelier-950 ring-2 ring-champagne-400 shadow-md bg-atelier-100/70' 
                          : 'border-atelier-200 hover:border-atelier-400'
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-atelier-200 mb-2">
                        <img
                          src={outfit.mainImage}
                          alt={outfit.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-atelier-950 text-white flex items-center justify-center shadow-lg">
                            <Check className="w-3.5 h-3.5 text-champagne-300" />
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-atelier-950/80 text-white backdrop-blur-sm truncate max-w-[85%]">
                          {outfit.category.split('&')[0].trim()}
                        </span>
                      </div>

                      <h4 className="font-serif text-sm text-atelier-950 font-normal line-clamp-1 mb-0.5">
                        {outfit.name}
                      </h4>
                      <p className="text-[10px] text-atelier-500 line-clamp-1">
                        {outfit.fabric || outfit.designer}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openOutfitDetail(outfit);
                        }}
                        className="mt-2 text-[10px] text-atelier-600 hover:text-atelier-950 underline self-start"
                      >
                        Inspect 6–7 Angles
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Selected Outfit Summary Card */}
              {selectedOutfit && (
                <div className="mt-6 p-4 bg-atelier-100/80 border border-atelier-300/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedOutfit.mainImage}
                      alt={selectedOutfit.name}
                      className="w-12 h-14 object-cover border border-atelier-300"
                    />
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-champagne-600 font-bold block">
                        Selected Silhouette
                      </span>
                      <h4 className="font-serif text-base text-atelier-950 font-normal">
                        {selectedOutfit.name}
                      </h4>
                      <p className="text-[11px] text-atelier-600 line-clamp-1">
                        {selectedOutfit.fabric}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openOutfitDetail(selectedOutfit)}
                    className="text-xs uppercase tracking-wider text-atelier-700 hover:text-atelier-950 font-medium underline"
                  >
                    View Angles
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions Note */}
            <div className="mt-6 pt-4 border-t border-atelier-200 flex items-center justify-between text-xs text-atelier-500">
              <span>Readiness: {canProceed ? 'Assets Ready for Kolors AI' : 'Awaiting portrait & outfit'}</span>
              {canProceed && (
                <button
                  type="button"
                  onClick={executeTryOn}
                  className="text-[11px] text-atelier-600 hover:text-atelier-950 underline"
                >
                  Quick Instant Simulation
                </button>
              )}
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* KOLORS VIRTUAL TRY-ON HANDOFF STUDIO                     */}
        {/* ======================================================== */}
        {canProceed && <KolorsHandoff />}

        {/* ======================================================== */}
        {/* THREE SHOWCASE RESULTS ARCHIVE                           */}
        {/* ======================================================== */}
        <div className="mt-16">
          <KolorsShowcase />
        </div>

      </div>
    </div>
  );
}
