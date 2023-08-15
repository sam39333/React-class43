
import { SET_USER } from "./userActionTypes";

const initialState = {
  userName: "",
  password: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.payload.userName,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

export default userReducer;
