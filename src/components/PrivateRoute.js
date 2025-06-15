import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Unauthorized from './Unauthorized';  // Import Unauthorized page

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.login);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated but doesn't have the correct role, show Unauthorized
  if (requiredRole && user?.role !== requiredRole) {
    return <Unauthorized />;
  }

  // Otherwise, render the children components
  return children;
};

export default PrivateRoute;