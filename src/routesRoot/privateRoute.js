import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  let location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
