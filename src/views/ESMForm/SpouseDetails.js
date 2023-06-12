import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function SpouseDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
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

  const formik = useFormik({
    initialValues: {
      serviceNumber: "102030",
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
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM("spouseDetails", values);
      console.log(values, "ESMValues");
    },
  });

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
      formik: formik,
    },
    {
      label: "Date of marriage",
      placeholder: "Enter your date of marriage",
      name: "marriageDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's name",
      placeholder: "Enter your spouse's name",
      name: "spouseName",
      type: "text",
      class: "col-6",
      formik: formik,
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
      formik: formik,
    },
    {
      label: "Spouse's date of birth",
      name: "spouseDob",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's identification mark",
      placeholder: "Enter spouse's identification mark",
      name: "spouseIdentificationMark",
      type: "date",
      class: "col-6",
      formik: formik,
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
      formik: formik,
    },

    {
      label: "Spouse's Aadhar number",
      placeholder: "Enter spouse's Aadhar number",
      name: "spouseAadhar",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's Voter ID",
      placeholder: "Enter spouse's Voter ID",
      name: "spouseVoterId",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's PAN",
      placeholder: "Enter spouse's PAN",
      name: "spousePan",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's CSD number",
      placeholder: "Enter spouse's CSD number",
      name: "spouseCsd",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's ECHS number",
      placeholder: "Enter spouse's ECHS number",
      name: "spouseEchs",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's ECHS number",
      placeholder: "Enter spouse's ECHS number",
      name: "spouseDepartment",
      type: "text",
      class: "col-6",
      formik: formik,
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
      formik: formik,
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
      formik: formik,
    },
    {
      label: "Spouse's present designation",
      placeholder: "Enter spouse's present designation",
      name: "spousePresentDesignation",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's monthly income",
      placeholder: "Enter spouse's monthly income",
      name: "spouseMonthlyIncome",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's official number",
      placeholder: "Enter spouse's official number",
      name: "spouseOfficialNumber",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's designation on retirement",
      placeholder: "Enter spouse's designation on retirement",
      name: "spouseDesignationOnRetirement",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's retirement date",
      placeholder: "Enter spouse's retirement date",
      name: "spouseRetirementDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Spouse's PPO number",
      placeholder: "Enter spouse's PPO number",
      name: "spouseCivilPpoNumber",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Divorce date",
      placeholder: "Enter divorce date",
      name: "divorceDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Court order",
      placeholder: "Enter court order",
      name: "courtOrder",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Date of death",
      placeholder: "Enter date of death",
      name: "deathDate",
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

export default SpouseDetails;
