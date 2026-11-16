import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Footer() {
  const { setActiveView } = useTryOn();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-atelier-950 text-ivory-50 border-t border-atelier-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-atelier-800">
          
          {/* Brand & Thesis Statement */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-3xl sm:text-4xl uppercase tracking-widest font-light text-white mb-2">
              The Fit Room
            </h3>
            <p className="font-serif italic text-sm text-champagne-300 mb-4">
              Discover your style. Visualise your look.
            </p>
            <p className="text-xs text-atelier-400 font-light leading-relaxed max-w-sm mb-6">
              A high-fashion technology platform bridging haute couture draping, bespoke garment archiving, and interactive neural virtual try-on.
            </p>
            <div className="inline-flex items-center space-x-2 text-[11px] text-atelier-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-champagne-400"></span>
              <span>Maison Atelier • SS'26 Lookbook Edition</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne-300 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-atelier-300">
              <li>
                <button 
                  onClick={() => { setActiveView('home'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Home Editorial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('outfits'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Wardrobe & Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('tryon'); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-champagne-400" />
                  <span>Virtual Try-On Room</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('about'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Atelier Philosophy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('admin'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Atelier Wardrobe Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Exhibition Specs & Credits */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-champagne-300 font-semibold mb-4">
              Atelier & Technology Credits
            </h4>
            <div className="space-y-2 text-xs text-atelier-400 font-light leading-relaxed">
              <p>
                <strong className="text-atelier-200 font-medium">Maison:</strong> The Fit Room Atelier
              </p>
              <p>
                <strong className="text-atelier-200 font-medium">Virtual Try-On:</strong> Kwai Kolors Neural Diffusion Engine
              </p>
              <p>
                <strong className="text-atelier-200 font-medium">Architecture:</strong> React, Tailwind CSS, Express & Multi-Angle Draping Pipeline
              </p>
              <p className="pt-2 text-[11px] text-atelier-500 font-mono">
                Curated for bespoke styling and digital runway presentation.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-atelier-500 font-light gap-4">
          <p>© {new Date().getFullYear()} The Fit Room • Luxury Fashion Virtual Try-On. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-atelier-400 hover:text-white transition-colors text-xs uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
