import axios from "axios";
import { PXLN, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const XLN = import.meta.env.VITE_REACT_APP_XLN;

export const pxln = (coxln, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${XLN}`;
      const { data } = await axios.post(endpoint, {coxln}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PXLN,
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
