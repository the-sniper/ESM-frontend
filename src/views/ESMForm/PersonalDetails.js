import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import { stateDistricts } from "../../utils/stateDistricts";
import { religionCastes } from "../../utils/commonExports";

function PersonalDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const [personalFormData, setPersonalFormData] = useState({});

  const { setAlert } = alertContext;

  const personalValidationArray = Yup.object({
    serviceName: Yup.string(),
    fatherName: Yup.string()
      .required("This field is required!")
      .matches(/^[A-Za-z\s]+$/, {
        message: "This field should only contain alphabetic characters.",
      }),
    motherName: Yup.string()
      .required("This field is required!")
      .matches(/^[A-Za-z\s]+$/, {
        message: "This field should only contain alphabetic characters.",
      }),
    relegion: Yup.string().required("This is a required field."),
    casteCategory: Yup.string().required("This is a required field."),
    birthState: Yup.string().required("This is a required field."),
    birthDistrictSurname: Yup.string().required("This is a required field."),
    birthPlace: Yup.string()
      .required("This field is required!")
      .matches(/^[A-Za-z\s]+$/, {
        message: "This field should only contain alphabetic characters.",
      }),
    aadhar: Yup.string()
      .required("This is a required field.")
      .matches(/^\d{12}$/, {
        message: "Aadhar number must be a 12-digit numeric value",
      }),

    voterId: Yup.string()
      .required("This is a required field.")
      .matches(/^[A-Z]{3}[0-9]{7}$/, {
        message:
          "Voter ID must be in the format AAA1234567 (3 uppercase letters followed by 7 digits).",
      }),
    pan: Yup.string()
      .required("This is a required field.")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
        message:
          "PAN must be in the format ABCDE1234F (5 uppercase letters, 4 digits, and 1 uppercase letter).",
      }),
    csd: Yup.string().required("This is a required field."),
    echs: Yup.string().required("This is a required field."),
    identificationMark1: Yup.string().required("This is a required field."),
    identificationMark2: Yup.string(),
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
    getESM("GetPersonalDetails", "personalForm");
  }, []);

  useEffect(() => {
    if (fetchESM.from === "personalForm") {
      setPersonalFormData(fetchESM?.data?.data);
    }
  }, [fetchESM]);

  useEffect(() => {
    if (personalFormData) {
      personalformik.values.fatherName = personalFormData?.fatherName;
      personalformik.values.motherName = personalFormData?.motherName;
      personalformik.values.relegion = personalFormData?.relegion;
      personalformik.values.casteCategory = personalFormData?.casteCategory;
      personalformik.values.birthState = personalFormData?.birthState;
      personalformik.values.birthDistrictSurname =
        personalFormData?.birthDistrictSurname;
      personalformik.values.birthPlace = personalFormData?.birthPlace;
      personalformik.values.aadhar = personalFormData?.aadhar;
      personalformik.values.voterId = personalFormData?.voterId;
      personalformik.values.pan = personalFormData?.pan;
      personalformik.values.csd = personalFormData?.csd;
      personalformik.values.echs = personalFormData?.echs;
      personalformik.values.identificationMark1 =
        personalFormData?.identificationMark1;
      personalformik.values.identificationMark2 =
        personalFormData?.identificationMark2;

      setReload(!reload);
    }
  }, [personalFormData]);

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
      type: "select",
      options: religionCastes.religions,
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Caste",
      name: "casteCategory",
      type: "select",
      options: religionCastes.castes[personalformik?.values?.relegion],
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Birth state",
      name: "birthState",
      type: "select",
      options: cleanDropdownData(stateDistricts, "name", "id"),
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Birth district",
      placeholder: "Enter the district you were born in",
      name: "birthDistrictSurname",
      type: "select",
      options: cleanDropdownData(
        stateDistricts[parseInt(personalformik.values.birthState, 10) - 1]
          ?.districts,
        "name",
        "id"
      ),
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
      personalformik.handleSubmit();
    } else {
      registerESM(
        personalFormData?.submittedBy == null ? "post" : "put",
        "PersonalDetails",
        personalformik.values,
        "personalForm"
      );
    }
  };
  console.log(responseStatus, "responseStatusCHeck2");

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "personalForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Personal Details Submitted Successfully!", "success");
          props.handleComplete();
          clearResponse();
        } else if (responseStatus.status === "ERROR") {
          setAlert(responseStatus.message, "error");
          clearResponse();
        }
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
