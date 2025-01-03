import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { apiCall, setAuthToken } from "../../utils/api";
import { response } from "../../utils/common";
import {
  USER_LOADED,
  LOGOUT,
  RESPONSE_STATUS,
  COUNT_LOADED,
  CLEAR_RESPONSE,
  CALL_END,
} from "./authTypes";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    isAuthenticated: null,
    isAdmin: null,
    loading: true,
    cartCount: {},
    user: {},
    responseStatus: null,
    callEnd: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  let resp = new response(dispatch, RESPONSE_STATUS);

  // Register User
  const register = async (endpoint, formData, type) => {
    try {
      const [res] = await Promise.all([
        apiCall("post", endpoint, formData, "", type || ""),
      ]);
      resp.commonResponse(res.data, "register");
      console.log(res, "checkResData");
    } catch (err) {
      resp.commonErrorResponse("register");
    }
  };

  // Validate ESM Profile
  const checkESMValidation = async (formData) => {
    try {
      const [res] = await Promise.all([
        apiCall("post", "validateESMProfile", formData, "", "Widow"),
      ]);
      resp.commonResponse(res.data, "checkESMValidation");
    } catch (err) {
      resp.commonErrorResponse("checkESMValidation");
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const [res] = await Promise.all([
        apiCall("post", "login", formData, "", ""),
      ]);
      console.log(res, formData, "checkResLogin");
      resp.commonResponse(res, "login");
      if (res && res.status === 200) {
        if (global.session) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("username", (formData.regType==="WDW" && !formData.username.endsWith("|W")) ? formData.username+"|W" : formData.username);
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", (formData.regType==="WDW" && !formData.username.endsWith("|W"))  ? formData.username+"|W" : formData.username);
        }
        loadUser();
      }
    } catch (err) {
      resp.commonErrorResponse("login");
    }
  };

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }
    console.log(localStorage, "localStorage.username");
    if (localStorage.username) {
      const [res] = await Promise.all([
        apiCall(
          "post",
          "ESM/GetUserDetails",
          {
            serviceNumber: localStorage.username,
          },
          "",
          ""
        ),
      ]);
      console.log(res, "resAfterLogin");
      if (res && res.status === 200) {
        await dispatch({
          type: USER_LOADED,
          payload: {
            data: res && res.data,
          },
        });
      } else if (res.status === 400) {
        await dispatch({
          type: LOGOUT,
        });
      } else {
        await dispatch({
          type: LOGOUT,
        });
      }
      await dispatch({
        type: CALL_END,
        payload: res.data,
      });
    }
  };

  // Load Count
  const loadPendingCount = async (formData, data) => {
    const [res] = await Promise.all([
      apiCall("post", "pendingCount", formData, "", "cart"),
    ]);
    if (res.data.status === "SUCCESS") {
      dispatch({
        type: COUNT_LOADED,
        payload: {
          [data]: res.data.data.responseData,
        },
      });
    }
  };

  // Log out
  const logout = () =>
    dispatch({
      type: LOGOUT,
    });

  // Clear Response
  const clearResponse = () =>
    dispatch({
      type: CLEAR_RESPONSE,
    });

  console.log(state, "checkState");

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        cartCount: state.cartCount,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        loading: state.loading,
        user: state.user,
        responseStatus: state.responseStatus,
        callEnd: state.callEnd,
        register,
        checkESMValidation,
        login,
        logout,
        loadUser,
        loadPendingCount,
        clearResponse,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
