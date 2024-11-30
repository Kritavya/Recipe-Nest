const Recipe = require('../Dbcon/model/model'); // Correct import

// Example function to add a recipe
const addRecipe = async (req, res) => {
    try {
        const { title, full_description, categories, ingredients, instructions } = req.body;
        const photo = req.file.path; // Assume you're using multer for file uploads

        const newRecipe = new Recipe({
            title,
            full_description,
            photo,
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

module.exports = { addRecipe }; // Ensure this line is present
