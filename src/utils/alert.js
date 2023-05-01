import { useContext, useEffect } from "react";
import AlertContext from "../context/alert/alertContext";
import { useSnackbar } from "notistack";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts, clearAlert } = alertContext;
  const { enqueueSnackbar } = useSnackbar();
  // const classes = useStyles();
  // warning error info success

  return (
    alerts.length > 0 &&
    alerts.map((alert) => {
      enqueueSnackbar(alert.msg, {
        variant: alert.type,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        preventDuplicate: true,
      });
      clearAlert(alert.id);
    })
  );
};

export default Alerts;
