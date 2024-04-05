import axios from "axios";

import { SESION, PERROR, ERROR } from "../actionsTypes.js";
import { handleError } from "../../util/errorHandling.js";

const URL = import.meta.env.VITE_REACT_APP_URL_A;

export const initSession = (sesion) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/login`;
      const { data } = await axios.post(endpoint, sesion);
      const { token } = data;
      sessionStorage.setItem("accessToken", token);
      dispatch({
        type: SESION,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};
