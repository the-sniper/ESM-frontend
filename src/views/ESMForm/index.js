import React from "react";
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="customContainer stepperContainer">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
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
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
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
                />
              ) : activeStep === 6 ? (
                <ContactDetails
                  handleComplete={handleComplete}
                  handlePrevious={handlePrevious}
                />
              ) : (
                "none"
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ESMForm;
