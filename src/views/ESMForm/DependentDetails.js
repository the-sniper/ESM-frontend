import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function DependentDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const dependentValidationArray = Yup.object({
    serviceName: Yup.string(),
    dependentName: Yup.string().required("This is a required field."),
    registeredDate: Yup.string().required("This is a required field."),
    dependentId: Yup.string().required("This is a required field."),
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

  const dependentFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      dependentName: "",
      dependentId: "",
      registeredDate: "",
      relation: "",
      dependentDob: "",
      dependentAadhar: "",
      dependentQualification: "",
      dependentAcademicYear: "",
      dependentEmploymentStatus: "",
      dependentMaritalStatus: "",
    },
    validationSchema: dependentValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetDependentDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      dependentFormik.values.dependentName = fetchESM.dependentName;
      dependentFormik.values.dependentId = fetchESM.dependentId;
      dependentFormik.values.registeredDate = fetchESM.registeredDate;
      dependentFormik.values.relation = fetchESM.relation;
      dependentFormik.values.dependentDob = fetchESM.dependentDob;
      dependentFormik.values.dependentAadhar = fetchESM.dependentAadhar;
      dependentFormik.values.dependentQualification =
        fetchESM.dependentQualification;
      dependentFormik.values.dependentAcademicYear =
        fetchESM.dependentAcademicYear;
      dependentFormik.values.dependentEmploymentStatus =
        fetchESM.dependentEmploymentStatus;
      dependentFormik.values.dependentMaritalStatus =
        fetchESM.dependentMaritalStatus;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Dependent's name",
      placeholder: "Enter the name of the dependent",
      name: "dependentName",
      type: "text",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Dependent ID number",
      placeholder: "Enter the dependent ID number",
      name: "dependentId",
      type: "date",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Date of registration",
      placeholder: "Enter the date of registration",
      name: "registeredDate",
      type: "date",
      class: "col-6",
      formik: dependentFormik,
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
      formik: dependentFormik,
    },
    {
      label: "Dependent's date of birth",
      name: "dependentDob",
      type: "date",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Dependent's Aadhar number",
      placeholder: "Enter dependent's Aadhar number",
      name: "dependentAadhar",
      type: "text",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Dependent's qualification",
      placeholder: "Enter dependent's qualification",
      name: "dependentQualification",
      type: "text",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Dependent's year of graduation",
      placeholder: "Enter dependent's year of graduation",
      name: "dependentAcademicYear",
      type: "text",
      class: "col-6",
      formik: dependentFormik,
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
      formik: dependentFormik,
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
      formik: dependentFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(dependentFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("DependentDetails", dependentFormik.values);
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

export default DependentDetails;
