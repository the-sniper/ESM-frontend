import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { LOGO, SITE_NAME, handleRedirectInternal, mapData } from "../../utils";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "./login.css";

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const location = useLocation();
  const { user, login, responseStatus, clearResponse, isAuthenticated } =
    authContext;
  const { setAlert } = alertContext;
  console.log(user, "UserLog");

  const navigate = useNavigate();
  let [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const validationArray = Yup.object({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: localStorage.username ? localStorage.username : "",
      password: localStorage.password ? localStorage.password : "",
      regType: "ESM",
      remember_me: localStorage.remember_me ? localStorage.remember_me : false,
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      if (values.remember_me) {
        localStorage.username = values.serviceNumber;
        localStorage.password = values.password;
        localStorage.remember_me = values.remember_me;
      } else {
        delete localStorage.username;
        delete localStorage.password;
        delete localStorage.remember_me;
      }
      login(values);
    },
  });

  const rememberMe = [
    {
      label: "Remember me",
      name: "remember_me",
      type: "checkbox",
      placeholder: "Remember me",
      class: "",
      formik: formik,
    },
  ];

  const loginInfo = [
    {
      label: "Service Number",
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      class: "col-12",
      autoFocus: true,
      formik: formik,
    },

    {
      label: "Password",
      name: "password",
      type: passwordShown ? "text" : "password",
      placeholder: "Enter your password",
      class: "col-12",
      formik: formik,
      endAdornment: passwordShown ? (
        <span
          className="material-icons cursorPointer"
          onClick={togglePasswordVisiblity}
        >
          visibility_off
        </span>
      ) : (
        <span
          className="material-icons cursorPointer"
          onClick={togglePasswordVisiblity}
        >
          visibility
        </span>
      ),
    },
  ];

  useEffect(() => {
    console.log("LOCAL VSTORAGE", localStorage);
  });

  useEffect(() => {
    if (responseStatus) {
      console.log(responseStatus, "checkresponseStatus");
      if (responseStatus.from === "login") {
        if (responseStatus.status === "SUCCESS") {
          console.log("Login successful!");
          setAlert("Logged in successfully", "success");
          clearResponse();
          navigate("/dashboard");
        } else if (responseStatus.status === "error") {
          setAlert(responseStatus.message, "error");
          clearResponse();
        }
      }
    }
  }, [responseStatus]);

  return (
    <div className="loginContainer">
      <div className="login">
        <img src={LOGO} alt={SITE_NAME} className="loginLogo" />
        <h1 className="loginTitle">LOGIN</h1>
        {/* <h2 className="loginSubtitle">
          Enter your login details to visit your dashboard.
        </h2> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="row">{Object.values(mapData(loginInfo))}</div>
          <div className="d-flex loginActBox justify-content-between align-items-center">
            {Object.values(mapData(rememberMe))}
            <CustomButton label="Login" type="submit" buttonType="primary" />
          </div>
        </form>
      </div>
      <h4 className="signupHelper">
        Don't have an account? <Link to="/signup">Signup here.</Link>{" "}
      </h4>
    </div>
  );
};

export default Login;
