const Appointment = require('../models/appointmentModel');
const sendEmail = require('../utils/sendEmail'); // Your email utility

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const addAppointment = async (req, res) => {
  const {
    doctor,
    doctorName,
    patientName,
    patientEmail,
    patientMobile,
    appointmentDate,
    appointmentTime,
    fees,
  } = req.body;

  const appointment = new Appointment({
    doctor,
    doctorName,
    patientName,
    patientEmail,
    patientMobile,
    appointmentDate,
    appointmentTime,
    fees,
  });

  const createdAppointment = await appointment.save();

  // --- Send Beautiful, Detailed Confirmation Email ---
  try {
    // A dummy Google Meet link for demonstration
    const googleMeetLink = 'https://meet.google.com/abc-defg-hij';

    // Format the date for better readability in the email
    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Confirmation</title>
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
                  <h1>Your Appointment is Confirmed!</h1>
              </div>
              <div class="content">
                  <h2>Hello, ${patientName}!</h2>
                  <p>This email is to confirm the details of your upcoming online consultation. We're looking forward to speaking with you.</p>
                  
                  <div class="details-box">
                      <p><strong>Doctor:</strong> ${doctorName}</p>
                      <p><strong>Date:</strong> ${formattedDate}</p>
                      <p><strong>Time:</strong> ${appointmentTime}</p>
                  </div>

                  <p>Please click the button below at your scheduled time to join the Google Meet session with your doctor.</p>
                  
                  <div class="button-container">
                      <a href="${googleMeetLink}" class="button">Join Google Meet</a>
                  </div>

                  <p>If you have any questions or need to reschedule, please contact our support team. Please be ready a few minutes before your scheduled time.</p>
                  <p>Thank you for choosing Medlist.</p>
              </div>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Medlist. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const emailOptions = {
      to: patientEmail,
      subject: `Confirmation for your appointment with ${doctorName}`,
      html: emailHtml,
    };

    await sendEmail(emailOptions);

  } catch (emailError) {
    console.error("Failed to send detailed appointment confirmation email:", emailError);
  }
  // ---------------------------------------------

  res.status(201).json(createdAppointment);
};

module.exports = { addAppointment };
