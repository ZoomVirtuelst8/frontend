import axios from "axios";
import { PVX, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const VX = import.meta.env.VITE_REACT_APP_VX;

export const pvx = (covx, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VX}`;
      const { data } = await axios.post(endpoint, {covx}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PVX,
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
