import axios from "axios";
import { PIL, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const IL = import.meta.env.VITE_REACT_APP_IL;

export const pil = (coil, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${IL}`;
      const { data } = await axios.post(endpoint, {coil}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PIL,
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
