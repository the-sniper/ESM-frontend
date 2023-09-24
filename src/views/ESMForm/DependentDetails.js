import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atoms/buttons/CustomButton";
import { capitalize, mapData } from "../../utils";
import EsmRegContext from "../../context/EsmRegistration/esmRegContext";
import AlertContext from "../../context/alert/alertContext";
import moment from "moment";
import { Button } from "@mui/material";
import CustomDialog from "../../components/molecules/CustomDialog";
import { v4 as uuidv4 } from "uuid";

function DependentDetails(props) {
  const esmRegContext = useContext(EsmRegContext);
  const alertContext = useContext(AlertContext);

  const { registerESM, getESM, fetchESM, responseStatus, clearResponse } =
    esmRegContext;
  const { setAlert } = alertContext;

  const [reload, setReload] = useState(false);
  const [dependentList, setDependentList] = useState([]);
  const [dependentModal, setDependentModal] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [deleteDependent, setDeleteDependent] = useState(false);

  const dependentValidationArray = Yup.object({
    dependentName: Yup.string().required("This is a required field."),
    registeredDate: Yup.string().required("This is a required field."),
    dependentId: Yup.string().required("This is a required field."),
    relation: Yup.string().required("This is a required field."),
    dependentDob: Yup.string().required("This is a required field."),
    dependentAadhar: Yup.string()
      .required("This is a required field.")
      .matches(/^\d{12}$/, {
        message: "Aadhar number must be a 12-digit numeric value",
      }),
    dependentQualification: Yup.string().required("This is a required field."),
    dependentAcademicYear: Yup.string().required("This is a required field."),
    dependentEmploymentStatus: Yup.string().required(
      "This is a required field."
    ),
    dependentMaritalStatus: Yup.string().required("This is a required field."),
  });

  const dependentFormik = useFormik({
    initialValues: {
      serviceNumber: localStorage.username,
      dependentName: "",
      dependentId: "",
      registeredDate: "",
      relation: "",
      dependentDob: "",
      dependentAadhar: "",
      dependentQualification: "",
      dependentAcademicYear: "",
      dependentEmploymentStatus: "",
      dependentMaritalStatus: "",
    },
    validationSchema: dependentValidationArray,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    getESM("GetDependentDetails");
  }, []);

  useEffect(() => {
    if (dependentList?.length > 0 && currId != null) {
      dependentFormik.values.dependentName =
        dependentList[currId]?.dependentName;
      dependentFormik.values.dependentId = dependentList[currId]?.dependentId;
      dependentFormik.values.registeredDate =
        dependentList[currId]?.registeredDate;
      dependentFormik.values.relation = dependentList[currId]?.relation;
      dependentFormik.values.dependentDob = dependentList[currId]?.dependentDob;
      dependentFormik.values.dependentAadhar =
        dependentList[currId]?.dependentAadhar;
      dependentFormik.values.dependentQualification =
        dependentList[currId]?.dependentQualification;
      dependentFormik.values.dependentAcademicYear =
        dependentList[currId]?.dependentAcademicYear;
      dependentFormik.values.dependentEmploymentStatus =
        dependentList[currId]?.dependentEmploymentStatus;
      dependentFormik.values.dependentMaritalStatus =
        dependentList[currId]?.dependentMaritalStatus;
    } else {
      dependentFormik.values.dependentName = "";
      dependentFormik.values.dependentId = "";
      dependentFormik.values.registeredDate = "";
      dependentFormik.values.relation = "";
      dependentFormik.values.dependentDob = "";
      dependentFormik.values.dependentAadhar = "";
      dependentFormik.values.dependentQualification = "";
      dependentFormik.values.dependentAcademicYear = "";
      dependentFormik.values.dependentEmploymentStatus = "";
      dependentFormik.values.dependentMaritalStatus = "";
    }
    setReload(!reload);
  }, [currId]);

  // useEffect(() => {
  //   if (fetchESM?.data) {
  //     dependentFormik.values.dependentName = fetchESM?.data.dependentName;
  //     dependentFormik.values.dependentId = fetchESM?.data.dependentId;
  //     dependentFormik.values.registeredDate = fetchESM?.data.registeredDate;
  //     dependentFormik.values.relation = fetchESM?.data.relation;
  //     dependentFormik.values.dependentDob = fetchESM?.data.dependentDob;
  //     dependentFormik.values.dependentAadhar = fetchESM?.data.dependentAadhar;
  //     dependentFormik.values.dependentQualification =
  //       fetchESM?.data.dependentQualification;
  //     dependentFormik.values.dependentAcademicYear =
  //       fetchESM?.data.dependentAcademicYear;
  //     dependentFormik.values.dependentEmploymentStatus =
  //       fetchESM?.data.dependentEmploymentStatus;
  //     dependentFormik.values.dependentMaritalStatus =
  //       fetchESM?.data.dependentMaritalStatus;

  //     setReload(!reload);
  //   }
  // }, [fetchESM?.data]);

  const formValues = [
    {
      label: "Dependent's name",
      placeholder: "Enter the name of the dependent",
      name: "dependentName",
      type: "text",
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
    {
      label: "Dependent ID number",
      placeholder: "Enter the dependent ID number",
      name: "dependentId",
      type: "text",
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Date of registration",
      placeholder: "Enter the date of registration",
      name: "registeredDate",
      type: "date",
      class: "col-sm-6 col-12",
      minDate: moment(dependentFormik.values.dependentDob, "DD-MM-YYYY"),
      formik: dependentFormik,
    },

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
      type: "text",
      class: "col-sm-6 col-12",
      formik: dependentFormik,
    },
    {
      label: "Dependent's year of graduation",
      placeholder: "Enter dependent's year of graduation",
      name: "dependentAcademicYear",
      type: "date",
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
    registerESM("DependentDetails", dependentList, "dependentForm");
  };
  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.from === "dependentForm") {
        if (responseStatus.status === "SUCCESS") {
          setAlert("Dependent Details Submitted Successfully!", "success");
          props.handleComplete();
          clearResponse();
        } else if (responseStatus.status === "ERROR") {
          setAlert(responseStatus.message, "error");
          clearResponse();
        }
      }
    }
  }, [responseStatus]);

  const handleManageDependent = () => {
    if (Object.keys(dependentFormik.errors).length > 0) {
      setAlert("Please fill out all the mandatory fields!", "error");
      dependentFormik.handleSubmit();
    } else {
      let tempDepList = [...dependentList];
      tempDepList.push({ ...dependentFormik.values });
      setDependentList(tempDepList);
      setDependentModal(false);
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
    } else if (type == "delete") {
      setCurrId(id);
      setDeleteDependent(true);
    }
  };

  const handleDependentDelete = () => {
    let tempList = [...dependentList];
    tempList.splice(currId, 1);
    setDependentList(tempList);
    setDeleteDependent(false);
  };

  return (
    <div>
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
                  <th>Date of Reg.</th>
                  <th>Relation</th>
                  <th>Aadhar</th>
                  <th>Qualification</th>
                  <th>Year of Grad.</th>
                  {/* <th>Employment Status</th>
                <th>Marital Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dependentList ? (
                  dependentList?.map((data, index) => (
                    <tr key={uuidv4()}>
                      <td>{index + 1}</td>
                      <td>{capitalize(data.dependentName)}</td>
                      <td>{data.dependentDob}</td>
                      <td>{data.dependentId}</td>
                      <td>{data.registeredDate}</td>
                      <td>{capitalize(data.relation)}</td>
                      <td>{data.dependentAadhar}</td>
                      <td>{capitalize(data.dependentQualification)}</td>
                      <td>{data.dependentAcademicYear}</td>
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
                    <td colSpan={9}>No Records Found</td>
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
            disabled={dependentList?.length > 0 ? false : true}
          />
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
        <div className="actionWrapper d-flex justify-content-end">
          <CustomButton
            type="primary"
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
