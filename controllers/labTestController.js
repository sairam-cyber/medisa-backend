const LabTest = require('../models/labTestModel');
const LabTestBooking = require('../models/labTestBookingModel');
const sendEmail = require('../utils/sendEmail'); // Import the utility

const getLabTests = async (req, res) => {
    try {
        const tests = await LabTest.find({});
        res.json(tests);
    } catch (error) {
        console.error('Error fetching lab tests:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const bookLabTest = async (req, res) => {
    const { fullName, email, phone, gender, appointmentDate, testName, reasonForVisit } = req.body;

    if (!fullName || !email || !phone || !gender || !appointmentDate || !testName || !reasonForVisit) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        const newBooking = new LabTestBooking({
            fullName, email, phone, gender, appointmentDate, testName, reasonForVisit
        });

        const savedBooking = await newBooking.save();

        // --- Send Lab Test Booking Confirmation Email ---
        try {
            const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            const emailHtml = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>Lab Test Booking Confirmation</title>
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
                          <h1>Lab Test Booking Confirmed</h1>
                      </div>
                      <div class="content">
                          <h2>Hello, ${fullName}!</h2>
                          <p>Your request for a lab test has been successfully booked. Our team will contact you shortly to confirm the details and guide you on the next steps.</p>
                          
                          <div class="details-box">
                              <p><strong>Test Name:</strong> ${testName}</p>
                              <p><strong>Preferred Date:</strong> ${formattedDate}</p>
                          </div>

                          <p>Please check for any specific test preparations, such as fasting, if required. If you have any questions, please feel free to contact us.</p>
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
                subject: `Your Medlist Lab Test Booking for ${testName} is Confirmed`,
                html: emailHtml,
            };
            await sendEmail(emailOptions);
        } catch(emailError) {
            console.error("Failed to send lab test booking email:", emailError);
        }
        // --------------------------------------
        
        res.status(201).json(savedBooking);

    } catch (error) {
        console.error('Error booking lab test:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getLabTests, bookLabTest };