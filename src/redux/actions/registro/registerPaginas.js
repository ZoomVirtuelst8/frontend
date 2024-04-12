import axios from "axios";
import {
  PAGINA,
  GETPAG,
  GETBIPAG,
  UPDATEPAG,
  DELETEPAG,
  ERROR,
} from "../../actionsTypes.js";
import { handleError } from "../../../util/errorHandling";
const URL = import.meta.env.VITE_REACT_APP_URL;
const PAGINAS = import.meta.env.VITE_REACT_APP_URL_PAGINA;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postPagina = (pagina, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINAS}`;
      const { data } = await axios.post(
        endpoint,
        { pagina },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: PAGINA,
        payload: data,
      });
    } catch (error) {
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const getAllPagina = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINAS}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETPAG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error.message,
      });
    }
  };
};

export const getPaginaById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETBIPAG,
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

export const updatePagina = (id, nPagina, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${id}`;
      const { data } = await axios.put(endpoint, nPagina, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATEPAG,
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

export const deletePagina = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PAGINA}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: DELETEPAG,
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
