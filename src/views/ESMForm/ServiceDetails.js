import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import CommonContext from "../../context/common/commonContext";
import {
  decorations,
  recordOffices,
  tradeData,
} from "../../utils/commonExports";
import moment from "moment";

function ServiceDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);
  const commonContext = useContext(CommonContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { setAlert } = alertContext;
  const {
    getAllServices,
    getAllCorps,
    getAllRankCategories,
    getAllRanks,
    allServices,
    allCorps,
    allRankCategories,
    allRanks,
  } = commonContext;

  const [reload, setReload] = useState(false);
  const [services, setServices] = useState([]);

  const serviceValidationArray = Yup.object({
    serviceName: Yup.string().required("This field is required!"),
    corpsName: Yup.string().required("This field is required!"),
    recordOfficeName: Yup.string().required("This field is required!"),
    groupName: Yup.string().required("This field is required!"),
    tradeName: Yup.string().required("This field is required!"),
    rankName: Yup.string().required("This field is required!"),
    rankCategory: Yup.string().required("This field is required!"),
    name: Yup.string()
      .required("This field is required!")
      .matches(/^[A-Za-z\s]+$/, {
        message: "This field should only contain alphabetic characters.",
      }),
    gender: Yup.string().required("This field is required!"),
    dob: Yup.string(),
    enrollDate: Yup.string(),
    worldWar2: Yup.string(),
    optAttend: Yup.string().required("This field is required!"),
    decoration: Yup.array().required("This field is required!"),
  });

  useEffect(() => {
    getAllServices();
    getAllCorps({ serviceId: 1 }); //To Fetch all Corps from Service: Army
    getAllRankCategories();
  }, []);

  console.log(allRanks, "allRanks");

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
      worldWar2: "false",
      optAttend: "",
      decoration: [],
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
    if (fetchESM?.data) {
      serviceFormik.values.serviceName = fetchESM?.data.serviceName;
      serviceFormik.values.corpsName = fetchESM?.data.corpsName;
      serviceFormik.values.recordOfficeName = fetchESM?.data.recordOfficeName;
      serviceFormik.values.groupName = fetchESM?.data.groupName;
      serviceFormik.values.tradeName = fetchESM?.data.tradeName;
      serviceFormik.values.rankName = fetchESM?.data.rankName;
      serviceFormik.values.rankCategory = fetchESM?.data.rankCategory;
      serviceFormik.values.name = fetchESM?.data.name;
      serviceFormik.values.gender = fetchESM?.data.gender;
      serviceFormik.values.dob = fetchESM?.data.dob;
      serviceFormik.values.enrollDate = fetchESM?.data.enrollDate;
      serviceFormik.values.worldWar2 = fetchESM?.data.worldWar2;
      serviceFormik.values.optAttend = fetchESM?.data.optAttend;
      serviceFormik.values.decoration = fetchESM?.data.decoration;
      setReload(!reload);
    }
  }, [fetchESM?.data]);

  useEffect(() => {
    if (serviceFormik.values.serviceName && serviceFormik.values.rankCategory) {
      getAllRanks({
        serviceId: serviceFormik.values.serviceName,
        rankCategoryId: serviceFormik.values.rankCategory,
      });
    }
  }, [serviceFormik.values.serviceName, serviceFormik.values.rankCategory]);

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
      name: "dob",
      type: "date",
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Service",
      name: "serviceName",
      placeholder: "Select a Service",
      type: "select",
      options: cleanDropdownData(allServices, "serviceName", "id"),
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Corps",
      name: "corpsName",
      type: "select",
      options: cleanDropdownData(allCorps, "corps", "id"),
      class: `col-6 ${serviceFormik.values.serviceName == 1 ? "" : "d-none"}`, //Enable this only for Service: Army
      formik: serviceFormik,
    },
    {
      label: "Record office",
      placeholder: "Enter record office name",
      name: "recordOfficeName",
      type: "select",
      options: recordOffices.filter(
        (d) => d.service == serviceFormik.values.serviceName
      ),
      class: "col-6",
      formik: serviceFormik,
    },

    {
      label: "Rank category",
      name: "rankCategory",
      type: "select",
      options: cleanDropdownData(allRankCategories, "category", "id"),
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Rank",
      name: "rankName",
      type: "select",
      options: cleanDropdownData(allRanks, "rankName", "id"),
      class: "col-6",
      formik: serviceFormik,
    },
    {
      label: "Group",
      name: "groupName",
      type: "select",
      options: [
        {
          show: "X",
          value: "1",
        },
        {
          show: "Y",
          value: "2",
        },
        {
          show: "Z",
          value: "3",
        },
      ],
      class: `col-6 ${serviceFormik.values.serviceName == 2 ? "" : "d-none"}`, //Enable this only for Service: Air Force
      formik: serviceFormik,
    },
    {
      label: "Trade/Branch",
      name: "tradeName",
      type: "select",
      options: tradeData.filter(
        (d) => d.group == serviceFormik.values.groupName
      ),
      class: `col-6 ${serviceFormik.values.serviceName == 2 ? "" : "d-none"}`, //Enable this only for Service: Air Force
      formik: serviceFormik,
    },
    {
      label: "Enrollment date",
      name: "enrollDate",
      type: "date",
      minDate: moment(serviceFormik.values.dob, "DD-MM-YYYY")
        .add(18, "years")
        .format("DD-MM-YYYY"),
      maxDate: moment(new Date(), "DD-MM-YYYY"),
      helperText:
        "Enrollment Date should be atleast 18 years greater than the DOB",
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
          id: "true",
        },
        {
          show: "No",
          id: "false",
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
      type: "multiselect",
      placeholder: "Enter your decorations",
      class: "col-6",
      options: decorations,
      formik: serviceFormik,
    },
  ];

  console.log(serviceFormik, "serviceFormikCheck");
  console.log(
    moment(serviceFormik.values.dob, "DD-MM-YYYY")
      .add(18, "years")
      .format("DD-MM-YYYY"),
    "checkDate"
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(serviceFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      serviceFormik.handleSubmit();
    } else {
      registerESM("ServiceDetails", serviceFormik.values, "serviceForm");
      // props.handleComplete();
    }
  };

  console.log(responseStatus, "responseStatusCHeck1");

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "serviceForm") {
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
