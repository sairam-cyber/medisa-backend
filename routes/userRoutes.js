const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    authUser, 
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/userController');

// Authentication routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Profile routes
router.route('/profile/:id')
    .get(getUserProfile)       // Handles GET requests to fetch profile
    .put(updateUserProfile);    // Handles PUT requests to update profile

module.exports = router;
