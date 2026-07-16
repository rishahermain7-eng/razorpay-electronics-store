const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { productId, productName, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      productId,
      productName,
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency: razorpayOrder.currency,
      status: razorpayOrder.status,
    });

    res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      razorpayOrder,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createOrder,
  getOrders,
};