import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function PersonalDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
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

  const formik = useFormik({
    initialValues: {
      serviceNumber: "102030",
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
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM("personalDetails", values);
      console.log(values, "ESMValues");
    },
  });

  const formValues = [
    {
      label: "Father's name",
      placeholder: "Enter your father's name",
      name: "fatherName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Mother's name",
      placeholder: "Enter your mother's name",
      name: "motherName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Religion",
      placeholder: "Select your religion",
      name: "relegion",
      type: "text",
      class: "col-6",
      formik: formik,
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
      formik: formik,
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
      formik: formik,
    },
    {
      label: "Birth district",
      placeholder: "Enter the district you were born in",
      name: "birthDistrictSurname",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Place of birth",
      placeholder: "Enter your place of birth",
      name: "birthPlace",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Aadhar",
      placeholder: "Enter your Aadhar number",
      name: "aadhar",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Voter ID",
      placeholder: "Enter your Voter ID",
      name: "voterId",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "PAN",
      placeholder: "Enter your PAN",
      name: "pan",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "CSD number",
      placeholder: "Enter your CSD number",
      name: "csd",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "ECHS number",
      placeholder: "Enter your ECHS number",
      name: "echs",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Identification mark 1",
      placeholder: "Enter your identification mark 1",
      name: "identificationMark1",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Identification mark 2",
      placeholder: "Enter your identification mark 2",
      name: "identificationMark2",
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

export default PersonalDetails;
