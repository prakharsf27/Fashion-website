import React from 'react';
import { Sparkles, ArrowRight, Eye, ShieldCheck, Compass } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Hero() {
  const { setActiveView } = useTryOn();

  return (
    <section className="relative overflow-hidden bg-atelier-50 pt-8 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Editorial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-champagne-200/40 rounded-full blur-[130px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Masthead / Header tag */}
        {/* <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-atelier-300/80 bg-atelier-100/70 backdrop-blur-sm rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 animate-ping" />
            <span className="text-[11px] uppercase tracking-widest text-atelier-700 font-medium">
              Haute Couture Virtual Dressing Room • SS'26 Editorial
            </span>
          </div>
        </div> */}

        {/* Hero Grid: Editorial Typography + Editorial Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <p className="font-serif italic text-xl sm:text-2xl text-atelier-600 mb-2 font-normal">
              An atelier of light, form, and neural drape
            </p>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-atelier-950 leading-[0.95] mb-6 font-light">
              Your Style, <br />
              <span className="italic font-normal font-serif text-champagne-600">Your Way.</span>
            </h1>

            <p className="text-base sm:text-lg text-atelier-700 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-8">
              Explore an haute couture collection developed by our international atelier. 
              Upload your photograph and experience state-of-the-art AI neural virtual try-on that realistically maps 
              garment drape, textile weight, and silhouettes directly to your body.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              {/* <button
                onClick={() => {
                  setActiveView('tryon');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-atelier-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-atelier-800 transition-all duration-300 shadow-editorial flex items-center justify-center space-x-3 group"
              >
                <Sparkles className="w-4 h-4 text-champagne-300 group-hover:rotate-12 transition-transform" />
                <span>Try Your Look</span>
                <ArrowRight className="w-4 h-4 text-atelier-400 group-hover:translate-x-1 transition-transform" />
              </button> */}

              <button
                onClick={() => {
                  setActiveView('outfits');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-atelier-300 text-atelier-900 text-xs uppercase tracking-widest font-medium hover:bg-atelier-100 hover:border-atelier-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4 text-atelier-600" />
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Micro-metrics & Credits */}
            <div className="pt-6 border-t border-atelier-200/80 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <p className="font-serif text-2xl font-light text-atelier-950">6–7</p>
                <p className="text-[11px] uppercase tracking-wider text-atelier-500 font-medium">Angles per Outfit</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-atelier-950">Neural</p>
                <p className="text-[11px] uppercase tracking-wider text-atelier-500 font-medium">Virtual Try-On</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-atelier-950">SS'26</p>
                <p className="text-[11px] uppercase tracking-wider text-atelier-500 font-medium">Curated Wardrobe</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Composition (Inspired by Lumière cover) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Frame */}
              <div className="relative z-10 rounded-sm overflow-hidden border border-atelier-200 shadow-editorial bg-atelier-100 p-2 sm:p-3">
                <div className="relative aspect-[3/4] overflow-hidden bg-atelier-200">
                  <img
                    src="/editorial/lumiere_cover.jpg"
                    alt="Lumière Editorial Inspiration"
                    className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      // Fallback if local image missing
                      e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85";
                    }}
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/70 via-transparent to-black/10" />

                  {/* Editorial Floating Typography Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-[10px] tracking-atelier uppercase text-champagne-300 font-medium mb-1">
                      Atelier Feature
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-ivory-50 mb-1">
                      Lumière Column Drape
                    </h3>
                    <p className="text-xs text-atelier-200/90 font-light line-clamp-1">
                      Mulberry silk faille • Dynamic gravity draping
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Floating Accent Card */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-atelier-50/95 backdrop-blur-md border border-atelier-200/90 p-4 shadow-editorial max-w-[210px] hidden sm:block">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-atelier-900">
                    AI Try-On Ready
                  </span>
                </div>
                <p className="text-[11px] text-atelier-600 leading-snug">
                  Upload portrait to drape this garment in real-time.
                </p>
              </div>

              {/* Floating Monogram Stamp */}
              <div className="absolute -top-4 -right-4 z-20 w-16 h-16 rounded-full bg-atelier-950 text-white flex flex-col items-center justify-center shadow-lg border border-atelier-800">
                <span className="text-[9px] uppercase tracking-widest text-champagne-400 font-bold">PARIS</span>
                <span className="text-[10px] font-serif italic text-white/80">Atelier</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
