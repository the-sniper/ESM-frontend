import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import moment from "moment";

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
    isPensioner: Yup.string().required("This is a required field."),
    ppoNumber: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    pensionSanctioned: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    presentPension: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    isSanctionedDisabilityPension: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    disabilityPension: Yup.number().when(
      ["isPensioner", "isSanctionedDisabilityPension"],
      {
        is: (a, b) => a == "true" && b == "true",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    disabilityPercentage: Yup.number().when(
      ["isPensioner", "isSanctionedDisabilityPension"],
      {
        is: (a, b) => a == "true" && b == "true",
        then: () => Yup.string().required("This is a required field."),
      }
    ),
    pensionAccountNumber: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    bankName: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    branch: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
    ifsc: Yup.string().when("isPensioner", {
      is: "true",
      then: () => Yup.string().required("This is a required field."),
    }),
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
      isPensioner: "false",
      ppoNumber: "",
      pensionSanctioned: "",
      presentPension: "",
      isSanctionedDisabilityPension: "false",
      disabilityPension: 0,
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
  const [serviceJoiningDate, setServiceJoiningDate] = useState(null);
  const [pensionFormData, setPensionFormData] = useState({});
  console.log(pensionformik, "pensionformik");

  useEffect(() => {
    getESM("GetPensionDetails", "pensionForm");
    getESM("GetServiceDetails", "serviceForm");
  }, []);

  useEffect(() => {
    if (fetchESM.from === "serviceForm") {
      setServiceJoiningDate(fetchESM?.data?.enrollDate);
    } else if (fetchESM.from === "pensionForm") {
      setPensionFormData(fetchESM?.data);
    }
  }, [fetchESM]);

  console.log(fetchESM, "fetchESMCheck");
  useEffect(() => {
    if (pensionFormData) {
      pensionformik.values.unitLastServed = pensionFormData.unitLastServed;
      pensionformik.values.dischargeDate = pensionFormData.dischargeDate;
      pensionformik.values.dischargeReason = pensionFormData.dischargeReason;
      pensionformik.values.dischargeMedicalCategory =
        pensionFormData.dischargeMedicalCategory;
      pensionformik.values.dischargeCharacter =
        pensionFormData.dischargeCharacter;
      pensionformik.values.dischargeBookNumber =
        pensionFormData.dischargeBookNumber;
      pensionformik.values.isPensioner = pensionFormData.isPensioner;
      pensionformik.values.ppoNumber = pensionFormData.ppoNumber;
      pensionformik.values.pensionSanctioned =
        pensionFormData.pensionSanctioned;
      pensionformik.values.presentPension = pensionFormData.presentPension;
      pensionformik.values.isSanctionedDisabilityPension =
        pensionFormData.isSanctionedDisabilityPension;
      pensionformik.values.disabilityPension =
        pensionFormData.disabilityPension;
      pensionformik.values.disabilityPercentage =
        pensionFormData.disabilityPercentage;
      pensionformik.values.pensionAccountNumber =
        pensionFormData.pensionAccountNumber;
      pensionformik.values.bankName = pensionFormData.bankName;
      pensionformik.values.branch = pensionFormData.branch;
      pensionformik.values.ifsc = pensionFormData.ifsc;

      setReload(!reload);
    }
  }, [pensionFormData]);

  const formValues = [
    {
      label: "Unit last served",
      placeholder: "Enter the unit last served",
      name: "unitLastServed",
      type: "text",
      class: "col-6",
      autoFocus: false,
      formik: pensionformik,
    },
    {
      label: "Date of discharge",
      placeholder: "Enter your date of discharge",
      name: "dischargeDate",
      type: "date",
      class: "col-6",
      minDate: moment(serviceJoiningDate, "DD-MM-YYYY").format("DD-MM-YYYY"),

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
          id: "true",
        },
        {
          show: "No",
          id: "false",
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
      class: `col-6 ${
        pensionformik?.values?.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Pension sanctioned",
      placeholder: "Enter the pension sanctioned",
      name: "pensionSanctioned",
      type: "number",
      class: `col-6 ${
        pensionformik?.values?.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Present pension",
      placeholder: "Enter the present pension",
      name: "presentPension",
      type: "number",
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Disability pension sanctioned",
      name: "isSanctionedDisabilityPension",
      type: "radio",
      options: [
        {
          show: "Yes",
          id: true,
        },
        {
          show: "No",
          id: false,
        },
      ],
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Disability pension",
      placeholder: "Enter the disability pension",
      name: "disabilityPension",
      type: "number",
      class: `col-3 ${
        pensionformik?.values.isPensioner == "true" &&
        pensionformik?.values.isSanctionedDisabilityPension == "true"
          ? ""
          : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Disability percentage",
      placeholder: "Enter the disability percentage",
      name: "disabilityPercentage",
      type: "number",
      class: `col-3 ${
        pensionformik?.values.isPensioner == "true" &&
        pensionformik?.values.isSanctionedDisabilityPension == "true"
          ? ""
          : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Pension account number",
      placeholder: "Enter the pension account number",
      name: "pensionAccountNumber",
      type: "number",
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Bank name",
      placeholder: "Enter your bank name",
      name: "bankName",
      type: "text",
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Bank branch",
      placeholder: "Enter your bank branch",
      name: "branch",
      type: "text",
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
    {
      label: "Bank IFSC",
      placeholder: "Enter your bank IFSC",
      name: "ifsc",
      type: "text",
      class: `col-6 ${
        pensionformik?.values.isPensioner == "true" ? "" : "d-none"
      }`,
      formik: pensionformik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(pensionformik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      pensionformik.handleSubmit();
    } else {
      registerESM("PensionDetails", pensionformik.values, "pensionForm");
    }
  };

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "pensionForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Service Details Submitted Successfully!", "success");
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

export default PensionDetails;
