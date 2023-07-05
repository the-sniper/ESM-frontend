import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function ContactDetails() {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
    serviceName: Yup.string(),
    pincode: Yup.string().required("This is a required field."),
    state: Yup.string().required("This is a required field."),
    district: Yup.string().required("This is a required field."),
    talukName: Yup.string().required("This is a required field."),
    cityVillage: Yup.string().required("This is a required field."),
    locality: Yup.string().required("This is a required field."),
    street: Yup.string().required("This is a required field."),
    houseName: Yup.string().required("This is a required field."),
    houseNumber: Yup.string().required("This is a required field."),
    policeStation: Yup.string().required("This is a required field."),
    permanentPincode: Yup.string().required("This is a required field."),
    permanentState: Yup.string().required("This is a required field."),
    permanentDistrict: Yup.string().required("This is a required field."),
    permanentTalukName: Yup.string().required("This is a required field."),
    permanentCityVillage: Yup.string().required("This is a required field."),
    permanentLocality: Yup.string().required("This is a required field."),
    permanentStreet: Yup.string().required("This is a required field."),
    permanentHouseName: Yup.string().required("This is a required field."),
    permanentHouseNumber: Yup.string().required("This is a required field."),
    permanentPoliceStation: Yup.string().required("This is a required field."),
    telephoneNumber: Yup.string().required("This is a required field."),
    sameAsPermanent: Yup.boolean().required("This is a required field."),
  });

  const formik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      pincode: "",
      state: "",
      district: "",
      talukName: "",
      cityVillage: "",
      locality: "",
      street: "",
      houseName: "",
      houseNumber: "",
      policeStation: "",

      permanentPincode: "",
      permanentState: "",
      permanentDistrict: "",
      permanentTalukName: "",
      permanentCityVillage: "",
      permanentLocality: "",
      permanentStreet: "",
      permanentHouseName: "",
      permanentHouseNumber: "",
      permanentPoliceStation: "",
      telephoneNumber: "",
      sameAsPermanent: false,
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      registerESM("ContactDetails", values);
      console.log(values, "ESMValues");
    },
  });

  const formValues = [
    {
      label: "House number",
      placeholder: "House number",
      name: "houseNumber",
      type: "text",
      class: "col-3",
      formik: formik,
    },
    {
      label: "House name",
      placeholder: "House name",
      name: "houseName",
      type: "text",
      class: "col-3",
      formik: formik,
    },
    {
      label: "Street name",
      placeholder: "Enter the street name",
      name: "street",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Locality",
      placeholder: "Enter the locality",
      name: "locality",
      type: "date",
      class: "col-6",
      formik: formik,
    },

    {
      label: "Select state",
      name: "state",
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
      label: "City",
      placeholder: "EnterCity",
      name: "cityVillage",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "district",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Taluk",
      placeholder: "Enter Taluk",
      name: "talukName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Pincode",
      placeholder: "Enter pincode",
      name: "pincode",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Nearest Police station",
      placeholder: "Enter the nearest Police station",
      name: "policeStation",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      type: "misc",
      content: "Permanent address",
      class: "col-12",
    },
    {
      label: "Same as above details",
      name: "sameAsPermanent",
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
      label: "House number",
      placeholder: "House number",
      name: "permanentHouseNumber",
      type: "text",
      class: "col-3",
      formik: formik,
    },
    {
      label: "House name",
      placeholder: "House name",
      name: "permanentHouseName",
      type: "text",
      class: "col-3",
      formik: formik,
    },
    {
      label: "Street name",
      placeholder: "Enter the street name",
      name: "permanentStreet",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Locality",
      placeholder: "Enter the locality",
      name: "permanentLocality",
      type: "date",
      class: "col-6",
      formik: formik,
    },

    {
      label: "Select state",
      name: "permanentState",
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
      label: "City",
      placeholder: "EnterCity",
      name: "permanentCityVillage",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "permanentDistrict",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Taluk",
      placeholder: "Enter Taluk",
      name: "permanentTalukName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Pincode",
      placeholder: "Enter pincode",
      name: "permanentPincode",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Nearest Police station",
      placeholder: "Enter the nearest Police station",
      name: "permanentPoliceStation",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Telephone number",
      placeholder: "Enter your telephone number",
      name: "telephoneNumber",
      type: "number",
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

export default ContactDetails;
