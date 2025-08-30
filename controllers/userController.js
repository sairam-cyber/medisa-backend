const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail'); // Your email utility

// --- THIS FUNCTION REMAINS THE SAME (Sends Welcome Email) ---
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const user = await User.create({ fullName, email, password });
        if (user) {
            try {
                const emailOptions = {
                    to: user.email,
                    subject: 'Welcome to Medlist!',
                    html: `<h1>Welcome, ${user.fullName}!</h1><p>Thank you for creating an account with Medlist. We're excited to have you.</p>`,
                };
                await sendEmail(emailOptions);
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
            }
            res.status(201).json({ _id: user._id, fullName: user.fullName, email: user.email });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- THIS IS THE UPDATED LOGIN FUNCTION (Sends Security Alert Email) ---
const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            
            // --- Send Login Security Alert Email ---
            try {
                const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'long' });

                const emailHtml = `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <title>Security Alert</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6; }
                        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); overflow: hidden; }
                        .header { background-color: #15C6CC; color: white; padding: 40px; text-align: center; }
                        .header h1 { margin: 0; font-size: 28px; }
                        .content { padding: 30px; line-height: 1.6; color: #333; }
                        .content h2 { color: #15C6CC; }
                        .details-box { background-color: #f8f9fa; border-left: 4px solid #15C6CC; padding: 20px; margin: 20px 0; border-radius: 5px; }
                        .details-box p { margin: 5px 0; }
                        .button-container { text-align: center; margin: 30px 0; }
                        .button { background-color: #4285F4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; }
                        .footer { background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #777; }
                      </style>
                  </head>
                  <body>
                      <div class="container">
                          <div class="header">
                              <h1>Security Alert: New Sign-In</h1>
                          </div>
                          <div class="content">
                              <h2>Hi, ${user.fullName}</h2>
                              <p>Your Medlist account was just used to sign in. Here are the details:</p>
                              
                              <div class="details-box">
                                  <p><strong>Time:</strong> ${loginTime} (IST)</p>
                                  <p><strong>Approximate Location:</strong> Rajgangpur, Odisha, India</p>
                              </div>

                              <p>If this was you, you can safely ignore this email. If you don't recognize this activity, please secure your account immediately by changing your password.</p>
                          </div>
                          <div class="footer">
                              <p>&copy; ${new Date().getFullYear()} Medlist. All rights reserved.</p>
                          </div>
                      </div>
                  </body>
                  </html>
                `;

                const emailOptions = {
                    to: user.email,
                    subject: 'Security Alert: New Sign-in to Your Medlist Account',
                    html: emailHtml,
                };
                await sendEmail(emailOptions);

            } catch (emailError) {
                console.error("Failed to send login alert email:", emailError);
            }
            // ------------------------------------
            
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// --- THESE FUNCTIONS REMAIN THE SAME ---
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) { res.json(user); } else { res.status(404).json({ message: 'User not found' }); }
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
            user.gender = req.body.gender || user.gender;
            user.address = req.body.address || user.address;
            user.emergencyContact = req.body.emergencyContact || user.emergencyContact;
            user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
            user.allergies = req.body.allergies || user.allergies;
            user.medicalHistory = req.body.medicalHistory || user.medicalHistory;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };