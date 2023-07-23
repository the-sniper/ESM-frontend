import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import AuthContext from "../../context/auth/authContext";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LinearProgress } from "@mui/material";
import { greetingBasedOnTime } from "../../utils";
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
      {user && user.data && user.data.name != undefined ? (
        <div className="customContainer">
          <h2 className="welcomeText">
            {greetingBasedOnTime()} {user.data.name.split(" ")[0]}
          </h2>
          <div className="dashBox">
            <div className="userInfoSection">
              <div className="userInfoItem">
                <span className="userInfoLabel">Name:</span>
                <span className="userInfoValue">{user.data.name}</span>
              </div>
              <div className="userInfoItem">
                <span className="userInfoLabel">Service number:</span>
                <span className="userInfoValue">{user.data.serviceNumber}</span>
              </div>
              <div className="userInfoItem">
                <span className="userInfoLabel">Email address:</span>
                <span className="userInfoValue">{user.data.email}</span>
              </div>
              <div className="userInfoItem">
                <span className="userInfoLabel">Mobile number:</span>
                <span className="userInfoValue">{user.data.mobile}</span>
              </div>
              <div className="userInfoItem">
                <span className="userInfoLabel">Type:</span>
                <span className="userInfoValue">{user.data.regType}</span>
              </div>
            </div>
            {console.log(user.data.formProgressCount, "formProgressCount")}
            <div className="dashStatus">
              <div className="dashFormStatus">
                <h6>Form Completion Progress</h6>
                <LinearProgressWithLabel
                  value={(user.data.formProgressCount / 7) * 100}
                />

                <CustomButton
                  label="Complete ESM Profile"
                  onClick={() => navigate("/esm")}
                  buttonType="primary"
                />
              </div>
              <div className="dashDocStatus">
                <h6>Document Upload Progress</h6>
                <LinearProgressWithLabel value={0} />
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
