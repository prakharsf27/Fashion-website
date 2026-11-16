/**
 * KolorsProvider Adapter
 * Encapsulates all Kwai Kolors Virtual Try-On workflow operations.
 * Designed to switch between 'manual' (Hugging Face Space handoff)
 * and 'api' (direct official API) without altering frontend components.
 */

const STORAGE_KEY = 'the_fit_room_kolors_session';
const OFFICIAL_SPACE_URL = 'https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On';

export const KolorsProvider = {
  mode: 'manual', // 'manual' | 'api'
  spaceUrl: OFFICIAL_SPACE_URL,
  providerName: 'Kwai Kolors Virtual Try-On',

  /**
   * Prepares and persists a try-on session.
   */
  async prepareSession({ userPhotoFile, userPhotoPreview, outfit }) {
    const formData = new FormData();
    formData.append('outfitId', outfit.id);

    if (userPhotoFile instanceof File) {
      formData.append('userPhoto', userPhotoFile);
    } else if (userPhotoPreview) {
      formData.append('userPhotoUrl', userPhotoPreview);
    } else {
      throw new Error('A person photograph is required to prepare session.');
    }

    const res = await fetch('/api/try-on/kolors/session', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to prepare Kolors session.');
    }

    const session = json.data;
    // Persist to local storage for tab-switching safety
    this.persistLocalSession(session);
    return session;
  },

  /**
   * Submits the Kolors-generated result image.
   */
  async saveResult(sessionId, resultFileOrUrl) {
    const formData = new FormData();
    formData.append('sessionId', sessionId);

    if (resultFileOrUrl instanceof File) {
      formData.append('resultImage', resultFileOrUrl);
    } else if (typeof resultFileOrUrl === 'string') {
      formData.append('resultImageUrl', resultFileOrUrl);
    } else {
      throw new Error('Please provide the generated Kolors result image.');
    }

    const res = await fetch('/api/try-on/kolors/result', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to save Kolors result.');
    }

    const session = json.data;
    this.persistLocalSession(session);
    return session;
  },

  /**
   * Retrieves active session from backend or local storage.
   */
  async getSession(sessionId) {
    if (sessionId) {
      try {
        const res = await fetch(`/api/try-on/kolors/session/${sessionId}`);
        const json = await res.json();
        if (json.success && json.data) {
          this.persistLocalSession(json.data);
          return json.data;
        }
      } catch (err) {
        console.warn('Could not fetch session from backend, checking local storage:', err);
      }
    }
    return this.getLocalSession();
  },

  /**
   * Deletes session and clears stored files for privacy.
   */
  async deleteSession(sessionId) {
    if (sessionId) {
      try {
        await fetch(`/api/try-on/kolors/session/${sessionId}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('Error deleting backend session:', e);
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    return true;
  },

  /**
   * Local session persistence helpers.
   */
  persistLocalSession(session) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  },

  getLocalSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Programmatic image download helper (cross-origin safe via blob).
   */
  async downloadImage(imageUrl, fileName = 'asset.jpg') {
    try {
      // First try fetching as blob for cross-origin compliance
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response not ok');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      return true;
    } catch (e) {
      // Fallback: direct anchor download
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    }
  },

  /**
   * Opens the official Kwai Kolors Space in a new browser tab.
   */
  openOfficialSpace() {
    window.open(this.spaceUrl, '_blank', 'noopener,noreferrer');
  },

  /**
   * Showcase management endpoints.
   */
  async getShowcase() {
    const res = await fetch('/api/try-on/kolors/showcase');
    const json = await res.json();
    return json.success ? json.data : [];
  },

  async saveShowcase(formData) {
    const res = await fetch('/api/try-on/kolors/showcase', {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to save showcase');
    return json.data;
  },

  async deleteShowcase(id) {
    const res = await fetch(`/api/try-on/kolors/showcase/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete showcase');
    return json.data;
  }
};
