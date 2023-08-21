import { SET_USER } from "./userActionTypes";

export const setUser = (userName, password) => ({
  type: SET_USER,
  payload: { userName, password }
});
