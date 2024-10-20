const Job = require("../models/job");
const { sendEmail } = require("../config/email");


const postJob = async (req, res) => {

  const { title, description, experienceLevel, endDate, recipient } = req.body;
  try {
    const companyId = req.companyId;
    const newJob = new Job({
      companyId,
      title: title,
      description,
      experienceLevel,
      recipient,
      endDate,
    });

    await newJob.save();

    sendJobAlerts(newJob._id, recipient).catch(error => {
      console.error("Error sending job alerts:", error);
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate("companyId", "companyName");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendJobAlerts = async (jobId, candidateEmails) => {
  try {
    const job = await Job.findById(jobId).populate("companyId", "companyName");
    if (!job) {
      console.error("Job not found");
      return;
    }
    const jobEndDate = new Date(job.endDate);
    const formattedDate = jobEndDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const companyName = job.companyId.companyName || "Our Company";
    const logoUrl = 'https://pub-261021c7b68740ffba855a7e8a6f3c1e.r2.dev/image/download.png';
    const subject = `Exciting Opportunity from ${companyName}!`;

    const bodyTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt=" Cuvette Logo" style="max-width: 150px;"/>
        </div>
        <h2 style="color: #333;">Greetings from ${companyName} Team!</h2>
        <p style="color: #555;">We have a new job opening that matches your skills and interests. Here are the details:</p>

        <h3 style="color: #333;">Job Title: ${job.title}</h3>
        <p><strong>Description:</strong> ${job.description}</p>
        <p><strong>Experience Level Required:</strong> ${job.experienceLevel}</p>
        <p><strong>Application Deadline:</strong> ${formattedDate}</p>

        <p>Don't miss this opportunity! Click <a href="#" style="color: #3498db;">here</a> to learn more and apply.</p>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #333;">Best Regards,<br>${companyName}</p>
          <p style="font-size: 12px; color: #999;">You are receiving this email because you subscribed to job alerts from ${companyName}. 
          If you no longer wish to receive these notifications, please <a href="#" style="color: #3498db;">unsubscribe</a>.</p>
        </div>
      </div>
    `;

    // Send individual emails to each candidate
    await Promise.all(
      candidateEmails.map((email) => sendEmail(subject, email, bodyTemplate))
    );

    console.log("Job alerts sent successfully");
  } catch (error) {
    console.error("Error sending job alerts:", error);
  }
};



module.exports = {
  postJob,
  getJobById,
  deleteJob,
  sendJobAlerts
};
