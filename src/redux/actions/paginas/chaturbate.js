import axios from "axios";
import { PERROR, PCH } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CH = import.meta.env.VITE_REACT_APP_CH;

export const pch = (coch, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CH}`;
      const { data } = await axios.post(endpoint, {coch}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PCH,
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
