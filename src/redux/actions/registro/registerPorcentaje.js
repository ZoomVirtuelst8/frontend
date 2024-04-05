import axios from "axios";
import {
  POSTPORCENTAJE,
  GETALLPORCENTAJE,
  GETPORCENTAJEBYID,
  UPDATEPORCENTAJE,
  DELETEPORCENTAJE,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const PORCENTAJE = import.meta.env.VITE_REACT_APP_URL_PORCENTAJE;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postPorcentaje = (porcentajes, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}`;
      const { data } = await axios.post(endpoint, porcentajes, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTPORCENTAJE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllPorcentaje = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETALLPORCENTAJE,
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

export const getPorcentajeById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETPORCENTAJEBYID,
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

export const updatePorcentaje = (id, nPorcentajes, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${id}`;
      const { data } = await axios.put(endpoint, nPorcentajes, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATEPORCENTAJE,
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

export const deletePorcentaje = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEPORCENTAJE,
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
