const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `img-${uniqueSuffix}${ext}`);
  }
});

// File validation filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, PNG, WebP, and GIF images are allowed.'));
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 Megabytes limit
  },
  fileFilter: fileFilter
});

/**
 * Express middleware wrapper to cleanly handle any multipart image field name
 * (supports 'image', 'files', 'files[0]', 'file', etc.)
 */
const handleImageUpload = (req, res, next) => {
  upload.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image file size cannot exceed 10MB.' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    // Support single file or first file in array
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);

    if (!file) {
      return res.status(400).json({ error: 'No image file uploaded. Please select an image.' });
    }
    
    req.file = file;
    next();
  });
};

module.exports = {
  upload,
  handleImageUpload,
  uploadDir
};
