import axios from "axios";
import {
  POSTQUINCENA,
  GETALLQUINCENA,
  GETBIQUINCENA,
  PERROR,
  GERROR,
  QUINCENAUSERS,
  QUINCENAHOME,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const QUINCENA = import.meta.env.VITE_REACT_APP_URL_QUINCENA;
const QUINCENAUSER = import.meta.env.VITE_REACT_APP_QUINCENAUSER;


export const postQuincena = (quincena, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}`;
      const { data } = await axios.post(endpoint, quincena, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: POSTQUINCENA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PERROR,
        payload: error,
      });
    }
  };
};

export const getAllQuincena = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETALLQUINCENA,
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

export const getQuincenaById = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: GETBIQUINCENA,
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

export const searchUserByFortnight = (ids, id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENAUSER}/${ids}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: QUINCENAUSERS,
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

export const searchAllUserByFortnight = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENAUSER}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: QUINCENAHOME,
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
