const Donation = require('../models/donationModel');

// @desc    Create a new donation record
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  const { fullName, email, amount } = req.body;

  // Basic validation
  if (!fullName || !email || !amount) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const donation = new Donation({
      fullName,
      email,
      amount,
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    console.error('Error creating donation record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createDonation,
};