import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./features/uiSlice";
import dataSlice from "./features/dataSlice";
import newTripReducer from "./newTripSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    data: dataSlice,
    newTrip: newTripReducer,
  },
});
