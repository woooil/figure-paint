// reference: https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

// eslint-disable-next-line
Object.defineProperty(Array.prototype, "fig", {
  value: function (id) {
    return this.find((f) => f.id === id);
  },
});

/**
 * Slice for figure.
 *
 * Actions available:
 *
 * @name create
 * Creates a new figure with the given data.
 * @param {object}    action.payload              - The figure usually created by newFigure.
 * @param {id}        action.payload.id           - The figure's id.
 * @param {FIG_TYPE}  action.payload.type         - The figure's type.
 * @param {object}    action.payload.def          - The figure's definition.
 * @param {[id]}      action.payload.determinants - The figure's determinants.
 * @param {[id]}      action.payload.dependants   - The figure's dependants.
 *
 * @name update
 * Updates some properties of an existing figure with the given data.
 * @param {object}  action.payload      - The figure's id and the data to update with.
 * @param {id}      action.payload.id   - The id of the figure to update.
 * @param {object}  action.payload.with - The data to update the figure with. e.g. { def: { ... } }
 *
 * @name remove
 * Removes an existing figure.
 * @param {id}  action.payload  - The id of the figure to remove
 *
 * @name setDep
 * Sets up a new dependency between two existing figures.
 * @param {object}  action.payload              - The ids of the determinant and the dependant.
 * @param {id}      action.payload.determinant  - The determinant's id.
 * @param {id}      action.payload.dependant    - The dependant's id.
 *
 * @name liftDep
 * Lifts an existing dependency.
 * @param {object}  action.payload              - The ids of the determinant and the dependant.
 * @param {id}      action.payload.determinant  - The determinant's id.
 * @param {id}      action.payload.dependant    - The dependant's id.
 *
 */
export const figureSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    create: (state, action) => {
      state.value.push(action.payload);
    },

    update: (state, action) => {
      const index = state.value.findIndex((f) => f.id === action.payload.id);
      const figure = current(state.value)[index];
      Object.assign(figure, action.payload.with);
      state.value.splice(index, 1);
      state.value.splice(index, 0, figure);
    },

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
