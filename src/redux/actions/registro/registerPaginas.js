import axios from "axios";
import {
  PAGINA,
  GETPAG,
  GETBIPAG,
  UPDATEPAG,
  DELETEPAG,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const PAGINAS = import.meta.env.VITE_REACT_APP_URL_PAGINA;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postPagina = (pagina) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINAS}`;
      const { data } = await axios.post(endpoint, { pagina });
      dispatch({
        type: PAGINA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllPagina = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINAS}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETPAG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getPaginaById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETBIPAG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const updatePagina = (id, nPagina) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${id}`;
      const { data } = await axios.put(endpoint, nPagina);
      dispatch({
        type: UPDATEPAG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const deletePagina = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEPAG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
