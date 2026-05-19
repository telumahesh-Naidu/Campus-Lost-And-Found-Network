const express = require("express");
const router = express.Router();

const {
  createClaim,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/claimController");

router.post("/create", createClaim);
router.get("/all", getAllClaims);
router.put("/:id", updateClaimStatus);

module.exports = router;