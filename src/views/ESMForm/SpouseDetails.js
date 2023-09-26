import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import moment from "moment";

function SpouseDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const [spouseFormData, setSpouseFormData] = useState({});
  const { setAlert } = alertContext;

  const spouseValidationArray = Yup.object({
    maritalStatus: Yup.string().required("This is a required field."),
    marriageDate: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseName: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseRelationship: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseDob: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseIdentificationMark: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseQualification: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseEmploymentStatus: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseAadhar: Yup.string().when("maritalStatus", {
      is: "married",
      then: () =>
        Yup.string()
          .required("This is a required field.")
          .matches(/^\d{12}$/, {
            message: "Aadhar number must be a 12-digit numeric value",
          }),
    }),
    spouseVoterId: Yup.string().when("maritalStatus", {
      is: "married",
      then: () =>
        Yup.string()
          .required("This is a required field.")
          .matches(/^[A-Z]{3}[0-9]{7}$/, {
            message:
              "Voter ID must be in the format AAA1234567 (3 uppercase letters followed by 7 digits).",
          }),
    }),
    spousePan: Yup.string().when("maritalStatus", {
      is: "married",
      then: () =>
        Yup.string()
          .required("This is a required field.")
          .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
            message:
              "PAN must be in the format ABCDE1234F (5 uppercase letters, 4 digits, and 1 uppercase letter).",
          }),
    }),
    spouseCsd: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseEchs: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    spouseDepartment: Yup.string().when(
      ["maritalStatus", "spouseEmploymentStatus"],
      {
        is: (a, b) => a == "married" && b == "employed",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    spouseSector: Yup.string().when(
      ["maritalStatus", "spouseEmploymentStatus"],
      {
        is: (a, b) => a == "married" && b == "employed",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    spousePresentDesignation: Yup.string().when(
      ["maritalStatus", "spouseEmploymentStatus"],
      {
        is: (a, b) => a == "married" && b == "employed",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    spouseMonthlyIncome: Yup.string().when(
      ["maritalStatus", "spouseEmploymentStatus"],
      {
        is: (a, b) => a == "married" && b == "employed",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    spouseOfficialNumber: Yup.string().when(
      ["maritalStatus", "spouseEmploymentStatus"],
      {
        is: (a, b) => a == "married" && b == "employed",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    spouseDesignationOnRetirement: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string(),
    }),
    spouseRetirementDate: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string(),
    }),
    spouseCivilPpoNumber: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string(),
    }),
    divorceDate: Yup.string().when("maritalStatus", {
      is: "separated",
      then: () => Yup.string().required("This is a required field."),
    }),
    courtOrder: Yup.string().when("maritalStatus", {
      is: "separated",
      then: () => Yup.string().required("This is a required field."),
    }),
    isAlive: Yup.string().when("maritalStatus", {
      is: "married",
      then: () => Yup.string().required("This is a required field."),
    }),
    deathDate: Yup.string().when("isAlive", {
      is: "2",
      then: () => Yup.string().required("This is a required field."),
    }),
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
      isAlive: "",
      deathDate: "",
    },
    validationSchema: spouseValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetSpouseDetails", "spouseForm");
  }, []);

  useEffect(() => {
    if (fetchESM.from === "spouseForm") {
      setSpouseFormData(fetchESM?.data?.data);
    }
  }, [fetchESM]);

  useEffect(() => {
    if (spouseFormData) {
      spouseFormik.values.maritalStatus = spouseFormData?.maritalStatus;
      spouseFormik.values.marriageDate = spouseFormData?.marriageDate;
      spouseFormik.values.spouseName = spouseFormData?.spouseName;
      spouseFormik.values.spouseRelationship =
        spouseFormData?.spouseRelationship;
      spouseFormik.values.spouseDob = spouseFormData?.spouseDob;
      spouseFormik.values.spouseIdentificationMark =
        spouseFormData?.spouseIdentificationMark;
      spouseFormik.values.spouseQualification =
        spouseFormData?.spouseQualification;
      spouseFormik.values.spouseEmploymentStatus =
        spouseFormData?.spouseEmploymentStatus;
      spouseFormik.values.spouseAadhar = spouseFormData?.spouseAadhar;
      spouseFormik.values.spouseVoterId = spouseFormData?.spouseVoterId;
      spouseFormik.values.spousePan = spouseFormData?.spousePan;
      spouseFormik.values.spouseCsd = spouseFormData?.spouseCsd;
      spouseFormik.values.spouseEchs = spouseFormData?.spouseEchs;
      spouseFormik.values.spouseDepartment = spouseFormData?.spouseDepartment;
      spouseFormik.values.spouseSector = spouseFormData?.spouseSector;
      spouseFormik.values.spousePresentDesignation =
        spouseFormData?.spousePresentDesignation;
      spouseFormik.values.spouseMonthlyIncome =
        spouseFormData?.spouseMonthlyIncome;
      spouseFormik.values.spouseOfficialNumber =
        spouseFormData?.spouseOfficialNumber;
      spouseFormik.values.spouseDesignationOnRetirement =
        spouseFormData?.spouseDesignationOnRetirement;
      spouseFormik.values.spouseRetirementDate =
        spouseFormData?.spouseRetirementDate;
      spouseFormik.values.spouseCivilPpoNumber =
        spouseFormData?.spouseCivilPpoNumber;
      spouseFormik.values.divorceDate = spouseFormData?.divorceDate;
      spouseFormik.values.courtOrder = spouseFormData?.courtOrder;
      spouseFormik.values.deathDate = spouseFormData?.deathDate;
      spouseFormik.values.isAlive = spouseFormData?.isAlive;
      setReload(!reload);
    }
  }, [spouseFormData]);

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
      label: "Spouse's date of birth",
      name: "spouseDob",
      type: "date",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      maxDate: moment(new Date(), "DD-MM-YYYY"),
      formik: spouseFormik,
    },
    {
      label: "Date of marriage",
      placeholder: "Enter your date of marriage",
      name: "marriageDate",
      type: "date",
      minDate: moment(spouseFormik.values.spouseDob, "DD-MM-YYYY"),
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's name",
      placeholder: "Enter your spouse's name",
      name: "spouseName",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
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
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },

    {
      label: "Spouse's identification mark",
      placeholder: "Enter spouse's identification mark",
      name: "spouseIdentificationMark",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
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
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },

    {
      label: "Spouse's Aadhar number",
      placeholder: "Enter spouse's Aadhar number",
      name: "spouseAadhar",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's Voter ID",
      placeholder: "Enter spouse's Voter ID",
      name: "spouseVoterId",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's PAN",
      placeholder: "Enter spouse's PAN",
      name: "spousePan",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's CSD number",
      placeholder: "Enter spouse's CSD number",
      name: "spouseCsd",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's ECHS number",
      placeholder: "Enter spouse's ECHS number",
      name: "spouseEchs",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
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
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's Employment Department",
      placeholder: "Enter spouse's employment department",
      name: "spouseDepartment",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
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
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's present designation",
      placeholder: "Enter spouse's present designation",
      name: "spousePresentDesignation",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's monthly income",
      placeholder: "Enter spouse's monthly income",
      name: "spouseMonthlyIncome",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's official number",
      placeholder: "Enter spouse's official number",
      name: "spouseOfficialNumber",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's designation on retirement",
      placeholder: "Enter spouse's designation on retirement",
      name: "spouseDesignationOnRetirement",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's retirement date",
      placeholder: "Enter spouse's retirement date",
      name: "spouseRetirementDate",
      type: "date",
      minDate: moment(spouseFormik.values.spouseDob, "DD-MM-YYYY"),
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Spouse's PPO number",
      placeholder: "Enter spouse's PPO number",
      name: "spouseCivilPpoNumber",
      type: "text",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.spouseEmploymentStatus == "employed"
          ? ""
          : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Divorce date",
      placeholder: "Enter divorce date",
      name: "divorceDate",
      type: "date",
      minDate: moment(spouseFormik.values.marriageDate, "DD-MM-YYYY"),
      class: `col-sm-3 col-12 ${
        spouseFormik.values.maritalStatus == "separated" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Court order",
      placeholder: "Enter court order",
      name: "courtOrder",
      type: "date",
      minDate: moment(spouseFormik.values.marriageDate, "DD-MM-YYYY"),
      class: `col-sm-3 col-12 ${
        spouseFormik.values.maritalStatus == "separated" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Is Spouse Alive?",
      name: "isAlive",
      type: "select",
      options: [
        {
          show: "Yes",
          value: "1",
        },
        {
          show: "No",
          value: "2",
        },
      ],
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" ? "" : "d-none"
      }`,
      formik: spouseFormik,
    },
    {
      label: "Date of death",
      placeholder: "Enter date of death",
      name: "deathDate",
      type: "date",
      class: `col-6 ${
        spouseFormik.values.maritalStatus == "married" &&
        spouseFormik.values.isAlive == "2"
          ? ""
          : "d-none"
      }`,
      minDate: moment(spouseFormik.values.spouseDob, "DD-MM-YYYY"),
      maxDate: moment(new Date(), "DD-MM-YYYY"),
      formik: spouseFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(spouseFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      spouseFormik.handleSubmit();
    } else {
      registerESM(
        spouseFormData?.submittedBy == null ? "post" : "put",
        "SpouseDetails",
        spouseFormik.values,
        "spouseForm"
      );
    }
  };

  console.log(spouseFormik, "spouseFormik");

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "spouseForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Spouse Details Submitted Successfully!", "success");
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

export default SpouseDetails;
