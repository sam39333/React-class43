import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import columnsReducer from "./columnsSlice"; 
 

const store = configureStore({
  reducer: {
    user: userReducer,
    columns: columnsReducer
  },
 
});

export default store;
