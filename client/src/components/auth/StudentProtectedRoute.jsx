import React from "react";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("studentToken");

  // ✅ If not logged in, redirect to student login page
  if (!token) {
    alert("Please login to access your student portal.");
    return <Navigate to="/login/student" replace />;
  }

  // ✅ If logged in, render the protected content
  return children;
};

export default StudentProtectedRoute;
