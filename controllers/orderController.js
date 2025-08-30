const Order = require('../models/orderModel');
const sendEmail = require('../utils/sendEmail'); // Your email utility

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    customerName,
    customerEmail,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = new Order({
    orderItems: orderItems.map(item => ({ ...item, product: item._id, _id: undefined })),
    shippingAddress,
    totalPrice,
    customerName,
    customerEmail,
  });

  const createdOrder = await order.save();

  // --- Send Beautiful, Detailed Order Confirmation Email ---
  try {
    const orderDate = new Date(createdOrder.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    
    // Calculate subtotal and shipping for the email body
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = totalPrice - itemsPrice;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
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
                  <h1>Thank You for Your Order!</h1>
              </div>
              <div class="content">
                  <h2>Hello, ${customerName}!</h2>
                  <p>Your order has been confirmed and will be shipped soon. Here are the details:</p>
                  
                  <p><strong>Order ID:</strong> #${createdOrder._id.toString().slice(-8).toUpperCase()}<br>
                  <strong>Order Date:</strong> ${orderDate}</p>

                  <table class="order-summary">
                      <thead>
                          <tr>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${orderItems.map(item => `
                            <tr>
                                <td class="item-name">${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          `).join('')}
                          <tr class="total-row">
                              <td colspan="2">Subtotal</td>
                              <td>₹${itemsPrice.toFixed(2)}</td>
                          </tr>
                          <tr>
                              <td colspan="2">Shipping</td>
                              <td>₹${shippingPrice.toFixed(2)}</td>
                          </tr>
                          <tr class="total-row">
                              <td colspan="2">Grand Total</td>
                              <td>₹${totalPrice.toFixed(2)}</td>
                          </tr>
                      </tbody>
                  </table>

                  <div class="shipping-details">
                      <h3>Shipping To:</h3>
                      <p>
                          ${shippingAddress.address}<br>
                          ${shippingAddress.city}, ${shippingAddress.postalCode}
                      </p>
                  </div>

                  <p>We'll notify you again once your order has been dispatched.</p>
              </div>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Medlist. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const emailOptions = {
      to: customerEmail,
      subject: `Your Medlist Order Confirmation #${createdOrder._id.toString().slice(-8).toUpperCase()}`,
      html: emailHtml,
    };

    await sendEmail(emailOptions);

  } catch (emailError) {
    console.error("Failed to send detailed order confirmation email:", emailError);
  }
  // ---------------------------------------------

  res.status(201).json(createdOrder);
};

module.exports = { addOrderItems };
