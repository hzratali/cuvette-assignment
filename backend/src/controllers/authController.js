const Company = require("../models/company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../config/email");
const { generateToken } = require("../utils/jwt");
const registerCompany = async (req, res) => {
  try {
    const { username, companyname, email, mobile, companysize } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res
        .status(400)
        .send("Account with this email and mobile number already exists");

    // const hashedPassword = await bcrypt.hash(password, 10);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const mobileOtp = mobile.toString().slice(-4);
    const newCompany = new Company({
      username,
      companyName: companyname,
      email,
      mobile,
      companysize,
      // password: hashedPassword,
      emailOtp: emailOtp,
      mobileOtp,
    });
    await newCompany.save();

    sendVerificationEmail(email, emailOtp).catch((error) => {
      console.error("Error sending verification email:", error);
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      Company: newCompany,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).send("Company not found");

    if (company.emailOtp === otp) {
      company.isVerified = true;
      company.emailOtp = null;
      await company.save();

      res.status(200).json({ message: "Email verified successfully", company });
    } else {
      res.status(400).json({ message: "Invalid Otp" });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error");
  }
};
const mobileotpverify = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const user = await Company.findOne({ mobile });
    if (!user) {
      return res.status(404).send("Company not found");
    }
    if (user.mobileOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.isVerified = true;
    await user.save();

    const token = generateToken(user._id);
    res
      .status(200)
      .json({ message: "Mobile verified successfully", token, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).send("Company not found");

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    if (!company.isVerified) return res.status(403).send("Email not verified");

    const token = generateToken(company._id);

    res.status(200).json({ token, company });
  } catch (error) {
    console.error("Error logging in company:", error);
    res.status(500).send("Internal server error");
  }
};

const sendVerificationEmail = async (email, emailOtp) => {
  try {
    // Check if the email has already been sent

    const subject = "Verify Your Email to Get Started!";
    const recipientEmail = email;
    const companyName = "Cuvette";
    const logoUrl =
      "https://pub-261021c7b68740ffba855a7e8a6f3c1e.r2.dev/image/download.png";

    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="${companyName} Logo" style="max-width: 150px;" />
        </div>

        <h1 style="color: #333; text-align: center;">Welcome to ${companyName}!</h1>
        <p style="color: #555; text-align: center;">
          We're excited to have you on board. Please verify your email address to activate your account.
        </p>

        <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 10px;">
          <p style="font-size: 18px; color: #333; text-align: center;">Your OTP is:</p>
          <h2 style="color: #3498db; text-align: center; margin: 0;">${emailOtp}</h2>
        </div>

        <p style="color: #555; text-align: center;">
          Enter the above code on the verification page to complete your signup process.
        </p>

        <p style="color: #333; text-align: center;">Best regards,<br>${companyName} Team</p>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            If you didn’t create an account with ${companyName}, please ignore this email or 
            <a href="#" style="color: #3498db;">contact us</a>.
          </p>
        </div>
      </div>
    `;

    await sendEmail(subject, recipientEmail, body);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
module.exports = {
  registerCompany,
  verifyEmail,
  mobileotpverify,
  loginCompany,
};
