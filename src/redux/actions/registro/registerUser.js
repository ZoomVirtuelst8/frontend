import axios from "axios";
import {
  GUS,
  RU,
  PERROR,
  GERROR,
  VACIAR_USE,
  CHECKUSE,
  GETUSER,
  GETUSERIDNAME,
  GETUSERBI,
  UPDATEUSER,
  DELETEUSER,
} from "../../actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const REGISTRO = import.meta.env.VITE_REACT_APP_URL_REGISTRO;
const IDNAME = import.meta.env.VITE_REACT_APP_URL_IDNAME;
const CHECK = import.meta.env.VITE_REACT_APP_URL_CHECK;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const registroUser = (input) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}`;
      const { data } = await axios.post(endpoint, input);

      dispatch({
        type: RU,
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

export const setSingOut = (userVacio) => {
  return {
    type: VACIAR_USE,
    payload: userVacio,
  };
};

export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GUS,
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

export const checkUserById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${CHECK}/${id}`;
      const { data } = await axios.get(endpoint);
      let check = "";
      if (data) {
        check = true;
      }
      dispatch({
        type: CHECKUSE,
        payload: check,
      });
    } catch (error) {
      let check = false;
      dispatch({
        type: CHECKUSE,
        payload: check,
      });
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETUSER,
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
export const getAllUserIdName = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${IDNAME}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETUSERIDNAME,
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

export const getUserBI = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETUSERBI,
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

export const updateUser = (id, editUser) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.put(endpoint, editUser);
      dispatch({
        type: UPDATEUSER,
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

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEUSER,
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
