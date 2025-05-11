const express = require("express");
const {
  getCities,
  getVehicles,
  getCriminals,
  getOfficers,
  getFile,
} = require("../controllers/data-controller");

const router = express.Router();

router.get("/cities", getCities);
router.get("/vehicles", getVehicles);
router.get("/criminals", getCriminals);
router.get("/officers", getOfficers);
router.get("/file/:id", getFile);

module.exports = router;