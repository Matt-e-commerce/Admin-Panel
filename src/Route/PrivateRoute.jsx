
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Get the token from local storage
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? JSON.parse(storedToken) : null);

  useEffect(() => {
    // Update local storage with the token (optional)
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  // Check if the token is present
  if (!token) {
    // If no token is present, redirect to the login page
    return <Navigate to={`${process.env.PUBLIC_URL}/login`} />;
  }

  // If the token is present, render the child routes (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
