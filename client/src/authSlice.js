import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long."),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
  isAgent: z.boolean(),
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  (data, { dispatch, getState }) => {
    // const parsed = userSchema.
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    errors: [],
  },
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.token = null
      localStorage.clear()
    }
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
