import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import { stateDistricts } from "../../utils/stateDistricts";
import CommonContext from "../../context/common/commonContext";

function ContactDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);
  const commonContext = useContext(CommonContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { getAllStates, allStates, getAllDistricts, allDistricts } =
    commonContext;

  const { setAlert } = alertContext;
  const [reload, setReload] = useState(false);
  const [contactFormData, setContactFormData] = useState({});

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
    getESM("GetContactDetails", "contactForm");
    getAllStates();
  }, []);

  useEffect(() => {
    if (fetchESM.from === "contactForm") {
      setContactFormData(fetchESM?.data?.data);
    }
  }, [fetchESM]);
  console.log(contactFormik?.values, "contactState");
  console.log(contactFormik?.values?.permanentState, "contactPermState");
  useEffect(() => {
    if (contactFormik?.values?.state) {
      getAllDistricts({
        stateId: contactFormik?.values?.state,
      });
    }
  }, [contactFormik?.values?.state]);

  useEffect(() => {
    if (contactFormik?.values?.permanentState) {
      getAllDistricts({
        stateId: contactFormik?.values?.permanentState,
      });
    }
  }, [contactFormik?.values?.permanentState]);

  useEffect(() => {
    if (contactFormData) {
      contactFormik.values.pincode = contactFormData?.pincode;
      contactFormik.values.state = contactFormData?.state;
      contactFormik.values.district = contactFormData?.district;
      contactFormik.values.talukName = contactFormData?.talukName;
      contactFormik.values.cityVillage = contactFormData?.cityVillage;
      contactFormik.values.locality = contactFormData?.locality;
      contactFormik.values.street = contactFormData?.street;
      contactFormik.values.houseName = contactFormData?.houseName;
      contactFormik.values.houseNumber = contactFormData?.houseNumber;
      contactFormik.values.policeStation = contactFormData?.policeStation;

      contactFormik.values.permanentPincode = contactFormData?.permanentPincode;
      contactFormik.values.permanentState = contactFormData?.permanentState;
      contactFormik.values.permanentDistrict =
        contactFormData?.permanentDistrict;
      contactFormik.values.permanentTalukName =
        contactFormData?.permanentTalukName;
      contactFormik.values.permanentCityVillage =
        contactFormData?.permanentCityVillage;
      contactFormik.values.permanentLocality =
        contactFormData?.permanentLocality;
      contactFormik.values.permanentStreet = contactFormData?.permanentStreet;
      contactFormik.values.permanentHouseName =
        contactFormData?.permanentHouseName;
      contactFormik.values.permanentHouseNumber =
        contactFormData?.permanentHouseNumber;
      contactFormik.values.permanentPoliceStation =
        contactFormData?.permanentPoliceStation;
      contactFormik.values.telephoneNumber = contactFormData?.telephoneNumber;
      contactFormik.values.sameAsPermanent = contactFormData?.sameAsPermanent;

      setReload(!reload);
    }
  }, [contactFormData]);

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
      options: cleanDropdownData(allDistricts, "districtName", "id"),

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
      options: cleanDropdownData(allDistricts, "districtName", "id"),

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
      registerESM(
        contactFormData?.submittedBy == null ? "post" : "put",
        "ContactDetails",
        contactFormik.values,
        "contactForm"
      );
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
