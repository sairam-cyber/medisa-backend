const express = require('express');
const router = express.Router();
const { getLabTests, bookLabTest } = require('../controllers/labTestController');

// GET request to fetch all available tests
router.route('/').get(getLabTests);

// POST request to book a new appointment
router.route('/book').post(bookLabTest);

module.exports = router;