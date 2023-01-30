import { configureStore } from "@reduxjs/toolkit";
import figureSlice from "./figures/figureSlice";

export const store = configureStore({
  reducer: {
    figures: figureSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
