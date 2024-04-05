import axios from "axios";
import { PDI, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const DI = import.meta.env.VITE_REACT_APP_DI;

export const pdi = (codi, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${DI}`;
      const { data } = await axios.post(endpoint, {codi}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PDI,
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
