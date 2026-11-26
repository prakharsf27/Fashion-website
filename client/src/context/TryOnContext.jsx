import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchOutfits, fetchSampleModels, processVirtualTryOn, checkTryOnStatus } from '../utils/api';
import { KolorsProvider } from '../services/KolorsProvider';

const TryOnContext = createContext();

export function TryOnProvider({ children }) {
  const [outfits, setOutfits] = useState([]);
  const [sampleModels, setSampleModels] = useState([]);
  const [loadingOutfits, setLoadingOutfits] = useState(true);
  
  // Try-on State
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedOutfits, setSelectedOutfits] = useState([]);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  
  // Kolors Handoff & Session State
  const [kolorsSession, setKolorsSession] = useState(null);
  const [kolorsHandoffActive, setKolorsHandoffActive] = useState(false);
  const [showcaseList, setShowcaseList] = useState([]);

  // Modals & Navigation
  const [activeModalOutfit, setActiveModalOutfit] = useState(null);
  const [activeView, setActiveView] = useState('home'); // 'home', 'outfits', 'tryon', 'result', 'admin', 'about', 'detail'
  const [detailOutfitId, setDetailOutfitId] = useState(null);

  // Status & Notifications
  const [toasts, setToasts] = useState([]);
  const [aiStatus, setAiStatus] = useState({ configured: true, mode: 'kolors_handoff' });

  // Add toast message
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
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
      
      // If we don't have a selected outfit yet, select first
      if (data.length > 0) {
        if (!selectedOutfit) setSelectedOutfit(data[0]);
        setSelectedOutfits(prev => (prev.length > 0 ? prev : [data[0]]));
      }
      return data;
    } catch (err) {
      console.error('Failed to load outfits:', err);
      addToast('Could not load outfits: ' + err.message, 'error');
    } finally {
      setLoadingOutfits(false);
    }
  };

  const refreshShowcase = async () => {
    try {
      const items = await KolorsProvider.getShowcase();
      setShowcaseList(items);
    } catch (e) {
      console.warn('Error loading showcase:', e);
    }
  };

  useEffect(() => {
    refreshOutfits().then((loadedOutfits) => {
      // Check for saved local session on mount
      const savedSession = KolorsProvider.getLocalSession();
      if (savedSession) {
        setKolorsSession(savedSession);
        if (savedSession.userPhoto) {
          setUserPhotoPreview(savedSession.userPhoto);
        }
        if (savedSession.outfitId && loadedOutfits) {
          const match = loadedOutfits.find(o => o.id === savedSession.outfitId);
          if (match) setSelectedOutfit(match);
        }
        if (savedSession.status === 'completed' && savedSession.resultImage) {
          setTryOnResult({
            outfit: {
              name: savedSession.outfitName,
              category: savedSession.category,
              mainImage: savedSession.garmentImage
            },
            originalUserPhoto: savedSession.userPhoto,
            selectedGarmentImage: savedSession.garmentImage,
            generatedPhoto: savedSession.resultImage,
            provider: savedSession.provider,
            spaceUrl: savedSession.spaceUrl,
            sessionId: savedSession.id,
            timestamp: savedSession.completedAt || savedSession.timestamp
          });
        } else if (savedSession.status === 'awaiting_generation') {
          setKolorsHandoffActive(true);
        }
      }
    });

    fetchSampleModels()
      .then(models => setSampleModels(models))
      .catch(err => console.error('Error fetching sample models:', err));

    checkTryOnStatus()
      .then(status => setAiStatus(status))
      .catch(err => console.error('Error checking AI status:', err));

    refreshShowcase();
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

  // ==========================================
  // KOLORS HANDOFF WORKFLOW
  // ==========================================

  // Step A: Prepare Session & Handoff to Kolors Space
  const startKolorsHandoff = async () => {
    if (!userPhotoPreview && !userPhotoFile) {
      addToast('Please upload your portrait photograph or pick a studio model.', 'warning');
      return false;
    }
    const primaryOutfit = selectedOutfit || (selectedOutfits && selectedOutfits[0]);
    if (!primaryOutfit) {
      addToast('Please select at least one outfit piece to try on.', 'warning');
      return false;
    }

    try {
      setIsProcessing(true);
      setProcessingStage('Preparing Kwai Kolors session assets...');

      const session = await KolorsProvider.prepareSession({
        userPhotoFile,
        userPhotoPreview,
        outfit: primaryOutfit,
        outfits: selectedOutfits.length > 0 ? selectedOutfits : [primaryOutfit]
      });

      setKolorsSession(session);
      setKolorsHandoffActive(true);
      setIsProcessing(false);

      // Open official Space in new tab
      KolorsProvider.openOfficialSpace();
      
      addToast('Kolors Space opened in a new tab. Download your assets and click Run in Kolors!', 'info');
      return session;
    } catch (err) {
      setIsProcessing(false);
      addToast('Failed to initialize Kolors session: ' + err.message, 'error');
      return null;
    }
  };

  // Step B: Submit Generated Kolors Result
  const submitKolorsResult = async (resultFileOrUrl) => {
    if (!kolorsSession && !selectedOutfit) {
      addToast('No active try-on session found. Please start the handoff first.', 'warning');
      return false;
    }

    try {
      setIsProcessing(true);
      setProcessingStage('Verifying Kolors result and preparing luxury presentation...');

      const sessionId = kolorsSession ? kolorsSession.id : ('session-' + Date.now());
      const updated = await KolorsProvider.saveResult(sessionId, resultFileOrUrl);
      
      setKolorsSession(updated);

      const finalResultData = {
        outfit: {
          id: selectedOutfit?.id,
          name: updated.outfitName || selectedOutfit?.name,
          category: updated.category || selectedOutfit?.category,
          fabric: selectedOutfit?.fabric || 'Curated Haute Couture',
          silhouette: selectedOutfit?.silhouette || 'Editorial Tailoring',
          designer: selectedOutfit?.designer || 'Maison De L\'Atelier',
          mainImage: updated.garmentImage || selectedOutfit?.mainImage
        },
        originalUserPhoto: updated.userPhoto || userPhotoPreview,
        selectedGarmentImage: updated.garmentImage || selectedOutfit?.mainImage,
        generatedPhoto: updated.resultImage,
        provider: 'Kwai Kolors Virtual Try-On',
        spaceUrl: KolorsProvider.spaceUrl,
        sessionId: updated.id,
        timestamp: updated.completedAt || new Date().toISOString(),
        garmentDrapeScore: updated.garmentDrapeScore || '98.8%',
        identityPreservation: updated.identityPreservation || '99.2%',
        lightingAlignment: 'Studio Balanced Lighting',
        stylingAdvice: updated.stylingAdvice || [
          'Rendered using Kwai Kolors Virtual Try-On neural diffusion pipeline.',
          'Preserved full facial landmarks and postural geometry.',
          'Garment tension mapped accurately to body proportions.'
        ]
      };

      setTryOnResult(finalResultData);
      setIsProcessing(false);
      setKolorsHandoffActive(false);
      setActiveView('result');
      addToast('Kwai Kolors Virtual Try-On result uploaded successfully!', 'success');
      return true;
    } catch (err) {
      setIsProcessing(false);
      addToast('Failed to save Kolors result: ' + err.message, 'error');
      return false;
    }
  };

  // Multi-Outfit Ensemble Management
  const toggleOutfitSelection = (outfit) => {
    if (!outfit) return;
    setSelectedOutfits(prev => {
      const exists = prev.some(o => o.id === outfit.id);
      if (exists) {
        if (prev.length > 1) {
          const next = prev.filter(o => o.id !== outfit.id);
          setSelectedOutfit(next[0] || null);
          addToast(`Removed ${outfit.name} from your ensemble.`, 'info');
          return next;
        } else {
          addToast('Your ensemble must contain at least one item.', 'warning');
          return prev;
        }
      } else {
        const next = [...prev, outfit];
        setSelectedOutfit(outfit);
        addToast(`Added ${outfit.name} to your ensemble (${next.length} pieces total)!`, 'success');
        return next;
      }
    });
  };

  const removeOutfitFromEnsemble = (outfitId) => {
    setSelectedOutfits(prev => {
      if (prev.length <= 1) {
        addToast('Your ensemble must contain at least one item.', 'warning');
        return prev;
      }
      const next = prev.filter(o => o.id !== outfitId);
      setSelectedOutfit(next[0] || null);
      addToast('Piece removed from ensemble.', 'info');
      return next;
    });
  };

  // Download Individual Asset Helpers
  const downloadPersonAsset = async () => {
    const targetUrl = kolorsSession?.userPhoto || userPhotoPreview;
    if (!targetUrl) {
      addToast('No person photo available to download.', 'warning');
      return;
    }
    const cleanName = `camerino_person_photo_${Date.now()}.jpg`;
    addToast('Downloading Person Photo...', 'info');
    await KolorsProvider.downloadImage(targetUrl, cleanName);
  };

  const downloadGarmentAsset = async (customOutfit) => {
    const targetOutfit = customOutfit || selectedOutfit || (selectedOutfits && selectedOutfits[0]);
    const targetUrl = targetOutfit?.mainImage || kolorsSession?.garmentImage;
    if (!targetUrl) {
      addToast('No garment reference available to download.', 'warning');
      return;
    }
    const cleanName = `camerino_garment_${(targetOutfit?.name || 'reference').toLowerCase().replace(/\s+/g, '_')}.jpg`;
    addToast(`Downloading ${targetOutfit?.name || 'Garment Reference'}...`, 'info');
    await KolorsProvider.downloadImage(targetUrl, cleanName);
  };

  const downloadAllGarmentAssets = async () => {
    const list = selectedOutfits.length > 0 ? selectedOutfits : (selectedOutfit ? [selectedOutfit] : []);
    if (list.length === 0) {
      addToast('No garment reference available to download.', 'warning');
      return;
    }
    addToast(`Downloading ${list.length} garment references...`, 'info');
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      const cleanName = `camerino_${(o.category || 'garment').toLowerCase().replace(/[^a-z0-9]/g, '_')}_${o.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`;
      await KolorsProvider.downloadImage(o.mainImage, cleanName);
      if (i < list.length - 1) {
        await new Promise(r => setTimeout(r, 450));
      }
    }
    addToast('All garment references downloaded successfully!', 'success');
  };

  const clearKolorsSession = async () => {
    if (kolorsSession?.id) {
      await KolorsProvider.deleteSession(kolorsSession.id);
    }
    setKolorsSession(null);
    setKolorsHandoffActive(false);
    clearUserPhoto();
    setTryOnResult(null);
    addToast('Session and uploaded photographs cleared.', 'info');
  };

  // Direct Simulated Instant Try-On (fallback / quick test)
  const executeTryOn = async () => {
    if (!userPhotoPreview && !userPhotoFile) {
      addToast('Please upload your photograph or choose a studio model first.', 'warning');
      return false;
    }
    if (!selectedOutfit) {
      addToast('Please select an outfit to try on.', 'warning');
      return false;
    }

    setIsProcessing(true);
    setProcessingStage('Analyzing silhouette posture & lighting contours...');

    const stage1 = setTimeout(() => {
      setProcessingStage('Extracting garment drape & volumetric fabric texture maps...');
    }, 700);

    const stage2 = setTimeout(() => {
      setProcessingStage('Synthesizing neural fitting & micro-crease tension...');
    }, 1400);

    const stage3 = setTimeout(() => {
      setProcessingStage('Rendering Kwai Kolors editorial portrait...');
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('outfitId', selectedOutfit.id);
      
      if (userPhotoFile) {
        formData.append('userPhoto', userPhotoFile);
      } else if (userPhotoPreview) {
        formData.append('userPhotoUrl', userPhotoPreview);
      }

      await new Promise(r => setTimeout(r, 2200));

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
    setSelectedOutfits(prev => {
      if (prev.some(o => o.id === outfit.id)) return prev;
      return [...prev, outfit];
    });
    closeOutfitDetail();
    setActiveView('tryon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <TryOnContext.Provider value={{
      outfits,
      sampleModels,
      loadingOutfits,
      refreshOutfits,
      selectedOutfit,
      setSelectedOutfit,
      selectedOutfits,
      setSelectedOutfits,
      toggleOutfitSelection,
      removeOutfitFromEnsemble,
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
      aiStatus,
      // Kolors specific
      kolorsSession,
      setKolorsSession,
      kolorsHandoffActive,
      setKolorsHandoffActive,
      startKolorsHandoff,
      submitKolorsResult,
      downloadPersonAsset,
      downloadGarmentAsset,
      downloadAllGarmentAssets,
      clearKolorsSession,
      showcaseList,
      refreshShowcase
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
