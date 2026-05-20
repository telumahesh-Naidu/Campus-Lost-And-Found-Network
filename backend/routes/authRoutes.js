const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
} = require("../controllers/authController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Send OTP
router.post("/send-otp", sendOTP);

// Verify OTP
router.post("/verify-otp", verifyOTP);

module.exports = router;