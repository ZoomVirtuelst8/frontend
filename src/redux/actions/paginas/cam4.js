import axios from "axios";
import { PCA, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CA = import.meta.env.VITE_REACT_APP_CA;

export const pca = (coca, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CA}`;
      const { data } = await axios.post(endpoint, {coca}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PCA,
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
