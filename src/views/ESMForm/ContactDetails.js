import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function ContactDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const contactValidationArray = Yup.object({
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

  const contactFormik = useFormik({
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
    validationSchema: contactValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetContactDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      contactFormik.values.pincode = fetchESM.pincode;
      contactFormik.values.state = fetchESM.state;
      contactFormik.values.district = fetchESM.district;
      contactFormik.values.talukName = fetchESM.talukName;
      contactFormik.values.cityVillage = fetchESM.cityVillage;
      contactFormik.values.locality = fetchESM.locality;
      contactFormik.values.street = fetchESM.street;
      contactFormik.values.houseName = fetchESM.houseName;
      contactFormik.values.houseNumber = fetchESM.houseNumber;
      contactFormik.values.policeStation = fetchESM.policeStation;

      contactFormik.values.permanentPincode = fetchESM.permanentPincode;
      contactFormik.values.permanentState = fetchESM.permanentState;
      contactFormik.values.permanentDistrict = fetchESM.permanentDistrict;
      contactFormik.values.permanentTalukName = fetchESM.permanentTalukName;
      contactFormik.values.permanentCityVillage = fetchESM.permanentCityVillage;
      contactFormik.values.permanentLocality = fetchESM.permanentLocality;
      contactFormik.values.permanentStreet = fetchESM.permanentStreet;
      contactFormik.values.permanentHouseName = fetchESM.permanentHouseName;
      contactFormik.values.permanentHouseNumber = fetchESM.permanentHouseNumber;
      contactFormik.values.permanentPoliceStation =
        fetchESM.permanentPoliceStation;
      contactFormik.values.telephoneNumber = fetchESM.telephoneNumber;
      contactFormik.values.sameAsPermanent = fetchESM.false;

      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "House number",
      placeholder: "House number",
      name: "houseNumber",
      type: "text",
      class: "col-3",
      formik: contactFormik,
    },
    {
      label: "House name",
      placeholder: "House name",
      name: "houseName",
      type: "text",
      class: "col-3",
      formik: contactFormik,
    },
    {
      label: "Street name",
      placeholder: "Enter the street name",
      name: "street",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Locality",
      placeholder: "Enter the locality",
      name: "locality",
      type: "text",
      class: "col-6",
      formik: contactFormik,
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
      formik: contactFormik,
    },
    {
      label: "City",
      placeholder: "EnterCity",
      name: "cityVillage",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "district",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Taluk",
      placeholder: "Enter Taluk",
      name: "talukName",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Pincode",
      placeholder: "Enter pincode",
      name: "pincode",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Nearest Police station",
      placeholder: "Enter the nearest Police station",
      name: "policeStation",
      type: "text",
      class: "col-6",
      formik: contactFormik,
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
      formik: contactFormik,
    },
    {
      label: "House number",
      placeholder: "House number",
      name: "permanentHouseNumber",
      type: "text",
      class: "col-3",
      formik: contactFormik,
    },
    {
      label: "House name",
      placeholder: "House name",
      name: "permanentHouseName",
      type: "text",
      class: "col-3",
      formik: contactFormik,
    },
    {
      label: "Street name",
      placeholder: "Enter the street name",
      name: "permanentStreet",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Locality",
      placeholder: "Enter the locality",
      name: "permanentLocality",
      type: "text",
      class: "col-6",
      formik: contactFormik,
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
      formik: contactFormik,
    },
    {
      label: "City",
      placeholder: "EnterCity",
      name: "permanentCityVillage",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "permanentDistrict",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Taluk",
      placeholder: "Enter Taluk",
      name: "permanentTalukName",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Pincode",
      placeholder: "Enter pincode",
      name: "permanentPincode",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Nearest Police station",
      placeholder: "Enter the nearest Police station",
      name: "permanentPoliceStation",
      type: "text",
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "Telephone number",
      placeholder: "Enter your telephone number",
      name: "telephoneNumber",
      type: "number",
      class: "col-6",
      formik: contactFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(contactFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("ContactDetails", contactFormik.values);
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
            label="Submit"
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

export default ContactDetails;
