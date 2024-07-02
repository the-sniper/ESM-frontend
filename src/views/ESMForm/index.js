import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ESMForm.css";
import ServiceDetails from "./ServiceDetails";
import PersonalDetails from "./PersonalDetails";
import PensionDetails from "./PensionDetails";
import EmploymentDetails from "./EmploymentDetails";
import FamilyMemberDetails from "./FamilyMemberDetails";
import SpouseDetails from "./SpouseDetails";
import DependentDetails from "./DependentDetails";
import ContactDetails from "./ContactDetails";
import AuthContext from "../../context/auth/authContext";

const steps = [
  "Service Details",
  "Personal Details",
  "Pension Details",
  "Employment Details",
  "Spouse Details",
  "Dependent Details",
  "Contact Details",
];

function ESMForm() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  console.log(user, "checkUserStep");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    console.log(newActiveStep, activeStep, "newActiveStep");
    // if (activeStep != 5) {
    setActiveStep(newActiveStep);
    // }
    // if(steps.length)
    // console.log('This is the last step')
  };
  // console.log(activeStep, steps.length, "checkCompletedStep");

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // useEffect(() => {
  //   if (user?.message === "SUCCESS") {
  //     // setActiveStep(user?.data?.formProgressCount)
  //     // setCompleted(user?.data?.formProgressCount)

  //   }
  // }, [user])

  console.log(completed, "checkCompleted");

  return (
    <div className="customContainer stepperContainer">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index + 1]}>
            {console.log(label, index + 1, completed[index + 1], "getIndex")}
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thanks for submitting the form.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="stepperBody">
              {activeStep === 0 ? (
                <ServiceDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : activeStep === 1 ? (
                <PersonalDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : activeStep === 2 ? (
                <PensionDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : activeStep === 3 ? (
                <EmploymentDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : activeStep === 4 ? (
                <SpouseDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : activeStep === 5 ? (
                <DependentDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                  skipStep={handleStep(activeStep + 1)}
                />
              ) : activeStep === 6 ? (
                <ContactDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : (
                ""
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ESMForm;
