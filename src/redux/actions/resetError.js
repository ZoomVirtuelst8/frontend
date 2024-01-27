import { RESETERROR } from "../actionsTypes";

export const resetError = () => {
  return {
    type: RESETERROR,
    payload: '',
  };
};
