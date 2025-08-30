const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import all of your route files
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const healthCampRoutes = require('./routes/healthCampRoutes');
const donationRoutes = require('./routes/donationRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const labTestRoutes = require('./routes/labTestRoutes');
const orderRoutes = require('./routes/orderRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // <-- Add this line

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes - This is where the server learns to use each feature
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/health-camps', healthCampRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/lab-tests', labTestRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/appointments', appointmentRoutes); // <-- Add this line

// A simple test route to make sure the server is alive
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));