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

export const postVenta = (venta, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}`;
      const { data } = await axios.post(endpoint, venta, {
        headers: {
          Authorization: token,
        },
      });
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

export const getAllVenta = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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

export const getVentaById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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

export const updateVenta = (id, nVenta, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${id}`;
      const { data } = await axios.put(endpoint, nVenta, {
        headers: {
          Authorization: token,
        },
      });
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

export const deleteVenta = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VENTA}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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
