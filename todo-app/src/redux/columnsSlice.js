import { createSlice } from "@reduxjs/toolkit";

const columnsSlice = createSlice({
  name: "columns",
  initialState: [],
  reducers: {
    setColumns: (state, action) => {
      return action.payload;
    }
  }
});

export const { setColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
