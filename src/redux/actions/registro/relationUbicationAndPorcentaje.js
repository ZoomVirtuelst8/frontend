import axios from "axios";
import { RELATIONUBIANDPOR, PERROR } from "../../actionsTypes.js";
const URL = import.meta.env.VITE_REACT_APP_URL;
const RELATION = import.meta.env.VITE_REACT_APP_URL_RELATION;

export const relationUbicationAndPorcentaje = (input, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${RELATION}`;
      const { data } = await axios.post(endpoint, input, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: RELATIONUBIANDPOR,
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
