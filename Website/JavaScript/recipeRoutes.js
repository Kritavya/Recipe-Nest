const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');
const upload = require('./fileUpload'); // File upload middleware

// Route to add a new recipe
router.post('/add-recipe', upload.single('photo'), recipeController.addRecipe);

// Export the router
module.exports = router;
