const express = require("express");
const {
  postJob,
  getJobById,
  deleteJob,
  sendJobAlerts,
} = require("../controllers/jobController"); 
const { authenticate } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", authenticate, postJob);

router.get("/:id", authenticate, getJobById);

router.delete("/:id", authenticate, deleteJob);

router.post("/send-job-alerts", sendJobAlerts);

module.exports = router;
