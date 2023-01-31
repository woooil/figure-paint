// reference: https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const figureSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    create: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { create } = figureSlice.actions;

export default figureSlice.reducer;
