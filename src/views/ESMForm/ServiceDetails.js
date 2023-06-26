import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";

function ServiceDetails(props) {
  const esmRegContext = useContext(EsmRegContext);

  const { registerESM, responseStatus, clearResponse } = esmRegContext;

  const validationArray = Yup.object({
    serviceName: Yup.string().required("This field is required!"),
    corpsName: Yup.string().required("This field is required!"),
    recordOfficeName: Yup.string().required("This field is required!"),
    groupName: Yup.string().required("This field is required!"),
    tradeName: Yup.string().required("This field is required!"),
    rankName: Yup.string().required("This field is required!"),
    rankCategory: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
    gender: Yup.string().required("This field is required!"),
    dob: Yup.string().required("This field is required!"),
    enrollDate: Yup.string().required("This field is required!"),
    worldWar2: Yup.boolean(),
    optAttend: Yup.string().required("This field is required!"),
    decoration: Yup.string().required("This field is required!"),
  });

  const handleSubmit = () => {
    registerESM("serviceDetails", formik.values);
    props.handleComplete();
    console.log(formik.values, "ESMValues");
  };

  const formik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      serviceName: "",
      corpsName: "",
      recordOfficeName: "",
      groupName: "",
      tradeName: "",
      rankName: "",
      rankCategory: "",
      name: "",
      gender: "",
      dob: "",
      enrollDate: "",
      worldWar2: false,
      optAttend: "",
      decoration: "",
    },
    validationSchema: validationArray,
    onSubmit: (values) => {
      // registerESM("serviceDetails", values);
      // handleSubmit();
    },
  });

  const formValues = [
    {
      label: "Full name",
      placeholder: "Enter your full name",
      name: "name",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      class: "col-6",
      options: [
        {
          show: "Male",
          value: "male",
        },
        {
          show: "Female",
          value: "female",
        },
      ],
      formik: formik,
    },
    {
      label: "Date of birth",
      placeholder: "Enter your date of birth",
      name: "date",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Service",
      name: "serviceName",
      type: "select",
      options: [
        {
          show: "Air Force",
          value: "airforce",
        },
        {
          show: "Army",
          value: "army",
        },
        {
          show: "Navy",
          value: "navy",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Record office",
      placeholder: "Enter record office name",
      name: "recordOfficeName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Corps",
      placeholder: "Enter your Corps name",
      name: "corpsName",
      type: "text",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Rank category",
      name: "rankCategory",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Rank",
      name: "rankName",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Group",
      name: "groupName",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Trade/Branch",
      name: "tradeName",
      type: "select",
      options: [
        {
          show: "1",
          value: "1",
        },
      ],
      class: "col-6",
      formik: formik,
    },
    {
      label: "Enrollment date",
      name: "enrollDate",
      type: "date",
      class: "col-6",
      formik: formik,
    },
    {
      label: "World war II veteran",
      name: "worldWar2",
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
      label: "Operations attended",
      name: "optAttend",
      type: "text",
      placeholder: "Enter the operations attended",
      class: "col-6",
      formik: formik,
    },
    {
      label: "Decorations",
      name: "decoration",
      type: "text",
      placeholder: "Enter your decorations",
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
      <form onSubmit={() => handleSubmit()}>
        <div className="row">{Object.values(mapData(formValues))}</div>
        <CustomButton
          label="Save"
          type="submit"
          onClick={() => handleSubmit()}
          buttonType="primary"
        />
      </form>
    </div>
  );
}

export default ServiceDetails;
