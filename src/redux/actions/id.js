import { ID } from "../actionsTypes";

export const saveID = (id) => {
  return {
    type: ID,
    payload: id,
  };
};