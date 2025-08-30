const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/donationController');

// When a POST request is made to '/api/donations', call the createDonation function
router.route('/').post(createDonation);

module.exports = router;
