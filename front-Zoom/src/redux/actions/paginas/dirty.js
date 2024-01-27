import axios from "axios";
import { PDI, GDI, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const DI = import.meta.env.VITE_REACT_APP_DI;

export const pdi = (codi) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${DI}`;
      const { data } = await axios.post(endpoint, { codi });
      dispatch({
        type: PDI,
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

export const gdi = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${DI}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GDI,
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
