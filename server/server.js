// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Admin credentials loaded from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

// Generate a session token secret
const SESSION_SECRET = crypto.randomBytes(64).toString('hex');

// Store active sessions
const activeSessions = new Map();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticate = (req, res, next) => {
  // Skip authentication for login endpoint
  if (req.path === '/api/login') {
    return next();
  }
  
  // Check for auth token in headers
  const authToken = req.headers.authorization?.split(' ')[1];
  
  if (!authToken || !activeSessions.has(authToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Token is valid
  next();
};

// Apply authentication to protected routes
app.use('/api/upload', authenticate);
app.use('/api/delete', authenticate);

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store uploaded files in the meme-generator/public/memes directory
    const uploadDir = path.join(__dirname, '../meme-generator/public/memes');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Keep original filename but ensure it's unique by adding timestamp if needed
    const fileExt = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExt);
    
    // Check if file already exists
    const uploadDir = path.join(__dirname, '../meme-generator/public/memes');
    if (fs.existsSync(path.join(uploadDir, file.originalname))) {
      // Add timestamp to make filename unique
      cb(null, `${fileName}-${Date.now()}${fileExt}`);
    } else {
      cb(null, file.originalname);
    }
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Initialize upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

// Serve static files from the meme-generator/public directory
app.use('/memes', express.static(path.join(__dirname, '../meme-generator/public/memes')));

// Root route - welcome page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PV Meme Generator API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        h2 {
          color: #444;
          margin-top: 30px;
        }
        code {
          background: #f4f4f4;
          padding: 2px 5px;
          border-radius: 3px;
        }
        pre {
          background: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
        }
        .endpoint {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <h1>PV Meme Generator API</h1>
      <p>Welcome to the PV Meme Generator API server. This server provides endpoints for managing meme templates.</p>
      
      <h2>Available Endpoints:</h2>
      
      <div class="endpoint">
        <h3>GET /api/templates</h3>
        <p>Returns a list of all available meme templates.</p>
        <p>Example response:</p>
        <pre>[{
  "filename": "example.png",
  "path": "memes/example.png"
}]</pre>
      </div>
      
      <div class="endpoint">
        <h3>POST /api/upload</h3>
        <p>Upload a new meme template.</p>
        <p>Request: multipart/form-data with a file field named 'memeTemplate'</p>
        <p>Example response:</p>
        <pre>{
  "success": true,
  "file": {
    "filename": "uploaded-image.png",
    "path": "memes/uploaded-image.png"
  }
}</pre>
      </div>
      
      <div class="endpoint">
        <h3>GET /memes/:filename</h3>
        <p>Serves the actual meme template image files.</p>
      </div>
      
      <h2>How to Use</h2>
      <p>The API is designed to work with the PV Meme Generator frontend. You can access the admin panel in the frontend to upload new templates.</p>
      <p>To test the API directly, you can use tools like curl, Postman, or your browser's developer tools.</p>
    </body>
    </html>
  `);
});

// API endpoint to get all meme templates
app.get('/api/templates', (req, res) => {
  const memesDir = path.join(__dirname, '../meme-generator/public/memes');
  
  fs.readdir(memesDir, (err, files) => {
    if (err) {
      console.error('Error reading memes directory:', err);
      return res.status(500).json({ error: 'Failed to read memes directory' });
    }
    
    // Filter out non-image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Create array of meme template objects
    const templates = imageFiles.map(file => ({
      filename: file,
      path: `memes/${file}`
    }));
    
    res.json(templates);
  });
});

// API endpoint for admin login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a session token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store the token with an expiration time (24 hours)
    activeSessions.set(token, {
      username,
      expires: Date.now() + (24 * 60 * 60 * 1000)
    });
    
    // Clean up expired sessions
    for (const [key, session] of activeSessions.entries()) {
      if (session.expires < Date.now()) {
        activeSessions.delete(key);
      }
    }
    
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// API endpoint to upload a new meme template
app.post('/api/upload', upload.single('memeTemplate'), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the uploaded file information
  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      path: `memes/${req.file.filename}`
    }
  });
});

// API endpoint to delete a meme template
app.delete('/api/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../meme-generator/public/memes', filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  try {
    // Delete the file
    fs.unlinkSync(filePath);
    res.json({ success: true, message: `Template ${filename} deleted successfully` });
  } catch (err) {
    console.error('Error deleting template:', err);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Admin authentication is enabled');
});
