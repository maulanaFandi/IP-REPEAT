import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../features/animeSlice";

export const store = configureStore({
  reducer: {
    animes: animeReducer,
  },
});