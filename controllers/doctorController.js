const Doctor = require('../models/doctorModel');

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        // Fetch all documents from the Doctor collection
        const doctors = await Doctor.find({});
        
        // Send the list of doctors as a JSON response
        res.json(doctors);

    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Server Error: Could not fetch doctors' });
    }
};

module.exports = { getDoctors };