import axios from "axios";
import {
  PERROR,
  GERROR,
  PRESTAMO,
  GETPRESTAMOBYID,
  DELETEPRESTAMOS,
  UPDATEPRESTAMOS,
} from "../../actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const PRESTAMOS = import.meta.env.VITE_REACT_APP_URL_PRESTAMOS;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postPrestamos = (prestamo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRESTAMOS}`;
      const { data } = await axios.post(endpoint, prestamo);
      dispatch({
        type: PRESTAMO,
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

export const getPrestamoById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRESTAMOS}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETPRESTAMOBYID,
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

export const updatePrestamo = (id, nPrestamo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRESTAMOS}/${id}`;
      const { data } = await axios.put(endpoint, nPrestamo);
      dispatch({
        type: UPDATEPRESTAMOS,
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

export const deletePrestamos = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRESTAMOS}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEPRESTAMOS,
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
