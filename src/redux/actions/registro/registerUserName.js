import axios from "axios";

import {
  POSTUSERNAME,
  PERROR,
  GERROR,
  GETUSERNAME,
  UPDATEUSERNAME,
  DELETEUSERNAME,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const USERNAME = import.meta.env.VITE_REACT_APP_URL_USERNAME;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postUserName = (input) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}`;
      const { data } = await axios.post(endpoint, input);
      dispatch({
        type: POSTUSERNAME,
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

export const getUserNameById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETUSERNAME,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const updateUserName = (id, editedUserName) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${id}`;
      const { data } = await axios.put(endpoint, editedUserName);
      dispatch({
        type: UPDATEUSERNAME,
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

export const deleteUserName = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEUSERNAME,
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
