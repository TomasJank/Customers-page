import { CHANGE_LANG } from "../actionTypes";
const initialState = {
  lang: navigator.language.split("-")[0],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
