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
    selectedOutfits,
    toggleOutfitSelection,
    removeOutfitFromEnsemble,
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

  const canProceed = Boolean(userPhotoPreview && (selectedOutfits?.length > 0 || selectedOutfit));

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
        
        {/* Header Bar */}
        <div className="border-b border-atelier-200 pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-atelier-500 font-semibold mb-1">
                <span>Interactive Dressing Room</span>
                <span>•</span>
                <span>Virtual Try-On</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light tracking-tight">
                Virtual Try-On Studio
              </h1>
              <p className="text-xs sm:text-sm text-atelier-600 font-light mt-1">
                Upload your photograph, select any outfit from the collection, and visualize your look.
              </p>
            </div>

            <a
              href={KolorsProvider.spaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white hover:bg-atelier-100 border border-atelier-300 text-[11px] text-atelier-800 font-medium flex items-center space-x-2 transition-colors self-start md:self-auto shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Kwai Kolors Space</span>
              <ExternalLink className="w-3 h-3 text-atelier-500" />
            </a>
          </div>
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

          {/* Section B: Select Your Outfit & Ensemble */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-atelier-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-atelier-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8C6D31] font-bold block">
                    Step 02 • Multi-Piece Ensemble
                  </span>
                  <h2 className="font-serif text-2xl text-atelier-950 font-normal">
                    Select Your Outfit & Ensemble
                  </h2>
                  <p className="text-xs text-atelier-600 font-light mt-0.5">
                    Select one or multiple pieces (e.g. Top, Jeans, Skirt, Footwear, Belt, Watch) to visualize your complete styled look.
                  </p>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#D9C49E] text-[#7A5B20] text-xs font-serif flex items-center justify-center font-bold">
                  B
                </span>
              </div>

              {/* Styled Ensemble Rack (Live Composed Look) */}
              <div className="mb-6 p-4 bg-[#FAF6EE] border border-[#D9C49E] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#B88E3E] animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-[#7A5B20] font-bold">
                      Your Styled Ensemble ({selectedOutfits?.length || 1} {selectedOutfits?.length === 1 ? 'Piece' : 'Pieces'})
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#8C6D31]">
                    Click items to toggle in/out of look
                  </span>
                </div>

                <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
                  {(selectedOutfits && selectedOutfits.length > 0 ? selectedOutfits : (selectedOutfit ? [selectedOutfit] : [])).map((item) => (
                    <div 
                      key={item.id}
                      className="relative flex-shrink-0 flex items-center space-x-2.5 bg-white border border-[#D9C49E] p-2 pr-3 shadow-xs group"
                    >
                      <img 
                        src={item.mainImage} 
                        alt={item.name}
                        className="w-10 h-12 object-cover object-top border border-atelier-200"
                      />
                      <div className="max-w-[120px]">
                        <span className="text-[8px] uppercase tracking-widest font-bold text-[#8C6D31] block truncate">
                          {item.category?.split('&')[0]}
                        </span>
                        <h5 className="font-serif text-xs text-atelier-950 font-medium truncate">
                          {item.name}
                        </h5>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOutfitFromEnsemble(item.id);
                        }}
                        className="w-5 h-5 rounded-full bg-atelier-100 hover:bg-rose-100 text-atelier-600 hover:text-rose-700 flex items-center justify-center text-xs transition-colors cursor-pointer"
                        title="Remove from ensemble"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
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

              {/* Horizontal Scroll / Grid Showcase of Outfits with Multi-Select */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[440px] overflow-y-auto pr-1">
                {filteredOutfits.map((outfit) => {
                  const isInEnsemble = (selectedOutfits || []).some(o => o.id === outfit.id) || (selectedOutfit && selectedOutfit.id === outfit.id);
                  return (
                    <div
                      key={outfit.id}
                      onClick={() => toggleOutfitSelection(outfit)}
                      className={`group cursor-pointer relative border transition-all duration-300 p-2 flex flex-col ${
                        isInEnsemble 
                          ? 'border-[#8C6D31] ring-2 ring-[#B88E3E] shadow-md bg-[#FAF6EE]' 
                          : 'border-atelier-200 hover:border-[#D9C49E] bg-white'
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-atelier-200 mb-2">
                        <img
                          src={outfit.mainImage}
                          alt={outfit.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {isInEnsemble && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#8C6D31] text-white flex items-center space-x-1 shadow-lg text-[9px] font-bold uppercase tracking-wider">
                            <Check className="w-3 h-3 text-[#FAF6EE]" />
                            <span>In Look</span>
                          </div>
                        )}
                        
                        {/* High-Contrast Luxury Category Pill */}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-white/95 border border-[#D9C49E] text-[#7A5B20] shadow-sm truncate max-w-[85%]">
                          {outfit.category.split('&')[0].trim()}
                        </span>
                      </div>

                      <h4 className="font-serif text-sm text-atelier-950 font-normal line-clamp-1 mb-0.5">
                        {outfit.name}
                      </h4>
                      <p className="text-[10px] text-[#4A4237] font-medium line-clamp-1">
                        {outfit.fabric || outfit.designer}
                      </p>

                      <div className="mt-2 pt-2 border-t border-atelier-100 flex items-center justify-between text-[10px]">
                        <span className={`font-semibold ${isInEnsemble ? 'text-[#7A5B20]' : 'text-atelier-500'}`}>
                          {isInEnsemble ? '✓ In Look' : '+ Add to Look'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openOutfitDetail(outfit);
                          }}
                          className="text-atelier-600 hover:text-atelier-950 underline"
                        >
                          Angles
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Quick Actions Note */}
            <div className="mt-6 pt-4 border-t border-atelier-200 flex items-center justify-between text-xs text-atelier-500">
              <span className="font-medium text-atelier-700">
                Readiness: {canProceed ? `✓ Ready with ${selectedOutfits?.length || 1} selected ${(selectedOutfits?.length || 1) === 1 ? 'piece' : 'pieces'}` : 'Awaiting portrait & outfit piece'}
              </span>
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
