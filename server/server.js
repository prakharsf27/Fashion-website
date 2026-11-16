import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import outfitRoutes from './routes/outfits.js';
import tryonRoutes from './routes/tryon.js';
import { setMongoStatus } from './data/store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const outfitUploadsDir = path.join(uploadsDir, 'outfits');
const tryonUploadsDir = path.join(uploadsDir, 'tryon');

[uploadsDir, outfitUploadsDir, tryonUploadsDir].forEach(dir => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn('Could not create directory:', dir, e.message);
  }
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/outfits', outfitRoutes);
app.use('/api/try-on', tryonRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'THE FIT ROOM — Atelier Virtual Try-On',
    institution: 'National Institute of Fashion Technology (NIFT)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection Attempt (with fast graceful fallback)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/the_fit_room';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
})
.then(() => {
  console.log('✓ Connected to MongoDB database successfully:', MONGODB_URI);
  setMongoStatus(true);
})
.catch((err) => {
  console.log('ℹ MongoDB not active locally. Operating seamlessly with high-speed persistent JSON data store.');
  setMongoStatus(false);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`   THE FIT ROOM — Fashion Atelier Server Running       `);
  console.log(`   URL: http://localhost:${PORT}                      `);
  console.log(`   NIFT Fashion Tech Virtual Try-On Ready              `);
  console.log(`=======================================================`);
});

export default app;
