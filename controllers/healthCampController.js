const HealthCamp = require('../models/healthCampModel');
const HealthCampRegistration = require('../models/healthCampRegistrationModel');
const sendEmail = require('../utils/sendEmail'); // Import the utility

const getHealthCamps = async (req, res) => {
    try {
        const camps = await HealthCamp.find({});
        res.json(camps);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const registerForCamp = async (req, res) => {
    const { campId, campName, fullName, email, phone, age, gender, address } = req.body;

    try {
        const existingRegistration = await HealthCampRegistration.findOne({ campId, email });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You have already registered for this camp.' });
        }

        const campDetails = await HealthCamp.findById(campId);
        if (!campDetails) {
            return res.status(404).json({ message: 'Health camp not found.'});
        }

        const newRegistration = new HealthCampRegistration({
            campId, campName, fullName, email, phone, age, gender, address
        });

        const savedRegistration = await newRegistration.save();

        // --- Send Health Camp Registration Email ---
        try {
            const emailHtml = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>Health Camp Registration</title>
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
                          <h1>Registration Confirmed!</h1>
                      </div>
                      <div class="content">
                          <h2>Hello, ${fullName}!</h2>
                          <p>You have successfully registered for an upcoming Medlist health camp. We are excited to see you there!</p>
                          
                          <div class="details-box">
                              <p><strong>Event:</strong> ${campName}</p>
                              <p><strong>Date:</strong> ${campDetails.date}</p>
                              <p><strong>Location:</strong> ${campDetails.location}</p>
                          </div>

                          <p>We will send a reminder email a day before the event. Please bring a valid ID for verification.</p>
                      </div>
                      <div class="footer">
                          <p>&copy; ${new Date().getFullYear()} Medlist. All rights reserved.</p>
                      </div>
                  </div>
              </body>
              </html>
            `;
            const emailOptions = {
                to: email,
                subject: `Your Registration for ${campName} is Confirmed`,
                html: emailHtml,
            };
            await sendEmail(emailOptions);
        } catch(emailError) {
            console.error("Failed to send health camp registration email:", emailError);
        }
        // -----------------------------------------

        res.status(201).json(savedRegistration);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getHealthCamps, registerForCamp };