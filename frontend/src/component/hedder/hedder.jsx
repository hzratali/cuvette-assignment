import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
  const token = localStorage.getItem('token'); 

   const username = userInfo?.Company?.username

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    navigate('/');
   // window.location.reload();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/image.svg" alt="Logo" className="h-6" />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link to="#" className="hover:text-gray-900">
            Contact Us
          </Link>

          {/* Conditional Rendering based on token availability */}
          {token && username && (
            <div className="relative group">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
                Hello, {username}!
              </div>
              <div className="absolute right-0 mt-0.4 w-25 bg-white border border-gray-300 rounded-md shadow-lg hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
