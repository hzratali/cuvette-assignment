import React, { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { AUTH_API } from '../constants/api';

const SignUpPage2 = () => {
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isVerifiedMobile, setIsVerifiedMobile] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  
  const [emailError, setEmailError] = useState(''); // State for email error
  const [mobileError, setMobileError] = useState(''); // State for mobile error

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Handle email OTP verification
  const handleEmailVerification = async () => {
    try {
      const response = await fetch(AUTH_API.VERIFY_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.Company.email,
          otp: emailOtp,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsVerifiedEmail(true);
        setEmailError(''); // Clear any previous error
        if (isVerifiedMobile) {
          navigate('/jd');
        }
      } else {
        setEmailError(result.message || 'Invalid OTP'); // Set error message
      }
    } catch (error) {
      setEmailError('Error verifying email. Please try again.');
    }
  };

  // Handle mobile OTP verification
  const handleMobileVerification = async () => {
    try {
      const response = await fetch(AUTH_API.VERIFY_PHONE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: userInfo?.Company.mobile,
          otp: mobileOtp,
        }),
      });
      const result = await response.json();
      localStorage.setItem('token', result.token);
      if (response.ok) {
        setIsVerifiedMobile(true);
        setMobileError(''); 
        if (isVerifiedEmail) {
          navigate('/jd');
        }
      } else {
        setMobileError(result.message || 'Invalid OTP !!'); 
      }
    } catch (error) {
      setMobileError('Error verifying mobile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50">
      <div className="md:w-1/2 p-8">
        <h1 className="text-4xl font-bold mb-2">Cuvette</h1>
        <p className="text-gray-600 text-lg mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <p className="text-gray-600 mb-4 text-center">Lorem Ipsum is simply dummy text</p>
        <form>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email OTP</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="email"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 ${isVerifiedEmail ? 'border-green-500' : ''}`}
                placeholder="Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
              {isVerifiedEmail && (
                <FaCheckCircle className="absolute right-3 top-2/4 transform -translate-y-1/2 text-green-500" size={20} />
              )}
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {!isVerifiedEmail ? (
            <button
              type="button"
              onClick={handleEmailVerification}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify Email
            </button>
          ) : (
            <div className="flex items-center"></div>
          )}
          <div className="mb-4 relative mt-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile OTP</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="mobile"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 ${isVerifiedMobile ? 'border-green-500' : ''}`}
                placeholder="Mobile OTP (Last 4 Digits)!"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
              />
              {isVerifiedMobile && (
                <FaCheckCircle className="absolute right-3 top-2/4 transform -translate-y-1/2 text-green-500" size={20} />
              )}
            </div>
            {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
          </div>

          {!isVerifiedMobile ? (
            <button
              type="button"
              onClick={handleMobileVerification}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify Mobile
            </button>
          ) : (
            <div className="flex items-center"></div>
          )}
        </form>
      </div>
    </div>
  );
};
export default SignUpPage2;
