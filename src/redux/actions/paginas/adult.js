import axios from "axios";
import {
  PERROR,
  GERROR,
  GAD,
  GPA,
  PAD,
  PPA,
  RESETERROR,
  DELETEC,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CAD = import.meta.env.VITE_REACT_APP_CAD;
const CPAD = import.meta.env.VITE_REACT_APP_CPAD;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const pad = (coad) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}`;
      const { data } = await axios.post(endpoint, { coad });
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

export const gad = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GAD,
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

export const ppad = (copad) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}/${CPAD}`;
      const { data } = await axios.post(endpoint, { copad });
      dispatch({
        type: PPA,
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

export const gpad = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}/${CPAD}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GPA,
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

export const deleteCorte = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CAD}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEC,
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

export const resetError = () => {
  return {
    type: RESETERROR,
  };
};
