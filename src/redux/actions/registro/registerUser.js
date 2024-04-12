import axios from "axios";
import {
  GUS,
  RU,
  PERROR,
  GERROR,
  VACIAR_USE,
  // CHECKUSE,
  GETUSER,
  GETUSERIDNAME,
  GETUSERBI,
  UPDATEUSER,
  DELETEUSER,
  ERROR,
} from "../../actionsTypes";
import { handleError } from "../../../util/errorHandling";

const URL = import.meta.env.VITE_REACT_APP_URL_A;
const REGISTRO = import.meta.env.VITE_REACT_APP_URL_REGISTRO;
const REGISTROVERIFY = import.meta.env.VITE_REACT_APP_URL_REGISTRO_VERIFY;
const IDNAME = import.meta.env.VITE_REACT_APP_URL_IDNAME;
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
      const errorMessage = handleError(error)
      dispatch({
        type: ERROR,
        payload: errorMessage,
      });
    }
  };
};
export const registroUserAuth = (input, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTROVERIFY}`;
      const { data } = await axios.post(endpoint, input, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: RU,
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

export const setSingOut = (userVacio) => {
  return {
    type: VACIAR_USE,
    payload: userVacio,
  };
};

export const getUserId = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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

// export const checkUserById = (id) => {
//   return async (dispatch) => {
//     try {
//       const endpoint = `${URL}/${REGISTRO}/${CHECK}/${id}`;
//       const { data } = await axios.get(endpoint);
//       let check = "";
//       if (data) {
//         check = true;
//       }
//       dispatch({
//         type: CHECKUSE,
//         payload: check,
//       });
//     } catch (error) {
//       let check = false;
//       dispatch({
//         type: CHECKUSE,
//         payload: check,
//       });
//     }
//   };
// };

export const getAllUser = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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
export const getAllUserIdName = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${IDNAME}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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

export const getUserBI = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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

export const updateUser = (id, editUser, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${id}`;
      const { data } = await axios.put(endpoint, editUser, {
        headers: {
          Authorization: token,
        },
      });
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

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint, {
        headers: {
          Authorization: token,
        },
      });
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
