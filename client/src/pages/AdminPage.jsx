import React, { useState, useRef } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, Upload, X, Check, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { createOutfit, deleteOutfit } from '../utils/api';
import { useTryOn } from '../context/TryOnContext';

export default function AdminPage() {
  const { outfits, refreshOutfits, addToast, openOutfitDetail } = useTryOn();
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'manage'
  
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Western Haute Couture');
  const [designer, setDesigner] = useState('NIFT Design Atelier');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [silhouette, setSilhouette] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState("SS'26 Atelier");
  
  // Uploaded files & Image URLs (supports 6-7 images!)
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [externalUrls, setExternalUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const categories = [
    'Western Haute Couture',
    'Contemporary Indo-Western',
    'Traditional Elegance',
    'Indo-Western',
    'Casual Luxe',
    'Resort Luxe',
    'Avant-Garde'
  ];

  // Handle local file selection
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Generate local previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeLocalImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle external URL additions
  const handleAddExternalUrl = () => {
    if (!externalUrlInput.trim()) return;
    setExternalUrls(prev => [...prev, externalUrlInput.trim()]);
    setExternalUrlInput('');
  };

  const removeExternalUrl = (index) => {
    setExternalUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Total images count
  const totalImagesCount = imagePreviews.length + externalUrls.length;

  // Handle Save Outfit
  const handleSaveOutfit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please provide an outfit name.', 'warning');
      return;
    }

    if (!description.trim()) {
      addToast('Please provide an outfit description.', 'warning');
      return;
    }

    if (totalImagesCount === 0) {
      addToast('Please upload or provide at least one photograph (preferably 6–7 for full editorial coverage).', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('designer', designer);
      formData.append('description', description);
      formData.append('fabric', fabric || 'Curated Atelier Textile');
      formData.append('silhouette', silhouette || 'Editorial Silhouette');
      formData.append('color', color || 'Neutral Tone');
      formData.append('season', season || "SS'26");
      formData.append('externalImages', JSON.stringify(externalUrls));
      formData.append('tags', JSON.stringify([category, 'NIFT Collection', 'SS26']));

      // Append local image files
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      const saved = await createOutfit(formData);
      addToast(`"${saved.name}" added successfully to the wardrobe!`, 'success');
      
      // Reset form
      setName('');
      setDescription('');
      setFabric('');
      setSilhouette('');
      setColor('');
      setImageFiles([]);
      setImagePreviews([]);
      setExternalUrls([]);
      
      // Refresh global store
      await refreshOutfits();
      setActiveTab('manage');
    } catch (err) {
      console.error('Error saving outfit:', err);
      addToast('Failed to save outfit: ' + err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Outfit
  const handleDeleteOutfit = async (id, outfitName) => {
    if (!window.confirm(`Are you sure you want to remove "${outfitName}" from the atelier collection?`)) {
      return;
    }

    try {
      await deleteOutfit(id);
      addToast(`"${outfitName}" removed from collection.`, 'info');
      await refreshOutfits();
    } catch (err) {
      addToast('Failed to delete outfit: ' + err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-atelier-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-atelier-200/90 pb-8 mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-atelier text-champagne-600 font-semibold mb-2">
              <span>Collection Owner Portal</span>
              <span>•</span>
              <span>Persistent Wardrobe Management</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-atelier-950 font-light tracking-tight">
              Atelier Wardrobe Administration
            </h1>
            <p className="text-xs sm:text-sm text-atelier-600 font-light mt-1 max-w-xl">
              Add new garments, manage 6–7 editorial photography angles, and update textiles without editing website code. 
              Changes persist directly on the server.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="inline-flex border border-atelier-300 bg-atelier-100 p-0.5">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'add' ? 'bg-atelier-950 text-white shadow-sm' : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Outfit</span>
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'manage' ? 'bg-atelier-950 text-white shadow-sm' : 'text-atelier-700 hover:text-atelier-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Current Wardrobe ({outfits.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Add New Outfit Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleSaveOutfit} className="bg-white border border-atelier-200 shadow-sm p-6 sm:p-10 space-y-8 animate-fade-in">
            
            <div className="border-b border-atelier-100 pb-4">
              <h3 className="font-serif text-2xl text-atelier-950 font-normal">
                Garment Specifications & Editorial Narrative
              </h3>
              <p className="text-xs text-atelier-500 font-light mt-1">
                All details will appear dynamically in the collection catalog and virtual try-on room.
              </p>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Outfit Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Outfit Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. The Ivory Cascade Saree-Gown"
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Designer */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Designer / NIFT Studio
                </label>
                <input
                  type="text"
                  value={designer}
                  onChange={(e) => setDesigner(e.target.value)}
                  placeholder="e.g. Atelier NIFT Master Class"
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                />
              </div>

              {/* Season */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Season / Collection Tag
                </label>
                <input
                  type="text"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  placeholder="e.g. SS'26 Haute Couture"
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                />
              </div>

              {/* Fabric */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Fabrication & Weave Details
                </label>
                <input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Raw Mulberry Silk Faille with Crushed Organza"
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                />
              </div>

              {/* Silhouette */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                  Silhouette & Cut
                </label>
                <input
                  type="text"
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  placeholder="e.g. Asymmetric Draped Column with Trailing Cape"
                  className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
                />
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold mb-2">
                Editorial Narrative & Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the aesthetic concept, artisan craftsmanship, and draping structure of the piece..."
                className="w-full bg-atelier-50 border border-atelier-200 py-2.5 px-3.5 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900 transition-colors"
              />
            </div>

            {/* Image Upload Area: Supporting Multiple (6-7) Photographs */}
            <div className="border-t border-atelier-100 pt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-atelier-700 font-semibold">
                    Garment Photography Gallery (6–7 Images Recommended) *
                  </label>
                  <p className="text-[11px] text-atelier-500 font-light">
                    Upload angles: Full front, side drape, fabric micro-shot, neckline, back construction, styled look.
                  </p>
                </div>
                <span className="text-xs font-mono text-champagne-600 font-medium">
                  {totalImagesCount} of 7 images selected
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-atelier-300 hover:border-atelier-900 p-8 text-center cursor-pointer transition-colors bg-atelier-50/50 mb-4"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFilesSelected}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-atelier-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-atelier-900 mb-1">
                  Click to select multiple local photographs or drop them here
                </p>
                <p className="text-[10px] text-atelier-400 font-light">
                  Supports JPG, PNG, WebP (up to 15MB each)
                </p>
              </div>

              {/* External Image URL adder (optional alternative) */}
              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="url"
                  value={externalUrlInput}
                  onChange={(e) => setExternalUrlInput(e.target.value)}
                  placeholder="Or paste an image URL (Unsplash, CDN, etc.)..."
                  className="flex-grow bg-atelier-50 border border-atelier-200 py-2 px-3 text-xs text-atelier-950 focus:outline-none focus:border-atelier-900"
                />
                <button
                  type="button"
                  onClick={handleAddExternalUrl}
                  className="px-4 py-2 bg-atelier-200 hover:bg-atelier-300 text-atelier-900 text-xs font-medium transition-colors"
                >
                  Add URL
                </button>
              </div>

              {/* Uploaded Images Preview Strip */}
              {totalImagesCount > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-atelier-500 font-semibold mb-2">
                    Image Previews (First image is used as Main Showcase):
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 gap-3">
                    {/* Local previews */}
                    {imagePreviews.map((url, idx) => (
                      <div key={'local-' + idx} className="relative aspect-[3/4] bg-atelier-100 border border-atelier-300 overflow-hidden group">
                        <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeLocalImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-atelier-950/80 text-white rounded-full hover:bg-rose-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-atelier-950/85 text-champagne-300 px-1 text-[8px] uppercase font-mono">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}

                    {/* External previews */}
                    {externalUrls.map((url, idx) => (
                      <div key={'ext-' + idx} className="relative aspect-[3/4] bg-atelier-100 border border-atelier-300 overflow-hidden group">
                        <img src={url} alt={`URL ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExternalUrl(idx)}
                          className="absolute top-1 right-1 p-1 bg-atelier-950/80 text-white rounded-full hover:bg-rose-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {imagePreviews.length === 0 && idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-atelier-950/85 text-champagne-300 px-1 text-[8px] uppercase font-mono">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-atelier-100 flex items-center justify-end space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-atelier-950 hover:bg-atelier-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all shadow-editorial disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-champagne-300" />
                <span>{isSubmitting ? 'Saving to Atelier...' : 'Save Outfit to Wardrobe'}</span>
              </button>
            </div>

          </form>
        )}

        {/* Tab 2: Current Wardrobe List & Deletion */}
        {activeTab === 'manage' && (
          <div className="bg-white border border-atelier-200 shadow-sm p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-atelier-100 mb-6">
              <h3 className="font-serif text-2xl text-atelier-950 font-normal">
                Curated Atelier Outfits ({outfits.length})
              </h3>
              <button
                onClick={() => setActiveTab('add')}
                className="px-3.5 py-1.5 bg-atelier-950 text-white text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New</span>
              </button>
            </div>

            <div className="divide-y divide-atelier-100">
              {outfits.map((outfit) => (
                <div key={outfit.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={outfit.mainImage}
                      alt={outfit.name}
                      className="w-16 h-20 object-cover border border-atelier-200 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-atelier-100 text-atelier-700 font-mono">
                        {outfit.category}
                      </span>
                      <h4 className="font-serif text-lg text-atelier-950 font-normal mt-1">
                        {outfit.name}
                      </h4>
                      <p className="text-xs text-atelier-500 font-light line-clamp-1">
                        {outfit.fabric || outfit.description}
                      </p>
                      <span className="text-[10px] text-atelier-400 font-mono">
                        {(outfit.images || []).length} photography angles stored
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <button
                      onClick={() => openOutfitDetail(outfit)}
                      className="px-3 py-1.5 text-xs text-atelier-700 hover:text-atelier-950 border border-atelier-300 hover:border-atelier-900 transition-colors"
                    >
                      View Angles
                    </button>
                    <button
                      onClick={() => handleDeleteOutfit(outfit.id, outfit.name)}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Outfit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
