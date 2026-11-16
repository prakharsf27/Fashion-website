import React from 'react';
import { Sparkles, ArrowRight, Layers, Compass, Scissors, Award, Wand2 } from 'lucide-react';
import Hero from '../components/Hero';
import OutfitCard from '../components/OutfitCard';
import { useTryOn } from '../context/TryOnContext';

export default function HomePage() {
  const { outfits, setActiveView, loadingOutfits, openOutfitDetail } = useTryOn();

  // Featured outfits (first 3-4 items)
  const featuredOutfits = outfits.slice(0, 4);

  return (
    <div className="min-h-screen bg-atelier-50">
      {/* Editorial Hero Section */}
      <Hero />

      {/* Featured Collection Section (NOIRÉ Inspired Luxury Grid) */}
      <section className="py-20 border-t border-atelier-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-atelier text-atelier-500 font-semibold mb-2">
                <span>SS'26 Capsule</span>
                <span>•</span>
                <span>Atelier Wardrobe</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light">
                Featured Outfits
              </h2>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  setActiveView('outfits');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-atelier-900 hover:text-champagne-600 transition-colors group"
              >
                <span>View Full Wardrobe ({outfits.length} Outfits)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Outfits Grid */}
          {loadingOutfits ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-[3/4] bg-atelier-100 animate-pulse border border-atelier-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredOutfits.map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Editorial Three-Step Walkthrough: The Virtual Fitting Experience */}
      <section className="py-24 bg-atelier-100 border-t border-atelier-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-atelier text-champagne-600 font-semibold block mb-2">
              Neural Dressing Room Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-atelier-950 font-light mb-4">
              How Virtual Try-On Reimagines Fashion Fitting
            </h2>
            <p className="text-sm text-atelier-600 font-light leading-relaxed">
              Developed as a NIFT design thesis, this platform synthesizes computer vision with garment draping algorithms 
              to provide a photorealistic representation of scale, fall, and silhouette.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-serif text-4xl text-atelier-300 font-light block mb-4">
                  01
                </span>
                <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                  Select Couture Silhouette
                </h3>
                <p className="text-xs text-atelier-600 font-light leading-relaxed">
                  Browse the atelier collection comprising Indian traditional zardozi, modern tailoring, and sculptural gowns, each documented across 6–7 angles.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-atelier-100 flex items-center space-x-2 text-[11px] uppercase tracking-wider text-atelier-500 font-medium">
                <Scissors className="w-3.5 h-3.5 text-atelier-400" />
                <span>6+ Curated Outfits</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-serif text-4xl text-atelier-300 font-light block mb-4">
                  02
                </span>
                <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                  Upload User Portrait
                </h3>
                <p className="text-xs text-atelier-600 font-light leading-relaxed">
                  Provide your own photograph or select an exhibition model. The system detects posture, shoulder width, and lighting to prepare the drape surface.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-atelier-100 flex items-center space-x-2 text-[11px] uppercase tracking-wider text-atelier-500 font-medium">
                <Layers className="w-3.5 h-3.5 text-atelier-400" />
                <span>Pose & Posture Match</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-serif text-4xl text-atelier-300 font-light block mb-4">
                  03
                </span>
                <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                  Visualise & Compare
                </h3>
                <p className="text-xs text-atelier-600 font-light leading-relaxed">
                  Inspect the synthesized look using an interactive before-and-after split slider, side-by-side comparison, and export a high-resolution fashion portfolio card.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-atelier-100 flex items-center space-x-2 text-[11px] uppercase tracking-wider text-atelier-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                <span>Interactive Split Slider</span>
              </div>
            </div>

          </div>

          {/* Direct CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                setActiveView('tryon');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all shadow-editorial"
            >
              <Sparkles className="w-4 h-4 text-champagne-300" />
              <span>Enter The Virtual Dressing Room</span>
              <ArrowRight className="w-4 h-4 text-atelier-400" />
            </button>
          </div>

        </div>
      </section>

      {/* Editorial Lookbook Banner (NOIRÉ & LUMIÈRE moodboard) */}
      <section className="py-20 bg-atelier-900 text-ivory-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-[11px] uppercase tracking-atelier text-champagne-300 font-semibold block mb-2">
                NIFT Design Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight mb-6">
                Where Sartorial Craft Meets Generative Intelligence
              </h2>
              <p className="text-sm text-atelier-300 font-light leading-relaxed mb-8">
                Traditional fashion presentations rely on physical runways and static lookbooks. 
                <strong> The Fit Room</strong> demonstrates how neural virtual try-on empowers designers to exhibit complex silhouettes, 
                letting viewers immediately embody the garment.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 border border-champagne-400/60 text-champagne-200 text-xs uppercase tracking-widest font-medium hover:bg-champagne-400 hover:text-atelier-950 transition-colors"
                >
                  Read Exhibition Thesis
                </button>
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-atelier-800 text-atelier-200 text-xs uppercase tracking-widest font-medium hover:bg-atelier-700 transition-colors"
                >
                  Manage Outfits (Admin)
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-atelier-700 p-3 bg-atelier-800/60 shadow-2xl">
                <img
                  src="/editorial/noire_catalog.jpg"
                  alt="Noiré Luxury Fashion Collection Reference"
                  className="w-full object-cover shadow-md"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85";
                  }}
                />
                <div className="mt-2 flex items-center justify-between text-[10px] text-atelier-400 font-mono">
                  <span>CURATED EDITORIAL ARCHIVE</span>
                  <span>SS'26 ATELIER</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
