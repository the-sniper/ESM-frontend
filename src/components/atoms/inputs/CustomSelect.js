import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuidv4 } from "uuid";
import { FormHelperText } from "@mui/material";

const CustomSelect = ({ id, value, label, className, options, ...props }) => {
  const shrink = props.shrink ? props.shrink.toString() : "false";
  return (
    <div className={`customSelect nonNative ${props.className}`}>
      <FormControl fullWidth>
        <InputLabel
          id="select-label"
          className={props.error ? "Mui-error" : ""}
        >
          {label}
        </InputLabel>
        <Select
          id={id || uuidv4()}
          labelId="select-label"
          size={props.size}
          label={label}
          disabled={props.disabled}
          name={props.name}
          value={value}
          // InputLabelProps={{
          //   shrink: shrink,
          // }}
          // shrink={false}
          // autoFocus={props.autoFocus}
          onChange={props.onChange}
          error={props.error}
        >
          {options?.length ? (
            options?.map((data, index) => (
              <MenuItem value={data.value} key={uuidv4()}>
                {data.show}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              <em>No Records</em>
            </MenuItem>
          )}
        </Select>
        <FormHelperText className={props.error ? "Mui-error" : ""}>
          {props.error ? props.error : props.helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default CustomSelect;
