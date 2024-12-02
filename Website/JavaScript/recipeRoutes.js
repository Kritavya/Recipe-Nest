const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');
const { upload, getPublicUrl } = require('./fileUpload'); // File upload middleware

// Define routes for EJS pages
router.get('/HTML/Website_First_Page', (req, res) => {
    res.render('Website_First_Page'); // Render Website_First_Page.ejs
});

router.get('/HTML/add-recipe', (req, res) => {
    res.render('add-recipe'); // Render add-recipe.ejs
});

router.get('/HTML/category', (req, res) => {
    res.render('category'); // Render category.ejs
});

// Add more routes as needed for other EJS files
router.get('/HTML/login', (req, res) => {
    res.render('login'); // Render login.ejs
});

router.get('/HTML/signup', (req, res) => {
    res.render('signup'); // Render signup.ejs
});

router.get('/HTML/profile', (req, res) => {
    res.render('profile'); // Render signup.ejs
});

router.get('/HTML/search-result', (req, res) => {
    res.render('search-result'); // Render signup.ejs
});

router.get('/HTML/new_recipe', (req, res) => {
    res.render('new_recipe'); // Render signup.ejs
});

router.get('/HTML/recipe', (req, res) => {
    res.render('recipe'); // Render signup.ejs
});

// Route to add a new recipe
router.post('/add-recipe', upload.single('photo'), recipeController.addRecipe);

// Route to get a recipe by title for full recipe page
router.get('/get-recipe', recipeController.getRecipeByTitle);

// Route for Searching Recipes
router.get('/search-recipes', recipeController.searchRecipes);

// Export the router
module.exports = router;
