import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";

function ServiceDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;

  const [reload, setReload] = useState(false);
  const { setAlert } = alertContext;

  const serviceValidationArray = Yup.object({
    serviceName: Yup.string().required("This field is required!"),
    corpsName: Yup.string().required("This field is required!"),
    recordOfficeName: Yup.string().required("This field is required!"),
    groupName: Yup.string().required("This field is required!"),
    tradeName: Yup.string().required("This field is required!"),
    rankName: Yup.string().required("This field is required!"),
    rankCategory: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
    gender: Yup.string().required("This field is required!"),
    dob: Yup.string(),
    enrollDate: Yup.string(),
    worldWar2: Yup.boolean(),
    optAttend: Yup.string().required("This field is required!"),
    decoration: Yup.string().required("This field is required!"),
  });

  const serviceFormik = useFormik({
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
    validationSchema: serviceValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  useEffect(() => {
    getESM("GetServiceDetails");
  }, []);

  useEffect(() => {
    if (fetchESM) {
      serviceFormik.values.serviceName = fetchESM.serviceName;
      serviceFormik.values.corpsName = fetchESM.corpsName;
      serviceFormik.values.recordOfficeName = fetchESM.recordOfficeName;
      serviceFormik.values.groupName = fetchESM.groupName;
      serviceFormik.values.tradeName = fetchESM.tradeName;
      serviceFormik.values.rankName = fetchESM.rankName;
      serviceFormik.values.rankCategory = fetchESM.rankCategory;
      serviceFormik.values.name = fetchESM.name;
      serviceFormik.values.gender = fetchESM.gender;
      serviceFormik.values.dob = fetchESM.dob;
      serviceFormik.values.enrollDate = fetchESM.enrollDate;
      serviceFormik.values.worldWar2 = fetchESM.worldWar2;
      serviceFormik.values.optAttend = fetchESM.optAttend;
      serviceFormik.values.decoration = fetchESM.decoration;
      setReload(!reload);
    }
  }, [fetchESM]);

  const formValues = [
    {
      label: "Full name",
      placeholder: "Enter your full name",
      name: "name",
      type: "text",
      class: "col-6",
      autoFocus: true,
      formik: serviceFormik,
      required: false,
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
      formik: serviceFormik,
    },
    {
      label: "Date of birth",
      placeholder: "Enter your date of birth",
      name: "date",
      type: "date",
      class: "col-6",
      formik: serviceFormik,
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
      formik: serviceFormik,
    },
    {
      label: "Record office",
      placeholder: "Enter record office name",
      name: "recordOfficeName",
      type: "text",
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Corps",
      placeholder: "Enter your Corps name",
      name: "corpsName",
      type: "text",
      class: "col-6",
      formik: serviceFormik,
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
      formik: serviceFormik,
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
      formik: serviceFormik,
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
      formik: serviceFormik,
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
      formik: serviceFormik,
    },
    {
      label: "Enrollment date",
      name: "enrollDate",
      type: "date",
      class: "col-6",
      formik: serviceFormik,
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
      formik: serviceFormik,
    },
    {
      label: "Operations attended",
      name: "optAttend",
      type: "text",
      placeholder: "Enter the operations attended",
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Decorations",
      name: "decoration",
      type: "text",
      placeholder: "Enter your decorations",
      class: "col-6",
      formik: serviceFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(serviceFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      registerESM("ServiceDetails", serviceFormik.values);
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
            disabled={true}
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

export default ServiceDetails;
