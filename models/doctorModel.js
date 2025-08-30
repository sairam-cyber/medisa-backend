const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  consultationType: { type: String, enum: ['Hospital', 'Online', 'Both'], required: true },
  fees: { type: String, required: true },
  languages: [{ type: String }],
  rating: { type: Number },
  image: { type: String },
  bio: { type: String },
  availability: {
    hospital: [{ type: String }],
    online: [{ type: String }],
    timeSlots: [{ type: String }],
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;