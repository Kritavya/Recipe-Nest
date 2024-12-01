const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');
const { upload, getPublicUrl } = require('./fileUpload'); // File upload middleware

// Route to add a new recipe
router.post('/add-recipe', upload.single('photo'), recipeController.addRecipe);

// Route to get a recipe by title for full recipe page
router.get('/get-recipe', recipeController.getRecipeByTitle);

// Route for Searching Recipes
router.get('/search-recipes', recipeController.searchRecipes);

// Export the router
module.exports = router;
