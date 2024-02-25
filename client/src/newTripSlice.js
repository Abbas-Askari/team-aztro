import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

const tripSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  timeline: z.array(
    z.object({
      name: z.string().min(3),
      time: z.string(),
      description: z.string().min(10),
    })
  ),
  reviews: z.array(
    z.object({
      // name: z.string().min(3),
      // time: z.string().datetime(),
      // description: z.string().min(10),
    })
  ),
  agent: z.string(),
  images: z.any().refine((val) => val.length > 0, "File is required"),
  amenities: z.array(z.string()),
});

export const createTripAsync = createAsyncThunk(
  "auth/createTrip",
  async (data, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const parsed = tripSchema.safeParse(data);
      console.log({ parsed });

      if (parsed.success) {
        const validated = parsed.data;
        validated.timeline = validated.timeline.map((e) => ({
          ...e,
          time: new Date(e.time),
        }));

        let imageUrls = [];
        for (let image of validated.images) {
          console.log(image);
          const form = new FormData();
          form.append("images", image);
          const res = await fetch("http://localhost:3000/images", {
            method: "POST",
            headers: {
              // "Content-Type": "multipart/form-data",
            },
            body: form,
          });
          const { urls } = await res.json();
          imageUrls = [...imageUrls, ...urls];
        }
        validated.images = imageUrls;
        const res = await fetch(import.meta.env.VITE_BACKEND + "/trips/", {
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
          return dispatch(setNewTripErrors(data.errors));
        }
        console.log("done!");
        dispatch(setNewTripErrors([]));
      } else {
        const result = parsed.error;
        const errors = result.errors.map((error) => ({
          message: error.message,
          path: error.path[0],
        }));
        console.log({ errors });
        dispatch(setNewTripErrors(errors));
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const newTripSlice = createSlice({
  name: "newTrip",
  initialState: {
    errors: [],
    loading: false,
  },
  reducers: {
    setNewTripErrors: (state, action) => {
      state.errors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewTripErrors, setLoading } = newTripSlice.actions;

export default newTripSlice.reducer;
