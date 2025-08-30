const Membership = require('../models/membershipModel');
const sendEmail = require('../utils/sendEmail'); // Import the utility

// @desc    Create a new membership subscription
// @route   POST /api/memberships/subscribe
// @access  Public
const createSubscription = async (req, res) => {
  const { planName, price, fullName, email, phone, address } = req.body;

  if (!planName || !price || !fullName || !email || !phone || !address) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    const existingSubscription = await Membership.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'An active subscription for this email already exists.' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1); // Membership is for one year

    const subscription = new Membership({
      planName,
      price,
      fullName,
      email,
      phone,
      address,
      startDate,
      endDate,
    });

    const createdSubscription = await subscription.save();

    // --- Send Membership Confirmation Email ---
    try {
        const formattedEndDate = endDate.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const emailHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>Membership Confirmation</title>
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
                      <h1>Welcome to Medlist Circle!</h1>
                  </div>
                  <div class="content">
                      <h2>Hello, ${fullName}!</h2>
                      <p>Thank you for subscribing! Your membership is now active and you can start enjoying the benefits immediately.</p>
                      
                      <div class="details-box">
                          <p><strong>Plan:</strong> Medlist ${planName} Plan</p>
                          <p><strong>Price:</strong> ₹${price.toFixed(2)}/year</p>
                          <p><strong>Valid Until:</strong> ${formattedEndDate}</p>
                      </div>

                      <p>We're thrilled to have you as part of our community. If you have any questions, feel free to contact our support team.</p>
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
            subject: `Your Medlist ${planName} Membership is Active!`,
            html: emailHtml,
        };
        await sendEmail(emailOptions);
    } catch(emailError) {
        console.error("Failed to send membership confirmation email:", emailError);
    }
    // ----------------------------------------

    res.status(201).json(createdSubscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createSubscription,
};