import axios from "axios";

import {
  POSTUSERNAME,
  ERROR,
  GETUSERNAME,
  UPDATEUSERNAME,
  DELETEUSERNAME,
} from "../../actionsTypes.js";
import { handleError } from "../../../util/errorHandling";

const URL = import.meta.env.VITE_REACT_APP_URL;
const USERNAME = import.meta.env.VITE_REACT_APP_URL_USERNAME;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postUserName = (userNames, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}`;
      const { data } = await axios.post(endpoint, userNames, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTUSERNAME,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const getUserNameById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETUSERNAME,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const updateUserName = (id, editedUserName, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${id}`;
      const { data } = await axios.put(endpoint, editedUserName, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATEUSERNAME,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const deleteUserName = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEUSERNAME,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};
