import axios from "axios";
import {
  PERROR,
  PAD,
  PPA,
  RESETERROR,
  DELETEC,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CAD = import.meta.env.VITE_REACT_APP_CAD;
const CPAD = import.meta.env.VITE_REACT_APP_CPAD;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const pad = (coad, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}`;
      const { data } = await axios.post(endpoint, {coad}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PAD,
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

export const ppad = (copad, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}/${CPAD}`;
      const { data } = await axios.post(endpoint, {copad}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: PPA,
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

export const deleteCorte = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEC,
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

export const resetError = () => {
  return {
    type: RESETERROR,
  };
};
