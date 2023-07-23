import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function PensionDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const pensionValidationArray = Yup.object({
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

  const pensionformik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
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
    validationSchema: pensionValidationArray,
    onSubmit: (values) => {
      // registerESM("PensionDetails", values);
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetPensionDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      pensionformik.values.unitLastServed = fetchESM.fetchESM;
      pensionformik.values.dischargeDate = fetchESM.dischargeDate;
      pensionformik.values.dischargeReason = fetchESM.dischargeReason;
      pensionformik.values.dischargeMedicalCategory =
        fetchESM.dischargeMedicalCategory;
      pensionformik.values.dischargeCharacter = fetchESM.dischargeCharacter;
      pensionformik.values.dischargeBookNumber = fetchESM.dischargeBookNumber;
      pensionformik.values.isPensioner = fetchESM.isPensioner;
      pensionformik.values.ppoNumber = fetchESM.ppoNumber;
      pensionformik.values.pensionSanctioned = fetchESM.pensionSanctioned;
      pensionformik.values.presentPension = fetchESM.presentPension;
      pensionformik.values.isSanctionedDisabilityPension =
        fetchESM.isSanctionedDisabilityPension;
      pensionformik.values.disabilityPension = fetchESM.disabilityPension;
      pensionformik.values.disabilityPercentage = fetchESM.disabilityPercentage;
      pensionformik.values.pensionAccountNumber = fetchESM.pensionAccountNumber;
      pensionformik.values.bankName = fetchESM.bankName;
      pensionformik.values.branch = fetchESM.branch;
      pensionformik.values.ifsc = fetchESM.ifsc;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Unit last served",
      placeholder: "Enter the unit last served",
      name: "unitLastServed",
      type: "text",
      class: "col-6",
      autoFocus: true,
      formik: pensionformik,
    },
    {
      label: "Date of discharge",
      placeholder: "Enter your date of discharge",
      name: "dischargeDate",
      type: "date",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Reason for discharge",
      placeholder: "Enter the reason for discharge",
      name: "dischargeReason",
      type: "text",
      class: "col-6",
      formik: pensionformik,
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
      formik: pensionformik,
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
      formik: pensionformik,
    },
    {
      label: "Discharge book number",
      placeholder: "Enter discharge book number",
      name: "dischargeBookNumber",
      type: "text",
      class: "col-6",
      formik: pensionformik,
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
      formik: pensionformik,
    },
    {
      label: "PPO number",
      placeholder: "Enter your PPO number",
      name: "ppoNumber",
      type: "text",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Pension sanctioned",
      placeholder: "Enter the pension sanctioned",
      name: "pensionSanctioned",
      type: "number",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Present pension",
      placeholder: "Enter the present pension",
      name: "presentPension",
      type: "number",
      class: "col-6",
      formik: pensionformik,
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
      formik: pensionformik,
    },
    {
      label: "Disability pension",
      placeholder: "Enter the disability pension",
      name: "disabilityPension",
      type: "number",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Disability percentage",
      placeholder: "Enter the disability percentage",
      name: "disabilityPercentage",
      type: "number",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Pension account number",
      placeholder: "Enter the pension account number",
      name: "pensionAccountNumber",
      type: "number",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Bank name",
      placeholder: "Enter your bank name",
      name: "bankName",
      type: "text",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Bank branch",
      placeholder: "Enter your bank branch",
      name: "branch",
      type: "text",
      class: "col-6",
      formik: pensionformik,
    },
    {
      label: "Bank IFSC",
      placeholder: "Enter your bank IFSC",
      name: "ifsc",
      type: "text",
      class: "col-6",
      formik: pensionformik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(pensionformik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("PensionDetails", pensionformik.values);
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

export default PensionDetails;
