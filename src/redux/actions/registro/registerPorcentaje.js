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

export const postPorcentaje = (porcentajes) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}`;
      const { data } = await axios.post(endpoint, porcentajes);
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

export const getAllPorcentaje = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}`;
      const { data } = await axios.get(endpoint);
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

export const getPorcentajeById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${id}`;
      const { data } = await axios.get(endpoint);
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

export const updatePorcentaje = (id, nPorcentajes) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${id}`;
      const { data } = await axios.put(endpoint, nPorcentajes);
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

export const deletePorcentaje = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PORCENTAJE}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
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
