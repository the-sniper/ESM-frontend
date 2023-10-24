import React, { useReducer } from "react";
import CommonContext from "./commonContext";
import CommonReducer from "./commonReducer";
import { apiCall } from "../../utils/api";
import { response } from "../../utils/common";

import {
  CLEAR_SEARCH,
  SEARCH_VALUE,
  GET_ALL_COUNTRIES,
  GET_ALL_STATES,
  GET_ALL_CITIES,
  GET_ALL_SERVICES,
  GET_ALL_CORPS,
  GET_ALL_RANK_CATEGORIES,
  GET_ALL_RANKS,
  GET_ALL_RECORD_OFFICES,
  GET_ALL_MED_CATG,
  GET_ALL_DISCHARGE_CHAR,
  RESPONSE_STATUS,
  CLEAR_RESPONSE,
} from "./commonTypes";

const CommonState = (props) => {
  const initialState = {
    responseStatus: null,
    allCountries: [],
    allStates: [],
    allServices: [],
    allCorps: [],
    allCities: [],
    allRankCategories: [],
    allRanks: [],
    allRecordOffices: [],
    allMedCatg: [],
    allDischargeChar: [],
    searchValue: null,
  };

  const [state, dispatch] = useReducer(CommonReducer, initialState);
  let resp = new response(dispatch, RESPONSE_STATUS);

  const getAllCountries = async (formData) => {
    const from = "getAllCountries";
    try {
      const [res] = await Promise.all([
        apiCall(
          "post",
          from,
          { ...formData, orderby: "name, asc" },
          "",
          "commonFunction"
        ),
      ]);

      if (res.data.status === "success") {
        dispatch({
          type: GET_ALL_COUNTRIES,
          payload: {
            records: res.data.data.responseData.records
              ? res.data.data.responseData.records
              : [],
          },
        });
      } else if (res.data.status === "error") {
        resp.commonResponse(res.data, from);
      } else {
        resp.commonErrorResponse(from);
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllStates = async (formData) => {
    const from = "getAllStates";
    try {
      const [res] = await Promise.all([
        apiCall(
          "post",
          from,
          { ...formData, orderby: "name, asc" },
          "",
          "commonFunction"
        ),
      ]);

      if (res.data.status === "success") {
        dispatch({
          type: GET_ALL_STATES,
          payload: {
            records: res.data.data.responseData.records
              ? res.data.data.responseData.records
              : [],
          },
        });
      } else if (res.data.status === "error") {
        resp.commonResponse(res.data, from);
      } else {
        resp.commonErrorResponse(from);
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllCities = async (formData) => {
    const from = "getAllCities";
    try {
      const [res] = await Promise.all([
        apiCall(
          "post",
          from,
          { ...formData, orderby: "name, asc" },
          "",
          "commonFunction"
        ),
      ]);

      if (res.data.status === "success") {
        dispatch({
          type: GET_ALL_CITIES,
          payload: {
            records: res.data.data.responseData.records
              ? res.data.data.responseData.records
              : [],
          },
        });
      } else if (res.data.status === "error") {
        resp.commonResponse(res.data, from);
      } else {
        resp.commonErrorResponse(from);
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllServices = async () => {
    try {
      const res = await apiCall("get", "GetService", {}, "", "dd");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_SERVICES,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllCorps = async (payload) => {
    try {
      const res = await apiCall("post", "GetCorps", payload, "", "dd");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_CORPS,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllRankCategories = async () => {
    try {
      const res = await apiCall("get", "GetRankCategory", {}, "", "dd");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_RANK_CATEGORIES,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllRanks = async (payload) => {
    try {
      const res = await apiCall("post", "GetRanks", payload, "", "dd");
      console.log(res, "checkRES");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_RANKS,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllRecordOffices = async (payload) => {
    try {
      const res = await apiCall("post", "GetRecordOffice", payload, "", "dd");
      console.log(res, "checkRES");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_RECORD_OFFICES,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllMedCatg = async (payload) => {
    try {
      const res = await apiCall(
        "get",
        "GetAllMedicalCategory",
        payload,
        "",
        "dd"
      );
      console.log(res, "checkRES");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_MED_CATG,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const getAllDischargeChar = async (payload) => {
    try {
      const res = await apiCall("get", "GetAllCharacters", payload, "", "dd");
      console.log(res, "checkRES");
      if (res && res.status === 200) {
        await dispatch({
          type: GET_ALL_DISCHARGE_CHAR,
          payload: {
            data: res.data.data,
          },
        });
      } else {
        await dispatch({
          type: RESPONSE_STATUS,
          payload: "Something went wrong!",
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_STATUS,
        payload: "Something went wrong!",
      });
    }
  };

  const setSearchValue = async (data) => {
    dispatch({
      type: SEARCH_VALUE,
      payload: data,
    });
  };

  const clearSearchValue = () =>
    dispatch({
      type: CLEAR_SEARCH,
    });

  const clearResponse = () =>
    dispatch({
      type: CLEAR_RESPONSE,
    });
  return (
    <CommonContext.Provider
      value={{
        searchValue: state.searchValue,
        responseStatus: state.responseStatus,
        allCountries: state.allCountries,
        allStates: state.allStates,
        allCities: state.allCities,
        allServices: state.allServices,
        allCorps: state.allCorps,
        allRankCategories: state.allRankCategories,
        allRanks: state.allRanks,
        allRecordOffices: state.allRecordOffices,
        allMedCatg: state.allMedCatg,
        allDischargeChar: state.allDischargeChar,
        setSearchValue,
        clearSearchValue,
        getAllCountries,
        getAllStates,
        getAllCities,
        getAllServices,
        getAllCorps,
        getAllRankCategories,
        getAllRecordOffices,
        getAllMedCatg,
        getAllDischargeChar,
        getAllRanks,
        clearResponse,
      }}
    >
      {props.children}
    </CommonContext.Provider>
  );
};

export default CommonState;
