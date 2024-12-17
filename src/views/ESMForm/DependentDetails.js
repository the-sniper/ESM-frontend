import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import {
  capitalize,
  cleanDropdownData,
  dateFormatFunction,
  mapData,
  yearFormatFunction,
} from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import moment from "moment";
import { Button } from "@mui/material";
import CustomDialog from "../../components/molecules/CustomDialog";
import { v4 as uuidv4 } from "uuid";
import CommonContext from "../../context/common/commonContext";

function DependentDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);
  const commonContext = useContext(CommonContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { setAlert } = alertContext;

  const { getAllEduLevel, allEduLevel } = commonContext;

  const [reload, setReload] = useState(false);
  const [dependentList, setDependentList] = useState([]);
  const [dependentModal, setDependentModal] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [deleteDependent, setDeleteDependent] = useState(false);
  const [depMaritalStatus, setDepMaritalStatus] = useState([]);

  const dependentValidationArray = Yup.object({
    dependentName: Yup.string().required("This is a required field."),
    registeredDate: Yup.string(),
    expiryDate: Yup.string(),
    dependentId: Yup.string(),
    relation: Yup.string().required("This is a required field."),
    dependentDob: Yup.string().required("This is a required field."),
    dependentAadhar: Yup.string()
      .required("This is a required field.")
      .matches(/^\d{12}$/, {
        message: "Aadhar number must be a 12-digit numeric value",
      }),
    dependentQualification: Yup.string().required("This is a required field."),
    additionalCourse: Yup.string(),
    dependentAcademicYear: Yup.string(),
    dependentEmploymentStatus: Yup.string().required(
      "This is a required field."
    ),
    dependentMaritalStatus: Yup.string().required("This is a required field."),
  });

  const dependentFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage?.username?.endsWith("|W") ? localStorage?.username?.slice(0, -2) : localStorage?.username,
      dependentName: "",
      dependentId: "",
      relation: "",
      dependentDob: "",
      dependentAadhar: "",
      dependentQualification: "",
      additionalCourse: "",
      dependentAcademicYear: "",
      dependentEmploymentStatus: "",
      dependentMaritalStatus: "",
      updateStatus: "false",
    },
    // enableReinitialize: true,
    validationSchema: dependentValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetAllDependentDetails");
    getAllEduLevel();
  }, []);

  useEffect(() => {
    if (dependentList?.length > 0 && currId != null) {
      dependentFormik.values.dependentName =
        dependentList[currId]?.dependentName;
      dependentFormik.values.dependentId = dependentList[currId]?.dependentId;

      dependentFormik.values.relation = dependentList[currId]?.relation;
      dependentFormik.values.dependentDob = dependentList[currId]?.dependentDob;
      dependentFormik.values.dependentAadhar =
        dependentList[currId]?.dependentAadhar;
      dependentFormik.values.dependentQualification =
        dependentList[currId]?.dependentQualification;
      dependentFormik.values.additionalCourse =
        dependentList[currId]?.additionalCourse;
      dependentFormik.values.dependentAcademicYear =
        dependentList[currId]?.dependentAcademicYear;
      dependentFormik.values.dependentEmploymentStatus =
        dependentList[currId]?.dependentEmploymentStatus;
      dependentFormik.values.dependentMaritalStatus =
        dependentList[currId]?.dependentMaritalStatus;
      dependentFormik.values.updateStatus = dependentList[currId]?.updateStatus;
    } else {
      dependentFormik.values.dependentName = "";
      dependentFormik.values.dependentId = "";
      dependentFormik.values.relation = "";
      dependentFormik.values.dependentDob = "";
      dependentFormik.values.dependentAadhar = "";
      dependentFormik.values.dependentQualification = "";
      dependentFormik.values.additionalCourse = "";
      dependentFormik.values.dependentAcademicYear = "";
      dependentFormik.values.dependentEmploymentStatus = "";
      dependentFormik.values.dependentMaritalStatus = "";
      dependentFormik.values.updateStatus = "false";
    }
    setReload(!reload);
  }, [currId]);

  useEffect(() => {
    if (fetchESM?.data?.data?.length && fetchESM?.data?.message != "FAILED") {
      // dependentFormik.values.dependentName = fetchESM?.data.dependentName;
      // dependentFormik.values.dependentId = fetchESM?.data.dependentId;
      // dependentFormik.values.registeredDate = fetchESM?.data.registeredDate;
      // dependentFormik.values.relation = fetchESM?.data.relation;
      // dependentFormik.values.dependentDob = fetchESM?.data.dependentDob;
      // dependentFormik.values.dependentAadhar = fetchESM?.data.dependentAadhar;
      // dependentFormik.values.dependentQualification =
      //   fetchESM?.data.dependentQualification;
      // dependentFormik.values.dependentAcademicYear =
      //   fetchESM?.data.dependentAcademicYear;
      // dependentFormik.values.dependentEmploymentStatus =
      //   fetchESM?.data.dependentEmploymentStatus;
      // dependentFormik.values.dependentMaritalStatus =
      //   fetchESM?.data.dependentMaritalStatus;
      // setReload(!reload);
      setDependentList(fetchESM?.data?.data);
    }
  }, [fetchESM?.data]);

  const formValues = [
    {
      label: "Dependent's name",
      placeholder: "Enter the name of the dependent",
      name: "dependentName",
      type: "text",
      autoFocus: true,
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Dependent's date of birth",
      name: "dependentDob",
      type: "date",
      maxDate: moment(new Date(), "DD-MM-YYYY"),
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    // {
    //   label: "Dependent ID Card number",
    //   placeholder: "Enter the dependent ID Card number",
    //   name: "dependentId",
    //   type: "text",
    //   class: "col-sm-6 col-12",
    //   formik: dependentFormik,
    // },

    {
      label: "Select relation",
      name: "relation",
      type: "select",
      options: [
        {
          show: "Father",
          value: "father",
        },
        {
          show: "Mother",
          value: "mother",
        },
        {
          show: "Son",
          value: "son",
        },
        {
          show: "Daughter",
          value: "daughter",
        },
      ],
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },

    {
      label: "Dependent's Aadhar number",
      placeholder: "Enter dependent's Aadhar number",
      name: "dependentAadhar",
      type: "text",
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Dependent's qualification",
      placeholder: "Enter dependent's qualification",
      name: "dependentQualification",
      type: "select",
      options: cleanDropdownData(allEduLevel, "educationalQualification", "id"),
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Additional courses",
      placeholder: "Enter any additional courses taken",
      name: "additionalCourse",
      type: "text",
      class: "col-6",
      formik: dependentFormik,
    },
    {
      label: "Dependent's year of graduation",
      placeholder: "Enter dependent's year of graduation",
      name: "dependentAcademicYear",
      type: "year",
      class: "col-sm-6 col-12",
      minDate: moment(dependentFormik.values.dependentDob, "DD-MM-YYYY"),
      formik: dependentFormik,
    },
    {
      label: "Dependent's employment status",
      name: "dependentEmploymentStatus",
      type: "select",
      options: [
        {
          show: "Employed",
          value: "employed",
        },
        {
          show: "Un-employed",
          value: "unemployed",
        },
      ],
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Dependent's marital status",
      name: "dependentMaritalStatus",
      type: "select",
      options: [
        {
          show: "Married",
          value: "married",
        },
        {
          show: "Un-married",
          value: "unmarried",
        },
        {
          show: "Separated",
          value: "separated",
        },
      ],
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    // registerESM(
    //   // dependentList[0]?.submittedBy == null ? "post" : "put",
    //   "post",
    //   "DependentDetails",
    //   dependentList,
    //   "dependentForm"
    // );
  };

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "dependentForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Dependent Details Submitted Successfully!", "success");
          // props.handleComplete();
          clearResponse();
        } else if (responseStatus.status === "ERROR") {
          setAlert(responseStatus.message, "error");
          clearResponse();
        }
      }
    }
  }, [responseStatus]);

  useEffect(() => {
    if (
      dependentFormik?.values?.relation == "father" ||
      dependentFormik?.values?.relation == "mother"
    ) {
      setDepMaritalStatus([
        {
          show: "Married",
          value: "married",
        },
        {
          show: "Separated",
          value: "separated",
        },
      ]);
    } else {
      setDepMaritalStatus([
        {
          show: "Married",
          value: "married",
        },
        {
          show: "Un-married",
          value: "unmarried",
        },
        {
          show: "Separated",
          value: "separated",
        },
      ]);
    }
    // setReload(!reload);
  }, [dependentFormik?.values?.relation]);
  const handleManageDependent = () => {
    if (Object.keys(dependentFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
    } else {
      let tempDepList = [...dependentList];
      console.log(
        tempDepList,
        dependentFormik.values.dependentId,
        "dependentFormikdependentId"
      );
      const existingIndex = tempDepList.findIndex(
        (dep) => dep.dependentId === dependentFormik.values.dependentId
      );
      if (existingIndex !== -1) {
        // Editing existing entry
        tempDepList[existingIndex] = {
          ...dependentFormik.values,
          // submittedBy: "USER",
          updateStatus: "true",
        };
      } else {
        // Adding new entry
        tempDepList.push({ ...dependentFormik.values });
        // tempDepList = [dependentFormik.values];
      }
      console.log(existingIndex, "existingIndex");
      console.log(dependentFormik, "dependentFormikCheck");
      console.log(tempDepList, "tempDepListCheck");
      setDependentList(tempDepList);
      setDependentModal(false);
      registerESM(
        // dependentList[0]?.submittedBy == null ? "post" : "put",
        "post",
        "DependentDetails",
        tempDepList.slice(-1),
        "dependentForm"
      );
      dependentFormik.resetForm();
    }
  };

  const manageDependentModal = (type, id) => {
    if (type == "new") {
      setCurrId(null);
      dependentFormik.resetForm();
      setDependentModal(true);
    } else if (type == "edit") {
      setCurrId(id);
      setDependentModal(true);
      // updateStatus
    } else if (type == "delete") {
      setCurrId(id);
      setDeleteDependent(true);
    }
  };

  const handleDependentDelete = () => {
    let tempList = [...dependentList].filter((item, index) => index !== currId);
    setDependentList(tempList);

    registerESM(
      // dependentList[0]?.submittedBy == null ? "post" : "put",
      "delete",
      "DependentDetails",
      dependentList[currId],
      "dependentForm"
    );
    setDeleteDependent(false);
  };

  return (
    <div>
      <h1 className="esmTitle">Dependent Details</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        {dependentList?.length > 0 ? (
          <>
            <Button
              className="addDependent"
              onClick={() => manageDependentModal("new")}
            >
              <span className="material-icons">add</span>
              Add a Dependent
            </Button>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Dependent ID</th>
                  <th>Relation</th>
                  <th>Aadhar</th>
                  <th>Qualification</th>
                  <th>Year of Grad.</th>
                  {/* <th>Employment Status</th>
                <th>Marital Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              {console.log(dependentList?.length > 0, "dependentListTest")}
              <tbody>
                {typeof dependentList == "object" &&
                dependentList?.length > 0 ? (
                  dependentList?.map((data, index) => (
                    <tr key={uuidv4()}>
                      <td>{index + 1}</td>
                      <td>{data.dependentName}</td>
                      <td>{data.dependentDob}</td>
                      <td>{data.dependentId}</td>
                      <td>{data.relation}</td>
                      <td>{data.dependentAadhar}</td>
                      <td>
                        {allEduLevel
                          ?.filter((d) => d.id == data.dependentQualification)
                          .map((data) => data.educationalQualification)}
                      </td>
                      <td>{yearFormatFunction(data.dependentAcademicYear)}</td>
                      {/* <td>{capitalize(data.dependentEmploymentStatus)}</td>
                    <td>{capitalize(data.dependentMaritalStatus)}</td> */}
                      <td>
                        <div className="tableActions">
                          <Button>
                            <span
                              className="material-icons"
                              onClick={() =>
                                manageDependentModal("edit", index)
                              }
                            >
                              edit
                            </span>
                          </Button>
                          <Button>
                            <span
                              className="material-icons"
                              onClick={() =>
                                manageDependentModal("delete", index)
                              }
                            >
                              delete
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center">
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <Button
            className="addFirstDependent"
            onClick={() => manageDependentModal("new")}
          >
            <span className="material-icons">add</span>
            Add a New Dependent
          </Button>
        )}
        <div className="esmAction">
          <div className="esmActionInner">
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
              onClick={() => props.handleNext()}
              buttonType="primary"
              disabled={dependentList?.length > 0 ? false : true}
            />
          </div>
          <Button
            className="esmSkipBtn"
            onClick={(e) => props.skipStep(e)}
            // variant="outlined"
          >
            Skip This Step
          </Button>
        </div>
      </form>
      <CustomDialog
        title="Add Dependent Details"
        className="dependentModal"
        open={dependentModal}
        function={() => setDependentModal(!dependentModal)}
        closeBtn={true}
      >
        <div className="row">{Object.values(mapData(formValues))}</div>
        {console.log(dependentFormik.errors, "dependentFormikCheck")}
        <div className="actionWrapper d-flex justify-content-end">
          <CustomButton
            type="submit"
            disabled={
              Object.keys(dependentFormik?.errors).length === 0 ? false : true
            }
            onClick={handleManageDependent}
            label="Submit"
          />
        </div>
      </CustomDialog>

      <CustomDialog
        title="Delete Dependent"
        className="actionCnfModal"
        open={deleteDependent}
        function={() => setDeleteDependent(!deleteDependent)}
        closeBtn={true}
      >
        <h5>Are you sure you want to delete this Dependent?</h5>
        <div className="actionWrapper d-flex justify-content-end">
          <CustomButton
            buttonType="secondary"
            onClick={() => setDeleteDependent(false)}
            label="No, Cancel"
            className="mr-3"
          />
          <CustomButton
            buttonType="primary"
            onClick={handleDependentDelete}
            label="Yes, Delete"
          />
        </div>
      </CustomDialog>
    </div>
  );
}

export default DependentDetails;
