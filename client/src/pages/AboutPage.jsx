import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function AboutPage() {
  const { setActiveView } = useTryOn();

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-atelier-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-semibold block mb-3">
            About The Camerino
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-atelier-950 font-light tracking-tight mb-4">
            Discover Your Style. <br />
            <span className="italic text-champagne-700">Visualise Your Look.</span>
          </h1>
          <p className="text-sm sm:text-base text-atelier-600 max-w-xl mx-auto font-light leading-relaxed">
            THE CAMERINO is a modern digital fashion styling platform designed to bring 
            haute couture and ready-to-wear silhouettes into an interactive virtual dressing room.
          </p>
        </div>

        {/* Editorial Visual */}
        <div className="border border-atelier-300/80 bg-white p-3 shadow-sm mb-16">
          <div className="aspect-[16/9] overflow-hidden bg-atelier-100">
            <img
              src="/editorial/lumiere_cover.jpg"
              alt="Editorial presentation"
              className="w-full h-full object-cover filter contrast-[1.02]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85";
              }}
            />
          </div>
        </div>

        {/* Three Core Brand Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 border border-atelier-200 shadow-sm">
            <h3 className="font-serif text-xl text-atelier-950 font-normal mb-3">
              Curated Wardrobe
            </h3>
            <p className="text-xs text-atelier-600 font-light leading-relaxed">
              Every outfit in our collection is curated with precision, spanning tailored separates, premium denim, eveningwear, and refined accessories.
            </p>
          </div>

          <div className="bg-white p-8 border border-atelier-200 shadow-sm">
            <h3 className="font-serif text-xl text-atelier-950 font-normal mb-3">
              Realistic Fit
            </h3>
            <p className="text-xs text-atelier-600 font-light leading-relaxed">
              Powered by advanced virtual try-on technology, garments naturally conform to body contours and posture without distorting fabric drape.
            </p>
          </div>

          <div className="bg-white p-8 border border-atelier-200 shadow-sm">
            <h3 className="font-serif text-xl text-atelier-950 font-normal mb-3">
              Privacy First
            </h3>
            <p className="text-xs text-atelier-600 font-light leading-relaxed">
              Your photographs are used exclusively for your active styling session, with instant deletion controls and complete data security.
            </p>
          </div>
        </div>

        {/* Call To Action */}
        <div className="text-center bg-white p-10 border border-atelier-200 shadow-sm">
          <h2 className="font-serif text-2xl sm:text-3xl text-atelier-950 font-light mb-3">
            Experience The Fitting Room
          </h2>
          <p className="text-xs sm:text-sm text-atelier-600 font-light max-w-md mx-auto mb-8 leading-relaxed">
            Ready to explore? Browse our complete collection or start your virtual try-on session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('tryon')}
              className="w-full sm:w-auto px-8 py-3.5 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              <span>Try On An Outfit</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('outfits')}
              className="w-full sm:w-auto px-8 py-3.5 border border-atelier-300 text-atelier-900 text-xs uppercase tracking-widest font-semibold hover:bg-atelier-100 transition-all"
            >
              Browse Wardrobe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
