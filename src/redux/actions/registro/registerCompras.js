import axios from "axios";
import {
  POSTCOMPRA,
  GETBICOMPRA,
  GETCOMPRA,
  UPDATECOMPRA,
  DELETECOMPRA,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const COMPRA = import.meta.env.VITE_REACT_APP_URL_COMPRAS;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postCompra = (compra, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMPRA}`;
      const { data } = await axios.post(endpoint, compra, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTCOMPRA,
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

export const getAllCompras = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMPRA}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETCOMPRA,
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

export const getCompraById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMPRA}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETBICOMPRA,
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

export const updateCompra = (id, nCompra, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMPRA}/${id}`;
      const { data } = await axios.put(endpoint, nCompra, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATECOMPRA,
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

export const deleteCompra = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMPRA}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETECOMPRA,
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
