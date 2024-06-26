import axios from "axios";

import { MONDO, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MONDOS = import.meta.env.VITE_REACT_APP_MONDO;

export const postMondo = (mondo, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MONDOS}`;
      const { data } = await axios.post(endpoint, mondo, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: MONDO,
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
