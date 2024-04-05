import axios from "axios";
import { PST, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const ST = import.meta.env.VITE_REACT_APP_ST;

export const pst = (cost, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${ST}`;
      const { data } = await axios.post(endpoint, {cost}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PST,
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
