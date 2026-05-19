const express = require("express");
const router = express.Router();

const { createItem, getAllItems, getSingleItem } =
  require("../controllers/itemController");

router.post("/create", createItem);
router.get("/all", getAllItems);
router.get("/:id", getSingleItem);
module.exports = router;