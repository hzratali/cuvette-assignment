import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AUTH_API } from '../constants/api';

// Validation Schema
const validationSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Job title is required'),
  jobDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Job description is required'),
  experienceLevel: Yup.string().required('Experience level is required'),
  candidates: Yup.array()
    .min(1, 'At least one candidate is required')
    .of(Yup.string().email('Invalid email format').required('Candidate email is required')),
  endDate: Yup.date()
    .required('End date is required')
    .min(new Date(), 'End date must be in the future'),
});

const InterviewForm = ({ onClose }) => {
  const [candidate, setCandidate] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      jobDescription: '',
      experienceLevel: '',
      candidates: [],
      endDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.candidates.length === 0) {
        formik.setFieldError('candidates', 'At least one candidate is required');
        formik.setTouched({ candidates: true });
        return;
      }

      const payload = {
        title: values.jobTitle,
        description: values.jobDescription,
        experienceLevel: values.experienceLevel,
        endDate: values.endDate,
        recipient: values.candidates,
      };

      try {
        const response = await axios.post(AUTH_API.ADD_JOB, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Job submitted successfully:', response.data);
        onClose();
      } catch (error) {
        console.error('Error submitting job:', error.response?.data || error.message);
      }
    },
  });

  // Handle adding a new candidate
  const handleAddCandidate = () => {
    if (candidate && !formik.values.candidates.includes(candidate)) {
      formik.setFieldValue('candidates', [...formik.values.candidates, candidate]);
      setCandidate('');
    } else {
      formik.setFieldError('candidates', 'Invalid or duplicate email');
    }
  };

  // Handle removing a candidate
  const handleRemoveCandidate = (email) => {
    formik.setFieldValue(
      'candidates',
      formik.values.candidates.filter((c) => c !== email)
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div className="grid grid-cols-4 items-center gap-8">
          <label className="text-lg font-medium">Job Title</label>
          <div className="col-span-3">
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter Job Title"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-12 px-4 py-2 border rounded-md ${formik.touched.jobTitle && formik.errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {formik.touched.jobTitle && formik.errors.jobTitle && (
              <div className="text-red-500">{formik.errors.jobTitle}</div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="grid grid-cols-4 items-start gap-8">
          <label className="text-lg font-medium">Job Description</label>
          <div className="col-span-3">
            <textarea
              name="jobDescription"
              placeholder="Enter Job Description"
              value={formik.values.jobDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full min-h-[150px] px-4 py-3 border rounded-md ${formik.touched.jobDescription && formik.errors.jobDescription ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {formik.touched.jobDescription && formik.errors.jobDescription && (
              <div className="text-red-500">{formik.errors.jobDescription}</div>
            )}
          </div>
        </div>

        {/* Experience Level */}
        <div className="grid grid-cols-4 items-center gap-8">
          <label className="text-lg font-medium">Experience Level</label>
          <div className="col-span-3">
            <select
              name="experienceLevel"
              value={formik.values.experienceLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-12 px-4 py-2 border rounded-md ${formik.touched.experienceLevel && formik.errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">Vice President</option>
              <option value="C-Level">C-Level</option>
              <option value="Executive">Executive</option>
            </select>
            {formik.touched.experienceLevel && formik.errors.experienceLevel && (
              <div className="text-red-500">{formik.errors.experienceLevel}</div>
            )}
          </div>
        </div>

        {/* Add Candidate */}
        <div className="grid grid-cols-4 items-start gap-8">
          <label className="text-lg font-medium">Add Candidate</label>
          <div className="col-span-3 space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="xyz@gmail.com"
                value={candidate}
                onChange={(e) => setCandidate(e.target.value)}
                className="flex-1 h-12 px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCandidate}
                className="px-6 h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {formik.touched.candidates && formik.errors.candidates && (
              <div className="text-red-500">{formik.errors.candidates}</div>
            )}
            <div className="flex flex-wrap gap-2">
              {formik.values.candidates.map((email) => (
                <div key={email} className="flex items-center gap-2 bg-gray-100 rounded-full pl-2 pr-3 py-1">
                  <span>{email}</span>
                  <button
                    onClick={() => handleRemoveCandidate(email)}
                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="grid grid-cols-4 items-center gap-8">
          <label className="text-lg font-medium">End Date</label>
          <div className="col-span-3">
            <input
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-12 px-4 py-2 border rounded-md ${formik.touched.endDate && formik.errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-red-500">{formik.errors.endDate}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3">
            {/* Other content here */}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-24 h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
