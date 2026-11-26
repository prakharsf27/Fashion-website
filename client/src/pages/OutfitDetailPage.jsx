import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight, Layers, Tag, Scissors, Compass } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { fetchOutfitById } from '../utils/api';

export default function OutfitDetailPage() {
  const { 
    detailOutfitId, 
    setActiveView, 
    navigateToTryOnWithOutfit, 
    outfits 
  } = useTryOn();

  const [outfit, setOutfit] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!detailOutfitId) {
      if (outfits.length > 0) {
        setOutfit(outfits[0]);
      }
      setLoading(false);
      return;
    }

    // Try finding in local context first
    const found = outfits.find(o => o.id === detailOutfitId);
    if (found) {
      setOutfit(found);
      setLoading(false);
    } else {
      fetchOutfitById(detailOutfitId)
        .then(data => {
          setOutfit(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [detailOutfitId, outfits]);

  if (loading) {
    return (
      <div className="min-h-screen bg-atelier-50 py-24 text-center">
        <div className="w-12 h-12 border-2 border-champagne-400 border-t-atelier-950 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest text-atelier-500 font-mono">Loading Garment Details...</p>
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="min-h-screen bg-atelier-50 py-24 text-center px-4">
        <h2 className="font-serif text-3xl text-atelier-950 mb-3">Garment Not Found</h2>
        <button
          onClick={() => setActiveView('outfits')}
          className="px-6 py-3 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold"
        >
          Return to Wardrobe
        </button>
      </div>
    );
  }

  const images = (outfit.images && outfit.images.length > 0)
    ? outfit.images
    : [outfit.mainImage];

  const currentImage = images[selectedPhotoIndex] || outfit.mainImage;

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setActiveView('outfits')}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-atelier-600 hover:text-atelier-950 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: 6-7 Photography Angles Gallery */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 border border-atelier-200 shadow-sm flex flex-col">
            
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[3/4] w-full bg-atelier-100 overflow-hidden mb-4">
              <img
                src={currentImage}
                alt={`${outfit.name} view ${selectedPhotoIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedPhotoIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-atelier-950 rounded-full shadow-md transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-atelier-950 rounded-full shadow-md transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-atelier-950/80 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono">
                View {selectedPhotoIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-atelier-500 font-semibold mb-2">
                All Captured Angles ({images.length} Photographs)
              </p>
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-20 border-2 overflow-hidden transition-all ${
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

          {/* Right Column: Garment Information & Specs */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-atelier-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#FAF6EE] border border-[#D9C49E] text-[#7A5B20] font-bold shadow-xs">
                  {outfit.category}
                </span>
                <span className="text-xs font-mono text-atelier-500">
                  {outfit.season || "SS'26"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-atelier-950 font-normal leading-tight mb-2">
                {outfit.name}
              </h1>

              <p className="text-xs uppercase tracking-widest text-champagne-600 font-medium mb-4">
                Designer: {outfit.designer || 'Atelier Haute Couture'}
              </p>

              <p className="text-xs sm:text-sm text-atelier-600 font-light leading-relaxed mb-6">
                {outfit.description}
              </p>
            </div>

            {/* Material & Construction Specs */}
            <div className="space-y-3 py-4 border-y border-atelier-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                  Fabrication & Weave
                </span>
                <span className="text-xs text-atelier-900 font-medium">
                  {outfit.fabric || 'Luxury Textile Composition'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                  Silhouette & Cut
                </span>
                <span className="text-xs text-atelier-900 font-medium">
                  {outfit.silhouette || 'Editorial Tailoring'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-atelier-500 block font-semibold">
                  Color Palette
                </span>
                <span className="text-xs text-atelier-900 font-medium">
                  {outfit.color || 'Editorial Neutrals'}
                </span>
              </div>
            </div>

            {/* Direct Try On CTA */}
            <div className="pt-2">
              <button
                onClick={() => navigateToTryOnWithOutfit(outfit)}
                className="w-full py-4 px-6 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all shadow-editorial"
              >
                <Sparkles className="w-4 h-4 text-champagne-300" />
                <span>Try This Outfit in Virtual Dressing Room</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
