# Job Posting Board with Email Automation

## Overview

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed for companies to register, verify their accounts, post jobs, and send automated emails to candidates. The project features authentication, email automation, and a responsive UI.

## Features

- **User Registration (Company)**: Companies can register with email and mobile verification to activate their accounts. Unverified users cannot post jobs.
- **Company Login**: Secure login system using JWT or session-based authentication.
- **Job Posting**: Authenticated companies can post job details such as title, description, experience level, candidate email, and end date.
- **Candidate Email Automation**: Companies can send job alerts/updates to candidates via email using Nodemailer.
- **Logout**: Logout option to clear tokens or sessions.

> **Note**: The mobile OTP will be the last 4 digits of the given mobile number.

## Tech Stack

- **Frontend**: React.js for a responsive and dynamic UI.
- **Backend**: Node.js & Express.js for RESTful APIs and business logic.
- **Database**: MongoDB for storing company details, job postings, and email logs.
- **Authentication**: JWT or session-based methods for route protection.
- **Email Service**: Nodemailer for automated email notifications.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hzratali/cuvette-assignment.git
   cd cuvette-assignment
   ```

2. **Backend Setup:**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Create a `.env` file in the backend directory with the following variables:

     ```bash
     MONGO_URI=your_mongodb_uri
     PORT=5000
     JWT_SECRET=your_jwt_secret
     EMAIL_PORT=smtp_port
     EMAIL_USER=your_email
     EMAIL_PASSWORD=your_email_password
     EMAIL=your-mail
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the backend development server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Create a `.env` file in the frontend directory with the following variable:

     ```bash
     REACT_APP_BACKEND_URL='http://localhost:5000/api'
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the frontend development server:
     ```bash
     npm start
     ```

## Deployment

- Frontend: Deployed using Vercel/Netlify
- Backend: Deployed using Render/Heroku

## Usage

- Register a new company account.
- Verify your account via email and mobile verification.
- Login and start posting jobs.
- Send job alerts to candidates via the job posting interface.

## Bonus Features

- Personalized email templates for a better candidate experience.

## Video Demo

https://www.loom.com/share/4a6c5fdb3a01406890568de41359035a?sid=00e9f0de-b617-46e4-aac3-9c49cd7542ab
