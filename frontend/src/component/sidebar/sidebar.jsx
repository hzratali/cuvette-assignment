import React from 'react';
import { AiFillHome } from 'react-icons/ai'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-gray-100 shadow-md"> 
      
      <ul className="mt-8">
        <li className="p-4 hover:bg-blue-500 flex justify-center"> 
          <Link href="#">
            <AiFillHome size={24} color="blue" /> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
