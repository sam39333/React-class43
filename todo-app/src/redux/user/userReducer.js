//import { SET_USER } from "./userActionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  password: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

