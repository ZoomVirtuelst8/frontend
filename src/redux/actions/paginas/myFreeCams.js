import axios from "axios";
import { MYFREECAMS, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MYFREECAMSS = import.meta.env.VITE_REACT_APP_MYFREECAMS;

export const postMyFreeCams = (myFreeCams, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MYFREECAMSS}`;
      const { data } = await axios.post(endpoint, myFreeCams, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: MYFREECAMS,
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
