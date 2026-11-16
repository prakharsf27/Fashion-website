import mongoose from 'mongoose';

const outfitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, default: 'Atelier Couture' },
  designer: { type: String, default: 'Atelier Master Tailor' },
  description: { type: String, required: true },
  fabric: { type: String, default: 'Hand-woven Atelier Textile' },
  silhouette: { type: String, default: 'Tailored Editorial' },
  color: { type: String, default: 'Neutral Atelier' },
  season: { type: String, default: 'Current Season' },
  featured: { type: Boolean, default: false },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  tryOnPreview: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const OutfitModel = mongoose.models.Outfit || mongoose.model('Outfit', outfitSchema);
