const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/doctorController');

// When a GET request is made to '/api/doctors', call the getDoctors function
router.route('/').get(getDoctors);

module.exports = router;