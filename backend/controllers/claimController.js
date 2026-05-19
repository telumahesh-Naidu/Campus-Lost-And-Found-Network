const Claim = require("../models/Claim");

const createClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      message: "Claim submitted successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("itemId");

    res.json(claims);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateClaimStatus = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(claim);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  updateClaimStatus,
};