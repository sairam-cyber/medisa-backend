const mongoose = require('mongoose');

const membershipSchema = mongoose.Schema(
  {
    // We've expanded this to include full user details
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique to prevent duplicate signups
    phone: { type: String, required: true },
    address: { type: String, required: true },
    
    // Plan details remain the same
    planName: {
      type: String,
      required: true,
      enum: ['Basic', 'Plus', 'Premium'],
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;