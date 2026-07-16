const PDFDocument = require("pdfkit");
const Order = require("../models/Order");

const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("Razorpay Store", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(18).text("Invoice");

    doc.moveDown();

    doc.text(`Invoice ID : ${order._id}`);

    doc.text(`Order ID : ${order.razorpayOrderId}`);

    doc.text(`Product ID : ${order.productId}`);

    doc.text(`Amount : Rs ${order.amount}`);

    doc.text(`Currency : ${order.currency}`);

    doc.text(`Status : ${order.status}`);

    doc.moveDown();

    doc.text("Thank you for shopping with us!");

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  downloadInvoice,
};