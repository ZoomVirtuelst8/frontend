import axios from "axios";
import { PSK, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SK = import.meta.env.VITE_REACT_APP_SK;

export const psk = (cosk, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SK}`;
      const { data } = await axios.post(endpoint, {cosk}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PSK,
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
