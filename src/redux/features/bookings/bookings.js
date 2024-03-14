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
      const resp = await customFetch.get(`bookings?page=${data.page}`);

      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const searchBooking = createAsyncThunk(
  "/searchBooking",
  async (data, thunkAPI) => {
    try {
      if (!data.id) {
        const resp = await customFetch.get(`/bookings?page=1`);
        return resp.data;
      }
      const resp = await customFetch.get(`/bookings?userId=${data.id}`);
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
        state.bookings = actions.payload.data.sort((a, b) => {
          // Sắp xếp theo createdAt, sử dụng momentjs hoặc so sánh trực tiếp
          return new Date(b.createAt) - new Date(a.createAt);
        });
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllBookings.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(searchBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBooking.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.bookings = actions.payload.data;
      })
      .addCase(searchBooking.rejected, (state) => {
        state.isLoading = false;
        state.bookings = [];
      });
  },
});

export default bookingSlice.reducer;
