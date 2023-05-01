import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { v4 as uuidv4 } from "uuid";

function CustomRadio({ label, options }) {
  return (
    <FormControl>
      <FormLabel id="radio-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="radio-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {options &&
          options.map((data, index) => (
            <FormControlLabel
              value={data.value}
              key={uuidv4()}
              control={<Radio />}
              label={data.show}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadio;
