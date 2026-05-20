const User = require("../models/User");
const Otp = require("../models/Otp");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../config/email");


// ================= REGISTER USER =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= LOGIN USER =================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= SEND OTP =================

const sendOTP = async (req, res) => {
  try {

    const { email } = req.body;

    // Generate OTP
    const otp = generateOTP();

    // Delete old OTP
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
    });

    // Send Email
    await sendEmail(
      email,
      "Campus Lost & Found - OTP Verification",
      `
      <div style="font-family: Arial; padding:20px;">
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>

        <h1 style="letter-spacing:5px; color:#2563eb;">
          ${otp}
        </h1>

        <p>This OTP will expire in 5 minutes.</p>
      </div>
      `
    );

    res.status(200).json({
      message: "OTP Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to Send OTP",
    });
  }
};


// ================= VERIFY OTP =================

const verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const existingOTP = await Otp.findOne({ email });

    if (
      !existingOTP ||
      existingOTP.otp.toString() !== otp.toString()
    ) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Delete OTP after verification
    await Otp.deleteMany({ email });

    res.status(200).json({
      message: "OTP Verified Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= EXPORTS =================

module.exports = {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
};