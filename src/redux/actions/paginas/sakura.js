import axios from "axios";
import { SAKURA, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SAKURAS = import.meta.env.VITE_REACT_APP_SAKURA;

export const postSakura = (sakura) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SAKURAS}`;
      const { data } = await axios.post(endpoint, sakura);
      dispatch({
        type: SAKURA,
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
