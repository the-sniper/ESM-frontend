import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function FamilyMemberDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
    serviceName: Yup.string(),
    dependentName: Yup.string().required("This is a required field."),
    registeredDate: Yup.string().required("This is a required field."),
    relation: Yup.string().required("This is a required field."),
    dependentDob: Yup.string().required("This is a required field."),
    dependentAadhar: Yup.string().required("This is a required field."),
    dependentQualification: Yup.string().required("This is a required field."),
    dependentAcademicYear: Yup.string().required("This is a required field."),
    dependentEmploymentStatus: Yup.string().required(
      "This is a required field."
    ),
    dependentMaritalStatus: Yup.string().required("This is a required field."),
  });

  const formik = useFormik({
    initialValues: {
      serviceNumber: localStorage?.username?.endsWith("|W") ? localStorage?.username?.slice(0, -2) : localStorage?.username,
      dependentName: "",
      registeredDate: "",
      relation: "",
      dependentDob: "",
      dependentAadhar: "",
      dependentQualification: "",
      dependentAcademicYear: "",
      dependentEmploymentStatus: "",
      dependentMaritalStatus: "",
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM(values);
      console.log(values, "ESMValues");
    },
  });

  const formValues = [
    {
      label: "Dependent's name",
      placeholder: "Enter the name of the dependent",
      name: "dependentName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Date of registration",
      placeholder: "Enter the date of registration",
      name: "registeredDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },

    {
      label: "Select relation",
      name: "relation",
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
      label: "Dependent's date of birth",
      name: "dependentDob",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Dependent's Aadhar number",
      placeholder: "Enter dependent's Aadhar number",
      name: "dependentAadhar",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Dependent's qualification",
      placeholder: "Enter dependent's qualification",
      name: "dependentQualification",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Dependent's year of graduation",
      placeholder: "Enter dependent's year of graduation",
      name: "dependentAcademicYear",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Dependent's employment status",
      name: "dependentEmploymentStatus",
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
      label: "Dependent's marital status",
      name: "dependentMaritalStatus",
      type: "select",
      options: [
        {
          show: "Married",
          value: "married",
        },
        {
          show: "Un-married",
          value: "unmarried",
        },
        {
          show: "Separated",
          value: "separated",
        },
      ],
      class: "col-6",
      formik: formik,
    },
  ];

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "registerESM") {
        if (responseStatus.status === "SUCCESS") {
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

export default FamilyMemberDetails;
