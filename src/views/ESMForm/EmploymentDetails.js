import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { cleanDropdownData, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import CommonContext from "../../context/common/commonContext";
import { tradeData } from "../../utils/commonExports";

function EmploymentDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);
  const commonContext = useContext(CommonContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { getAllEduLevel, allEduLevel } = commonContext;

  const [reload, setReload] = useState(false);
  const [employmentFormData, setEmploymentFormData] = useState({});

  const { setAlert } = alertContext;

  const [updatedTrade, setUpdatedTrade] = useState([]);

  const employmentValidationArray = Yup.object({
    serviceName: Yup.string(),
    civilEmployment: Yup.string().nullable(),
    civilQualification: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    additionalCourse: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    tradeName: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    othersTradeName: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "2",
        then: () => Yup.string().nullable(),
      }),
    tradeCode: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    empRegField: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "2",
        then: () => Yup.string().nullable(),
      }),
    equivalentTest: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    presentDesignation: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    department: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    sector: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    employer: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    monthlyIncome: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    officialContactNumber: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    designationOnRetirement: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    retirementDate: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
    civilPpoNumber: Yup.string()
      .nullable()
      .when("civilEmployment", {
        is: "1",
        then: () => Yup.string().nullable(),
      }),
  });

  const employmentFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      civilQualification: "",
      additionalCourse: "",
      tradeName: "",
      othersTradeName: "",
      tradeCode: "",
      empRegField: "",
      equivalentTest: "",
      civilEmployment: "",
      presentDesignation: "",
      department: "",
      sector: "",
      employer: "",
      monthlyIncome: "",
      officialContactNumber: "",
      designationOnRetirement: "",
      retirementDate: "",
      civilPpoNumber: "",
    },
    validationSchema: employmentValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  console.log(employmentFormik, "checkEmploymentFormik");

  useEffect(() => {
    getESM("GetEmploymentDetails", "employmentForm");
  }, []);

  useEffect(() => {
    if (fetchESM.from === "employmentForm") {
      setEmploymentFormData(fetchESM?.data?.data);
    }
  }, [fetchESM]);

  useEffect(() => {
    if (employmentFormData) {
      employmentFormik.values.civilQualification =
        employmentFormData?.civilQualification;
      employmentFormik.values.additionalCourse =
        employmentFormData?.additionalCourse;
      employmentFormik.values.tradeName = employmentFormData?.tradeName;
      employmentFormik.values.othersTradeName =
        employmentFormData?.othersTradeName;
      employmentFormik.values.tradeCode = employmentFormData?.tradeCode;
      employmentFormik.values.empRegField = employmentFormData?.empRegField;
      employmentFormik.values.equivalentTest =
        employmentFormData?.equivalentTest;
      employmentFormik.values.civilEmployment =
        employmentFormData?.civilEmployment;
      employmentFormik.values.presentDesignation =
        employmentFormData?.presentDesignation;
      employmentFormik.values.department = employmentFormData?.department;
      employmentFormik.values.sector = employmentFormData?.sector;
      employmentFormik.values.employer = employmentFormData?.employer;
      employmentFormik.values.monthlyIncome = employmentFormData?.monthlyIncome;
      employmentFormik.values.officialContactNumber =
        employmentFormData?.officialContactNumber;
      employmentFormik.values.designationOnRetirement =
        employmentFormData?.designationOnRetirement;
      employmentFormik.values.retirementDate =
        employmentFormData?.retirementDate;
      employmentFormik.values.civilPpoNumber =
        employmentFormData?.civilPpoNumber;

      setReload(!reload);
    }
  }, [employmentFormData]);

  useEffect(() => {
    getAllEduLevel();
  }, []);

  useEffect(() => {
    setUpdatedTrade(tradeData);
    if (tradeData?.length > 0) {
      setUpdatedTrade([...tradeData?.flat(), { value: 0, show: "Other" }]);
    }
  }, [tradeData, employmentFormData.values]);

  const formValues = [
    {
      label: "Civil qualification",
      placeholder: "Enter your Civil qualification",
      name: "civilQualification",
      type: "select",
      options: cleanDropdownData(allEduLevel, "educationalQualification", "id"),
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Additional courses",
      placeholder: "Enter any additional courses taken",
      name: "additionalCourse",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },

    {
      label: "Equivalent test",
      label: "Enter equivalent test",
      name: "equivalentTest",
      type: "text",
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Trade/Branch",
      name: "tradeName",
      type: "select",
      options: updatedTrade,
      class: "col-6",
      formik: employmentFormik,
    },
    {
      label: "Other Trade/Branch",
      name: "othersTradeName",
      type: "text",
      class: `col-6 ${employmentFormik.values.tradeName == 0 ? "" : "d-none"}`,
      formik: employmentFormik,
    },
    {
      label: "Trade Code",
      name: "tradeCode",
      type: "text",
      class: "col-6 ",
      formik: employmentFormik,
    },
    {
      label: "Are you employed in Civil?",
      name: "civilEmployment",
      type: "select",
      options: [
        {
          show: "Yes",
          value: "1",
        },
        {
          show: "No",
          value: "2",
        },
      ],
      class: "col-6",
      formik: employmentFormik,
    },

    {
      label: "Employment Registration Field",
      name: "empRegField",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "2" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Present designation",
      placeholder: "Enter present designation",
      name: "presentDesignation",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Department",
      placeholder: "Enter department",
      name: "department",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Sector",
      placeholder: "Enter sector",
      name: "sector",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Employer's name",
      placeholder: "Enter the name of the employer",
      name: "employer",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Monthly income",
      placeholder: "Enter your monthly income",
      name: "monthlyIncome",
      type: "number",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Official contact number",
      placeholder: "Enter your official contact number",
      name: "officialContactNumber",
      type: "number",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Designation on retirement",
      placeholder: "Enter your designation on retirement",
      name: "designationOnRetirement",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Date of retirement",
      placeholder: "Enter your date of retirement",
      name: "retirementDate",
      type: "date",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
    {
      label: "Civil PPO number",
      placeholder: "Enter your civil PPO number",
      name: "civilPpoNumber",
      type: "text",
      class: `col-6 ${
        employmentFormik.values.civilEmployment == "1" ? "" : "d-none"
      }`,
      formik: employmentFormik,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(employmentFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      employmentFormik.handleSubmit();
    } else {
      registerESM(
        employmentFormData?.submittedBy == null ? "post" : "put",
        "EmploymentDetails",
        employmentFormik.values,
        "employmentForm"
      );
    }
  };

  console.log(fetchESM, "EmpCheck");

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "employmentForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Employment Details Submitted Successfully!", "success");
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
      <h1 className="esmTitle">Employment Details</h1>

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

export default EmploymentDetails;
