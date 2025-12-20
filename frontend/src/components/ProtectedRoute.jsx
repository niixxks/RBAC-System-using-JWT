import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // --- HELPER: CHECK IF TOKEN IS EXPIRED ---
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      // Decode the JWT (base64) to find the expiration time
      const payload = JSON.parse(atob(token.split('.')[1])); 
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() > expiry;
    } catch (e) {
      return true;
    }
  };

  // 1. Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if token has expired (Auto Logout)
  if (isTokenExpired(token)) {
    localStorage.removeItem('token'); // Clear bad token
    localStorage.removeItem('role');
    alert("Session Expired. Please Login Again."); // Notify user
    return <Navigate to="/login" replace />;
  }

  // 3. Check if user has the correct role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. If all good, render the page
  return children;
};

export default ProtectedRoute;