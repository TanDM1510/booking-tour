import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  payments: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllPayments = createAsyncThunk(
  "getAllPayments",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/payments`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

// export const searchBooking = createAsyncThunk(
//   "/searchBooking",
//   async (data, thunkAPI) => {
//     try {
//       if (!data.id) {
//         const resp = await customFetch.get(`/bookings?page=1`);
//         return resp.data;
//       }
//       const resp = await customFetch.get(`/bookings?userId=${data.id}`);
//       return resp.data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logoutUser());
//         return thunkAPI.rejectWithValue("Unauthorized");
//       }
//       return thunkAPI.rejectWithValue(error.response.message);
//     }
//   }
// );
const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.payments = actions.payload.data;
      })
      .addCase(getAllPayments.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load payments");
      });
  },
});

export default paymentsSlice.reducer;
