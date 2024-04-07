import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import { stateDistricts } from "../../utils/stateDistricts";
import CommonContext from "../../context/common/commonContext";
import CustomDialog from "../../components/molecules/CustomDialog";
import Lottie from "react-lottie";
import successAnimation from "../../assets/lottie/successAnimation.json";

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
  const [formSubmitModal, setFormSubmitModal] = useState(false);

  const contactValidationArray = Yup.object({
    pincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
      .nullable(),
    state: Yup.string().nullable(),
    district: Yup.string().nullable(),
    talukName: Yup.string().nullable(),
    cityVillage: Yup.string().nullable(),
    locality: Yup.string().nullable(),
    street: Yup.string().nullable(),
    houseName: Yup.string().nullable(),
    houseNumber: Yup.string().nullable(),
    policeStation: Yup.string().nullable(),
    telephoneNumber: Yup.string().nullable(),

    permanentPincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid PIN code")
      .nullable(),
    permanentState: Yup.string().nullable(),
    permanentDistrict: Yup.string().nullable(),
    permanentTalukName: Yup.string().nullable(),
    permanentCityVillage: Yup.string().nullable(),
    permanentLocality: Yup.string().nullable(),
    permanentStreet: Yup.string().nullable(),
    permanentHouseName: Yup.string().nullable(),
    permanentHouseNumber: Yup.string().nullable(),
    permanentPoliceStation: Yup.string().nullable(),
    permanentTelephoneNumber: Yup.string().nullable(),
    sameAsPermanent: Yup.string().nullable(),
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
      telephoneNumber: "",
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
      permanentTelephoneNumber: "",
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
      contactFormik.values.telephoneNumber = contactFormData?.telephoneNumber;

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
      contactFormik.values.permanentTelephoneNumber =
        contactFormData?.permanentTelephoneNumber;
      contactFormik.values.sameAsPermanent = contactFormData?.sameAsPermanent;

      setReload(!reload);
    }
  }, [contactFormData]);
  console.log(contactFormData, "checkcontactFormData");

  const formValues = [
    {
      type: "misc",
      class: "col-12",
      content: <h1 className="esmTitle">Current Address</h1>,
      formik: contactFormik,
    },
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
      label: "Telephone number",
      placeholder: "Enter your telephone number",
      name: "telephoneNumber",
      type: "number",
      class: "col-6",
      formik: contactFormik,
    },
    {
      type: "misc",
      content: <h5 className="esmTitle my-3">Permanent address</h5>,
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
      name: "permanentTelephoneNumber",
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

  const paymentSuccessOptions = {
    loop: true,
    autoplay: true,
    speed: "0.25",
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
            label="Save"
            className="esmSubmitBtn"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            buttonType="primary"
          />
          <CustomButton
            label="Submit"
            className="esmSubmitBtn"
            onClick={() => setFormSubmitModal(true)}
            buttonType="primary"
          />
        </div>
      </form>
      <CustomDialog
        title="Confirm Submission"
        className="dependentModal"
        open={formSubmitModal}
        function={() => setFormSubmitModal(!formSubmitModal)}
        closeBtn={true}
      >
        <h4>Are you sure you want to submit this form?</h4>
        <h6>Once submitted, this information cannot be changed.</h6>
        {/* <Lottie
          options={paymentSuccessOptions}
          speed="0.25"
          height="auto"
          width={150}
        /> */}
        <div className="actionWrapper d-flex justify-content-end mt-4">
          <CustomButton
            buttonType="secondary"
            type="submit"
            label="No, Cancel"
          />
          <CustomButton type="submit" className="ml-3" label="Yes, Submit" />
        </div>
      </CustomDialog>
    </div>
  );
}

export default ContactDetails;
