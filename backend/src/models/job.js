const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  recipient: { 
    type: [String],
    required: true
  },
  endDate: { type: Date, required: true },
}, 
{timestamps: true});

module.exports = mongoose.model("Job", jobSchema);
