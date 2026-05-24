const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// Profile — JWT protected
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
