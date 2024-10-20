import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresToken }) => {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (requiresToken) {
    return token && userInfo ? children : <Navigate to="/" />; 
  } else {
    return userInfo ? children : <Navigate to="/" />; 
  }
};

export default ProtectedRoute;
