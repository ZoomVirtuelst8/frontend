import axios from "axios";
import { PAM, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const AM = import.meta.env.VITE_REACT_APP_AM;

export const pam = (coam, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${AM}`;
      const { data } = await axios.post(
        endpoint,
        { coam },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: PAM,
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
