const express = require('express');
const connectDB = require('./Website/Dbcon/connectdb/connect');
const Recipe = require('./Website/Dbcon/model/model');
const path = require('path');
require('dotenv').config(); // Load environment variables
const multer = require('multer');

const app = express();
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // specify your uploads directory
  },
  filename: (req, file, cb) => {
      // Set the file name to be unique
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

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});


// Connect to MongoDB
connectDB();

// Serve static files
app.use(express.static(path.join(__dirname,'Website')));

// Route to serve `add-recipe.html`
app.post('/add-recipe', upload.single('photo'), async (req, res) => {
  console.log(req.body); // Log the incoming body for debugging

  try {
    const { title, full_description, categories, instructions } = req.body;
    const photo = req.file.path; // Path to the uploaded photo

    // Initialize an empty object for ingredients
    const ingredients = {};

    // Check if req.body.ingredients exists and is an object
    if (req.body.ingredients && typeof req.body.ingredients === 'object') {
      // Use Object.keys to iterate over the ingredients
      Object.keys(req.body.ingredients).forEach(key => {
        ingredients[key] = req.body.ingredients[key]; // Collect ingredients into the object
      });
    } else {
      console.log('Ingredients not found or not an object:', req.body.ingredients); // Debug info
    }

    const newRecipe = new Recipe({
      title,
      full_description,
      photo,
      categories: categories.split(',').map(category => category.trim()), // Split and trim categories
      ingredients: ingredients,
      instructions
    });

    await newRecipe.save();
    res.json({ message: 'Recipe added successfully!', recipe: newRecipe });
  } catch (error) {
    console.error('Error adding recipe:', error);
    return res.status(500).json({ error: 'Failed to add recipe. Please try again.' });
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
