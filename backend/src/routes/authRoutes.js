const express = require("express");
const {
  registerCompany,
  verifyEmail,
  loginCompany,
  mobileotpverify
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerCompany);

router.post("/verify-email", verifyEmail);
router.post("/verify-mobile", mobileotpverify);

router.post("/login", loginCompany);

module.exports = router;
