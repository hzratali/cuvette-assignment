const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, secret);
    req.companyId = decoded.id;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).send("Invalid token.");
  }
};

module.exports = { authenticate };
