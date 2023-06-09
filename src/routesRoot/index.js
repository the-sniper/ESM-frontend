import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ESMForm from "../views/ESMForm";
import Login from "../views/Login";
import Signup from "../views/Signup";
import PrivateRoute from "./privateRoute";
import Dashboard from "../views/Dashboard";
import Header from "../components/organisms/Header";
import AuthContext from "../context/auth/authContext";

function RoutesRoot() {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, [localStorage.token]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/esm"
            element={
              <PrivateRoute>
                <ESMForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default RoutesRoot;
