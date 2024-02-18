import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../../utils";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  activities: [],
};

export const getAllActivities = createAsyncThunk(
  "allActivities/getActivities",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/location_activity");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

const allActivitiesSlice = createSlice({
  name: "allActivities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllActivities.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.activities = actions.payload;
      })
      .addCase(getAllActivities.rejected, (state) => {
        state.isLoading = false;
        toast.error("there was an error");
      });
  },
});

export default allActivitiesSlice.reducer;
