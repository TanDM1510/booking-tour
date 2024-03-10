import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  bookings: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllBookings = createAsyncThunk(
  "getAllBookings",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`bookings?page=${data?.page}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const searchLocation = createAsyncThunk(
  "/searchLocation",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(
        `/locations?locationName=${data.name}`
      );
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
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.bookings = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllBookings.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(searchLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchLocation.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.location = actions.payload.data;
      })
      .addCase(searchLocation.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update a location");
      });
  },
});

export default bookingSlice.reducer;
