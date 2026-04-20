import * as ActionTypes from "./ActionTypes";

export const historia = (
  state = { isLoading: true, errMess: null, historia: [] },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_HISTORIA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        historia: action.payload,
      };

    case ActionTypes.HISTORIA_LOADING:
      return { ...state, isLoading: true, errMess: null, historia: [] };

    case ActionTypes.HISTORIA_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
