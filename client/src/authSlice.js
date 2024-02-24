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
    user: null,
    token: null,
    errors: [],
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
