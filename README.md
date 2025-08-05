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

## Hero or Zero NFT Voting

A feature that allows users to vote on MetaHero NFTs in head-to-head battles, with Elo ratings and leaderboards.

### Features
- Head-to-head NFT voting with Elo rating system
- Real-time leaderboard showing top and bottom performers
- Duplicate vote prevention per user session
- Responsive design for all device sizes
- Efficient random NFT pair selection using Firestore queries

### Migration Scripts

If you have existing NFT data in your Firebase database, you may need to run migration scripts to add new features:

#### Adding Random Index to Existing NFTs

```bash
node scripts/migrateAddRandomIndex.js
```

This script adds a `random_index` field to all existing NFTs in your database, which is required for the efficient random NFT pair selection feature.

#### Fixing Contract Addresses

```bash
node scripts/fixContractAddresses.js
```

This script fixes any NFT records that may have been created with incorrect contract addresses. It updates:
- OpenSea URLs to use the correct MetaHero contract address
- Image URLs that may reference the wrong contract
- Ensures all NFTs have properly formatted OpenSea links

**Important**: Make sure to set your `FIREBASE_DATABASE_URL` environment variable before running this script.

### Random Index for Efficient Queries

The system uses a `random_index` field on each NFT document to enable efficient random sampling:

1. **New NFTs**: Automatically get a random index between 0 and 1 when created
2. **Existing NFTs**: Can be migrated using the migration script
3. **Querying**: Uses Firestore's `orderBy` with `startAt` and `endAt` for efficient random sampling

### Running the Migration

To add the `random_index` to existing NFTs:

```bash
# Install dependencies if needed
cd client && npm install

# Run the migration script
node ../scripts/migrateAddRandomIndex.js
```

### Environment Variables

Create a `.env` file in the `client` directory with:

```
VITE_OPENSEA_API_KEY=your_opensea_api_key
```

## Customisation
- Add more fonts: import via Google Fonts in `index.html` and list in dropdown.
- Increase max text boxes: adjust `addTextBox` logic.
- Enable snap-to-grid: Fabric grid guides or additional “react-grid-layout”.

## License
MIT – free to remix.
