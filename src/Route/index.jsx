import React from "react";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import { classes } from "../Data/Layouts";

// setup fake backend

const Routers = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    // Your cleanup code can be placed here if needed
    return () => {
      // Cleanup logic
    };
  }, []);

  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={"/"} element={<PrivateRoute token={token} />}>
            {/* Other routes inside the PrivateRoute */}
            <Route
              exact
              path={`/`}
              element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />}
            />
            <Route path={`/*`} element={<LayoutRoutes />} />
          </Route>

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            element={<Signin />}
          />
          {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={<Component />} key={i} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
   
  );
};

export default Routers;
