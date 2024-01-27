import axios from "axios";
import { PXLN, GXLN, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const XLN = import.meta.env.VITE_REACT_APP_XLN;

export const pxln = (coxln) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${XLN}`;
      const { data } = await axios.post(endpoint, { coxln });
      dispatch({
        type: PXLN,
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

export const gxln = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${XLN}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GXLN,
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
