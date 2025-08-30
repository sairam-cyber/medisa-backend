const mongoose = require('mongoose');

const labTestBookingSchema = mongoose.Schema({
    // Patient Details from the form
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    
    // Appointment Details from the form
    appointmentDate: { type: String, required: true },
    reasonForVisit: { type: String, required: true },

    // This will be passed from the lab test page
    testName: { type: String, required: true }, 

}, { timestamps: true });

const LabTestBooking = mongoose.model('LabTestBooking', labTestBookingSchema);

module.exports = LabTestBooking;