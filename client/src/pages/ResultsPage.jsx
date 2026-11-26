import React, { useRef, useState } from 'react';
import { 
  Download, 
  Sparkles, 
  RefreshCw, 
  Upload, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Trash2,
  Columns,
  SplitSquareVertical
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useTryOn } from '../context/TryOnContext';
import { KolorsProvider } from '../services/KolorsProvider';

export default function ResultsPage() {
  const { 
    tryOnResult, 
    setActiveView, 
    setSelectedOutfit, 
    selectedOutfits,
    clearUserPhoto,
    clearKolorsSession,
    addToast
  } = useTryOn();

  const [activeTab, setActiveTab] = useState('triptych'); // 'triptych' or 'slider'

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
    selectedGarmentImage,
    generatedPhoto,
    processingTime,
    garmentDrapeScore,
    identityPreservation,
    lightingAlignment,
    stylingAdvice,
    provider,
    sessionId
  } = tryOnResult;

  const garmentRef = selectedGarmentImage || outfit?.mainImage;

  // Handle Download Result (creates and downloads a high-resolution canvas with luxury lookbook framing)
  const handleDownload = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = generatedPhoto;

      img.onload = () => {
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
        ctx.fillText(outfit?.name || 'Kwai Kolors Virtual Try-On', margin, height - 140);

        ctx.fillStyle = '#76726B';
        ctx.font = '16px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`CATEGORY: ${(outfit?.category || 'HAUTE COUTURE').toUpperCase()} • FABRIC: ${(outfit?.fabric || '').toUpperCase()}`, margin, height - 105);

        ctx.fillStyle = '#AFA089';
        ctx.font = '14px monospace';
        ctx.fillText(`THE CAMERINO • VIRTUAL DRESSING ROOM • KWAI KOLORS AI`, margin, height - 75);

        // Watermark Right
        ctx.textAlign = 'right';
        ctx.fillStyle = '#1A1816';
        ctx.font = '20px "Cormorant Garamond", Georgia, serif';
        ctx.fillText('MAISON ATELIER', width - margin, height - 120);
        ctx.font = '12px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#AFA089';
        ctx.fillText('SS\'26 VIRTUAL TRY-ON', width - margin, height - 95);

        // Trigger Download
        const link = document.createElement('a');
        link.download = `The-Camerino-${(outfit?.name || 'kolors-look').replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        addToast('High-resolution lookbook portrait downloaded!', 'success');
      };

      img.onerror = () => {
        // Direct download helper
        KolorsProvider.downloadImage(generatedPhoto, 'kolors-virtual-tryon-result.jpg');
        addToast('Downloading result image...', 'info');
      };
    } catch (e) {
      window.open(generatedPhoto, '_blank');
      addToast('Opened result image in new tab.', 'info');
    }
  };

  const handleCleanAndRestart = async () => {
    await clearKolorsSession();
    setActiveView('tryon');
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
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] uppercase tracking-atelier text-champagne-600 font-bold">
                Kwai Kolors Try-On Complete
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light tracking-tight mt-1">
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

        {/* View Switcher Tabs: 3-Image Triptych vs Draggable Slider */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-atelier-200">
          <div className="inline-flex border border-atelier-300 bg-atelier-100 p-0.5">
            <button
              onClick={() => setActiveTab('triptych')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'triptych' ? 'bg-atelier-950 text-white shadow-sm font-semibold' : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>3-Image Triptych View</span>
            </button>
            <button
              onClick={() => setActiveTab('slider')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'slider' ? 'bg-atelier-950 text-white shadow-sm font-semibold' : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Interactive Before/After Slider</span>
            </button>
          </div>

          <span className="text-xs font-mono text-atelier-500 hidden sm:inline">
            Provider: {provider || 'Kwai Kolors Virtual Try-On'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* VIEW A: 3-IMAGE TRIPTYCH (Person + Garment + Kolors AI)  */}
        {/* ======================================================== */}
        {activeTab === 'triptych' ? (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-atelier-300 p-6 sm:p-8 shadow-editorial">
              
              {/* Image 1: Original Person Photograph */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-atelier-100">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-atelier-800">
                    1. Original Person Photo
                  </span>
                  <span className="text-[10px] uppercase font-mono text-atelier-400">Input</span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border border-atelier-200 overflow-hidden shadow-inner">
                  <img
                    src={originalUserPhoto}
                    alt="Original User Portrait"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-atelier-950/80 backdrop-blur-sm text-white text-[9px] uppercase font-mono">
                    Source Portrait
                  </div>
                </div>
                <p className="text-[11px] text-atelier-500 font-light mt-2">
                  Facial features, posture & lighting reference.
                </p>
              </div>

              {/* Image 2: Selected Outfit / Ensemble Reference */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-atelier-100">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-atelier-800">
                    2. Garment {selectedOutfits?.length > 1 ? `Ensemble (${selectedOutfits.length} Pieces)` : 'Reference'}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[#8C6D31] font-semibold">
                    {selectedOutfits?.length > 1 ? 'Multi-Piece Look' : outfit?.category}
                  </span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border border-atelier-200 overflow-hidden shadow-inner">
                  <img
                    src={garmentRef}
                    alt={outfit?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-white/95 border border-[#D9C49E] text-[#7A5B20] text-[10px] font-bold truncate">
                    {outfit?.name}
                  </div>
                </div>

                {selectedOutfits && selectedOutfits.length > 1 && (
                  <div className="mt-2 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {selectedOutfits.map((piece) => (
                      <div key={piece.id} className="flex-shrink-0 flex items-center space-x-1 bg-atelier-100 px-2 py-1 border border-atelier-200 text-[9px]">
                        <img src={piece.mainImage} alt={piece.name} className="w-4 h-5 object-cover" />
                        <span className="font-serif truncate max-w-[80px]">{piece.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[11px] text-atelier-500 font-light mt-2">
                  Textile composition, silhouette & draping contour.
                </p>
              </div>

              {/* Image 3: AI-Generated Kolors Result */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-champagne-300">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-champagne-700 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                    <span>3. Kolors AI Result</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-champagne-100 text-champagne-900 font-bold">
                    Synthesized
                  </span>
                </div>
                <div className="relative aspect-[3/4] bg-atelier-100 border-2 border-champagne-500/80 overflow-hidden shadow-luxury-glow">
                  <img
                    src={generatedPhoto}
                    alt="Kwai Kolors Virtual Try-On Result"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-atelier-950/90 text-champagne-300 text-[9px] uppercase font-mono font-semibold">
                    Kwai Kolors Engine
                  </div>
                </div>
                <p className="text-[11px] text-champagne-700 font-medium mt-2">
                  Photorealistic garment warp & shadow integration.
                </p>
              </div>

            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW B: INTERACTIVE BEFORE / AFTER COMPARISON SLIDER      */
          /* ======================================================== */
          <div className="bg-white p-4 sm:p-6 border border-atelier-200 shadow-sm flex flex-col items-center animate-fade-in">
            <BeforeAfterSlider
              beforeImage={originalUserPhoto}
              afterImage={generatedPhoto}
              outfitName={outfit?.name}
            />
          </div>
        )}

        {/* Bottom Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-atelier-200">
          <button
            onClick={() => setActiveView('tryon')}
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
            <span>Download Result</span>
          </button>

          <button
            onClick={handleCleanAndRestart}
            className="py-3 px-4 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Session Data</span>
          </button>
        </div>

        {/* Detailed Garment & Stylist Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* Garment Details */}
          <div className="lg:col-span-6 bg-white p-6 border border-atelier-200 shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-bold block mb-1">
              Garment Specifications
            </span>
            <h3 className="font-serif text-2xl text-atelier-950 font-normal mb-1">
              {outfit?.name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-atelier-500 font-medium mb-4">
              Category: {outfit?.category} • Designer: {outfit?.designer || 'Maison De L\'Atelier'}
            </p>

            <div className="space-y-3 pt-3 border-t border-atelier-100 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-atelier-400 block font-semibold">
                  Fabrication & Weave
                </span>
                <p className="text-atelier-800 font-light mt-0.5">
                  {outfit?.fabric || 'Luxury Textile Composition'}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-atelier-400 block font-semibold">
                  Silhouette & Cut
                </span>
                <p className="text-atelier-800 font-light mt-0.5">
                  {outfit?.silhouette || 'Architectural Tailoring'}
                </p>
              </div>
            </div>
          </div>

          {/* Kolors Fitting Diagnostics */}
          <div className="lg:col-span-6 bg-atelier-100/90 p-6 border border-atelier-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs uppercase tracking-widest font-semibold text-atelier-950">
                Kwai Kolors Fitting Diagnostics
              </h4>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-atelier-600">Garment Drape Fidelity</span>
                <span className="font-mono font-semibold text-atelier-950">{garmentDrapeScore || '98.8%'}</span>
              </div>
              <div className="w-full bg-atelier-200 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[98%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-atelier-600">Identity & Landmark Preservation</span>
                <span className="font-mono font-semibold text-atelier-950">{identityPreservation || '99.2%'}</span>
              </div>
              <div className="w-full bg-atelier-200 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[99%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-atelier-600">Ambient Lighting Match</span>
                <span className="font-mono text-[11px] text-atelier-800">{lightingAlignment || 'Studio Balanced Lighting'}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-atelier-200">
                <span className="text-atelier-500 font-mono text-[10px]">Inference Space</span>
                <a 
                  href={KolorsProvider.spaceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-[10px] text-champagne-700 underline flex items-center space-x-1"
                >
                  <span>Kwai-Kolors/Kolors-Virtual-Try-On</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
