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

  // Register ESM Details
  const registerESM = async (method, endpoint, formData, fromVariable) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }
    try {
      const [res] = await Promise.all([
        apiCall(method || "post", endpoint, formData, "", "ESM"),
      ]);

      if (res && res.status === 200) {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: {
            status: "SUCCESS",
            message: "Request processed successfully!",
            type: res.status,
            data: res.data,
            from: fromVariable || "registerESM",
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: {
            status: "ERROR",
            message: "Something went wrong!",
            type: 0,
            from: fromVariable || "registerESM",
          },
        });
      }

      console.log("Success while getting ESM data");
    } catch (err) {
      await dispatch({
        type: RESPONSE_STATUS,
        payload: {
          status: "ERROR",
          message: "Something went wrong!",
          type: err.status,
          from: fromVariable || "registerESM",
        },
      });
      console.log(err, "Error while getting ESM data");
    }
  };

  // Get ESM Data
  const getESM = async (endpoint, fromVariable) => {
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
              status: "SUCCESS",
              message: "Request processed successfully!",
              type: res.status,
              data: res.data,
              from: fromVariable || "getESM",
            },
          });
        } else {
          await dispatch({
            type: RESPONSE_STATUS,
            payload: {
              status: "ERROR",
              message: "Something went wrong!",
              type: 0,
              from: fromVariable || "getESM",
            },
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
