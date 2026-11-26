import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Hero() {
  const { setActiveView } = useTryOn();

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-atelier-50 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-atelier-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clear, Professional Editorial Typography */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-atelier-500 font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-600"></span>
              <span>Virtual Dressing Room</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-atelier-950 leading-[1.0] mb-6 font-light">
              Your Style, <br />
              <span className="italic font-normal text-champagne-700">Your Way.</span>
            </h1>

            <p className="text-base sm:text-lg text-atelier-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-8">
              Discover curated designer silhouettes across tailoring, denim, and accessories. 
              Select your outfit, upload your photo, and visualize your look instantly.
            </p>

            {/* Clear, Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() => handleNavigate('tryon')}
                className="w-full sm:w-auto px-8 py-4 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all flex items-center justify-center space-x-3 shadow-sm group"
              >
                <Sparkles className="w-4 h-4 text-champagne-300 group-hover:rotate-12 transition-transform" />
                <span>Try Your Look</span>
                <ArrowRight className="w-4 h-4 text-atelier-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('outfits')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-atelier-300 text-atelier-900 text-xs uppercase tracking-widest font-semibold hover:bg-atelier-100 hover:border-atelier-950 transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4 text-atelier-600" />
                <span>Explore Collection</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Editorial Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden border border-atelier-300/80 bg-white p-2.5 shadow-sm">
                <div className="relative aspect-[3/4] overflow-hidden bg-atelier-100">
                  <img
                    src="/editorial/lumiere_cover.jpg"
                    alt="Editorial Fashion Presentation"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[10px] tracking-widest uppercase text-champagne-300 font-semibold mb-1">
                      Featured Silhouette
                    </p>
                    <h3 className="font-serif text-2xl font-light text-ivory-50">
                      The Editorial Collection
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
