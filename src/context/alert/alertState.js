import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "./alertTypes";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    let swetValue = {
      msg,
      type,
      id,
    };
    dispatch({
      type: SET_ALERT,
      payload: swetValue,
    });
  };

  // Cleart Alert
  const clearAlert = (id) => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        clearAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
