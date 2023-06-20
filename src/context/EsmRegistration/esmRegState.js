import React, { useReducer } from "react";
import esmRegContext from "./esmRegContext";
import esmRegReducer from "./esmRegReducer";
import { apiCall, setAuthToken } from "../../utils/api";
import { response } from "../../utils/common";

import { RESPONSE_STATUS, CLEAR_RESPONSE } from "./esmRegTypes";

const EsmRegState = (props) => {
  const initialState = {
    responseStatus: null,
  };

  const [state, dispatch] = useReducer(esmRegReducer, initialState);
  let resp = new response(dispatch, RESPONSE_STATUS);

  // Bid Confirm
  const registerESM = async (endpoint, formData) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }
    try {
      const [res] = await Promise.all([
        apiCall("post", endpoint, formData, "", "ESM"),
      ]);
      resp.commonResponse(res.data, "registerESM");
      console.log("Success while getting ESM data");
    } catch (err) {
      resp.commonErrorResponse("registerESM");
      console.log(err, "Error while getting ESM data");
    }
  };

  // Clear Response
  const clearResponse = () =>
    dispatch({
      type: CLEAR_RESPONSE,
    });

  return (
    <esmRegContext.Provider
      value={{
        responseStatus: state.responseStatus,
        clearResponse,
        registerESM,
      }}
    >
      {props.children}
    </esmRegContext.Provider>
  );
};

export default EsmRegState;
