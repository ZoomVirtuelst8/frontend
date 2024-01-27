import axios from "axios";
import { PERROR, TRIPLESIETE } from "../../actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const TRIPLESIETES = import.meta.env.VITE_REACT_APP_TRIPLESIETE;

export const postTripleSiete = (tripleSiete) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${TRIPLESIETES}`;
      const { data } = await axios.post(endpoint, tripleSiete);
      dispatch({
        type: TRIPLESIETE,
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
