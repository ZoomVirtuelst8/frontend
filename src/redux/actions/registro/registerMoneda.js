import axios from "axios";

import { POSTMONEDA, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MONEDA = import.meta.env.VITE_REACT_APP_URL_MONEDA;

export const postMoneda = (moneda, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MONEDA}`;
      const { data } = await axios.post(endpoint, moneda, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTMONEDA,
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
