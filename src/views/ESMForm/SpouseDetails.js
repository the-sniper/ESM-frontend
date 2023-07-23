import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function SpouseDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const spouseValidationArray = Yup.object({
    serviceName: Yup.string(),
    maritalStatus: Yup.string().required("This is a required field."),
    marriageDate: Yup.string().required("This is a required field."),
    spouseName: Yup.string().required("This is a required field."),
    spouseRelationship: Yup.string().required("This is a required field."),
    spouseDob: Yup.string().required("This is a required field."),
    spouseIdentificationMark: Yup.string().required(
      "This is a required field."
    ),
    spouseQualification: Yup.string().required("This is a required field."),
    spouseEmploymentStatus: Yup.string().required("This is a required field."),
    spouseAadhar: Yup.string().required("This is a required field."),
    spouseVoterId: Yup.string().required("This is a required field."),
    spousePan: Yup.string().required("This is a required field."),
    spouseCsd: Yup.string().required("This is a required field."),
    spouseEchs: Yup.string().required("This is a required field."),
    spouseDepartment: Yup.string().required("This is a required field."),
    spouseSector: Yup.string().required("This is a required field."),
    spousePresentDesignation: Yup.string().required(
      "This is a required field."
    ),
    spouseMonthlyIncome: Yup.string().required("This is a required field."),
    spouseOfficialNumber: Yup.string().required("This is a required field."),
    spouseDesignationOnRetirement: Yup.string().required(
      "This is a required field."
    ),
    spouseRetirementDate: Yup.string().required("This is a required field."),
    spouseCivilPpoNumber: Yup.string().required("This is a required field."),
    divorceDate: Yup.string().required("This is a required field."),
    courtOrder: Yup.string().required("This is a required field."),
    deathDate: Yup.string().required("This is a required field."),
  });

  const spouseFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      maritalStatus: "",
      marriageDate: "",
      spouseName: "",
      spouseRelationship: "",
      spouseDob: "",
      spouseIdentificationMark: "",
      spouseQualification: "",
      spouseEmploymentStatus: "",
      spouseAadhar: "",
      spouseVoterId: "",
      spousePan: "",
      spouseCsd: "",
      spouseEchs: "",
      spouseDepartment: "",
      spouseSector: "",
      spousePresentDesignation: "",
      spouseMonthlyIncome: "",
      spouseOfficialNumber: "",
      spouseDesignationOnRetirement: "",
      spouseRetirementDate: "",
      spouseCivilPpoNumber: "",
      divorceDate: "",
      courtOrder: "",
      deathDate: "",
    },
    validationSchema: spouseValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetSpouseDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      spouseFormik.values.maritalStatus = fetchESM.maritalStatus;
      spouseFormik.values.marriageDate = fetchESM.marriageDate;
      spouseFormik.values.spouseName = fetchESM.spouseName;
      spouseFormik.values.spouseRelationship = fetchESM.spouseRelationship;
      spouseFormik.values.spouseDob = fetchESM.spouseDob;
      spouseFormik.values.spouseIdentificationMark =
        fetchESM.spouseIdentificationMark;
      spouseFormik.values.spouseQualification = fetchESM.spouseQualification;
      spouseFormik.values.spouseEmploymentStatus =
        fetchESM.spouseEmploymentStatus;
      spouseFormik.values.spouseAadhar = fetchESM.spouseAadhar;
      spouseFormik.values.spouseVoterId = fetchESM.spouseVoterId;
      spouseFormik.values.spousePan = fetchESM.spousePan;
      spouseFormik.values.spouseCsd = fetchESM.spouseCsd;
      spouseFormik.values.spouseEchs = fetchESM.spouseEchs;
      spouseFormik.values.spouseDepartment = fetchESM.spouseDepartment;
      spouseFormik.values.spouseSector = fetchESM.spouseSector;
      spouseFormik.values.spousePresentDesignation =
        fetchESM.spousePresentDesignation;
      spouseFormik.values.spouseMonthlyIncome = fetchESM.spouseMonthlyIncome;
      spouseFormik.values.spouseOfficialNumber = fetchESM.spouseOfficialNumber;
      spouseFormik.values.spouseDesignationOnRetirement =
        fetchESM.spouseDesignationOnRetirement;
      spouseFormik.values.spouseRetirementDate = fetchESM.spouseRetirementDate;
      spouseFormik.values.spouseCivilPpoNumber = fetchESM.spouseCivilPpoNumber;
      spouseFormik.values.divorceDate = fetchESM.divorceDate;
      spouseFormik.values.courtOrder = fetchESM.courtOrder;
      spouseFormik.values.deathDate = fetchESM.deathDate;
      spouseFormik.values.identificationMark2 = fetchESM.identificationMark2;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Marital status",
      name: "maritalStatus",
      type: "select",
      class: "col-6",
      options: [
        {
          show: "Married",
          value: "married",
        },
        {
          show: "Unmarried",
          value: "unmarried",
        },
        {
          show: "Separated",
          value: "separated",
        },
      ],
      formik: spouseFormik,
    },
    {
      label: "Date of marriage",
      placeholder: "Enter your date of marriage",
      name: "marriageDate",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's name",
      placeholder: "Enter your spouse's name",
      name: "spouseName",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },

    {
      label: "Spouse relationship",
      name: "spouseRelationship",
      type: "select",
      options: [
        {
          show: "Husband",
          value: "husband",
        },
        {
          show: "Wife",
          value: "wife",
        },
      ],
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's date of birth",
      name: "spouseDob",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's identification mark",
      placeholder: "Enter spouse's identification mark",
      name: "spouseIdentificationMark",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's qualification",
      name: "spouseQualification",
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
      formik: spouseFormik,
    },

    {
      label: "Spouse's Aadhar number",
      placeholder: "Enter spouse's Aadhar number",
      name: "spouseAadhar",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's Voter ID",
      placeholder: "Enter spouse's Voter ID",
      name: "spouseVoterId",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's PAN",
      placeholder: "Enter spouse's PAN",
      name: "spousePan",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's CSD number",
      placeholder: "Enter spouse's CSD number",
      name: "spouseCsd",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's ECHS number",
      placeholder: "Enter spouse's ECHS number",
      name: "spouseEchs",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's ECHS number",
      placeholder: "Enter spouse's ECHS number",
      name: "spouseDepartment",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's employment status",
      name: "spouseEmploymentStatus",
      type: "select",
      options: [
        {
          show: "Employed",
          value: "employed",
        },
        {
          show: "Un-employed",
          value: "unemployed",
        },
      ],
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's employment sector",
      name: "spouseSector",
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
      formik: spouseFormik,
    },
    {
      label: "Spouse's present designation",
      placeholder: "Enter spouse's present designation",
      name: "spousePresentDesignation",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's monthly income",
      placeholder: "Enter spouse's monthly income",
      name: "spouseMonthlyIncome",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's official number",
      placeholder: "Enter spouse's official number",
      name: "spouseOfficialNumber",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's designation on retirement",
      placeholder: "Enter spouse's designation on retirement",
      name: "spouseDesignationOnRetirement",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's retirement date",
      placeholder: "Enter spouse's retirement date",
      name: "spouseRetirementDate",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Spouse's PPO number",
      placeholder: "Enter spouse's PPO number",
      name: "spouseCivilPpoNumber",
      type: "text",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Divorce date",
      placeholder: "Enter divorce date",
      name: "divorceDate",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Court order",
      placeholder: "Enter court order",
      name: "courtOrder",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
    {
      label: "Date of death",
      placeholder: "Enter date of death",
      name: "deathDate",
      type: "date",
      class: "col-6",
      formik: spouseFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(spouseFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("SpouseDetails", spouseFormik.values);
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

export default SpouseDetails;
