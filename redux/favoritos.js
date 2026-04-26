import * as ActionTypes from "./ActionTypes";
export const favoritos = (state = { favoritos: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITO:
      if (state.favoritos.some((fav) => fav === action.payload)) return state;

      const favoritos = state.favoritos.concat(action.payload);

      return {
        ...state,
        isLoading: false,
        errMess: null,
        favoritos,
      };

    default:
      return state;
  }
};
