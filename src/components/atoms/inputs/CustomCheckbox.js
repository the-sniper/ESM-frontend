import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CustomCheckbox({ label }) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label={label} />
    </FormGroup>
  );
}

export default CustomCheckbox;
