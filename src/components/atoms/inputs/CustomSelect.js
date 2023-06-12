import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuidv4 } from "uuid";

function CustomSelect({ id, value, label, className, options, ...props }) {
  return (
    <div className={`customSelect ${className}`}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id={id || uuidv4()}
          value={value}
          label={label}
          disabled={props.disabled}
          size={props.size}
          name={props.name}
          autoFocus={props.autoFocus}
          onChange={props.onChange || props.onChange}
          error={props.error}
          helpertext={props.helpertext}
        >
          {options &&
            options.map((data, index) => (
              <MenuItem value={data.value} key={uuidv4()}>
                {data.show}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomSelect;
