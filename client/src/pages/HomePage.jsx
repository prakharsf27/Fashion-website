import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Shirt, Camera, Wand2 } from 'lucide-react';
import Hero from '../components/Hero';
import OutfitCard from '../components/OutfitCard';
import KolorsShowcase from '../components/KolorsShowcase';
import { useTryOn } from '../context/TryOnContext';

export default function HomePage() {
  const { outfits, setActiveView, loadingOutfits } = useTryOn();

  // Featured outfits across categories (up to 8 items)
  const featuredOutfits = outfits.filter(o => o.featured).length >= 4 
    ? outfits.filter(o => o.featured).slice(0, 8) 
    : outfits.slice(0, 8);

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-atelier-50">
      {/* Editorial Hero Section */}
      <Hero />

      {/* Featured Collection Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-atelier-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-semibold block mb-2">
                Curated Wardrobe
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light">
                Featured Collection
              </h2>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => handleNavigate('outfits')}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-atelier-900 hover:text-champagne-700 transition-colors group"
              >
                <span>View All Outfits ({outfits.length})</span>
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

      {/* Simple, Professional 3-Step Walkthrough */}
      <section className="py-20 bg-atelier-50 border-b border-atelier-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-atelier-950 font-light mb-3">
              How Virtual Try-On Works
            </h2>
            <p className="text-xs sm:text-sm text-atelier-600 font-light leading-relaxed">
              Experience seamless fitting without leaving your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-atelier-100 text-atelier-900 flex items-center justify-center font-serif text-sm font-semibold mb-6">
                01
              </div>
              <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                Select An Outfit
              </h3>
              <p className="text-xs text-atelier-600 font-light leading-relaxed">
                Browse our collection of tailored separates, denim, eveningwear, and accessories to choose your look.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-atelier-100 text-atelier-900 flex items-center justify-center font-serif text-sm font-semibold mb-6">
                02
              </div>
              <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                Upload Your Photo
              </h3>
              <p className="text-xs text-atelier-600 font-light leading-relaxed">
                Upload a clear front-facing portrait or pick from our studio reference models to prepare the fitting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 border border-atelier-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-atelier-100 text-atelier-900 flex items-center justify-center font-serif text-sm font-semibold mb-6">
                03
              </div>
              <h3 className="font-serif text-xl text-atelier-950 font-normal mb-2">
                Visualize The Fit
              </h3>
              <p className="text-xs text-atelier-600 font-light leading-relaxed">
                Generate and compare the realistic result, inspect side-by-side angles, and download your final look.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => handleNavigate('tryon')}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-champagne-300" />
              <span>Start Virtual Try-On</span>
              <ArrowRight className="w-4 h-4 text-atelier-400" />
            </button>
          </div>

        </div>
      </section>

      {/* Genuine Try-On Results Showcase */}
      <KolorsShowcase />

      {/* Clean Call To Action Section */}
      <section className="py-20 bg-atelier-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] uppercase tracking-widest text-champagne-300 font-semibold block mb-3">
            Interactive Dressing Room
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light mb-4 text-ivory-50">
            Find Your Perfect Silhouette
          </h2>
          <p className="text-sm text-atelier-300 font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Discover how every garment complements your frame with our AI virtual styling technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('tryon')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-atelier-950 text-xs uppercase tracking-widest font-semibold hover:bg-champagne-200 transition-colors shadow-sm"
            >
              Try An Outfit Now
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('outfits')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-atelier-600 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 hover:border-white transition-colors"
            >
              Explore All Collections
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
