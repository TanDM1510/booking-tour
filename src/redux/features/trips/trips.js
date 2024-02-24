import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  trips: [],
};

export const getAllTrips = createAsyncThunk(
  "getAllTrips",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/trips");
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const createTrip = createAsyncThunk(
  "createTrip",
  async (trip, thunkAPI) => {
    try {
      const resp = await customFetch.post("/trips", trip);
      console.log(trip);
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
export const deleteTrip = createAsyncThunk(
  "deleteTrip",
  async (trip, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/trips/${trip.id}`, trip);
      console.log(trip);
      console.log(resp.data);
      thunkAPI.dispatch(getAllTrips());
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
export const updateTrip = createAsyncThunk(
  "updateTrip",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/trips/${data.id}`, data);

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
const allTripSlice = createSlice({
  name: "trips",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTrips.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.trips = actions.payload.data;
      })
      .addCase(getAllTrips.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load trip");
      })
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create trip successful !!!");
      })
      .addCase(createTrip.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create trip");
      })
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteTrip.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteTrip.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrip.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updateTrip.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      });
  },
});

export default allTripSlice.reducer;
