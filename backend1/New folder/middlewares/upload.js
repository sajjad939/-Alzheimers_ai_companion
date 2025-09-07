// Middleware for handling photo and voice uploads using multer
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Ensure upload directories exist
const fs = require('fs');
const photosDir = path.join(__dirname, '..', 'uploads', 'photos');
const voiceDir = path.join(__dirname, '..', 'uploads', 'voice');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

if (!fs.existsSync(voiceDir)) {
  fs.mkdirSync(voiceDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'photo') {
      cb(null, 'uploads/photos');
    } else if (file.fieldname === 'voice') {
      cb(null, 'uploads/voice');
    } else {
      cb(new Error('Invalid file field'), null);
    }
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExtension, '').replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, fileName + '-' + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024; // 50MB in bytes
  
  if (file.size > maxSize) {
    return cb(new Error('File size exceeds 50MB limit'), false);
  }
  
  if (file.fieldname === 'photo') {
    // Accept images only with additional security checks
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      // Additional check for file extension
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      if (allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file extension for photos!'), false);
      }
    } else {
      cb(new Error('Only JPEG, PNG, GIF, and WebP files are allowed for photos!'), false);
    }
  } else if (file.fieldname === 'voice') {
    // Accept audio only with additional security checks
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm', 'audio/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      // Additional check for file extension
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExts = ['.mp3', '.wav', '.webm', '.ogg'];
      if (allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file extension for voice recordings!'), false);
      }
    } else {
      cb(new Error('Only MP3, WAV, WebM, and OGG files are allowed for voice recordings!'), false);
    }
  } else {
    cb(new Error('Invalid file field'), false);
  }
};

// Create multer instance with limits
const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 2 // Maximum 2 files per request
  }
});

module.exports = upload;
