import {
  CLEAR_SEARCH,
  SEARCH_VALUE,
  GET_ALL_COUNTRIES,
  GET_ALL_STATES,
  GET_ALL_DISTRICTS,
  RESPONSE_STATUS,
  CLEAR_RESPONSE,
  GET_ALL_SERVICES,
  GET_ALL_CORPS,
  GET_ALL_RANK_CATEGORIES,
  GET_ALL_RANKS,
  GET_ALL_RECORD_OFFICES,
  GET_ALL_MED_CATG,
  GET_ALL_DISCHARGE_CHAR,
  GET_ALL_EDU_LEVEL,
} from "./commonTypes";

export default (state, action) => {
  console.log(state, action, "checkStateAction");
  switch (action.type) {
    case RESPONSE_STATUS:
      return {
        ...state,
        responseStatus: action.payload,
      };

    case SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchValue: null,
      };
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload.data,
      };
    case GET_ALL_STATES:
      return {
        ...state,
        allStates: action.payload.data,
      };
    case GET_ALL_DISTRICTS:
      return {
        ...state,
        allDistricts: action.payload.data,
      };
    case GET_ALL_SERVICES:
      return {
        ...state,
        allServices: action.payload.data,
      };
    case GET_ALL_CORPS:
      return {
        ...state,
        allCorps: action.payload.data,
      };
    case GET_ALL_RANK_CATEGORIES:
      return {
        ...state,
        allRankCategories: action.payload.data,
      };
    case GET_ALL_RANKS:
      return {
        ...state,
        allRanks: action.payload.data,
      };
    case GET_ALL_RECORD_OFFICES:
      return {
        ...state,
        allRecordOffices: action.payload.data,
      };
    case GET_ALL_MED_CATG:
      return {
        ...state,
        allMedCatg: action.payload.data,
      };
    case GET_ALL_DISCHARGE_CHAR:
      return {
        ...state,
        allDischargeChar: action.payload.data,
      };
    case GET_ALL_EDU_LEVEL:
      return {
        ...state,
        allEduLevel: action.payload.data,
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        responseStatus: "",
      };

    default:
      return state;
  }
};
