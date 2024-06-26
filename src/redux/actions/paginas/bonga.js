import axios from "axios";
import { PBO, PERROR, DELETEBO } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const BO = import.meta.env.VITE_REACT_APP_BO;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const pbo = (cobo, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}`;
      const { data } = await axios.post(
        endpoint,
        { cobo },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: PBO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error,
      });
    }
  };
};

export const deleteBonga = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEBO,
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
