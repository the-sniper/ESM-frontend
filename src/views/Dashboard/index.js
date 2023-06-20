import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import AuthContext from "../../context/auth/authContext";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, isAuthenticated } = authContext;
  useEffect(() => {
    loadUser();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <h1>Dashboard</h1>
      {console.log(user, isAuthenticated, "checkUser")}
      {user ? (
        <>
          <h4>
            Name: <span>{user.name}</span>
          </h4>
          <h4>
            Service number: <span>{user.serviceNumber}</span>
          </h4>
          <h4>
            Email address: <span>{user.email}</span>
          </h4>
          <h4>
            Mobile number: <span>{user.mobile}</span>
          </h4>
          <h4>
            Type: <span>{user.regType}</span>
          </h4>
        </>
      ) : (
        "Loading"
      )}

      <CustomButton
        label="Go to ESM Forms"
        onClick={() => navigate("/esm")}
        buttonType="primary"
      />
    </>
  );
};

export default Dashboard;
