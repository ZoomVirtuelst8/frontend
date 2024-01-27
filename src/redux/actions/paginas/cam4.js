import axios from "axios";
import { PCA, GCA, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CA = import.meta.env.VITE_REACT_APP_CA;

export const pca = (coca) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CA}`;
      const { data } = await axios.post(endpoint, { coca });
      dispatch({
        type: PCA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const gca = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CA}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GCA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
