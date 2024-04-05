import axios from "axios";
import { PERROR, PSE } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SE = import.meta.env.VITE_REACT_APP_SE;

export const pse = (cose, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SE}`;
      const { data } = await axios.post(endpoint, {cose}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PSE,
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
