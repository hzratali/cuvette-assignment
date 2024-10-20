import React, { useState } from 'react';
import { FaUser, FaPhone, FaBuilding, FaEnvelope, FaUsers } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { AUTH_API } from '../constants/api';

const Signup = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!name || name.length < 2) newErrors.name = 'Name is required and must be at least 2 characters.';
        if (!companyName || companyName.length < 2) newErrors.companyName = 'Company name is required and must be at least 2 characters.';
        if (!phone || phone.length !== 10) newErrors.phone = 'Phone number is required and must be 10 digits.';
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is required and must be valid.';
        if (!companySize || companySize <= 0) newErrors.companySize = 'Company size is required and cannot be negative.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(AUTH_API.LOGIN)
        if (!validate()) return;
        try {
            const response = await axios.post(AUTH_API.LOGIN, {
                username: name,
                companyname: companyName,
                email: email,
                mobile: phone,
                password: '12345', 
                companysize: companySize
            });
           console.log(response);

            localStorage.setItem('userInfo', JSON.stringify(response.data));

            // Redirect to verification page
            navigate('/verify'); 
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response && error.response.data) {
                // Handle server-side validation errors
                setServerError(error.response.data.message || 'An error occurred during registration.');
            } else {
                setServerError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="md:w-1/2 p-4 md:flex-row justify-start items-center"> 
                        <p className="w-full text-left text-gray-600">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br />
                            Lorem Ipsum has been the industry's standard dummy text ever since the<br /> 1500s, when an unknown printer took a galley of type.
                        </p>
                    </div>

                    {/* Right Section - Form */}
                    <div className="flex items-center justify-center mt-10">
                        <div className="w-full max-w-md p-8 space-y-6 bg-white border border-blue-300 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                            <p className="text-center text-sm text-gray-500">
                                Lorem Ipsum is simply dummy text
                            </p>

                            {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaUser className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                {/* Phone Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaPhone className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Phone no."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-3 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>

                                {/* Company Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaBuilding className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full p-3 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                                </div>

                                {/* Company Email Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaEnvelope className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Company Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                {/* Employee Size Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaUsers className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Employee Size"
                                        value={companySize}
                                        onChange={(e) => setCompanySize(e.target.value)}
                                        className="w-full p-3 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize}</p>}
                                </div>

                                <p className="text-center text-sm text-gray-500">
                                    By clicking on proceed you will accept our{' '}
                                    <Link to="#" className="text-blue-500 underline">
                                        Terms & Conditions
                                    </Link>
                                </p>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Proceed
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;
