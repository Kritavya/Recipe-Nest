const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    full_description: { type: String, required: true },
    photo: { type: String, required: true },
    categories: { type: [String], required: true },
    ingredients: { type: Object, required: true },
    instructions: { type: [String], required: true },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; 