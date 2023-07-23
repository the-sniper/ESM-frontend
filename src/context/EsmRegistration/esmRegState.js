import React, { useReducer } from "react";
import esmRegContext from "./esmRegContext";
import esmRegReducer from "./esmRegReducer";
import { apiCall, setAuthToken } from "../../utils/api";
import { response } from "../../utils/common";

import { ESM_FETCH, RESPONSE_STATUS, CLEAR_RESPONSE } from "./esmRegTypes";

const EsmRegState = (props) => {
  const initialState = {
    responseStatus: null,
    fetchESM: [],
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

  // Get ESM Data
  const getESM = async (endpoint) => {
    if (localStorage.username) {
      try {
        const res = await apiCall(
          "post",
          endpoint,
          {
            serviceNumber: localStorage.username,
          },
          "",
          "ESM"
        );
        console.log(res, "fetchRes");
        if (res && res.status === 200) {
          await dispatch({
            type: ESM_FETCH,
            payload: {
              data: res.data,
            },
          });
        } else {
          await dispatch({
            type: RESPONSE_STATUS,
            payload: "Something went wrong!",
          });
        }
      } catch (error) {
        // Handle any errors that occurred during the API call or dispatch
        console.error("Error while fetching service details:", error);
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
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
        fetchESM: state.fetchESM,
        clearResponse,
        registerESM,
        getESM,
      }}
    >
      {props.children}
    </esmRegContext.Provider>
  );
};

export default EsmRegState;
