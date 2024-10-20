import React, { useState } from 'react';
import Sidebar from '../component/sidebar/sidebar';
import InterviewForm from './interview'; 

const Jobpage = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm((prev) => !prev); 
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-9 ml-7">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={toggleForm} 
        >
          Create Interview
        </button>

        {/* Render Interview Form directly */}
        {showForm && <InterviewForm onClose={toggleForm} />}
      </div>
    </div>
  );
};

export default Jobpage;
