import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const figureSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    create: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { create } = figureSlice.actions;

export default figureSlice.reducer;
