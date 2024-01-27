import axios from "axios";

import {
  POSTCOMMENT,
  GETCOMMENT,
  GETCOMMENTBI,
  UPDATECOMMENT,
  DELETECOMMENT,
  PERROR,
  GERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const COMMENT = import.meta.env.VITE_REACT_APP_URL_COMMENT;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postComment = (nComment) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${COMMENT}`;
      const { data } = await axios.post(endpoint, nComment);
      dispatch({
        type: POSTCOMMENT,
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
