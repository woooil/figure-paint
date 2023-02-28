// reference: https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  /** @type {Figure[]} The list of Figures. */
  value: [],
  hints: [],
};

// eslint-disable-next-line
Object.defineProperty(Array.prototype, "fig", {
  value: function (id) {
    return this.find((f) => f.id === id);
  },
});

export const figureSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    /**
     * Create a new Figure.
     * @param {Figure}  action.payload  - The Figure to store.
     */
    create: (state, action) => {
      state.value.push(action.payload);
    },

    /**
     * Append the given list of Figures to the existing store.
     * @param {Figure[]}  action.payload  - The list of Figures to append.
     */
    append: (state, action) => {
      state.value = state.value.concat(action.payload);
    },

    /**
     * Update some properties of an existing Figure with the given data.
     * @param {Id}      action.payload.id   - The id of the Figure to update.
     * @param {Object}  action.payload.with - The data to update the Figure with. e.g. { def: { ... } }
     */
    update: (state, action) => {
      const index = state.value.findIndex((f) => f.id === action.payload.id);
      const figure = current(state.value)[index];
      Object.assign(figure, action.payload.with);
      state.value.splice(index, 1);
      state.value.splice(index, 0, figure);
    },

    /**
     * Remove an existing Figure.
     * @param {Id}  action.payload  - The id of the Figure to remove
     */
    remove: (state, action) => {
      const removeHelper = (value, id) => {
        let newValue = [...value];
        let dependants = newValue.find((f) => f.id === id).dependants;

        while (dependants.length > 0) {
          newValue = removeHelper(newValue, dependants[0]);
          dependants = newValue.find((f) => f.id === id).dependants;
        }
        let determinants = newValue.find((f) => f.id === id).determinants;
        determinants.forEach((det) => {
          const detIndex = newValue.findIndex((f) => f.id === det);
          const figure = newValue[detIndex];
          figure.dependants = newValue[detIndex].dependants.filter(
            (dep) => dep !== id
          );
          state.value.splice(detIndex, 1);
          state.value.splice(detIndex, 0, figure);
        });
        newValue.splice(
          newValue.findIndex((f) => f.id === id),
          1
        );
        return newValue;
      };

      state.value = removeHelper(current(state.value), action.payload);
    },

    /**
     * Set up a new dependency between two existing Figures.
     * @param {Id}      action.payload.determinant  - The determinant's id.
     * @param {Id}      action.payload.dependant    - The dependant's id.
     */
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

    /**
     * Lift an existing dependency.
     * @param {Id}      action.payload.determinant  - The determinant's id.
     * @param {Id}      action.payload.dependant    - The dependant's id.
     */
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

    /**
     * Create a new hint or update some properties of a hint with the given data or delete a hint.
     * @param {Id}      action.payload.id   - The id of the Figure to update.
     * @param {Figure|Object|undefined}  action.payload.with - The data to update the Figure with. e.g. { def: { ... } }
     */
    hinter: (state, action) => {
      const index = state.hints.findIndex((f) => f.id === action.payload.id);
      if (index < 0) {
        // Create a new hint
        action.payload.with.isHint = true;
        state.hints.push(action.payload.with);
      } else if (action.payload.with === undefined) {
        // Remove an existing hint
        state.hints.splice(index, 1);
      } else {
        // Update an existing hint
        const figure = current(state.hints)[index];
        Object.assign(figure, action.payload.with);
        state.hints.splice(index, 1);
        state.hints.splice(index, 0, figure);
      }
    },
  },
});

export const { create, append, update, remove, setDep, liftDep, hinter } =
  figureSlice.actions;

export default figureSlice.reducer;
