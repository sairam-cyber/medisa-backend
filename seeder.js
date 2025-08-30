const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Data
const doctors = require('./data/doctors.js');
const medicines = require('./data/medicines.js');
const healthCamps = require('./data/healthCamps.js');
const labTests = require('./data/labTests.js'); // New

// Import Models
const Doctor = require('./models/doctorModel.js');
const Medicine = require('./models/medicineModel.js');
const HealthCamp = require('./models/healthCampModel.js');
const HealthCampRegistration = require('./models/healthCampRegistrationModel.js');
const LabTest = require('./models/labTestModel.js'); // New

const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear all existing data first
        await Doctor.deleteMany();
        await Medicine.deleteMany();
        await HealthCamp.deleteMany();
        await HealthCampRegistration.deleteMany();
        await LabTest.deleteMany(); // New

        // Insert new data
        await Doctor.insertMany(doctors);
        await Medicine.insertMany(medicines);
        await HealthCamp.insertMany(healthCamps);
        await LabTest.insertMany(labTests); // New

        console.log('All Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear all collections
        await Doctor.deleteMany();
        await Medicine.deleteMany();
        await HealthCamp.deleteMany();
        await HealthCampRegistration.deleteMany();
        await LabTest.deleteMany(); // New

        console.log('All Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data destruction: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}