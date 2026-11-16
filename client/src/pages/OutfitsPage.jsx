import React, { useState } from 'react';
import { Search, Plus, Filter, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import OutfitCard from '../components/OutfitCard';
import { useTryOn } from '../context/TryOnContext';

export default function OutfitsPage() {
  const { outfits, setActiveView, loadingOutfits, openOutfitDetail } = useTryOn();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(outfits.map(o => o.category).filter(Boolean)))];

  // Filter outfits
  const filteredOutfits = outfits.filter((outfit) => {
    const matchesCategory = selectedCategory === 'All' || 
      outfit.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(outfit.category.toLowerCase());

    const matchesSearch = !searchQuery || 
      outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outfit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (outfit.fabric && outfit.fabric.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (outfit.tags && outfit.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-atelier-200/90 pb-8 mb-10 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-atelier text-champagne-600 font-semibold mb-2">
              <span>Maison Wardrobe Repository</span>
              <span>•</span>
              <span>{outfits.length} Couture Silhouettes</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-atelier-950 font-light tracking-tight">
              Wardrobe & Collections
            </h1>
            <p className="text-xs sm:text-sm text-atelier-600 max-w-xl font-light mt-2 leading-relaxed">
              Explore each curated piece designed for the seasonal haute couture showcase. 
              Every outfit features 6–7 high-resolution angles documenting drape, fabric structure, and silhouette.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 bg-atelier-100 hover:bg-atelier-200 text-atelier-900 text-xs uppercase tracking-wider font-medium border border-atelier-300 flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Outfit</span>
            </button>

            <button
              onClick={() => {
                setActiveView('tryon');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all shadow-editorial"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              <span>Virtual Dressing Room</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 bg-white p-4 border border-atelier-200 shadow-sm">
          
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-atelier-950 text-white shadow-sm font-semibold'
                    : 'bg-atelier-100/70 text-atelier-700 hover:bg-atelier-200 hover:text-atelier-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by silk, zardozi, gown, linen..."
              className="w-full bg-atelier-50 border border-atelier-200 py-2 pl-9 pr-4 text-xs text-atelier-950 placeholder-atelier-400 focus:outline-none focus:border-atelier-900 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-atelier-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-atelier-500 mb-6 font-light">
          <span>Showing {filteredOutfits.length} of {outfits.length} outfits</span>
          {selectedCategory !== 'All' && (
            <span className="font-mono text-[11px] text-atelier-600">Category: {selectedCategory}</span>
          )}
        </div>

        {/* Outfits Grid */}
        {loadingOutfits ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="aspect-[3/4] bg-atelier-100 animate-pulse border border-atelier-200" />
            ))}
          </div>
        ) : filteredOutfits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOutfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white border border-atelier-200 p-8 max-w-lg mx-auto shadow-sm">
            <Layers className="w-10 h-10 text-atelier-400 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-atelier-950 font-normal mb-2">
              No Outfits Found
            </h3>
            <p className="text-xs text-atelier-600 font-light mb-6">
              No garments matched your search or category filter. Try clearing the query or explore other categories.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-atelier-950 text-white text-xs uppercase tracking-wider font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
