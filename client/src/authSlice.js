import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
  isAgent: z.boolean(),
});

const signupSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long."),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
  isAgent: z.boolean(),
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, { dispatch, getState }) => {
    try {
      console.log({ data });
      const parsed = loginSchema.safeParse(data);
      if (parsed.success) {
        const validated = parsed.data;
        console.log(validated);
        const res = await fetch(import.meta.env.VITE_BACKEND + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validated),
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          console.log(data.errors);
          return dispatch(setErrors(data.errors));
        }
        console.log("done!", data);
        dispatch(setErrors([]));
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
      } else {
        const result = parsed.error;
        const errors = result.errors.map((error) => ({
          message: error.message,
          path: error.path[0],
        }));
        console.log({ errors });
        dispatch(setErrors(errors));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (data, { dispatch, getState }) => {
    try {
      console.log({ data });
      const parsed = signupSchema.safeParse(data);
      if (parsed.success) {
        const validated = parsed.data;
        console.log(validated);
        const res = await fetch(import.meta.env.VITE_BACKEND + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validated),
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          console.log(data.errors);
          return dispatch(setErrors(data.errors));
        }
        console.log("done!");
        dispatch(setErrors([]));
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
      } else {
        const result = parsed.error;
        const errors = result.errors.map((error) => ({
          message: error.message,
          path: error.path[0],
        }));
        console.log({ errors });
        dispatch(setErrors(errors));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const editUserAsync = createAsyncThunk(
  "auth/update",
  async (data, { dispatch, getState }) => {

    const { user } = data 
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND + "/auth/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user})
      })

      const result = await res.json()

      console.log(result)
      dispatch(setUser(result))

    } catch (error) {
      console.log(error)
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    errors: [],
  },
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setErrors, setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
