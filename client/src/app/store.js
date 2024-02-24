import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";
import uiReducer from "../features/uiSlice";
import authReducer from "../authSlice";

export default configureStore({
  reducer: {
    auth : authReducer,
    ui: uiReducer,
    data: dataReducer,
  },
});
