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

export const createVehicle = createAsyncThunk(
  "createVehicle",
  async (vehicle, thunkAPI) => {
    try {
      const resp = await customFetch.post("/vehicles", vehicle);
      console.log(vehicle);
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
export const deleteVehicle = createAsyncThunk(
  "deleteVehicle",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/vehicles/${data.id}`, data);
      console.log(data);
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
export const updateVehicle = createAsyncThunk(
  "updateVehicle",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/vehicles/${data.id}`, data);

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
  name: "vehicles",
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
        toast.error("Failed to load Vehicle");
      })
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicle.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create Vehicle successful !!!");
      })
      .addCase(createVehicle.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to add vehicle");
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteVehicle.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteVehicle.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updateVehicle.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      });
  },
});

export default allVehicleSlice.reducer;
