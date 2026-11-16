import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Camera, CheckCircle2, User, Info, RefreshCw } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function PhotoUploader() {
  const { 
    userPhotoPreview, 
    setUserPhoto, 
    clearUserPhoto, 
    sampleModels, 
    addToast 
  } = useTryOn();
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      validateAndProcess(file);
    }
  };

  const validateAndProcess = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      addToast('Please upload a valid image file (JPG, JPEG, PNG, or WebP).', 'error');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      addToast('Image size exceeds 20MB limit. Please choose a smaller file.', 'warning');
      return;
    }
    setUserPhoto(file);
    addToast('Photograph uploaded successfully.', 'success');
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
      validateAndProcess(file);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Editorial Instruction & Recommendation */}
      <div className="bg-atelier-100/90 border border-atelier-200/90 p-4 rounded-none">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 bg-atelier-200 rounded-none text-atelier-800 flex-shrink-0 mt-0.5">
            <Camera className="w-4 h-4 text-atelier-700" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-atelier-950 mb-1">
              Styling Recommendation for Virtual Try-On
            </h4>
            <p className="text-xs text-atelier-600 leading-relaxed font-light">
              For best neural drape alignment and realistic proportion rendering, upload a clear, well-lit, 
              full-body or three-quarter photograph facing the camera directly against a neutral background.
            </p>
          </div>
        </div>
      </div>

      {/* Main Upload / Preview Area */}
      {!userPhotoPreview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-white ${
            isDragging 
              ? 'border-atelier-900 bg-atelier-100/60 scale-[1.01]' 
              : 'border-atelier-300 hover:border-atelier-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-full bg-atelier-100 flex items-center justify-center text-atelier-700 mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-atelier-950 font-normal mb-2">
            Upload Your Photograph
          </h3>

          <p className="text-xs text-atelier-500 max-w-sm mb-6 font-light">
            Drag and drop your image file here, or browse from your device. Supports JPG, JPEG, PNG, and WebP (up to 20MB).
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
          >
            Browse Files
          </button>
        </div>
      ) : (
        /* Preview State with Change / Remove controls */
        <div className="relative bg-white border border-atelier-300 shadow-editorial p-4 flex flex-col sm:flex-row items-center gap-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Photo Preview Container */}
          <div className="relative w-44 sm:w-52 aspect-[3/4] bg-atelier-100 overflow-hidden border border-atelier-200 flex-shrink-0">
            <img
              src={userPhotoPreview}
              alt="Uploaded user preview"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-atelier-950/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-mono">
              Ready to Drape
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between flex-grow text-center sm:text-left space-y-4">
            <div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-emerald-700 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Photograph Prepared</span>
              </div>
              <h4 className="font-serif text-lg text-atelier-950 font-light">
                Model Profile Verified
              </h4>
              <p className="text-xs text-atelier-500 font-light mt-1">
                Aspect ratio and posture analyzed. Ready to synthesize with the selected outfit from the atelier wardrobe.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 border-t border-atelier-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-atelier-300 hover:border-atelier-900 text-atelier-800 text-[11px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-atelier-600" />
                <span>Change Photo</span>
              </button>

              <button
                type="button"
                onClick={clearUserPhoto}
                className="px-4 py-2 text-rose-700 hover:text-rose-900 hover:bg-rose-50 text-[11px] uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Test Editorial Models */}
      {sampleModels && sampleModels.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest text-atelier-500 font-bold">
              Or Select an Editorial Studio Model (1-Click)
            </span>
            <span className="text-[10px] text-atelier-400 font-mono">Quick Demo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sampleModels.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  setUserPhoto(model.image);
                  addToast(`Selected test model: ${model.name}`, 'info');
                }}
                className={`group text-left p-2 border transition-all flex flex-col items-center bg-white ${
                  userPhotoPreview === model.image
                    ? 'border-atelier-950 ring-2 ring-champagne-400 bg-atelier-100/50'
                    : 'border-atelier-200 hover:border-atelier-400'
                }`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-atelier-200 mb-2">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  {userPhotoPreview === model.image && (
                    <div className="absolute inset-0 bg-atelier-950/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white text-atelier-950 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-atelier-950" />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium text-atelier-900 line-clamp-1 text-center">
                  {model.name.split(' ')[0]}
                </span>
                <span className="text-[9px] text-atelier-500 line-clamp-1">
                  {model.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
