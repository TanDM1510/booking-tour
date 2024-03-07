import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  locationInTours: [],
};

export const getAllLocationInTour = createAsyncThunk(
  "getLocationInTour",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/tours/locations");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const createLocationInTour = createAsyncThunk(
  "createLocationInTour",
  async (locationInTour, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        `/tours/${locationInTour.tourId}/locations/${locationInTour.locationId}`,
        locationInTour
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
export const deleteLocationInTour = createAsyncThunk(
  "deleteLocationInTour",
  async (location, thunkAPI) => {
    try {
      const resp = await customFetch.delete(
        `/tours/locations/${location.id}`,
        location
      );
      thunkAPI.dispatch(getAllLocationInTour());
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
export const updateLocationInTour = createAsyncThunk(
  "updateLocationInTour",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/tours/locations/${data.id}`, data);
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
const allLocationInTourSlice = createSlice({
  name: "allLocationInTour",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllLocationInTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLocationInTour.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.locationInTours = actions.payload.data;
      })
      .addCase(getAllLocationInTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load Location In Tour");
      })
      .addCase(createLocationInTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocationInTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create location in tour successful !!!");
      })
      .addCase(createLocationInTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("There was an error XD");
      })
      .addCase(updateLocationInTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocationInTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updateLocationInTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      })
      .addCase(deleteLocationInTour.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteLocationInTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteLocationInTour.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default allLocationInTourSlice.reducer;
