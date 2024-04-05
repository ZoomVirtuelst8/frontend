import axios from "axios";
import { PXL, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const XL = import.meta.env.VITE_REACT_APP_XL;

export const pxl = (coxl, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${XL}`;
      const { data } = await axios.post(endpoint, {coxl}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PXL,
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
