import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchOutfits, fetchSampleModels, processVirtualTryOn, checkTryOnStatus } from '../utils/api';

const TryOnContext = createContext();

export function TryOnProvider({ children }) {
  const [outfits, setOutfits] = useState([]);
  const [sampleModels, setSampleModels] = useState([]);
  const [loadingOutfits, setLoadingOutfits] = useState(true);
  
  // Try-on State
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  
  // Modals & Navigation
  const [activeModalOutfit, setActiveModalOutfit] = useState(null);
  const [activeView, setActiveView] = useState('home'); // 'home', 'outfits', 'tryon', 'result', 'admin', 'about', 'detail'
  const [detailOutfitId, setDetailOutfitId] = useState(null);

  // Status & Notifications
  const [toasts, setToasts] = useState([]);
  const [aiStatus, setAiStatus] = useState({ configured: false, mode: 'atelier_demo' });

  // Add toast message
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Load outfits & sample models
  const refreshOutfits = async () => {
    try {
      setLoadingOutfits(true);
      const data = await fetchOutfits();
      setOutfits(data);
      if (!selectedOutfit && data.length > 0) {
        setSelectedOutfit(data[0]);
      }
    } catch (err) {
      console.error('Failed to load outfits:', err);
      addToast('Could not load outfits: ' + err.message, 'error');
    } finally {
      setLoadingOutfits(false);
    }
  };

  useEffect(() => {
    refreshOutfits();

    fetchSampleModels()
      .then(models => setSampleModels(models))
      .catch(err => console.error('Error fetching sample models:', err));

    checkTryOnStatus()
      .then(status => setAiStatus(status))
      .catch(err => console.error('Error checking AI status:', err));
  }, []);

  // Handle User Photo Selection
  const setUserPhoto = (fileOrUrl) => {
    if (typeof fileOrUrl === 'string') {
      setUserPhotoFile(null);
      setUserPhotoPreview(fileOrUrl);
    } else if (fileOrUrl instanceof File) {
      setUserPhotoFile(fileOrUrl);
      const url = URL.createObjectURL(fileOrUrl);
      setUserPhotoPreview(url);
    } else {
      setUserPhotoFile(null);
      setUserPhotoPreview(null);
    }
  };

  const clearUserPhoto = () => {
    setUserPhotoFile(null);
    setUserPhotoPreview(null);
  };

  // Execute Try-On with couture multi-stage progress
  const executeTryOn = async () => {
    if (!userPhotoPreview && !userPhotoFile) {
      addToast('Please upload your photograph or choose a sample model first.', 'warning');
      return false;
    }
    if (!selectedOutfit) {
      addToast('Please select an outfit to try on.', 'warning');
      return false;
    }

    setIsProcessing(true);
    setProcessingStage('Analyzing silhouette posture & lighting contours...');

    // Progress stage simulation
    const stage1 = setTimeout(() => {
      setProcessingStage('Extracting garment drape & volumetric fabric texture maps...');
    }, 900);

    const stage2 = setTimeout(() => {
      setProcessingStage('Synthesizing neural fitting & micro-crease tension...');
    }, 1900);

    const stage3 = setTimeout(() => {
      setProcessingStage('Rendering high-resolution editorial portrait...');
    }, 2800);

    try {
      const formData = new FormData();
      formData.append('outfitId', selectedOutfit.id);
      
      if (userPhotoFile) {
        formData.append('userPhoto', userPhotoFile);
      } else if (userPhotoPreview) {
        formData.append('userPhotoUrl', userPhotoPreview);
      }

      // Small delay for luxury editorial experience
      await new Promise(r => setTimeout(r, 2400));

      const result = await processVirtualTryOn(formData);
      setTryOnResult(result);
      setIsProcessing(false);
      setActiveView('result');
      addToast('Virtual Try-On generated successfully!', 'success');
      return true;
    } catch (err) {
      setIsProcessing(false);
      addToast('Try-on generation failed: ' + err.message, 'error');
      return false;
    } finally {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    }
  };

  const openOutfitDetail = (outfit) => {
    setActiveModalOutfit(outfit);
  };

  const closeOutfitDetail = () => {
    setActiveModalOutfit(null);
  };

  const navigateToTryOnWithOutfit = (outfit) => {
    setSelectedOutfit(outfit);
    closeOutfitDetail();
    setActiveView('tryon');
  };

  return (
    <TryOnContext.Provider value={{
      outfits,
      sampleModels,
      loadingOutfits,
      refreshOutfits,
      selectedOutfit,
      setSelectedOutfit,
      userPhotoFile,
      userPhotoPreview,
      setUserPhoto,
      clearUserPhoto,
      tryOnResult,
      setTryOnResult,
      isProcessing,
      processingStage,
      executeTryOn,
      activeModalOutfit,
      openOutfitDetail,
      closeOutfitDetail,
      activeView,
      setActiveView,
      detailOutfitId,
      setDetailOutfitId,
      navigateToTryOnWithOutfit,
      toasts,
      addToast,
      removeToast,
      aiStatus
    }}>
      {children}
    </TryOnContext.Provider>
  );
}

export function useTryOn() {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error('useTryOn must be used within a TryOnProvider');
  }
  return context;
}
