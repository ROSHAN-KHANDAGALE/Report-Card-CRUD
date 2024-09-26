// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token is found
  }

  return children; // Render the component if token is valid
};

export default ProtectedRoute;
