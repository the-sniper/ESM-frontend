import {
  USER_LOADED,
  LOGOUT,
  COUNT_LOADED,
  RESPONSE_STATUS,
  CLEAR_RESPONSE,
  CALL_END,
} from "./authTypes";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
      };
    case COUNT_LOADED:
      return {
        ...state,
        cartCount: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      return {
        ...state,
        token: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case RESPONSE_STATUS:
      return {
        ...state,
        responseStatus: action.payload,
      };
    case CALL_END:
      return {
        ...state,
        callEnd: action.payload,
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
