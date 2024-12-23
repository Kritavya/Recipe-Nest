const express = require('express');
const connectDB = require('./Website/Dbcon/connectdb/connect');
const recipeRoutes = require('./Website/JavaScript/recipeRoutes');
const authRoutes = require('./Website/JavaScript/authRoutes');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'Website')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Website', 'HTML'));

// Configure partials path
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'Website', 'views', 'partials'));

// Connect to MongoDB
connectDB();

// Define routes
app.use('/auth', authRoutes);
app.use('/', recipeRoutes); // This allows accessing /add-recipe as expected

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
