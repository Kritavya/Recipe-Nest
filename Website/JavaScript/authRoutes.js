// In your authRoutes.js or wherever you are managing authentication
const express = require('express');
const router = express.Router();
const User = require('../Dbcon/model/userModel');
const bcrypt = require('bcrypt'); // For hashing passwords

// Handle signup
// Signup route
// router.post('/signup', async (req, res) => {
//     try {
//         const { fullName, username, email, password } = req.body;

//         // Check if the email already exists
//         const existingEmail = await User.findOne({ email });
//         if (existingEmail) {
//             return res.redirect('/signup?error=email_exists'); // Redirect with error
//         }

//         // Check if the username already exists
//         const existingUsername = await User.findOne({ username });
//         if (existingUsername) {
//             return res.redirect('/signup?error=username_exists'); // Redirect with error
//         }

//         // If both email and username are unique, create a new user
//         const newUser = new User({ fullName, username, email, password });
//         await newUser.save();

//         // Redirect to the login page after successful signup
//         res.redirect('/login');
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: 'Server error' }); // Handle error response
//     }
// });

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.render('signup', { error: 'email_exists' }); // Pass the error variable
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.render('signup', { error: 'username_exists' }); // Pass the error variable
        }

        // If both email and username are unique, create a new user
        const newUser = new User({ fullName, username, email, password });
        await newUser.save();

        // Redirect to the login page after successful signup
        res.redirect('/HTML/login');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Handle error response
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            // Username does not exist
            return res.render('login', { error: 'username_not_found' });
        }

        // Check if the password matches
        const isPasswordCorrect = password === user.password; // Use hashing in production
        if (!isPasswordCorrect) {
            // Incorrect password
            return res.render('login', { error: 'incorrect_password' });
        }

        // Login successful - Redirect to profile or dashboard
        res.redirect('/HTML/profile'); // Replace '/profile' with your actual route
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { error: 'server_error' });
    }
});


module.exports = router;
