const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controllers/membershipController');

router.route('/subscribe').post(createSubscription);

module.exports = router;
