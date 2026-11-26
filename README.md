# THE CAMERINO — Luxury Fashion Virtual Try-On
> *Discover your style. Visualise your look.*  
> **Digital Atelier • Powered by Kwai Kolors Virtual Try-On**

---

## Overview

**THE CAMERINO** is a premium, responsive fashion-tech platform combining a luxury editorial magazine aesthetic with an interactive digital dressing room. The application allows users to explore curated designer collections, upload their own photograph, select garments, and visualize how they look using neural AI virtual try-on technology powered by Kwai Kolors.

---

## Kwai Kolors Virtual Try-On Workflow

The platform integrates a manual handoff workflow with the official **Kwai Kolors Virtual Try-On Hugging Face Space**:
- **Official Space**: `https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On`
- **User Flow**:
  1. Upload person portrait.
  2. Select an outfit from the collection.
  3. Download the Person Photo and Garment Reference.
  4. Launch the official Kolors Space in a new tab.
  5. Upload both assets into Kolors and generate the virtual try-on.
  6. Return and upload the generated Kolors result.
  7. View the 3-image comparison (Person, Garment Reference, Kolors Result) with an interactive before/after split slider.
- **Provider Architecture**: Encapsulated within `KolorsProvider` (ready for future official API endpoints without changing the frontend).
- **Showcase Archive**: Curated, admin-managed showcase entries exhibiting genuine Kolors results.

---

## Key Features

### 1. Luxury Editorial Visual Identity
- **Palette**: Warm ivory (`#FAF8F5`), soft linen, warm cream, raw sand, and deep obsidian charcoal with warm champagne accents.
- **Typography**: Editorial display serif (*Cormorant Garamond*, *Italiana*) paired with modern sans-serif (*Plus Jakarta Sans*).
- **Aesthetic**: Generous whitespace, refined micro-borders, blur backdrops, smooth transitions, and high-fashion photography.

### 2. Wardrobe & Collections (6–7 Photos per Outfit)
- Complete wardrobe repository across multiple categories:
  - Western Haute Couture
  - Contemporary Indo-Western
  - Traditional Elegance
  - Indo-Western Fusion
  - Casual Luxe & Resortwear
- **6–7 High-Resolution Photographs per Outfit**: Full-length silhouette, fabric micro-shots, draping angles, neckline close-ups, back construction, and styled runway looks.
- Interactive detailed modal and dedicated outfit view with active thumbnail switcher.

### 3. Collection Owner / Admin Management
- Add new garments to the wardrobe without editing code.
- Multi-image uploader supporting 6–7 photography angles with live previews and reordering.
- Dedicated Kolors Showcase management tab for genuine results.

### 4. Interactive Virtual Try-On Room & Results
- **Section A**: Portrait photo uploader + curated studio test models.
- **Section B**: Garment selection with multi-angle preview.
- **Kolors Handoff Studio**: Download buttons for both assets, link to official Kolors Space, and upload zone for generated results.
- **Triptych Results View**: Displays Original Person Photo, Garment Reference, and Kolors Result side-by-side with an interactive before/after split slider.

---

## Technical Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, HTML5 Canvas Lookbook Generator.
- **Backend**: Node.js, Express, Multer, Persistent JSON Store & MongoDB support.
- **Multi-Service Deployment**: Configured for Vercel with unified rewrites.

---

## Quick Start

```bash
# Install dependencies
npm run install-all

# Start both backend and frontend concurrently
npm run dev
```

- **Frontend**: `http://localhost:5174`
- **Backend API**: `http://localhost:5001`
