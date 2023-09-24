import React from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { ListItem } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

const PREFIX = "RadioBox";

const classes = {
  root: `${PREFIX}-root`,
  checked: `${PREFIX}-checked`,
};

const Root = styled("div")({
  [`& .${classes.root}`]: {
    color: "var(--primColor)",
    "&$checked": {
      color: "var(--primColor)",
    },
  },
  [`& .${classes.checked}`]: {},
});

export const GreenRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.default,
  "&$checked": {
    color: theme.palette.primColor,
  },
  [`&.${theme.palette.checked}`]: {},
}));

function RadioBox(props) {
  // console.log('Radio box props.value', props.value)
  return (
    <Root className="customRadio">
      <h6 className="radioTitle">{props.label}</h6>
      <RadioGroup
        aria-label={props.name}
        name={props.name}
        value={props.int === 1 ? parseInt(props.value) : props.value}
        onChange={props.onChange}
      >
        {props.options.map((d, i) => (
          <FormControlLabel
            value={props.int === 1 ? parseInt(d.id) : d.id}
            className={
              props.value && props.value == d.id ? "checked" : "unChecked"
            }
            control={
              <GreenRadio
                disabled={props.disabled ? props.disabled : false}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label={d.show}
          />
        ))}
      </RadioGroup>
      <FormHelperText className="Mui-error">{props.error}</FormHelperText>
    </Root>
  );
}

export default RadioBox;
