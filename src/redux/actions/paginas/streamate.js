import axios from "axios";
import { STREAMATE, PERROR, DELETEST } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const STREAMATES = import.meta.env.VITE_REACT_APP_STREMATE;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postStreamate = (streamate, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMATES}`;
      const { data } = await axios.post(endpoint, streamate, {
        headers: {
          Authorization: token,
        },
      });
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

export const deleteStreamate = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMATES}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEST,
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
