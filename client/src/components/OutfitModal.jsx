import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, Check, Tag, Scissors, Sparkle } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function OutfitModal() {
  const { activeModalOutfit, closeOutfitDetail, navigateToTryOnWithOutfit } = useTryOn();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    setSelectedPhotoIndex(0);
  }, [activeModalOutfit]);

  if (!activeModalOutfit) return null;

  const images = (activeModalOutfit.images && activeModalOutfit.images.length > 0)
    ? activeModalOutfit.images
    : [activeModalOutfit.mainImage];

  const currentImage = images[selectedPhotoIndex] || activeModalOutfit.mainImage;

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-atelier-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-atelier-50 border border-atelier-200/90 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeOutfitDetail}
          className="absolute top-4 right-4 z-30 p-2.5 bg-atelier-950/70 hover:bg-atelier-950 text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Interactive Photography Showcase (6-7 Photos) */}
          <div className="lg:col-span-7 bg-atelier-100 flex flex-col p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-atelier-200">
            
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-atelier-200 overflow-hidden shadow-inner mb-4 flex items-center justify-center group">
              <img
                src={currentImage}
                alt={`${activeModalOutfit.name} view ${selectedPhotoIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Prev / Next Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-atelier-950 rounded-full shadow-md transition-all opacity-80 hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-atelier-950 rounded-full shadow-md transition-all opacity-80 hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-3 right-3 bg-atelier-950/80 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono">
                View {selectedPhotoIndex + 1} of {images.length}
              </div>
            </div>

            {/* Gallery Thumbnails Strip (All 6-7 Photographs) */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-atelier-500 font-semibold mb-2">
                Garment Angles & Details ({images.length} Photos)
              </p>
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 border-2 overflow-hidden transition-all ${
                      selectedPhotoIndex === idx
                        ? 'border-atelier-950 ring-2 ring-champagne-400 scale-105'
                        : 'border-atelier-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Garment Specifications & CTAs */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-atelier-50">
            <div>
              {/* Category & Designer Tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-atelier-200/80 text-atelier-800 font-medium">
                  {activeModalOutfit.category}
                </span>
                <span className="text-xs font-mono text-atelier-500">
                  {activeModalOutfit.season || 'SS 2026'}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl text-atelier-950 font-normal leading-tight mb-2">
                {activeModalOutfit.name}
              </h2>

              <p className="text-xs uppercase tracking-widest text-champagne-600 font-medium mb-5">
                Designer: {activeModalOutfit.designer || 'Atelier NIFT'}
              </p>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-widest text-atelier-400 font-bold mb-1.5">
                  Design Narrative & Drape
                </h4>
                <p className="text-xs sm:text-sm text-atelier-700 font-light leading-relaxed">
                  {activeModalOutfit.description}
                </p>
              </div>

              {/* Material & Construction Specs */}
              <div className="space-y-3 py-4 border-y border-atelier-200/80 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                    Fabrication & Textile
                  </span>
                  <span className="text-xs text-atelier-900 font-medium">
                    {activeModalOutfit.fabric || 'Textile composition curated for neural rendering'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                    Silhouette & Cut
                  </span>
                  <span className="text-xs text-atelier-900 font-medium">
                    {activeModalOutfit.silhouette || 'Architectural Tailoring'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                    Color Palette
                  </span>
                  <span className="text-xs text-atelier-900 font-medium">
                    {activeModalOutfit.color || 'Editorial Neutrals'}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {activeModalOutfit.tags && activeModalOutfit.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeModalOutfit.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 text-[10px] font-mono text-atelier-600 bg-atelier-100 border border-atelier-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => navigateToTryOnWithOutfit(activeModalOutfit)}
                className="w-full py-3.5 px-6 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all shadow-editorial"
              >
                <Sparkles className="w-4 h-4 text-champagne-300" />
                <span>Try This Outfit on Me</span>
              </button>

              <button
                onClick={closeOutfitDetail}
                className="w-full py-2.5 text-xs uppercase tracking-wider text-atelier-600 hover:text-atelier-900 transition-colors"
              >
                Back to Collection
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
