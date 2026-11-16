import React from 'react';
import { Sparkles, Eye, Layers } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function OutfitCard({ outfit, onSelectForTryOn, onViewDetail }) {
  const { navigateToTryOnWithOutfit, openOutfitDetail } = useTryOn();

  const handleTryClick = (e) => {
    e.stopPropagation();
    if (onSelectForTryOn) {
      onSelectForTryOn(outfit);
    } else {
      navigateToTryOnWithOutfit(outfit);
    }
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    if (onViewDetail) {
      onViewDetail(outfit);
    } else {
      openOutfitDetail(outfit);
    }
  };

  const photoCount = outfit.images ? outfit.images.length : 1;

  return (
    <div 
      onClick={handleViewClick}
      className="group cursor-pointer flex flex-col bg-white border border-atelier-200/80 hover:border-atelier-400 transition-all duration-300 shadow-sm hover:shadow-editorial rounded-none overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-atelier-100">
        <img
          src={outfit.mainImage}
          alt={outfit.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-atelier-950/80 backdrop-blur-md text-ivory-50 rounded-none">
            {outfit.category}
          </span>
        </div>

        {/* Photos Count Indicator */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-white/85 backdrop-blur-md text-atelier-800 flex items-center space-x-1">
            <Layers className="w-2.5 h-2.5 text-atelier-500" />
            <span>{photoCount} Views</span>
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              onClick={handleViewClick}
              className="py-2.5 px-3 bg-white/95 text-atelier-950 hover:bg-white text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Eye className="w-3 h-3 text-atelier-700" />
              <span>View Outfit</span>
            </button>

            <button
              onClick={handleTryClick}
              className="py-2.5 px-3 bg-atelier-950 text-white hover:bg-champagne-600 text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-champagne-300" />
              <span>Try On</span>
            </button>
          </div>
        </div>
      </div>

      {/* Outfit Information (Editorial NOIRÉ style) */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white border-t border-atelier-100">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-medium">
              {outfit.season || 'Atelier Collection'}
            </span>
            <span className="text-[10px] font-mono text-atelier-400">
              {outfit.designer ? outfit.designer.split(' ')[0] : 'Atelier'}
            </span>
          </div>

          <h3 className="font-serif text-lg text-atelier-950 font-normal leading-snug group-hover:text-atelier-700 transition-colors line-clamp-1 mb-1">
            {outfit.name}
          </h3>

          <p className="text-xs text-atelier-600 line-clamp-2 font-light leading-relaxed mb-3">
            {outfit.fabric || outfit.description}
          </p>
        </div>

        {/* Buttons Bar */}
        <div className="pt-3 border-t border-atelier-100 flex items-center justify-between gap-2">
          <button
            onClick={handleViewClick}
            className="text-[11px] uppercase tracking-wider font-medium text-atelier-700 hover:text-atelier-950 transition-colors flex items-center space-x-1 py-1"
          >
            <span>Details</span>
          </button>

          <button
            onClick={handleTryClick}
            className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold bg-atelier-100 hover:bg-atelier-950 hover:text-white text-atelier-900 transition-all duration-200 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3 h-3 text-champagne-500" />
            <span>Try This Outfit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
