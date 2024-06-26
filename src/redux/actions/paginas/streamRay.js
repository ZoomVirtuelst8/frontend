import axios from "axios";
import { STREAMRAY, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const STREAMRAYS = import.meta.env.VITE_REACT_APP_STREAMRAY;

export const postStreamRay = (streamRay, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMRAYS}`;
      const { data } = await axios.post(endpoint, streamRay, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: STREAMRAY,
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
