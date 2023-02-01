// reference: https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const figureSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    // create a new figure
    // action.payload: newFigure(type, def, other)
    create: (state, action) => {
      state.value.push(action.payload);
    },

    // update an existing figure
    // action.payload: {
    //   id: id,
    //   with: newFigure(type, def, other)
    // }
    update: (state, action) => {
      state.value[state.value.findIndex((f) => f.id === action.payload.id)] =
        action.payload.with;
    },
  },
});

export const { create, update } = figureSlice.actions;

export default figureSlice.reducer;
