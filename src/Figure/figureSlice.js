// reference: https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice, current } from "@reduxjs/toolkit";

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
    //   with: { field: value, ... }
    // }
    update: (state, action) => {
      const index = state.value.findIndex((f) => f.id === action.payload.id);
      state.value[index] = { ...state.value[index], ...action.payload.with };
    },

    // remove an existing figure
    // action.payload: id
    remove: (state, action) => {
      const removeHelper = (value, id) => {
        var newValue = [...value];
        var dependants = newValue.find((f) => f.id === id).dependants;

        while (dependants.length > 0) {
          newValue = removeHelper(newValue, dependants[0]);
          dependants = newValue.find((f) => f.id === id).dependants;
        }
        var determinants = newValue.find((f) => f.id === id).determinants;
        determinants.forEach((det) => {
          const detIndex = newValue.findIndex((f) => f.id === det);
          newValue[detIndex] = {
            ...newValue[detIndex],
            dependants: newValue[detIndex].dependants.filter(
              (dep) => dep !== id
            ),
          };
        });
        newValue.splice(
          newValue.findIndex((f) => f.id === id),
          1
        );
        return newValue;
      };

      state.value = removeHelper(current(state.value), action.payload);
    },

    // set a new dependency between two existing figures
    // action.payload: {
    //   determinant: id,
    //   dependant: id,
    // }
    setDep: (state, action) => {
      const detIndex = state.value.findIndex(
        (f) => f.id === action.payload.determinant
      );
      state.value[detIndex].dependants.push(action.payload.dependant);
      const depIndex = state.value.findIndex(
        (f) => f.id === action.payload.dependant
      );
      state.value[depIndex].determinants.push(action.payload.determinant);
    },

    // lift an existing dependency
    // action.payload: {
    //   determinant: id,
    //   dependant: id,
    // }
    liftDep: (state, action) => {
      const detIndex = state.value.findIndex(
        (f) => f.id === action.payload.determinant
      );
      state.value[detIndex].dependants.splice(
        state.value[detIndex].dependants.findIndex(
          (f) => f === action.payload.dependant
        ),
        1
      );
      const depIndex = state.value.findIndex(
        (f) => f.id === action.payload.dependant
      );
      state.value[depIndex].determinants.splice(
        state.value[depIndex].determinants.findIndex(
          (f) => f === action.payload.determinant
        ),
        1
      );
    },
  },
});

export const { create, update, remove, setDep, liftDep } = figureSlice.actions;

export default figureSlice.reducer;
