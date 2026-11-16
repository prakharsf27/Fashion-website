import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialOutfits, sampleModels } from './initialOutfits.js';
import { OutfitModel } from '../models/Outfit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'outfits.json');

let isMongoConnected = false;

export function setMongoStatus(status) {
  isMongoConnected = status;
}

export function isMongoActive() {
  return isMongoConnected;
}

// Ensure data file exists with seed data
function ensureJsonFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialOutfits, null, 2), 'utf-8');
  }
}

// Read from JSON file
function readJsonOutfits() {
  ensureJsonFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialOutfits, null, 2), 'utf-8');
      return initialOutfits;
    }
    return data;
  } catch (err) {
    console.error('Error reading outfits.json, reverting to seed:', err.message);
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialOutfits, null, 2), 'utf-8');
    return initialOutfits;
  }
}

// Write to JSON file
function writeJsonOutfits(outfits) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(outfits, null, 2), 'utf-8');
}

export const outfitStore = {
  async getAll() {
    if (isMongoConnected) {
      try {
        const mongoOutfits = await OutfitModel.find().sort({ createdAt: -1 });
        if (mongoOutfits && mongoOutfits.length > 0) {
          return mongoOutfits.map(o => ({
            id: o._id.toString(),
            name: o.name,
            category: o.category,
            price: o.price,
            designer: o.designer,
            description: o.description,
            fabric: o.fabric,
            silhouette: o.silhouette,
            color: o.color,
            season: o.season,
            featured: o.featured,
            mainImage: o.mainImage,
            images: o.images,
            tryOnPreview: o.tryOnPreview || o.mainImage,
            tags: o.tags,
            createdAt: o.createdAt
          }));
        }
      } catch (err) {
        console.warn('MongoDB read failed, falling back to local storage:', err.message);
      }
    }
    return readJsonOutfits();
  },

  async getById(id) {
    if (isMongoConnected) {
      try {
        const doc = await OutfitModel.findById(id);
        if (doc) {
          return {
            id: doc._id.toString(),
            name: doc.name,
            category: doc.category,
            price: doc.price,
            designer: doc.designer,
            description: doc.description,
            fabric: doc.fabric,
            silhouette: doc.silhouette,
            color: doc.color,
            season: doc.season,
            featured: doc.featured,
            mainImage: doc.mainImage,
            images: doc.images,
            tryOnPreview: doc.tryOnPreview || doc.mainImage,
            tags: doc.tags,
            createdAt: doc.createdAt
          };
        }
      } catch (err) {
        // Not a mongo id or mongo error, check local file
      }
    }
    const list = readJsonOutfits();
    return list.find(o => o.id === id || String(o.id) === String(id));
  },

  async create(data) {
    const newId = 'outfit-' + Date.now();
    const outfitItem = {
      id: newId,
      name: data.name,
      category: data.category || 'Contemporary',
      price: data.price || 'Atelier Collection',
      designer: data.designer || 'NIFT Fashion Atelier',
      description: data.description || '',
      fabric: data.fabric || 'Textile Blend',
      silhouette: data.silhouette || 'Editorial Silhouette',
      color: data.color || 'Curated Neutral',
      season: data.season || 'SS 2026',
      featured: Boolean(data.featured),
      mainImage: data.mainImage || (data.images && data.images[0]) || '',
      images: Array.isArray(data.images) ? data.images : [data.mainImage],
      tryOnPreview: data.tryOnPreview || data.mainImage || (data.images && data.images[0]),
      tags: data.tags || [data.category || 'Fashion'],
      createdAt: new Date().toISOString()
    };

    // Always persist to JSON file
    const list = readJsonOutfits();
    list.unshift(outfitItem);
    writeJsonOutfits(list);

    // If Mongo connected, also persist to Mongo
    if (isMongoConnected) {
      try {
        const mongoDoc = new OutfitModel(outfitItem);
        await mongoDoc.save();
        outfitItem.mongoId = mongoDoc._id.toString();
      } catch (err) {
        console.warn('Could not mirror save to MongoDB:', err.message);
      }
    }

    return outfitItem;
  },

  async update(id, data) {
    const list = readJsonOutfits();
    const index = list.findIndex(o => o.id === id || String(o.id) === String(id));
    if (index === -1) return null;

    const updated = {
      ...list[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    writeJsonOutfits(list);

    if (isMongoConnected) {
      try {
        await OutfitModel.findByIdAndUpdate(id, data);
      } catch (err) {
        // Mongo update optional
      }
    }

    return updated;
  },

  async delete(id) {
    const list = readJsonOutfits();
    const filtered = list.filter(o => o.id !== id && String(o.id) !== String(id));
    if (filtered.length === list.length) return false;
    writeJsonOutfits(filtered);

    if (isMongoConnected) {
      try {
        await OutfitModel.findByIdAndDelete(id);
      } catch (err) {
        // Mongo delete optional
      }
    }

    return true;
  },

  getSampleModels() {
    return sampleModels;
  }
};
