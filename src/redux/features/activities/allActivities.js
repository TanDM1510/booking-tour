import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

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
export const createActivity = createAsyncThunk(
  "createActivity",
  async (activity, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        "/location_activity/create",
        activity
      );
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
export const updateActivity = createAsyncThunk(
  "updateActivity",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(
        `/location_activity/update/${data.id}`,
        data
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
export const deleteActivity = createAsyncThunk(
  "deleteActivity",
  async (activity, thunkAPI) => {
    try {
      const resp = await customFetch.delete(
        `/location_activity/delete/${activity.id}`,
        activity
      );
      console.log(location);
      console.log(resp.data);
      thunkAPI.dispatch(getAllActivities());
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
        toast.error("Failed to load activities");
      })
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createActivity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create activity successful !!!");
      })
      .addCase(createActivity.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create activity :<");
      })
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActivity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated activity successful ");
      })
      .addCase(updateActivity.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteActivity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteActivity.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default allActivitiesSlice.reducer;
