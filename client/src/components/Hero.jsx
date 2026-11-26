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
    <section className="relative bg-atelier-50 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Enlarged, Majestic Editorial Typography */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
            
            {/* Prominent Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-[#FAF6EE] border border-[#D9C49E] text-[#8C6D31] text-xs uppercase tracking-[0.25em] font-bold mb-6 shadow-sm self-center lg:self-start">
              <span className="w-2 h-2 rounded-full bg-[#B88E3E] animate-pulse"></span>
              <span>Virtual Dressing Room</span>
            </div>

            {/* Substantial, Large Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] tracking-tight text-atelier-950 leading-[0.95] mb-8 font-light">
              Your Style, <br />
              <span className="italic font-normal text-[#9E7B35]">Your Way.</span>
            </h1>

            {/* Enlarged, Highly Readable Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-atelier-800 max-w-2xl font-light leading-relaxed mb-10 mx-auto lg:mx-0">
              Discover curated designer silhouettes across tailoring, denim, footwear, and accessories. 
              Select your outfits, upload your portrait, and visualize complete looks instantly in our virtual atelier.
            </p>

            {/* Clear, Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                type="button"
                onClick={() => handleNavigate('tryon')}
                className="w-full sm:w-auto px-8 py-4 bg-atelier-950 text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#8C6D31] transition-all flex items-center justify-center space-x-3 shadow-md group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E5C989] group-hover:rotate-12 transition-transform" />
                <span>Try Your Look</span>
                <ArrowRight className="w-4 h-4 text-atelier-400 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('outfits')}
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#D9C49E] text-[#6B5324] hover:text-atelier-950 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#FAF6EE] hover:border-[#8C6D31] transition-all flex items-center justify-center space-x-2.5 shadow-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8C6D31]" />
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Balanced Luxury Metrics Bar */}
            <div className="pt-8 border-t border-[#E8DEC9] grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-light text-atelier-950">21</p>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#8C6D31] font-semibold mt-1">
                  Curated Pieces
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-light text-atelier-950">Neural</p>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#8C6D31] font-semibold mt-1">
                  Virtual Try-On
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-light text-atelier-950">7 Angles</p>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#8C6D31] font-semibold mt-1">
                  Multi-View Fit
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Editorial Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden border border-[#D9C49E] bg-white p-3 shadow-editorial">
                <div className="relative aspect-[3/4] overflow-hidden bg-atelier-100">
                  <img
                    src="/editorial/lumiere_cover.jpg"
                    alt="The Camerino Editorial Presentation"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#E5C989] font-bold mb-1">
                      Featured Silhouette
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
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
