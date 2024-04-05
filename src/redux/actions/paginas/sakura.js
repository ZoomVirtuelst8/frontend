import axios from "axios";
import { SAKURA, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SAKURAS = import.meta.env.VITE_REACT_APP_SAKURA;

export const postSakura = (sakura, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SAKURAS}`;
      const { data } = await axios.post(endpoint, sakura, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: SAKURA,
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
