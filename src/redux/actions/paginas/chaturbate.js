import axios from "axios";
import { PERROR, GERROR, GCH, PCH } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CH = import.meta.env.VITE_REACT_APP_CH;

export const pch = (coch) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CH}`;
      const { data } = await axios.post(endpoint, { coch });
      dispatch({
        type: PCH,
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

export const gch = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CH}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GCH,
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
