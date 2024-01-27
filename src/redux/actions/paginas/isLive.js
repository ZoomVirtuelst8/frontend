import axios from "axios";
import { PIL, GIL, PERROR, GERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const IL = import.meta.env.VITE_REACT_APP_IL;

export const pil = (coil) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${IL}`;
      const { data } = await axios.post(endpoint, { coil });
      dispatch({
        type: PIL,
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

export const gil = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${IL}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GIL,
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
