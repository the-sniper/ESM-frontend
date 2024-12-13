import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { LOGO, SITE_NAME, mapData } from "../../utils";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "./signup.css";
import CustomDialog from "../../components/molecules/CustomDialog";

const Signup = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { register, checkESMValidation, responseStatus, clearResponse } =
    authContext;
  const navigate = useNavigate();

  //Common
  const userTypeFormik = useFormik({
    initialValues: {
      regType: "ESM",
    },
    onSubmit: (values) => {
      console.log(values, "Signup values");
    },
  });

  const userTypeInfo = [
    {
      label: "Registration type",
      name: "regType",
      type: "select",
      options: [
        { show: "ESM", value: "ESM" },
        {
          show: "Widow (New ESM Registration)",
          value: "WDW-N",
        },
        {
          show: "Widow (Existing ESM Registration)",
          value: "WDW-X",
        },
      ],
      class: "col-sm-6 col-12",
      formik: userTypeFormik,
    },
  ];

  //ESM Registration
  const esmValidationArray = Yup.object({
    name: Yup.string().required("This field is required!"),
    serviceNumber: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    mobile: Yup.string()
      .matches(/^[789]\d{9}$/, "Enter a valid phone number.")
      .required("This field is required!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("This field is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required!"),
    regType: Yup.string().required("This field is required!"),
    esmDateOfBirth: Yup.string(),
    esmDateOfDeath: Yup.string(),
  });

  const esmFormik = useFormik({
    initialValues: {
      name: "",
      serviceNumber: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      regType: "ESM",
      esmDateOfBirth: "",
      esmDateOfDeath: "",
      role: "USER",
    },
    validationSchema: esmValidationArray,
    onSubmit: (values) => {
      register("RegisterUser", values, "");
      // if (values?.regType === "WDW") {
      //   setEsmIdModal(true);
      // }
      console.log(values, "Signup values");
    },
  });

  const esmSignupInfo = [
    // {
    //   label: "Registration type",
    //   name: "regType",
    //   type: "select",
    //   options: [
    //     { show: "ESM", value: "ESM" },
    //     {
    //       show: "Widow",
    //       value: "WDW",
    //     },
    //   ],
    //   class: "col-sm-6 col-12",
    //   formik: esmFormik,
    // },
    // {
    //   type: "misc",
    //   class: "col-sm-6 col-12",
    // },
    {
      label: "Full name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },
    {
      label: "Service number",
      name: "serviceNumber",
      type: "text",
      placeholder: "Enter your service number",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },
    {
      label: "Email address",
      name: "email",
      type: "text",
      placeholder: "Enter your email address",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },
    {
      label: "Phone number",
      name: "mobile",
      type: "text",
      placeholder: "Enter your phone number",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your password",
      class: "col-sm-6 col-12",
      formik: esmFormik,
    },

    // {
    //   label: "Do you have an ESM ID?",
    //   name: "esmIdCheck",
    //   type: "radio",
    //   options: [
    //     {
    //       show: "Yes",
    //       id: "true",
    //     },
    //     {
    //       show: "No",
    //       id: "false",
    //     },
    //   ],
    //   class: `col-sm-6 col-12 ${
    //     formik?.values?.regType === "WDW" ? "" : "d-none"
    //   }`,
    //   formik: esmFormik,
    // },
    // {
    //   label: "ESM Date of Birth",
    //   name: "esmDateOfBirth",
    //   type: "date",
    //   class: `col-sm-6 col-12 ${
    //     esmFormik?.values?.regType === "WDW" ? "" : "d-none"
    //   }`,
    //   formik: esmFormik,
    // },
    // {
    //   label: "ESM Date of Death",
    //   name: "esmDateOfDeath",
    //   type: "date",
    //   class: `col-sm-6 col-12 ${
    //     esmFormik?.values?.regType === "WDW" ? "" : "d-none"
    //   }`,
    //   formik: esmFormik,
    // },
  ];

  //New Widow Registration
  const widowNewValidationArray = Yup.object({
    name: Yup.string().required("This field is required!"),
    serviceNumber: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    mobile: Yup.string()
      .matches(/^[789]\d{9}$/, "Enter a valid phone number.")
      .required("This field is required!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("This field is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required!"),
    regType: Yup.string(),
    esmDateOfDeath: Yup.string(),
    esmCauseOfDeath: Yup.string(),
  });

  const widowNewFormik = useFormik({
    initialValues: {
      name: "",
      serviceNumber: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      regType: "WDW-N",
      esmDateOfDeath: "",
      esmCauseOfDeath: "",
      role: "USER",
    },
    validationSchema: widowNewValidationArray,
    onSubmit: (values) => {
      register("NewProfile/RegisterWidow", values, "Widow");
      // if (values?.regType === "WDW") {
      //   setEsmIdModal(true);
      // }
      console.log(values, "New Widow Registration");
    },
  });

  const widowNewSignupInfo = [
    {
      label: "Full name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },
    {
      label: "Service number",
      name: "serviceNumber",
      type: "text",
      placeholder: "Enter your service number",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },
    {
      label: "Email address",
      name: "email",
      type: "text",
      placeholder: "Enter your email address",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },
    {
      label: "Phone number",
      name: "mobile",
      type: "text",
      placeholder: "Enter your phone number",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your password",
      class: "col-sm-6 col-12",
      formik: widowNewFormik,
    },

    {
      label: "ESM Date of Death",
      name: "esmDateOfDeath",
      type: "date",
      class: `col-sm-6 col-12`,
      formik: widowNewFormik,
    },
    {
      label: "ESM Cause of Death",
      name: "esmCauseOfDeath",
      type: "text",
      class: `col-sm-6 col-12`,
      formik: widowNewFormik,
    },
  ];

  //Existing ESM Widow Registration
  const widowExValidationArray = Yup.object({
    name: Yup.string().required("This field is required!"),
    serviceNumber: Yup.string().required("This field is required!"),
    registerationId: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    mobile: Yup.string()
      .matches(/^[789]\d{9}$/, "Enter a valid phone number.")
      .required("This field is required!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("This field is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required!"),
    regType: Yup.string(),
    esmDateOfBirth: Yup.string(),
    esmDateOfDeath: Yup.string(),
  });

  const widowExFormik = useFormik({
    initialValues: {
      registerationId: "",
      name: "",
      serviceNumber: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      regType: "WDW-X",
      role: "USER",
      esmDateOfBirth: "",
      esmDateOfDeath: "",
    },
    validationSchema: widowExValidationArray,
    onSubmit: (values) => {
      // register("NewProfile/RegisterWidow", values, "Widow");
      // if (values?.regType === "WDW") {
      //   setEsmIdModal(true);
      // }

      checkESMValidation(values);
      // register("ExistingProfile/RegisterWidow", values, "Widow")

      console.log(values, "Existing ESM Widow Registration");
    },
    //   onSubmit: (values) => {
    //     async function triggerRegistration(values) {
    //       const isValid = await checkESMValidation(values);
    //       console.log(isValid, "isValid");
    //       if (isValid) {
    //         try {
    //           const response = await register(
    //             "ExistingProfile/RegisterWidow",
    //             values,
    //             "Widow"
    //           );
    //           console.log("Registration successful:", response);
    //           // Handle successful registration
    //         } catch (error) {
    //           console.error("Registration failed:", error);
    //           // Handle registration error
    //         }
    //       } else {
    //         console.log("Validation failed. Registration not triggered.");
    //         // Handle validation failure
    //       }
    //     }

    //     // Call the async function after defining it
    //     triggerRegistration(values);
    //   },
  });

  // async function triggerRegistration(values) {
  //   const isValid = await checkESMValidation(values);
  //   console.log(isValid, "isValid");
  //   if (isValid) {
  //     try {
  //       const response = await register(
  //         "ExistingProfile/RegisterWidow",
  //         values,
  //         "Widow"
  //       );
  //       console.log("Registration successful:", response);
  //       // Handle successful registration
  //     } catch (error) {
  //       console.error("Registration failed:", error);
  //       // Handle registration error
  //     }
  //   } else {
  //     console.log("Validation failed. Registration not triggered.");
  //     // Handle validation failure
  //   }
  // }

  const widowExSignupInfo = [
    {
      label: "Your Full name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Registration ID",
      name: "registerationId",
      type: "text",
      placeholder: "Enter ESM Registration ID",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Service number",
      name: "serviceNumber",
      type: "text",
      placeholder: "Enter your service number",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Email address",
      name: "email",
      type: "text",
      placeholder: "Enter your email address",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Phone number",
      name: "mobile",
      type: "text",
      placeholder: "Enter your phone number",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your password",
      class: "col-sm-6 col-12",
      formik: widowExFormik,
    },
    {
      label: "ESM Date of Birth",
      name: "esmDateOfBirth",
      type: "date",
      class: `col-sm-6 col-12`,
      formik: widowExFormik,
    },
    {
      label: "ESM Date of Death",
      name: "esmDateOfDeath",
      type: "date",
      class: `col-sm-6 col-12`,
      formik: widowExFormik,
    },
  ];

  // const esmValidationArray = Yup.object({
  //   esmIdCheck: Yup.string().required("This field is required!"),
  //   serviceId: Yup.string().when("esmIdCheck", {
  //     is: "false",
  //     then: () => Yup.string(),
  //     otherwise: () => Yup.string().required("This field is required!"),
  //   }),
  // });

  // const esmCheckFormik = useFormik({
  //   initialValues: {
  //     esmIdCheck: "",
  //     serviceId: "",
  //   },
  //   validationSchema: esmValidationArray,
  //   onSubmit: (values) => {
  //     if (values?.esmIdCheck == "false") {
  //       navigate("/login");
  //     }
  //     console.log(values, "ESM Check values");
  //   },
  // });

  // const esmCheck = [
  //   {
  //     label: "Do you have an ESM ID?",
  //     name: "esmIdCheck",
  //     type: "radio",
  //     options: [
  //       {
  //         show: "Yes",
  //         id: "true",
  //       },
  //       {
  //         show: "No",
  //         id: "false",
  //       },
  //     ],
  //     class: "col-6",
  //     formik: esmCheckFormik,
  //   },
  //   {
  //     label: "ESM ID",
  //     name: "serviceId",
  //     type: "text",
  //     placeholder: "Enter the ESM ID",
  //     class: `col-12 ${
  //       esmCheckFormik?.values?.esmIdCheck == "true" ? "" : "d-none"
  //     }`,
  //     formik: esmCheckFormik,
  //   },
  // ];

  useEffect(() => {
    console.log(responseStatus, "login_responseStatus");
    if (responseStatus) {
      if (responseStatus.from === "register") {
        if (
          responseStatus.status === "SUCCESS" ||
          responseStatus?.message?.includes("Successful")
        ) {
          setAlert("Registered successfully!", "success");
          clearResponse();
          navigate("/login");
        } else if (responseStatus.status === "error") {
          setAlert(responseStatus?.message, "error");
          clearResponse();
        }
      } else if (responseStatus.from === "checkESMValidation") {
        console.log(responseStatus, "responseStatusEx");
        if (
          responseStatus.status === "SUCCESS" ||
          responseStatus?.message?.includes("Widow Registeration Successful")
        ) {
          setAlert(responseStatus?.data?.data, "success");
          register(
            "ExistingProfile/RegisterWidow",
            widowExFormik?.values,
            "Widow"
          );
          clearResponse();
        } else if (responseStatus.status === "error") {
          setAlert(responseStatus?.message2?.data, "error");
          clearResponse();
        }
      }
    }
  }, [responseStatus]);

  return (
    <div className="signupContainer">
      <div className="signup">
        <img src={LOGO} alt={SITE_NAME} className="signupLogo" />
        <h1 className="signupTitle">SIGNUP</h1>
        <div className="row">{Object.values(mapData(userTypeInfo))}</div>
        {userTypeFormik?.values?.regType === "ESM" ? (
          <form onSubmit={esmFormik.handleSubmit}>
            <div className="row">{Object.values(mapData(esmSignupInfo))}</div>
            <div className="d-flex loginActBox justify-content-between align-items-center">
              <CustomButton label="Signup" type="submit" buttonType="primary" />
            </div>
          </form>
        ) : userTypeFormik?.values?.regType === "WDW-N" ? (
          <form onSubmit={widowNewFormik.handleSubmit}>
            <div className="row">
              {Object.values(mapData(widowNewSignupInfo))}
            </div>
            <div className="d-flex loginActBox justify-content-between align-items-center">
              <CustomButton label="Signup" type="submit" buttonType="primary" />
            </div>
          </form>
        ) : (
          <form onSubmit={widowExFormik.handleSubmit}>
            <div className="row">
              {Object.values(mapData(widowExSignupInfo))}
            </div>
            <div className="d-flex loginActBox justify-content-between align-items-center">
              <CustomButton label="Signup" type="submit" buttonType="primary" />
            </div>
          </form>
        )}
      </div>
      <h4 className="loginHelper">
        Already have an account? <Link to="/login">Login here.</Link>{" "}
      </h4>
      {/* <CustomDialog
        title=""
        className="dependentModal"
        open={esmIdModal}
        function={() => setEsmIdModal(!esmIdModal)}
        closeBtn={false}
      >
        <form onSubmit={esmCheckFormik.handleSubmit}>
          <div className="row">{Object.values(mapData(esmCheck))}</div>

          <div className="actionWrapper d-flex justify-content-end mt-4">
            <CustomButton type="submit" className="ml-3" label="Submit" />
          </div>
        </form>
      </CustomDialog> */}
    </div>
  );
};

export default Signup;
