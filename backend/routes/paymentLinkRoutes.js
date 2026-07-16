const express = require("express");
const router = express.Router();

const {
  createPaymentLink,
} = require("../controllers/paymentLinkController");

router.post("/", createPaymentLink);

module.exports = router;