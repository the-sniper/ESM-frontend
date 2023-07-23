import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function EmploymentDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const employmentValidationArray = Yup.object({
    serviceName: Yup.string(),
    civilQualification: Yup.string().required("This is a required field."),
    additionalCourse: Yup.string().required("This is a required field."),
    equivalentTest: Yup.string().required("This is a required field."),
    civilEmployment: Yup.string().required("This is a required field."),
    presentDesignation: Yup.string().required("This is a required field."),
    department: Yup.string().required("This is a required field."),
    sector: Yup.string().required("This is a required field."),
    employer: Yup.string().required("This is a required field."),
    monthlyIncome: Yup.string().required("This is a required field."),
    officialContactNumber: Yup.string().required("This is a required field."),
    designationOnRetirement: Yup.string().required("This is a required field."),
    retirementDate: Yup.string().required("This is a required field."),
    civilPpoNumber: Yup.string().required("This is a required field."),
  });

  const employmentFormik = useFormik({
    initialValues: {
      civilQualification: "",
      additionalCourse: "",
      equivalentTest: "",
      civilEmployment: "",
      presentDesignation: "",
      department: "",
      sector: "",
      employer: "",
      monthlyIncome: "",
      officialContactNumber: "",
      designationOnRetirement: "",
      retirementDate: "",
      civilPpoNumber: "",
    },
    validationSchema: employmentValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetEmploymentDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      employmentFormik.values.civilQualification = fetchESM.civilQualification;
      employmentFormik.values.additionalCourse = fetchESM.additionalCourse;
      employmentFormik.values.equivalentTest = fetchESM.equivalentTest;
      employmentFormik.values.civilEmployment = fetchESM.civilEmployment;
      employmentFormik.values.presentDesignation = fetchESM.presentDesignation;
      employmentFormik.values.department = fetchESM.department;
      employmentFormik.values.sector = fetchESM.sector;
      employmentFormik.values.employer = fetchESM.employer;
      employmentFormik.values.monthlyIncome = fetchESM.monthlyIncome;
      employmentFormik.values.officialContactNumber =
        fetchESM.officialContactNumber;
      employmentFormik.values.designationOnRetirement =
        fetchESM.designationOnRetirement;
      employmentFormik.values.retirementDate = fetchESM.retirementDate;
      employmentFormik.values.civilPpoNumber = fetchESM.civilPpoNumber;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Civil qualification",
      placeholder: "Enter your Civil qualification",
      name: "civilQualification",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Additional courses",
      placeholder: "Enter any additional courses taken",
      name: "additionalCourse",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },

    {
      label: "Select equivalent test",
      name: "equivalentTest",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
        {
          show: "2",
          value: "2",
        },
      ],
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Civil employment",
      name: "civilEmployment",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Present designation",
      placeholder: "Enter present designation",
      name: "presentDesignation",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Department",
      placeholder: "Enter department",
      name: "department",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Sector",
      placeholder: "Enter sector",
      name: "sector",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Employer's name",
      placeholder: "Enter the name of the employer",
      name: "employer",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Monthly income",
      placeholder: "Enter your monthly income",
      name: "monthlyIncome",
      type: "number",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Official contact number",
      placeholder: "Enter your official contact number",
      name: "officialContactNumber",
      type: "number",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Designation on retirement",
      placeholder: "Enter your designation on retirement",
      name: "designationOnRetirement",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Date of retirement",
      placeholder: "Enter your date of retirement",
      name: "retirementDate",
      type: "date",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Civil PPO number",
      placeholder: "Enter your civil PPO number",
      name: "civilPpoNumber",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(employmentFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("EmploymentDetails", employmentFormik.values);
      props.handleComplete();
    }
  };

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "registerESM") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Form submitted successfully!", "success");
          clearResponse();
        }
        // else if (responseStatus.status === "error") {
        //   setAlert(responseStatus.message, "error");
        //   clearResponse();
        // }
      }
    }
  }, [responseStatus]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">{Object.values(mapData(formValues))}</div>
        <div className="esmAction">
          <CustomButton
            label="Previous"
            className="esmSubmitBtn"
            disabled={false}
            onClick={() => props.handlePrevious()}
            buttonType="secondary"
          />
          <CustomButton
            label="Next"
            className="esmSubmitBtn"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            buttonType="primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EmploymentDetails;
