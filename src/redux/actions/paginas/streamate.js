import axios from "axios";
import { STREAMATE, PERROR, DELETEST } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const STREAMATES = import.meta.env.VITE_REACT_APP_STREMATE;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postStreamate = (streamate) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMATES}`;
      const { data } = await axios.post(endpoint, streamate);
      dispatch({
        type: STREAMATE,
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

export const deleteStreamate = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMATES}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEST,
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
