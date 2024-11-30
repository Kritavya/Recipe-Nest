const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  full_description: { type: String, required: true },
  photo: { type: String, required: true },
  categories: [{ type: String }],
  ingredients: { type: Map, of: [String] }, // A Map of string keys and array of strings
  instructions: [String],
}, { timestamps: true });



const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
