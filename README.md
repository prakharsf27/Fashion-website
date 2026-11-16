# THE FIT ROOM — Atelier Virtual Try-On
> *Discover your style. Visualise your look.*  
> **Fashion Design Project • National Institute of Fashion Technology (NIFT)**

---

## Overview

**THE FIT ROOM** is an interactive, responsive fashion-tech platform designed for the NIFT graduate exhibition showcase. Designed at the intersection of a luxury editorial magazine (inspired by *LUMIÈRE*) and a minimalist fashion lookbook (inspired by *NOIRÉ SS'26*), the application allows users to explore curated haute couture collections, upload their own photograph, select garments, and visualize how they look using neural AI virtual try-on technology.

---

## Key Features

### 1. Luxury Editorial Visual Identity
- **Palette**: Warm ivory (`#FAF8F5`), soft linen, warm cream, raw sand, and deep obsidian charcoal with warm champagne accents.
- **Typography**: Editorial display serif (*Cormorant Garamond*, *Italiana*) paired with modern sans-serif (*Plus Jakarta Sans*).
- **Aesthetic**: Generous whitespace, refined micro-borders, blur backdrops, smooth transitions, and high-fashion photography.

### 2. Editorial Homepage
- High-fashion hero section matching the *LUMIÈRE* editorial reference.
- Main statement: *"Your Style, Your Way."*
- Prominent "Try Your Look" and "Explore Collection" CTAs.
- Curated SS'26 featured capsule grid with quick-view and direct try-on triggers.
- 3-step interactive virtual atelier walkthrough.

### 3. Wardrobe & Collections (6–7 Photos per Outfit)
- Complete wardrobe repository across multiple categories:
  - Western Haute Couture
  - Contemporary Indo-Western
  - Traditional Elegance (Indian Couture)
  - Indo-Western Fusion
  - Casual Luxe & Resortwear
- **6–7 High-Resolution Photographs per Outfit**:
  - Full-length silhouette
  - Fabric & weave micro-shots
  - Draping and motion angles
  - Neckline & embroidery close-ups
  - Back construction
  - Styled runway looks
- Category filter pills, instant search, and photo count indicators.
- Interactive detailed modal and dedicated outfit view with active thumbnail switcher.

### 4. Collection Owner / Admin Management
- Add new garments to the wardrobe without editing any code.
- Fields: Outfit Name, Category, Description, Fabrication, Silhouette, Color, Season.
- Multi-image uploader supporting 6–7 photography angles with live previews and delete options.
- Persistent storage on the server (`server/data/outfits.json` and MongoDB).
- View, inspect, and delete existing outfits.

### 5. Interactive Virtual Try-On Room
- **Section A (Upload Portrait)**:
  - Drag-and-drop or browse files (JPG, PNG, WebP up to 20MB).
  - Live preview with change/remove options.
  - Fashion styling guidelines alert for optimal posture and lighting.
  - One-click sample editorial models (Aria, Dev, Maya, Kabir) for rapid exhibition demonstration.
- **Section B (Select Garment)**:
  - Horizontal scrollable wardrobe gallery with category tabs.
  - Distinct active selection indicator with luxury gold ring and check badge.
  - Quick link to inspect 6–7 angles before draping.
- **Multi-Stage Couture Loading Animation**:
  - *"Analyzing silhouette posture & lighting contours..."*
  - *"Extracting garment drape & volumetric fabric texture maps..."*
  - *"Synthesizing neural fitting & micro-crease tension..."*
  - *"Rendering high-resolution editorial portrait..."*

### 6. Results Page & Draggable Comparison Slider
- Interactive Before/After split comparison slider with draggable knob.
- Toggle between Interactive Slider and Side-by-Side Dual View.
- Technical fitting metrics:
  - Garment Drape Fidelity (98.4%)
  - Identity & Pose Preservation (99.1%)
  - Ambient Lighting Alignment
- Curated NIFT stylist notes and recommendations.
- **Download High-Res Lookbook**: Generates an editorial portrait with NIFT branding and styling metadata.

### 7. Dual-Mode AI Backend Architecture
- Dedicated `/api/try-on/process` endpoint.
- Secure environment configuration via `server/.env`.
- Supports live external AI services (Gemini 2.5 / IDM-VTON) when API keys are configured.
- Built-in photorealistic Atelier Demo Engine for 100% dependable exhibition booth demonstrations without consuming paid quotas.

---

## Technical Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, HTML5 Canvas Lookbook Generator.
- **Backend**: Node.js, Express, Multer (multipart image processing), Mongoose / MongoDB with automatic high-speed persistent JSON fallback.
- **Proxy**: Vite dev proxy seamlessly forwarding `/api` and `/uploads` to Express.

---

## Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Run Both Server & Client Concurrently
```bash
npm run dev
```

- **Frontend**: `http://localhost:5174` (or `5173`)
- **Backend API**: `http://localhost:5001`
- **Health Check**: `http://localhost:5001/api/health`

---

## Project Credits
**NIFT Fashion Design Graduate Project & Thesis**  
*National Institute of Fashion Technology*
