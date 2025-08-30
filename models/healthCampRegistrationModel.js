const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    campId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'HealthCamp' },
    campName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

const HealthCampRegistration = mongoose.model('HealthCampRegistration', registrationSchema);
module.exports = HealthCampRegistration;