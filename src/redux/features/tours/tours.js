import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  tours: [],
};

export const getAllTours = createAsyncThunk(
  "getAllTours",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/tours");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const createTour = createAsyncThunk(
  "createTour",
  async (tour, thunkAPI) => {
    try {
      const resp = await customFetch.post("/tours", tour);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);
export const deleteTour = createAsyncThunk(
  "deleteTour",
  async (tour, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/tours/${tour.id}`, tour);
      thunkAPI.dispatch(getAllTours());
      return resp.data.message;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);
export const updateTour = createAsyncThunk(
  "updateTour",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/tours/${data.id}`, data);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);
const allTourSlice = createSlice({
  name: "tours",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.tours = actions.payload.data;
      })
      .addCase(getAllTours.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load tours");
      })
      .addCase(createTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create a tour successful !!!");
      })
      .addCase(createTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create tour");
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted a tour successful ");
      })
      .addCase(deleteTour.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated a tour successful ");
      })
      .addCase(updateTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update a tour");
      });
  },
});

export default allTourSlice.reducer;
