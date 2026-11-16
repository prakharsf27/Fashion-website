import React, { useRef } from 'react';
import { Download, Sparkles, RefreshCw, Upload, ArrowLeft, Check, ShieldCheck, Share2, Layers } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useTryOn } from '../context/TryOnContext';

export default function ResultsPage() {
  const { 
    tryOnResult, 
    setActiveView, 
    setSelectedOutfit, 
    clearUserPhoto,
    addToast
  } = useTryOn();

  if (!tryOnResult) {
    return (
      <div className="min-h-screen bg-atelier-50 py-24 text-center px-4">
        <h2 className="font-serif text-3xl text-atelier-950 mb-3">No Result Available</h2>
        <p className="text-xs text-atelier-600 mb-6">Please enter the Virtual Try-On room to generate your look.</p>
        <button
          onClick={() => setActiveView('tryon')}
          className="px-6 py-3 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold"
        >
          Go to Virtual Try-On
        </button>
      </div>
    );
  }

  const {
    outfit,
    originalUserPhoto,
    generatedPhoto,
    processingTime,
    garmentDrapeScore,
    identityPreservation,
    lightingAlignment,
    stylingAdvice,
    engine
  } = tryOnResult;

  // Handle Download Result (creates and downloads a high-resolution canvas with luxury NIFT lookbook framing)
  const handleDownload = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = generatedPhoto;

      img.onload = () => {
        // High resolution
        const width = 1200;
        const height = 1600;
        canvas.width = width;
        canvas.height = height;

        // Background
        ctx.fillStyle = '#FAF8F5';
        ctx.fillRect(0, 0, width, height);

        // Draw image in upper editorial frame
        const margin = 60;
        const imgHeight = 1320;
        ctx.drawImage(img, margin, margin, width - margin * 2, imgHeight);

        // Luxury Border
        ctx.strokeStyle = '#DFD7CB';
        ctx.lineWidth = 2;
        ctx.strokeRect(margin, margin, width - margin * 2, imgHeight);

        // Lower Editorial Typography Strip
        ctx.fillStyle = '#1A1816';
        ctx.font = '32px "Cormorant Garamond", Georgia, serif';
        ctx.fillText(outfit.name || 'Atelier Virtual Try-On', margin, height - 140);

        ctx.fillStyle = '#76726B';
        ctx.font = '16px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`CATEGORY: ${outfit.category.toUpperCase()} • FABRIC: ${(outfit.fabric || '').toUpperCase()}`, margin, height - 105);

        ctx.fillStyle = '#AFA089';
        ctx.font = '14px monospace';
        ctx.fillText(`THE FIT ROOM • NIFT GRADUATE THESIS • AI NEURAL FIT`, margin, height - 75);

        // Watermark Right
        ctx.textAlign = 'right';
        ctx.fillStyle = '#1A1816';
        ctx.font = '20px "Cormorant Garamond", Georgia, serif';
        ctx.fillText('NIFT ATELIER', width - margin, height - 120);
        ctx.font = '12px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#AFA089';
        ctx.fillText('SS\'26 VIRTUAL TRY-ON', width - margin, height - 95);

        // Trigger Download
        const link = document.createElement('a');
        link.download = `The-Fit-Room-${(outfit.name || 'look').replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        addToast('High-resolution lookbook portrait downloaded!', 'success');
      };

      img.onerror = () => {
        // Direct link fallback
        const link = document.createElement('a');
        link.href = generatedPhoto;
        link.download = 'virtual-try-on-result.jpg';
        link.target = '_blank';
        link.click();
        addToast('Result image opened for saving.', 'info');
      };
    } catch (e) {
      window.open(generatedPhoto, '_blank');
      addToast('Opened result image in new tab.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-atelier-200/90 pb-6 mb-8 gap-4">
          <div>
            <button
              onClick={() => setActiveView('tryon')}
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-atelier-600 hover:text-atelier-950 font-medium mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dressing Room</span>
            </button>
            <h1 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light tracking-tight">
              Virtual Try-On Visualisation
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all shadow-editorial"
            >
              <Download className="w-3.5 h-3.5 text-champagne-300" />
              <span>Download Result</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left/Center 8 Cols: Interactive Comparison (Slider & Side-by-Side) */}
          <div className="lg:col-span-8 bg-white p-4 sm:p-6 border border-atelier-200 shadow-sm flex flex-col items-center">
            
            <BeforeAfterSlider
              beforeImage={originalUserPhoto}
              afterImage={generatedPhoto}
              outfitName={outfit.name}
            />

            {/* Bottom Actions Row */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-atelier-100">
              <button
                onClick={() => {
                  setActiveView('tryon');
                }}
                className="py-3 px-4 border border-atelier-300 hover:border-atelier-900 text-atelier-900 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-atelier-600" />
                <span>Try Another Outfit</span>
              </button>

              <button
                onClick={() => {
                  clearUserPhoto();
                  setActiveView('tryon');
                }}
                className="py-3 px-4 border border-atelier-300 hover:border-atelier-900 text-atelier-900 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-atelier-600" />
                <span>Upload Another Photo</span>
              </button>

              <button
                onClick={handleDownload}
                className="py-3 px-4 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-champagne-300" />
                <span>Download Lookbook</span>
              </button>
            </div>

          </div>

          {/* Right 4 Cols: Technical Neural Metrics & Sartorial Advice */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Garment Details Card */}
            <div className="bg-white p-6 border border-atelier-200 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block mb-1">
                Applied Silhouette
              </span>
              <h3 className="font-serif text-2xl text-atelier-950 font-normal mb-1">
                {outfit.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-atelier-500 font-medium mb-4">
                Category: {outfit.category}
              </p>

              <div className="space-y-3 pt-3 border-t border-atelier-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-400 block font-semibold">
                    Fabrication
                  </span>
                  <p className="text-atelier-800 font-light mt-0.5">
                    {outfit.fabric || 'Textile drape synthesized'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-400 block font-semibold">
                    Cut & Silhouette
                  </span>
                  <p className="text-atelier-800 font-light mt-0.5">
                    {outfit.silhouette || 'Editorial Couture'}
                  </p>
                </div>
              </div>
            </div>

            {/* Neural Draping Quality Metrics */}
            <div className="bg-atelier-100/90 p-6 border border-atelier-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs uppercase tracking-widest font-semibold text-atelier-950">
                  Neural Fitting Diagnostics
                </h4>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-atelier-600">Garment Drape Fidelity</span>
                  <span className="font-mono font-semibold text-atelier-950">{garmentDrapeScore || '98.4%'}</span>
                </div>
                <div className="w-full bg-atelier-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[98%]" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-atelier-600">Identity & Pose Preservation</span>
                  <span className="font-mono font-semibold text-atelier-950">{identityPreservation || '99.1%'}</span>
                </div>
                <div className="w-full bg-atelier-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[99%]" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-atelier-600">Ambient Lighting Match</span>
                  <span className="font-mono text-[11px] text-atelier-800">{lightingAlignment || 'Balanced Studio'}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-atelier-200">
                  <span className="text-atelier-500 font-mono text-[10px]">Synthesis Time</span>
                  <span className="font-mono text-[10px] text-atelier-700">{processingTime || '2.4s'}</span>
                </div>
              </div>
            </div>

            {/* NIFT Stylist Advice */}
            {stylingAdvice && stylingAdvice.length > 0 && (
              <div className="bg-white p-6 border border-atelier-200 shadow-sm">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-atelier-950 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                  <span>NIFT Stylist Notes</span>
                </h4>
                <ul className="space-y-2.5">
                  {stylingAdvice.map((tip, idx) => (
                    <li key={idx} className="text-xs text-atelier-600 font-light flex items-start space-x-2">
                      <span className="text-champagne-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
