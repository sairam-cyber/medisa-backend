const mongoose = require('mongoose');

const healthCampSchema = mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    servicesOffered: [{ type: String, required: true }],
}, { timestamps: true });

const HealthCamp = mongoose.model('HealthCamp', healthCampSchema);
module.exports = HealthCamp;