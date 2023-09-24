import { ESM_FETCH, RESPONSE_STATUS, CLEAR_RESPONSE } from "./esmRegTypes";

export default (state, action) => {
  console.log(state, action, "checkStateActionESM");
  switch (action.type) {
    case ESM_FETCH:
      return {
        ...state,
        fetchESM: action.payload,
      };
    case RESPONSE_STATUS:
      return {
        ...state,
        responseStatus: action.payload,
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
