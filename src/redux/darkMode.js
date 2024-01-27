import { DARKMODE } from "./actionsTypes";

export const modoDark = (darkMode) => {
  return  (dispatch) => {
    dispatch({
      type: DARKMODE,
      payload: darkMode,
    });
  };
};
