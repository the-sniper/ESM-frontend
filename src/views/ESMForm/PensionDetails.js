import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function PensionDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
    serviceName: Yup.string(),
    unitLastServed: Yup.string().required("This is a required field."),
    dischargeDate: Yup.string().required("This is a required field."),
    dischargeReason: Yup.string().required("This is a required field."),
    dischargeMedicalCategory: Yup.string().required(
      "This is a required field."
    ),
    dischargeCharacter: Yup.string().required("This is a required field."),
    dischargeBookNumber: Yup.string().required("This is a required field."),
    isPensioner: Yup.boolean().required("This is a required field."),
    ppoNumber: Yup.string().required("This is a required field."),
    pensionSanctioned: Yup.string().required("This is a required field."),
    presentPension: Yup.string().required("This is a required field."),
    isSanctionedDisabilityPension: Yup.boolean().required(
      "This is a required field."
    ),
    disabilityPension: Yup.string().required("This is a required field."),
    disabilityPercentage: 0,
    pensionAccountNumber: Yup.string().required("This is a required field."),
    bankName: Yup.string().required("This is a required field."),
    branch: Yup.string().required("This is a required field."),
    ifsc: Yup.string().required("This is a required field."),
  });

  const formik = useFormik({
    initialValues: {
      serviceNumber: "102030",
      unitLastServed: "",
      dischargeDate: "",
      dischargeReason: "",
      dischargeMedicalCategory: "",
      dischargeCharacter: "",
      dischargeBookNumber: "",
      isPensioner: false,
      ppoNumber: "",
      pensionSanctioned: "",
      presentPension: "",
      isSanctionedDisabilityPension: false,
      disabilityPension: "",
      disabilityPercentage: 0,
      pensionAccountNumber: "",
      bankName: "",
      branch: "",
      ifsc: "",
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM("pensionDetails", values);
      console.log(values, "ESMValues");
    },
  });

  const formValues = [
    {
      label: "Unit last served",
      placeholder: "Enter the unit last served",
      name: "unitLastServed",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Date of discharge",
      placeholder: "Enter your date of discharge",
      name: "dischargeDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Reason for discharge",
      placeholder: "Enter the reason for discharge",
      name: "dischargeReason",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Discharge medical category",
      name: "dischargeMedicalCategory",
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
      label: "Discharge character",
      name: "dischargeCharacter",
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
      label: "Discharge book number",
      placeholder: "Enter discharge book number",
      name: "dischargeBookNumber",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Is pensioner",
      name: "isPensioner",
      type: "radio",
      options: [
        {
          show: "Yes",
          value: true,
        },
        {
          show: "No",
          value: false,
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "PPO number",
      placeholder: "Enter your PPO number",
      name: "ppoNumber",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Pension sanctioned",
      placeholder: "Enter the pension sanctioned",
      name: "pensionSanctioned",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Present pension",
      placeholder: "Enter the present pension",
      name: "presentPension",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Disability pension sanctioned",
      name: "isSanctionedDisabilityPension",
      type: "radio",
      options: [
        {
          show: "Yes",
          value: true,
        },
        {
          show: "No",
          value: false,
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Disability pension",
      placeholder: "Enter the disability pension",
      name: "disabilityPension",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Disability percentage",
      placeholder: "Enter the disability percentage",
      name: "disabilityPercentage",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Pension account number",
      placeholder: "Enter the pension account number",
      name: "pensionAccountNumber",
      type: "number",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Bank name",
      placeholder: "Enter your bank name",
      name: "bankName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Bank branch",
      placeholder: "Enter your bank branch",
      name: "branch",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Bank IFSC",
      placeholder: "Enter your bank IFSC",
      name: "ifsc",
      type: "text",
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

export default PensionDetails;
