import React from "react";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

function CustomInput({ id, variant, label, className, ...props }) {
  const shrink = props.shrink ? props.shrink.toString() : "false";

  return (
    <div className={`customInput ${className}`}>
      <TextField
        id={id || uuidv4()}
        fullWidth
        label={label}
        variant={variant || "outlined"}
        value={props.value}
        autoFocus={props.autoFocus}
        name={props.name}
        onChange={props.onChange || props.onChange}
        onBlur={props.onBlur || props.onBlur}
        InputProps={{
          inputProps: props.inputProps,
          startAdornment: props.startAdornment,
          endAdornment: props.endAdornment,
          shrink: shrink,
        }}
        type={props.type}
        size={props.size}
        disabled={props.disabled}
        placeholder={props.placeholder}
        error={props.error}
        helperText={props.helperText}
        required={props.required}
      />
    </div>
  );
}

export default CustomInput;
