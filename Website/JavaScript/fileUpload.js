const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Specify your uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the original file name
    }
});

// Filter function to accept only specific file types
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Allow jpg, jpeg, png
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: File type not supported!'), false);
    }
};

// Create multer upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Function to generate the public URL for uploaded files
const getPublicUrl = (filename) => {
    return `/uploads/${filename}`; // Public URL for the file
};

// Export the upload middleware and the public URL function
module.exports = { upload, getPublicUrl };
