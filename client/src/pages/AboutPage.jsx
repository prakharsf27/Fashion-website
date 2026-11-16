import React from 'react';
import { Sparkles, Compass, ShieldCheck, Cpu, Layers, Scissors, Award, ArrowRight } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function AboutPage() {
  const { setActiveView } = useTryOn();

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Masthead */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-atelier-300 bg-atelier-100 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-500"></span>
            <span className="text-[11px] uppercase tracking-widest text-atelier-700 font-medium">
              Atelier Lumière • Haute Couture & Neural Dressing
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-atelier-950 font-light tracking-tight leading-tight mb-4">
            The Quiet Art of Dress, <br />
            <span className="italic font-serif text-champagne-600">Reimagined by Neural Intelligence.</span>
          </h1>

          <p className="text-sm sm:text-base text-atelier-600 max-w-2xl mx-auto font-light leading-relaxed">
            An exploration at the intersection of haute couture craftsmanship, sculptural drapery, 
            and state-of-the-art generative neural models such as Kwai Kolors Virtual Try-On.
          </p>
        </div>

        {/* Editorial Photo Banner */}
        <div className="relative border border-atelier-300 p-2 sm:p-4 bg-white shadow-editorial mb-16">
          <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-atelier-100 relative">
            <img
              src="/editorial/lumiere_cover.jpg"
              alt="Editorial Cover"
              className="w-full h-full object-cover object-center filter contrast-[1.03]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="text-[10px] uppercase tracking-widest text-champagne-300 font-mono">
                  EXHIBITION THEME
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
                  LUMIÈRE: LIGHT, FORM & SARTORIAL PROPORTION
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-8 border border-atelier-200 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-atelier-950 font-normal">
              The Design Challenge
            </h3>
            <p className="text-xs sm:text-sm text-atelier-600 font-light leading-relaxed">
              In traditional bespoke tailoring and haute couture, garment fit is inseparable from bodily intimacy. 
              Mass digital fashion platforms reduce clothing to flat 2D overlays that destroy fabric gravity, 
              textile memory, and the nuanced tension of handloom weaves.
            </p>
            <p className="text-xs sm:text-sm text-atelier-600 font-light leading-relaxed">
              At our atelier, our mission is to investigate how deep neural vision models such as Kwai Kolors respect the physics 
              of high-pile velvet, pure mulberry silk faille, and geometric zardozi embroidery without turning 
              the wearer into a digital cartoon.
            </p>
          </div>

          <div className="bg-white p-8 border border-atelier-200 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-atelier-950 font-normal">
              The AI Try-On Architecture
            </h3>
            <p className="text-xs sm:text-sm text-atelier-600 font-light leading-relaxed">
              <strong>The Fit Room</strong> employs a multi-stage virtual dressing pipeline:
            </p>
            <ul className="text-xs text-atelier-700 space-y-2 list-disc pl-4 font-light">
              <li><strong>Posture & Pose Extraction:</strong> Maps skeletal landmark orientation and camera perspective.</li>
              <li><strong>Texture & Drape Synthesis:</strong> Preserves the garment's weave weight, pleat density, and contour.</li>
              <li><strong>Harmonization:</strong> Synthesizes ambient shadow casting, neckline intersection, and skin tone fidelity.</li>
            </ul>
          </div>
        </div>

        {/* Technical Architecture Flow */}
        <div className="bg-atelier-100 p-8 sm:p-10 border border-atelier-300 mb-16">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block mb-1">
              Pipeline Blueprint
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-atelier-950 font-light">
              Neural Try-On Processing Pipeline
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 border border-atelier-200 shadow-sm">
              <span className="text-[10px] font-mono text-champagne-600 block mb-1">01 / INPUT</span>
              <h4 className="font-serif text-base text-atelier-950 font-medium mb-1">User Portrait</h4>
              <p className="text-[11px] text-atelier-500 font-light">Direct camera or uploaded image with landmark detection</p>
            </div>

            <div className="bg-white p-4 border border-atelier-200 shadow-sm">
              <span className="text-[10px] font-mono text-champagne-600 block mb-1">02 / ARCHIVE</span>
              <h4 className="font-serif text-base text-atelier-950 font-medium mb-1">6–7 Angle Outfits</h4>
              <p className="text-[11px] text-atelier-500 font-light">High-res multi-view textile and silhouette representation</p>
            </div>

            <div className="bg-white p-4 border border-atelier-200 shadow-sm">
              <span className="text-[10px] font-mono text-champagne-600 block mb-1">03 / INFERENCE</span>
              <h4 className="font-serif text-base text-atelier-950 font-medium mb-1">Neural Diffusion</h4>
              <p className="text-[11px] text-atelier-500 font-light">Garment warp, cloth deformation, volumetric lighting alignment</p>
            </div>

            <div className="bg-white p-4 border border-atelier-200 shadow-sm">
              <span className="text-[10px] font-mono text-champagne-600 block mb-1">04 / OUTPUT</span>
              <h4 className="font-serif text-base text-atelier-950 font-medium mb-1">Editorial Visual</h4>
              <p className="text-[11px] text-atelier-500 font-light">Interactive before/after slider & high-res lookbook export</p>
            </div>
          </div>
        </div>

        {/* Project Credits & Bottom CTAs */}
        <div className="text-center pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveView('tryon');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all shadow-editorial flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-champagne-300" />
              <span>Experience Virtual Try-On</span>
            </button>

            <button
              onClick={() => {
                setActiveView('outfits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-atelier-300 bg-white text-atelier-900 text-xs uppercase tracking-widest font-medium hover:bg-atelier-100 transition-colors flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-atelier-600" />
              <span>Explore Wardrobe</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
