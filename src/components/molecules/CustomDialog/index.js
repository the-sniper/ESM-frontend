import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

function CustomDialog(props) {
  const open = props.open;
  const openFunction = props.function;
  const title = props.title;
  const closeBtn = props.closeBtn;
  return (
    <div>
      <Dialog
        className={`customDialog ${props.className}`}
        open={open}
        onClose={openFunction}
        aria-labelledby="form-dialog-title"
        maxWidth={props.maxWidth}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        {closeBtn ? (
          <Button onClick={openFunction} className="closeBtn">
            <span className="material-icons">close</span>
          </Button>
        ) : null}
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
