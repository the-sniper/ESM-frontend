import React from "react";
import { Button } from "@mui/material";

function CustomButton({
  variant,
  onClick,
  type,
  label,
  className,
  buttonType,
}) {
  const buttonTypeClass =
    buttonType === "tertiary"
      ? "tertButton"
      : buttonType === "secondary"
      ? "secButton"
      : "primButton";
  return (
    <Button
      className={className + " " + buttonTypeClass}
      variant={variant || "contained"}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
