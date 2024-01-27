import axios from "axios";
import { PBO, GBO, PERROR, GERROR, DELETEBO } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const BO = import.meta.env.VITE_REACT_APP_BO;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const pbo = (cobo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}`;
      const { data } = await axios.post(endpoint, { cobo });
      dispatch({
        type: PBO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error,
      });
    }
  };
};

export const gbo = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GBO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const deleteBonga = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEBO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error,
      });
    }
  };
};
