const express = require('express');
const router = express.Router();
const { getHealthCamps, registerForCamp } = require('../controllers/healthCampController');

router.route('/').get(getHealthCamps);
router.route('/register').post(registerForCamp);

module.exports = router;