import axios from "axios";

import {
  POSTVENTA,
  GETALLVENTA,
  GETVENTABYID,
  UPDATEVENTA,
  DELETEVENTA,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const VENTA = import.meta.env.VITE_REACT_APP_URL_VENTA;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postVenta = (venta) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}`;
      const { data } = await axios.post(endpoint, venta);
      dispatch({
        type: POSTVENTA,
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

export const getAllVenta = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETALLVENTA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error.response.data.error,
      });
    }
  };
};

export const getVentaById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETVENTABYID,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error.response.data.error,
      });
    }
  };
};

export const updateVenta = (id, nVenta) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${id}`;
      const { data } = await axios.put(endpoint, nVenta);
      dispatch({
        type: UPDATEVENTA,
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

export const deleteVenta = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEVENTA,
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
