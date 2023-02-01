import { configureStore } from "@reduxjs/toolkit";
import figureSlice from "./Figure/figureSlice";

export const store = configureStore({
  reducer: {
    figures: figureSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
