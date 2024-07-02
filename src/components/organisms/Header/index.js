import React, { useState, useContext, useEffect } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import { LOGO, SITE_NAME } from "../../../utils";

function Header() {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { user, loadUser, logout, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    console.log(user, "viewUser");
    if (user?.data) {
      global.formProgressCount = user?.data?.formProgressCount;
    }
  }, [user?.data]);

  const onLogout = () => {
    logout();
    setAlert("Logged out successfully", "success");
    console.log("Logged out successfully");
    navigate("/login");
  };
  return (
    <header className="mainHeader">
      <div className="customContainer headerInner">
        {console.log(location, "checkUserLogin")}
        <img src={LOGO} alt={SITE_NAME} className="headerLogo" />
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Button
                  className={`${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </li>
              <li>
                <Button onClick={() => onLogout()}>Logout</Button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Button
                  className={`${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  className={`${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
