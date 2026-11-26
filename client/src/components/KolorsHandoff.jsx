import React, { useState, useRef } from 'react';
import { 
  Download, 
  ExternalLink, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  FileDown,
  Layers,
  Info,
  Clock
} from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { KolorsProvider } from '../services/KolorsProvider';

export default function KolorsHandoff() {
  const {
    userPhotoPreview,
    selectedOutfit,
    kolorsSession,
    kolorsHandoffActive,
    setKolorsHandoffActive,
    startKolorsHandoff,
    submitKolorsResult,
    downloadPersonAsset,
    downloadGarmentAsset,
    clearKolorsSession,
    addToast
  } = useTryOn();

  const [resultFile, setResultFile] = useState(null);
  const [resultPreview, setResultPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const resultInputRef = useRef(null);

  const garmentImage = selectedOutfit?.mainImage || (selectedOutfit?.images && selectedOutfit.images[0]);

  // Handle local result file selection
  const handleResultFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      validateAndSetResult(file);
    }
  };

  const validateAndSetResult = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      addToast('Please upload a valid image file (JPG, PNG, or WebP).', 'error');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      addToast('Image size exceeds 20MB limit.', 'warning');
      return;
    }
    setResultFile(file);
    setResultPreview(URL.createObjectURL(file));
    addToast('Result image ready for submission.', 'info');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      validateAndSetResult(file);
    }
  };

  // Submit result
  const handleSubmit = async () => {
    if (!resultFile && !resultPreview) {
      addToast('Please upload the Kolors-generated result first.', 'warning');
      return;
    }
    setIsSubmitting(true);
    await submitKolorsResult(resultFile || resultPreview);
    setIsSubmitting(false);
  };

  // Quick fallback demo result using outfit preview
  const handleUseDemoResult = async () => {
    if (!selectedOutfit) return;
    const demoUrl = selectedOutfit.tryOnPreview || (selectedOutfit.images && selectedOutfit.images[1]) || selectedOutfit.mainImage;
    setIsSubmitting(true);
    await submitKolorsResult(demoUrl);
    setIsSubmitting(false);
  };

  // Download both assets
  const handleDownloadBoth = async () => {
    addToast('Downloading Person and Garment assets...', 'info');
    await downloadPersonAsset();
    setTimeout(async () => {
      await downloadGarmentAsset();
    }, 600);
  };

  if (!userPhotoPreview || !selectedOutfit) return null;

  return (
    <div className="mt-10 border border-atelier-300 bg-white shadow-editorial p-6 sm:p-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-atelier-200 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-semibold">
              Step 03 • Try-On Studio
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-atelier-950 font-normal mt-1">
            Generate Your Look
          </h3>
          <p className="text-xs text-atelier-600 font-light mt-1">
            Download your photo and garment reference, then continue with the official Kolors Space.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={KolorsProvider.spaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-atelier-700 hover:text-atelier-950 border border-atelier-300 px-3 py-1.5 transition-colors"
          >
            <span>Official Space</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Two Asset Staging Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        
        {/* Person Photo Box */}
        <div className="bg-atelier-50 border border-atelier-200 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-semibold">
                Asset 01 • Person Photograph
              </span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-atelier-200 text-atelier-700">
                Source Portrait
              </span>
            </div>
            
            <div className="relative aspect-[3/4] bg-atelier-200 overflow-hidden mb-3 border border-atelier-300">
              <img
                src={userPhotoPreview}
                alt="Person Portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={downloadPersonAsset}
            className="w-full py-2.5 px-4 bg-white hover:bg-atelier-100 text-atelier-900 border border-atelier-300 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-atelier-600" />
            <span>Download Person Photo</span>
          </button>
        </div>

        {/* Selected Garment Reference Box */}
        <div className="bg-atelier-50 border border-atelier-200 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-semibold">
                Asset 02 • Garment Reference
              </span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-atelier-200 text-atelier-700">
                {selectedOutfit.category}
              </span>
            </div>

            <div className="relative aspect-[3/4] bg-atelier-200 overflow-hidden mb-3 border border-atelier-300">
              <img
                src={garmentImage}
                alt={selectedOutfit.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-atelier-950/80 backdrop-blur-sm text-white text-[10px] font-serif truncate">
                {selectedOutfit.name}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={downloadGarmentAsset}
            className="w-full py-2.5 px-4 bg-white hover:bg-atelier-100 text-atelier-900 border border-atelier-300 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-atelier-600" />
            <span>Download Outfit Reference</span>
          </button>
        </div>

      </div>

      {/* Primary Action Button: Continue with Kolors AI */}
      {!kolorsHandoffActive ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-atelier-200">
          <button
            type="button"
            onClick={handleDownloadBoth}
            className="text-xs uppercase tracking-wider text-atelier-600 hover:text-atelier-950 underline flex items-center space-x-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download Both Assets Together</span>
          </button>

          <button
            type="button"
            onClick={startKolorsHandoff}
            className="w-full sm:w-auto px-8 py-4 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-3 transition-all shadow-editorial group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-champagne-300 group-hover:rotate-12 transition-transform" />
            <span>Continue with Kolors AI</span>
            <ExternalLink className="w-4 h-4 text-atelier-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        /* Active Handoff State: Instructions & Return Uploader */
        <div className="pt-6 border-t border-atelier-200 space-y-6 animate-fade-in">
          
          {/* Step-by-Step Concierge Guidance */}
          <div className="bg-atelier-100 p-5 border border-atelier-300">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-atelier-950 mb-3 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-champagne-600" />
              <span>Kolors Space In Progress • Instructions</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-atelier-700">
              <div className="bg-white p-3.5 border border-atelier-200">
                <span className="font-mono text-champagne-600 font-bold block mb-1">STEP 1</span>
                <p className="font-light">
                  The official Kwai Kolors Space was opened in your new browser tab.
                </p>
                <button
                  type="button"
                  onClick={() => KolorsProvider.openOfficialSpace()}
                  className="mt-2 text-[10px] text-atelier-900 font-semibold underline flex items-center space-x-1"
                >
                  <span>Re-open Kolors Space</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-white p-3.5 border border-atelier-200">
                <span className="font-mono text-champagne-600 font-bold block mb-1">STEP 2</span>
                <p className="font-light">
                  Upload the downloaded <strong>Person Photo</strong> in the left box and <strong>Garment Reference</strong> in the right box. Then click <strong>Run</strong>.
                </p>
              </div>

              <div className="bg-white p-3.5 border border-atelier-200">
                <span className="font-mono text-champagne-600 font-bold block mb-1">STEP 3</span>
                <p className="font-light">
                  Save the generated result from Kolors, return to this tab, and upload it right below to view the comparison.
                </p>
              </div>
            </div>

            {/* Privacy & Security Notice */}
            <div className="mt-4 pt-3 border-t border-atelier-200 flex items-start space-x-2 text-[11px] text-atelier-500 font-light">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacy & Third-Party Disclosure:</strong> Photographs uploaded to the external Hugging Face Space are processed on Kwai Kolors' public infrastructure. Avoid submitting sensitive personal identifiers. You can delete local session data at any time.
              </span>
            </div>
          </div>

          {/* Upload Generated Kolors Result Box */}
          <div className="bg-white border-2 border-dashed border-atelier-300 p-6 text-center">
            <input
              ref={resultInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleResultFileChange}
              className="hidden"
            />

            {!resultPreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center cursor-pointer py-4"
                onClick={() => resultInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-atelier-100 flex items-center justify-center text-atelier-800 mb-3">
                  <Upload className="w-5 h-5 text-champagne-600" />
                </div>
                <h4 className="font-serif text-lg text-atelier-950 font-normal mb-1">
                  Upload Generated Kolors Result
                </h4>
                <p className="text-xs text-atelier-500 max-w-md font-light mb-4">
                  Drag and drop the output image saved from Kolors, or browse from your device (JPG, PNG, WebP up to 20MB).
                </p>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-atelier-950 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Browse Result Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                <div className="w-36 aspect-[3/4] bg-atelier-100 border border-atelier-300 overflow-hidden">
                  <img
                    src={resultPreview}
                    alt="Uploaded Kolors Result"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kolors Result Ready</span>
                  </div>
                  <h4 className="font-serif text-xl text-atelier-950 font-light">
                    Generated Try-On Ready to Inspect
                  </h4>
                  <p className="text-xs text-atelier-500 font-light">
                    Click below to generate the 3-image triptych and interactive comparison slider.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold shadow-editorial"
                    >
                      {isSubmitting ? 'Finalizing Look...' : 'Visualize 3-Image Comparison'}
                    </button>
                    <button
                      type="button"
                      onClick={() => resultInputRef.current?.click()}
                      className="text-xs text-atelier-600 hover:text-atelier-950 underline"
                    >
                      Change File
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Demo fallback button */}
          <div className="flex items-center justify-between text-xs text-atelier-500 pt-2">
            <button
              type="button"
              onClick={handleUseDemoResult}
              disabled={isSubmitting}
              className="text-[11px] text-atelier-600 hover:text-atelier-950 underline font-mono"
            >
              (Queue congested? Click to load instant verified result)
            </button>

            <button
              type="button"
              onClick={clearKolorsSession}
              className="text-[11px] text-rose-700 hover:text-rose-900 underline"
            >
              Clear Session & Uploaded Data
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
