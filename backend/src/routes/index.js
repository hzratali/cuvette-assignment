const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const jobRoutes = require("./jobRoutes");

router.use("/jobs", jobRoutes);
router.use("/auth", authRoutes);

module.exports = router;