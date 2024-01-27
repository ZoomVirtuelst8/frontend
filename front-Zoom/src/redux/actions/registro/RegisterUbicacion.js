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

export const postUbicacion = (ubicacion) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}`;
      const { data } = await axios.post(endpoint, { ubicacion });
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

export const getAllUbicacion = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}`;
      const { data } = await axios.get(endpoint);
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

export const getUbicacionById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${id}`;
      const { data } = await axios.get(endpoint);
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

export const updateUbicacion = (id, nUbicacion) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${id}`;
      const { data } = await axios.put(endpoint, nUbicacion);
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

export const deleteUbicacion = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${UBICACION}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
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
