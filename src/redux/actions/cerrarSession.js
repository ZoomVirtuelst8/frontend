import { LOGOUT } from "../actionsTypes.js";

export const cerrarSession = () => {
  return {
    type: LOGOUT,
  };
};
