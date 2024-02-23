import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  vehicles: [],
};

export const getAllVehicles = createAsyncThunk(
  "getAllVehicles",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/vehicles");
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const createLocation = createAsyncThunk(
  "createLocation",
  async (location, thunkAPI) => {
    try {
      const resp = await customFetch.post("/locations", location);
      console.log(location);
      console.log(resp.data);

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
export const deleteLocation = createAsyncThunk(
  "deleteLocation",
  async (location, thunkAPI) => {
    try {
      const resp = await customFetch.delete(
        `/locations/${location.id}`,
        location
      );
      console.log(location);
      console.log(resp.data);
      thunkAPI.dispatch(getAllVehicles());
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
export const updateLocation = createAsyncThunk(
  "city/updateLocation",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/locations/${data.id}`, data);

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
const allVehicleSlice = createSlice({
  name: "tours",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicles.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.vehicles = actions.payload.data;
      })
      .addCase(getAllVehicles.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create location successful !!!");
      })
      .addCase(createLocation.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteLocation.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updateLocation.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      });
  },
});

export default allVehicleSlice.reducer;
