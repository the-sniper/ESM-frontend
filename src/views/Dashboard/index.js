import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import AuthContext from "../../context/auth/authContext";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LinearProgress } from "@mui/material";
function LinearProgressWithLabel(props) {
  return (
    <div>
      <LinearProgress variant="determinate" {...props} />
      <p>{`${Math.round(props.value)}%`}</p>
    </div>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, isAuthenticated } = authContext;
  useEffect(() => {
    loadUser();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {console.log(user, isAuthenticated, "checkUser 1112")}
      {user && user.name != undefined ? (
        <div className="customContainer">
          <h2 className="welcomeText">
            Good Morning {user.name.split(" ")[0] + ","}
          </h2>
          <div className="dashBox">
            <div className="dashInfo">
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
            </div>
            <div className="dashStatus">
              <div className="dashFormStatus">
                <h6>Form Completion Progress</h6>
                <LinearProgressWithLabel
                  value={(user.formProgressCount / 7) * 100}
                />

                <CustomButton
                  label="Complete ESM Profile"
                  onClick={() => navigate("/esm")}
                  buttonType="primary"
                />  
              </div>
              <div className="dashDocStatus">
                <h6>Document Upload Progress</h6>
                <LinearProgressWithLabel
                  value={(user.formProgressCount / 7) * 100}
                />
                <CustomButton
                  label="Submit Documents"
                  //   onClick={() => navigate("/esm")}
                  buttonType="primary"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Dashboard;
