import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { outfitStore } from '../data/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/outfits');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration for outfit images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, 'outfit-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max per image
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP) are allowed.'));
    }
  }
});

// GET /api/outfits - List all outfits with category & tag filters
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let list = await outfitStore.getAll();

    if (category && category !== 'All') {
      list = list.filter(o => o.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o => 
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        (o.fabric && o.fabric.toLowerCase().includes(q)) ||
        (o.tags && o.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/outfits/sample-models - Curated sample models for instant testing
router.get('/sample-models', (req, res) => {
  res.json({ success: true, data: outfitStore.getSampleModels() });
});

// GET /api/outfits/:id - Single outfit details
router.get('/:id', async (req, res) => {
  try {
    const outfit = await outfitStore.getById(req.params.id);
    if (!outfit) {
      return res.status(404).json({ success: false, message: 'Outfit not found' });
    }
    res.json({ success: true, data: outfit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/outfits - Add new outfit with multiple photographs (supports 6-7 images)
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      designer,
      description,
      fabric,
      silhouette,
      color,
      season,
      featured,
      externalImages,
      tags
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Outfit name and category are required.' });
    }

    // Process uploaded files
    const uploadedUrls = (req.files || []).map(file => `/uploads/outfits/${file.filename}`);

    // Allow user to supply URLs or use uploaded images
    let imageUrls = [...uploadedUrls];
    if (externalImages) {
      try {
        const parsed = typeof externalImages === 'string' ? JSON.parse(externalImages) : externalImages;
        if (Array.isArray(parsed)) {
          imageUrls = [...imageUrls, ...parsed];
        }
      } catch (e) {
        if (typeof externalImages === 'string') imageUrls.push(externalImages);
      }
    }

    // Fallback if no images provided
    if (imageUrls.length === 0) {
      imageUrls = ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'];
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = String(tags).split(',').map(t => t.trim());
      }
    }

    const newOutfit = await outfitStore.create({
      name,
      category,
      price: price || 'Atelier Collection',
      designer: designer || 'Atelier Haute Couture',
      description: description || 'Exclusive couture piece developed for the seasonal runway showcase.',
      fabric: fabric || 'Luxury Handloom Textile',
      silhouette: silhouette || 'Contemporary Editorial',
      color: color || 'Atelier Hue',
      season: season || 'SS 2026',
      featured: featured === 'true' || featured === true,
      mainImage: imageUrls[0],
      images: imageUrls,
      tryOnPreview: imageUrls[0],
      tags: parsedTags.length > 0 ? parsedTags : [category]
    });

    res.status(201).json({
      success: true,
      message: 'Outfit added successfully to the atelier collection.',
      data: newOutfit
    });
  } catch (err) {
    console.error('Error creating outfit:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/outfits/:id - Update outfit
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const existing = await outfitStore.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Outfit not found' });
    }

    const {
      name,
      category,
      price,
      designer,
      description,
      fabric,
      silhouette,
      color,
      season,
      featured,
      existingImages,
      tags
    } = req.body;

    const newUploadedUrls = (req.files || []).map(file => `/uploads/outfits/${file.filename}`);
    let retainedImages = [];
    if (existingImages) {
      try {
        retainedImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      } catch (e) {
        retainedImages = [existingImages];
      }
    } else {
      retainedImages = existing.images || [];
    }

    const allImages = [...retainedImages, ...newUploadedUrls];

    let parsedTags = existing.tags;
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = String(tags).split(',').map(t => t.trim());
      }
    }

    const updated = await outfitStore.update(req.params.id, {
      name: name || existing.name,
      category: category || existing.category,
      price: price || existing.price,
      designer: designer || existing.designer,
      description: description || existing.description,
      fabric: fabric || existing.fabric,
      silhouette: silhouette || existing.silhouette,
      color: color || existing.color,
      season: season || existing.season,
      featured: featured !== undefined ? (featured === 'true' || featured === true) : existing.featured,
      mainImage: allImages[0] || existing.mainImage,
      images: allImages.length > 0 ? allImages : existing.images,
      tags: parsedTags
    });

    res.json({ success: true, message: 'Outfit updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/outfits/:id - Remove outfit
router.delete('/:id', async (req, res) => {
  try {
    const success = await outfitStore.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Outfit not found' });
    }
    res.json({ success: true, message: 'Outfit successfully deleted from wardrobe.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
