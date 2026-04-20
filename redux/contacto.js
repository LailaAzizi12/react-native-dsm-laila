import * as ActionTypes from "./ActionTypes";

export const contacto = (
  state = { isLoading: true, errMess: null, contacto: [] },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTACTO:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        contacto: action.payload,
      };

    case ActionTypes.CONTACTO_LOADING:
      return { ...state, isLoading: true, errMess: null, contacto: [] };

    case ActionTypes.CONTACTO_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
