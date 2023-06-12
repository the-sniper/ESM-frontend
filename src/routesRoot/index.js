import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ESMForm from "../views/ESMForm";
import Login from "../views/Login";
import Signup from "../views/Signup";
import PrivateRoute from "./privateRoute";

function RoutesRoot() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/esm"
          element={
            <PrivateRoute>
              <ESMForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RoutesRoot;
