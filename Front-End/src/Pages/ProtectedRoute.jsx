import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("auth_token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!token || !userInfo) {
    return <Navigate to="/home" />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
