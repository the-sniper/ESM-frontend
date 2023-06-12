import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function EmploymentDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
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

  const formik = useFormik({
    initialValues: {
      serviceNumber: "102030",
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
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM("employmentDetails", values);
      console.log(values, "ESMValues");
    },
  });

  const formValues = [
    {
      label: "Civil qualification",
      placeholder: "Enter your Civil qualification",
      name: "civilQualification",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Additional courses",
      placeholder: "Enter any additional courses taken",
      name: "additionalCourse",
      type: "date",
      class: "col-6",
      formik: formik,
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
      formik: formik,
    },
    {
      label: "Civil employment",
      name: "civilEmployment",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Present designation",
      placeholder: "Enter present designation",
      name: "presentDesignation",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Department",
      placeholder: "Enter department",
      name: "department",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Sector",
      placeholder: "Enter sector",
      name: "sector",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Employer's name",
      placeholder: "Enter the name of the employer",
      name: "employer",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Monthly income",
      placeholder: "Enter your monthly income",
      name: "monthlyIncome",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Official contact number",
      placeholder: "Enter your official contact number",
      name: "officialContactNumber",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Designation on retirement",
      placeholder: "Enter your designation on retirement",
      name: "designationOnRetirement",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Date of retirement",
      placeholder: "Enter your date of retirement",
      name: "retirementDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Civil PPO number",
      placeholder: "Enter your civil PPO number",
      name: "civilPpoNumber",
      type: "date",
      class: "col-6",
      formik: formik,
    },
  ];

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "registerESM") {
        if (responseStatus.status === "success") {
          // handleRedirectInternal(history, 'login')
          clearResponse();
          console.log("ESM Registration Success!");
        }
      }
    }
  }, [responseStatus]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">{Object.values(mapData(formValues))}</div>
        <CustomButton
          label="Save"
          type="submit"
          onClick={formik.handleSubmit}
          buttonType="primary"
        />
      </form>
    </div>
  );
}

export default EmploymentDetails;
