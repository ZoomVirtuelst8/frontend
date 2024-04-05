import axios from "axios";
import {
  POSTUBICACION,
  GETUBICACIONBYID,
  GETALLUBICACION,
  UPDATEUBICACION,
  DELETEUBICACION,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const UBICACION = import.meta.env.VITE_REACT_APP_URL_UBICACION;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postUbicacion = (ubicacion, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}`;
      const { data } = await axios.post(endpoint, {ubicacion}, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTUBICACION,
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

export const getAllUbicacion = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETALLUBICACION,
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

export const getUbicacionById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETUBICACIONBYID,
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

export const updateUbicacion = (id, nUbicacion, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${id}`;
      const { data } = await axios.put(endpoint, nUbicacion, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATEUBICACION,
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

export const deleteUbicacion = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEUBICACION,
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
