const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    // Existing fields
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // --- NEW: Expanded Profile Fields ---
    phone: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    allergies: { type: String, default: '' },
    medicalHistory: { type: String, default: '' },
    picture: { type: String, default: '' }, // For profile picture URL
  },
  {
    timestamps: true,
  }
);

// This part for hashing passwords remains the same
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
