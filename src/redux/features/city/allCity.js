import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  city: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllCity = createAsyncThunk(
  "allCity/getCities",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/cities?page=${data?.page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
export const getCity = createAsyncThunk(
  "allCity/getCity",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/cities?cityName=${data?.name}`);
      if (data.name === "") {
        thunkAPI.dispatch(getAllCity());
      }
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
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllCity.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load city");
      })
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.city = actions.payload.data;
        state.totalPages = 1;
        state.page = 1;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
        toast.error("There was an error");
      });
  },
});

export default allCitySlice.reducer;
