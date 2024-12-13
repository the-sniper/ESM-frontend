import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import { religionCastes } from "../../utils/commonExports";
import CommonContext from "../../context/common/commonContext";
import AuthContext from "../../context/auth/authContext";

function PersonalDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);
  const commonContext = useContext(CommonContext);
  const authContext = useContext(AuthContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { getAllStates, allStates, getAllDistricts, allDistricts } =
    commonContext;
  const { user } = authContext;

  const [reload, setReload] = useState(false);
  const [personalFormData, setPersonalFormData] = useState({});

  const { setAlert } = alertContext;
  console.log(user, 'getUSER')

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
    aadhar: Yup.string().required("This is a required field."),

    voterId: Yup.string().required("This is a required field."),
    pan: Yup.string().required("This is a required field."),
    csd: Yup.string().required("This is a required field."),
    echs: Yup.string().required("This is a required field."),
    identificationMark1: Yup.string().required("This is a required field."),
    identificationMark2: Yup.string(),
    esmDateOfDeath: Yup.string(),
    esmCauseOfDeath: Yup.string(),
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
      esmDateOfDeath: "",
      esmCauseOfDeath: "",
    },
    validationSchema: personalValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetPersonalDetails", "personalForm");
    getAllStates();
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
      personalformik.values.esmDateOfDeath = user?.data?.esmDateOfDeath || "";
      personalformik.values.esmCauseOfDeath = user?.data?.esmCauseOfDeath || "";

      setReload(!reload);
    }
  }, [personalFormData]);

  useEffect(() => {
    if (personalformik.values.birthState) {
      getAllDistricts({ stateId: personalformik.values.birthState });
    }
  }, [personalformik.values.birthState]);

  console.log(allStates, personalformik.values.birthState, "birthState");

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
      label: "Caste Category",
      name: "casteCategory",
      type: "select",
      options: religionCastes.categories,
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Caste",
      name: "caste",
      type: "text",
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Birth state",
      name: "birthState",
      type: "select",
      options: cleanDropdownData(allStates, "name", "id"),
      class: "col-6",
      formik: personalformik,
    },
    {
      label: "Birth district",
      placeholder: "Enter the district you were born in",
      name: "birthDistrictSurname",
      type: "select",
      // options: cleanDropdownData(allDistricts, "districtName", "id"),
      options: cleanDropdownData(
        allDistricts,
        "districtName",
        "id",
        "stateId",
        personalformik?.values?.birthState
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
    {
      label: "ESM Date of Death",
      name: "esmDateOfDeath",
      type: "date",
      class: `col-sm-6 col-12 ${(user?.data?.regType === "WDW-N" || user?.data?.regType === "WDW-X") ? "" : "d-none"}`,
      formik: personalformik,
    },
    {
      label: "ESM Cause of Death",
      name: "esmCauseOfDeath",
      type: "text",
      class: `col-sm-6 col-12 ${(user?.data?.regType === "WDW-N" || user?.data?.regType === "WDW-X") ? "" : "d-none"}`,
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
  console.log(personalformik, "personalformik");

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
      <h1 className="esmTitle">ESM Personal Details</h1>

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
