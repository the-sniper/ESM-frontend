import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function PersonalDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const personalValidationArray = Yup.object({
    serviceName: Yup.string(),
    fatherName: Yup.string().required("This is a required field."),
    motherName: Yup.string().required("This is a required field."),
    relegion: Yup.string().required("This is a required field."),
    casteCategory: Yup.string().required("This is a required field."),
    birthState: Yup.string().required("This is a required field."),
    birthDistrictSurname: Yup.string().required("This is a required field."),
    birthPlace: Yup.string().required("This is a required field."),
    aadhar: Yup.string().required("This is a required field."),
    voterId: Yup.string().required("This is a required field."),
    pan: Yup.string().required("This is a required field."),
    csd: Yup.string().required("This is a required field."),
    echs: Yup.string().required("This is a required field."),
    identificationMark1: Yup.string().required("This is a required field."),
    identificationMark2: Yup.string().required("This is a required field."),
  });

  const personalformik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      fatherName: "",
      motherName: "",
      relegion: "",
      casteCategory: "",
      birthState: "",
      birthDistrictSurname: "",
      birthPlace: "",
      aadhar: "",
      voterId: "",
      pan: "",
      csd: "",
      echs: "",
      identificationMark1: "",
      identificationMark2: "",
    },
    validationSchema: personalValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetPersonalDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      personalformik.values.fatherName = fetchESM.fatherName;
      personalformik.values.motherName = fetchESM.motherName;
      personalformik.values.relegion = fetchESM.relegion;
      personalformik.values.casteCategory = fetchESM.casteCategory;
      personalformik.values.birthState = fetchESM.birthState;
      personalformik.values.birthDistrictSurname =
        fetchESM.birthDistrictSurname;
      personalformik.values.birthPlace = fetchESM.birthPlace;
      personalformik.values.aadhar = fetchESM.aadhar;
      personalformik.values.voterId = fetchESM.voterId;
      personalformik.values.pan = fetchESM.pan;
      personalformik.values.csd = fetchESM.csd;
      personalformik.values.echs = fetchESM.echs;
      personalformik.values.identificationMark1 = fetchESM.identificationMark1;
      personalformik.values.identificationMark2 = fetchESM.identificationMark2;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Father's name",
      placeholder: "Enter your father's name",
      name: "fatherName",
      type: "text",
      class: "col-6",
      formik: personalformik,
      autoFocus: true,
    },
    {
      label: "Mother's name",
      placeholder: "Enter your mother's name",
      name: "motherName",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Religion",
      placeholder: "Select your religion",
      name: "relegion",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Caste",
      name: "casteCategory",
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
      formik: personalformik,
    },
    {
      label: "Birth state",
      name: "birthState",
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
      formik: personalformik,
    },
    {
      label: "Birth district",
      placeholder: "Enter the district you were born in",
      name: "birthDistrictSurname",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Place of birth",
      placeholder: "Enter your place of birth",
      name: "birthPlace",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Aadhar",
      placeholder: "Enter your Aadhar number",
      name: "aadhar",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Voter ID",
      placeholder: "Enter your Voter ID",
      name: "voterId",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "PAN",
      placeholder: "Enter your PAN",
      name: "pan",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "CSD number",
      placeholder: "Enter your CSD number",
      name: "csd",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "ECHS number",
      placeholder: "Enter your ECHS number",
      name: "echs",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Identification mark 1",
      placeholder: "Enter your identification mark 1",
      name: "identificationMark1",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Identification mark 2",
      placeholder: "Enter your identification mark 2",
      name: "identificationMark2",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(personalformik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("PersonalDetails", personalformik.values);
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

export default PersonalDetails;
