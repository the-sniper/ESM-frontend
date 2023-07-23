import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { LOGO, SITE_NAME, mapData } from "../../utils";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "./signup.css";

const Signup = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { register, responseStatus, clearResponse } = authContext;
  const navigate = useNavigate();

  const validationArray = Yup.object({
    name: Yup.string().required("This field is required!"),
    serviceNumber: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    mobile: Yup.string().required("This field is required!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("This field is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required!"),
    regType: Yup.string().required("This field is required!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      serviceNumber: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      regType: "",
      role: "",
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      register(values);
      console.log(values, "Signup values");
    },
  });

  const signupInfo = [
    {
      label: "Full name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Service number",
      name: "serviceNumber",
      type: "text",
      placeholder: "Enter your service number",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Email address",
      name: "email",
      type: "text",
      placeholder: "Enter your email address",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Phone number",
      name: "mobile",
      type: "text",
      placeholder: "Enter your phone number",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your password",
      class: "col-sm-6 col-12",
      formik: formik,
    },
    {
      label: "Registration type",
      name: "regType",
      type: "select",
      options: [
        { show: "ESM", value: "ESM" },
        {
          show: "Widow",
          value: "WDW",
        },
      ],
      class: "col-sm-6 col-12",
      formik: formik,
    },
  ];

  useEffect(() => {
    console.log(responseStatus, "login_responseStatus");
    if (responseStatus) {
      if (responseStatus.from === "register") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Registered successfully!", "success");
          clearResponse();
          navigate("/login");

          console.log("Login Success 1");
        }
      } else if (responseStatus.from === "checkValidation") {
        if (responseStatus.status !== "SUCCESS") {
        } else {
          setAlert("Registered successfully!", "success");
          clearResponse();
          navigate("/login");

          console.log("Login Success 2");

          // window.scrollTo(0, 200)
        }
      }
    }
  }, [responseStatus]);

  return (
    <div className="signupContainer">
      <div className="signup">
        <img src={LOGO} alt={SITE_NAME} className="signupLogo" />
        <h1 className="signupTitle">SIGNUP</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">{Object.values(mapData(signupInfo))}</div>
          <div className="d-flex loginActBox justify-content-between align-items-center">
            <CustomButton label="Signup" type="submit" buttonType="primary" />
          </div>
        </form>
      </div>
      <h4 className="loginHelper">
        Already have an account? <Link to="/login">Login here.</Link>{" "}
      </h4>
    </div>
  );
};

export default Signup;
