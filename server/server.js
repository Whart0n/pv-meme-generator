import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();
// Allow all origins for development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Add debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// --- DEBUG: log memes directory path ---
console.log('Memes directory resolved to:', memedirExists());

function memedirExists() {
  const dir = path.join(__dirname, '..', 'memes');
  try {
    return fs.existsSync(dir) ? dir : 'NOT FOUND';
  } catch (e) {
    return 'ERROR checking memes dir';
  }
}

// Serve memes statically
const memesDir = path.join(__dirname, '..', 'memes');
app.use('/memes', express.static(memesDir));

// Serve client build
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// API to list meme images
app.get('/api/memes', (req, res) => {
  fs.readdir(memesDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json([]);
    }
    const images = files.filter(f => /\.(png|jpe?g|webp)$/i.test(f));
    res.json(images);
  });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
