const Recipe = require('../Dbcon/model/model');
const { getPublicUrl } = require('./fileUpload');

const addRecipe = async (req, res) => {
    try {
        const { title, full_description, categories, ingredients, instructions } = req.body;

        // Generate the public URL for the uploaded photo
        const photo = req.file ? getPublicUrl(req.file.filename) : null; // Use getPublicUrl to get the relative path

        const newRecipe = new Recipe({
            title,
            full_description,
            photo, // Save the public URL instead of the file system path
            categories: categories.split(',').map(category => category.trim()),
            ingredients,
            instructions,
        });

        await newRecipe.save();
        res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ error: 'Failed to add recipe. Please try again.' });
    }
};

// New function to get a recipe by title
const getRecipeByTitle = async (req, res) => {
    try {
        const { title } = req.query; // Get title from query parameters
        const recipe = await Recipe.findOne({ title }); // Find recipe by title

        if (recipe) {
            res.status(200).json(recipe); // Return the recipe
        } else {
            res.status(404).json({ error: 'Recipe not found' }); // Not found response
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ error: 'Failed to fetch recipe. Please try again.' });
    }
};

// Function for searching recipes
const searchRecipes = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from query parameters
        const recipes = await Recipe.find({
            title: { $regex: query, $options: 'i' } // Perform a case-insensitive search
        });
        
        res.status(200).json(recipes); // Return the found recipes
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: 'Failed to search recipes. Please try again.' });
    }
};


module.exports = { addRecipe, getRecipeByTitle, searchRecipes }; 
