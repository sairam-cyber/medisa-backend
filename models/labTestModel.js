const mongoose = require('mongoose');

const labTestSchema = mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }, // Path to the icon image
    price: { type: Number, required: true },
    description: { type: String, required: true },
    preparation: { type: String, default: 'No special preparation required.' }
}, { timestamps: true });

const LabTest = mongoose.model('LabTest', labTestSchema);
module.exports = LabTest;