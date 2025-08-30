const Medicine = require('../models/medicineModel');

// @desc    Fetch all medicines
// @route   GET /api/medicines
// @access  Public
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({});
        res.json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getMedicines };