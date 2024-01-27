import axios from "axios";
import { PAM, GAM, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const AM = import.meta.env.VITE_REACT_APP_AM;

export const pam = (coam) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${AM}`;
      const { data } = await axios.post(endpoint, { coam });
      dispatch({
        type: PAM,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const gam = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${AM}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GAM,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
