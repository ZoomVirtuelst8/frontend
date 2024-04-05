import axios from "axios";

import { ROJOS, GETROJOS, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const ROJO = import.meta.env.VITE_REACT_APP_URL_ROJO;

export const postRojo = (rojo, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${ROJO}`;
      const { data } = await axios.post(endpoint, rojo, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: ROJOS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error.response.data.error,
      });
    }
  };
};

export const getAllRojo = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${ROJO}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETROJOS,
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
