import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import { stateDistricts } from "../../utils/stateDistricts";

function ContactDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const contactValidationArray = Yup.object({
    pincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
      .required("This is a required field."),
    state: Yup.string().required("This is a required field."),
    district: Yup.string().required("This is a required field."),
    talukName: Yup.string().required("This is a required field."),
    cityVillage: Yup.string().required("This is a required field."),
    locality: Yup.string().required("This is a required field."),
    street: Yup.string().required("This is a required field."),
    houseName: Yup.string().required("This is a required field."),
    houseNumber: Yup.string().required("This is a required field."),
    policeStation: Yup.string().required("This is a required field."),
    permanentPincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
      .required("This is a required field."),
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
    sameAsPermanent: Yup.string().required("This is a required field."),
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
    if (fetchESM?.data) {
      contactFormik.values.pincode = fetchESM?.data.pincode;
      contactFormik.values.state = fetchESM?.data.state;
      contactFormik.values.district = fetchESM?.data.district;
      contactFormik.values.talukName = fetchESM?.data.talukName;
      contactFormik.values.cityVillage = fetchESM?.data.cityVillage;
      contactFormik.values.locality = fetchESM?.data.locality;
      contactFormik.values.street = fetchESM?.data.street;
      contactFormik.values.houseName = fetchESM?.data.houseName;
      contactFormik.values.houseNumber = fetchESM?.data.houseNumber;
      contactFormik.values.policeStation = fetchESM?.data.policeStation;

      contactFormik.values.permanentPincode = fetchESM?.data.permanentPincode;
      contactFormik.values.permanentState = fetchESM?.data.permanentState;
      contactFormik.values.permanentDistrict = fetchESM?.data.permanentDistrict;
      contactFormik.values.permanentTalukName =
        fetchESM?.data.permanentTalukName;
      contactFormik.values.permanentCityVillage =
        fetchESM?.data.permanentCityVillage;
      contactFormik.values.permanentLocality = fetchESM?.data.permanentLocality;
      contactFormik.values.permanentStreet = fetchESM?.data.permanentStreet;
      contactFormik.values.permanentHouseName =
        fetchESM?.data.permanentHouseName;
      contactFormik.values.permanentHouseNumber =
        fetchESM?.data.permanentHouseNumber;
      contactFormik.values.permanentPoliceStation =
        fetchESM?.data.permanentPoliceStation;
      contactFormik.values.telephoneNumber = fetchESM?.data.telephoneNumber;
      contactFormik.values.sameAsPermanent = fetchESM?.data.sameAsPermanent;

      setReload(!reload);
    }
  }, [fetchESM?.data]);

  console.log(fetchESM, "fetchESMContact");

  useEffect(() => {
    if (contactFormik?.values?.sameAsPermanent == "true") {
      contactFormik.values.permanentPincode = contactFormik?.values?.pincode;
      contactFormik.values.permanentState = contactFormik?.values?.state;
      contactFormik.values.permanentDistrict = contactFormik?.values?.district;
      contactFormik.values.permanentTalukName =
        contactFormik?.values?.talukName;
      contactFormik.values.permanentCityVillage =
        contactFormik?.values?.cityVillage;
      contactFormik.values.permanentLocality = contactFormik?.values?.locality;
      contactFormik.values.permanentStreet = contactFormik?.values?.street;
      contactFormik.values.permanentHouseName =
        contactFormik?.values?.houseName;
      contactFormik.values.permanentHouseNumber =
        contactFormik?.values?.houseNumber;
      contactFormik.values.permanentPoliceStation =
        contactFormik?.values?.policeStation;
    } else {
      contactFormik.values.permanentPincode = "";
      contactFormik.values.permanentState = "";
      contactFormik.values.permanentDistrict = "";
      contactFormik.values.permanentTalukName = "";
      contactFormik.values.permanentCityVillage = "";
      contactFormik.values.permanentLocality = "";
      contactFormik.values.permanentStreet = "";
      contactFormik.values.permanentHouseName = "";
      contactFormik.values.permanentHouseNumber = "";
      contactFormik.values.permanentPoliceStation = "";
    }
  }, [contactFormik?.values?.sameAsPermanent]);

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
      options: cleanDropdownData(stateDistricts, "name", "id"),
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "district",
      type: "select",
      options: cleanDropdownData(
        stateDistricts[parseInt(contactFormik.values.state, 10) - 1]?.districts,
        "name",
        "id"
      ),
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
      content: <h5 className="my-3">Permanent address</h5>,
      class: "col-12",
    },
    {
      label: "Same as above details",
      name: "sameAsPermanent",
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
      class: "col-6 sameAsPerm",
      formik: contactFormik,
    },
    {
      type: "misc",
      content: <></>,
      class: "col-6",
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
      options: cleanDropdownData(stateDistricts, "name", "id"),
      class: "col-6",
      formik: contactFormik,
    },
    {
      label: "District",
      placeholder: "Enter District",
      name: "permanentDistrict",
      type: "select",
      options: cleanDropdownData(
        stateDistricts[parseInt(contactFormik.values.permanentState, 10) - 1]
          ?.districts,
        "name",
        "id"
      ),
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
      contactFormik.handleSubmit();
    } else {
      registerESM("ContactDetails", contactFormik.values, "contactForm");
    }
  };

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "contactForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Contact Details Submitted Successfully!", "success");
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
