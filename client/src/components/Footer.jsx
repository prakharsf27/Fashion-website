import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Footer() {
  const { setActiveView } = useTryOn();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    scrollToTop();
  };

  return (
    <footer className="bg-atelier-950 text-white border-t border-atelier-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-atelier-800">
          
          {/* Brand Info */}
          <div className="md:col-span-6">
            <h3 className="font-serif text-3xl uppercase tracking-widest font-light text-white mb-2">
              The Camerino
            </h3>
            <p className="font-serif italic text-sm text-champagne-300 mb-4">
              Discover your style. Visualise your look.
            </p>
            <p className="text-xs text-atelier-400 font-light leading-relaxed max-w-md">
              A modern fashion styling and virtual try-on platform allowing users to explore 
              designer garments, accessories, and silhouettes, visualized seamlessly on personal photographs.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne-300 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-atelier-300">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('outfits')}
                  className="hover:text-white transition-colors"
                >
                  Explore Outfits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('tryon')}
                  className="hover:text-white transition-colors"
                >
                  Virtual Try-On
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Info & Administration */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne-300 font-semibold mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-atelier-300">
              <li>
                <button 
                  onClick={() => handleNavClick('admin')}
                  className="hover:text-white transition-colors"
                >
                  Wardrobe Management
                </button>
              </li>
              <li className="text-atelier-400">
                <span>Powered by Kwai Kolors</span>
              </li>
              <li className="text-atelier-400">
                <span>High-Fidelity AI Fitting</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-atelier-500 font-light gap-4">
          <p>© 2026 THE CAMERINO. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-atelier-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
