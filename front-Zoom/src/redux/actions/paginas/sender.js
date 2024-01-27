import axios from "axios";
import { PERROR, GERROR, GSE, PSE } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SE = import.meta.env.VITE_REACT_APP_SE;

export const pse = (cose) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SE}`;
      const { data } = await axios.post(endpoint, { cose });
      dispatch({
        type: PSE,
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

export const gse = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SE}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GSE,
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
