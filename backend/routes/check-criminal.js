const express = require("express");
const {
  checkCriminalController,
} = require("../controllers/criminal-controller");

const router = express.Router();

// POST route to check if a criminal can be caught
router.post("/check-criminal", checkCriminalController);

module.exports = router;
