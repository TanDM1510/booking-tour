import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  tourGuides: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllTourGuides = createAsyncThunk(
  "getAllTourGuides",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`tourGuides?page=${data?.page}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
export const createTourGuide = createAsyncThunk(
  "createTourGuide",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.post("/tourGuides", data);
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
const tourGuides = createSlice({
  name: "tourGuides",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTourGuides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTourGuides.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.tourGuides = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllTourGuides.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(createTourGuide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTourGuide.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create a  tour guide  successful !!!");
      })
      .addCase(createTourGuide.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create a  tour guide ");
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

export default tourGuides.reducer;
