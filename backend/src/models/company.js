const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  username:{type:String , require:true},
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  companysize:{type:Number ,require :true},
  isVerified: { type: Boolean, default: false },
  emailOtp: { type: String },
  mobileOtp: { type: String },
  emailSent:{type:Boolean ,default:false}
});

module.exports = mongoose.model("Company", companySchema);
