const mongoose = require('mongoose');

const donationSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // You could add more fields here later, like a payment transaction ID
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;