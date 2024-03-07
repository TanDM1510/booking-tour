import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  city: [],
};

export const getAllCity = createAsyncThunk(
  "allCity/getCities",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/cities");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

const allCitySlice = createSlice({
  name: "allCity",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCity.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.city = actions.payload.data;
      })
      .addCase(getAllCity.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load city");
      });
  },
});

export default allCitySlice.reducer;
