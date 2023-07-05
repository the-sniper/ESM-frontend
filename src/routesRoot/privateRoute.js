import React, { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  let location = useLocation();
  console.log(token, "checktoken");

  return localStorage.token ? (
    children
  ) : (
    <Navigate to="/a" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
