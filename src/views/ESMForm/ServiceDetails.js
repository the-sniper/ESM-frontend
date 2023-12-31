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
    getAllRecordOffices,
    allServices,
    allCorps,
    allRankCategories,
    allRecordOffices,
    allRanks,
  } = commonContext;

  const [reload, setReload] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({});

  const serviceValidationArray = Yup.object({
    serviceName: Yup.string().required("This field is required!"),
    esmRegisterationId: Yup.string().required("This field is required!"),
    // corpsName: Yup.number().when("serviceName", {
    //   is: 1,
    //   then: () => Yup.number().required("This is a required field."),
    // }),
    recordOfficeName: Yup.string().required("This field is required!"),
    groupName: Yup.string().when("serviceName", {
      is: "2",
      then: () => Yup.string().required("This is a required field."),
    }),
    tradeName: Yup.string(),
    othersTradeName: Yup.string()
      .nullable()
      .when("tradeName", {
        is: "0",
        then: () => Yup.string(),
      }),
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
    othersDecoration: Yup.string(),
  });

  useEffect(() => {
    getAllServices();
    // getAllCorps({ serviceId: 1 }); //To Fetch all Corps from Service: Army
    getAllRankCategories();
  }, []);

  console.log(allRanks, "allRanks");
  console.log(allRecordOffices, "allRecordOffices");

  const serviceFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      serviceName: "",
      esmRegisterationId: "",
      corpsName: "",
      recordOfficeName: "",
      groupName: "",
      tradeName: "",
      othersTradeName: "",
      rankName: "",
      rankCategory: "",
      name: "",
      gender: "",
      dob: "",
      enrollDate: "",
      worldWar2: "false",
      optAttend: "",
      decoration: [],
      othersDecoration: "",
    },
    validationSchema: serviceValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetServiceDetails", "serviceForm");
  }, []);

  useEffect(() => {
    if (fetchESM.from === "serviceForm") {
      setServiceFormData(fetchESM?.data?.data);
    }
  }, [fetchESM]);

  useEffect(() => {
    if (serviceFormData) {
      serviceFormik.values.serviceName = serviceFormData?.serviceName;
      serviceFormik.values.esmRegisterationId =
        serviceFormData?.esmRegisterationId;
      serviceFormik.values.corpsName = "";
      serviceFormik.values.recordOfficeName = serviceFormData?.recordOfficeName;
      serviceFormik.values.groupName = serviceFormData?.groupName;
      serviceFormik.values.tradeName = serviceFormData?.tradeName;
      serviceFormik.values.othersTradeName =
        serviceFormData?.othersTradeName || "";
      serviceFormik.values.rankName = serviceFormData?.rankName;
      serviceFormik.values.rankCategory = serviceFormData?.rankCategory;
      serviceFormik.values.name = serviceFormData?.name;
      serviceFormik.values.gender = serviceFormData?.gender;
      serviceFormik.values.dob = serviceFormData?.dob;
      serviceFormik.values.enrollDate = serviceFormData?.enrollDate;
      serviceFormik.values.worldWar2 = serviceFormData?.worldWar2;
      serviceFormik.values.optAttend = serviceFormData?.optAttend;
      serviceFormik.values.decoration = serviceFormData?.decoration;
      serviceFormik.values.othersDecoration = serviceFormData?.othersDecoration;
      setReload(!reload);
    }
  }, [serviceFormData]);

  useEffect(() => {
    if (serviceFormik.values.serviceName && serviceFormik.values.rankCategory) {
      getAllRanks({
        serviceId: serviceFormik.values.serviceName,
        rankCategoryId: serviceFormik.values.rankCategory,
      });
    }
  }, [serviceFormik.values.serviceName, serviceFormik.values.rankCategory]);

  useEffect(() => {
    if (serviceFormik.values.serviceName) {
      getAllRecordOffices({ serviceId: serviceFormik.values.serviceName });
    }
  }, [serviceFormik.values.serviceName]);

  const [updatedTrade, setUpdatedTrade] = useState([]);
  useEffect(() => {
    let tempTrade = tradeData.filter(
      (d) => d.group == serviceFormik.values.groupName
    );
    setUpdatedTrade(tempTrade);
    if (tempTrade?.length > 0) {
      setUpdatedTrade([...tempTrade?.flat(), { value: 0, show: "Other" }]);
    }
  }, [tradeData, serviceFormik.values]);

  const formValues = [
    {
      label: "ESM Registeration ID",
      placeholder: "Enter ESM Registeration ID",
      name: "esmRegisterationId",
      type: "text",
      class: "col-6",
      autoFocus: true,
      formik: serviceFormik,
      required: false,
    },
    {
      label: "Full name",
      placeholder: "Enter your full name",
      name: "name",
      type: "text",
      class: "col-6",
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

    // {
    //   label: "Corps",
    //   name: "corpsName",
    //   type: "select",
    //   options: cleanDropdownData(allCorps, "corps", "id"),
    //   class: `col-6 ${serviceFormik.values.serviceName == 1 ? "" : "d-none"}`, //Enable this only for Service: Army
    //   formik: serviceFormik,
    // },
    {
      label: "Record office",
      placeholder: "Enter record office name",
      name: "recordOfficeName",
      type: "select",
      options: cleanDropdownData(allRecordOffices, "recordOfficeName", "id"),
      // options: recordOffices.filter(
      //   (d) => d.service == serviceFormik.values.serviceName
      // ),
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
    // {
    //   label: "Trade/Branch",
    //   name: "tradeName",
    //   type: "select",
    //   options: updatedTrade,
    //   class: `col-6`, //Enable this only for Service: Air Force
    //   formik: serviceFormik,
    // },
    // {
    //   label: "Other Trade/Branch",
    //   name: "othersTradeName",
    //   type: "text",
    //   class: `col-6 ${serviceFormik.values.tradeName == 0 ? "" : "d-none"}`, //Enable this only for Service: Air Force
    //   formik: serviceFormik,
    // },
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
    {
      label: "Other Decorations",
      name: "othersDecoration",
      type: "test",
      placeholder: "Enter your decorations",
      class: "col-6",
      helperText: `Add multiple Decorations by separating by a semicolon(;)`,
      formik: serviceFormik,
    },
  ];
  console.log(serviceFormik?.errors, "serviceFormik.error");
  console.log(serviceFormik?.values, "serviceFormik.value");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(serviceFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      serviceFormik.handleSubmit();
    } else {
      registerESM(
        serviceFormData?.submittedBy == null ? "post" : "put",
        "ServiceDetails",
        serviceFormik.values,
        "serviceForm"
      );
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
    <h1 className="esmTitle">Service Details</h1>
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
