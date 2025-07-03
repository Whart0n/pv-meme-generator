# Meme Generator

A web-based meme generator inspired by imgflip. Select a template, add draggable text boxes, and export as PNG. Works offline once images are loaded.

## Folder Structure
```
PV Meme Generator/
├─ memes/              # Meme template images (keep your own here)
├─ server/             # Node + Express API & static server
└─ client/             # React front-end (Vite + Tailwind)
```

## Quick Start
1. **Install dependencies**
   ```bash
   # Server
   cd server && npm i
   # Client
   cd ../client && npm i
   ```
2. **Run in dev mode** (two terminals or with concurrently):
   ```bash
   # Terminal 1
   cd server && npm run dev
   # Terminal 2
   cd client && npm run dev
   ```
   • Server: http://localhost:5000  
   • Client: http://localhost:5173 (proxied API)

3. **Build & serve production**
   ```bash
   # Build client
   cd client && npm run build
   # Copy build to server/client/dist automatically handled by Vite output path
   # Start server in production
   cd ../server && npm start
   # Open http://localhost:5000
   ```

## Features
- Thumbnail gallery (`react-photo-gallery`) fed by `/api/memes` endpoint.
- Fabric.js canvas with draggable / resizable text boxes.
- Sidebar to edit text, color, font, outline.
- PNG export (Fabric `toDataURL`).
- Tailwind CSS responsive UI.

## Customisation
- Add more fonts: import via Google Fonts in `index.html` and list in dropdown.
- Increase max text boxes: adjust `addTextBox` logic.
- Enable snap-to-grid: Fabric grid guides or additional “react-grid-layout”.

## License
MIT – free to remix.
