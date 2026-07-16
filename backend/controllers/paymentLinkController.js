const razorpay = require("../config/razorpay");

const createPaymentLink = async (req, res) => {
  try {
    const { amount, productName } = req.body;

    const paymentLink = await razorpay.paymentLink.create({
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      accept_partial: false,
      description: `Payment for ${productName}`,

      customer: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9876543210",
      },

      notify: {
        sms: false,
        email: false,
      },

      reminder_enable: false,

      callback_url: "http://localhost:5173/orders",
      callback_method: "get",
    });

    res.status(200).json({
      success: true,
      paymentLink: paymentLink.short_url,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createPaymentLink,
};