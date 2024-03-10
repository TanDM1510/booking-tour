import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  pointOfInterest: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllPoiOfInterest = createAsyncThunk(
  "getAllPoiOfInterest",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`pointOfInterest?page=${data?.page}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
export const createPoint = createAsyncThunk(
  "createPoint",
  async (location, thunkAPI) => {
    try {
      const resp = await customFetch.post("/pointOfInterest", location);
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
export const deletePoint = createAsyncThunk(
  "deletePoint",
  async (point, thunkAPI) => {
    try {
      const resp = await customFetch.delete(
        `/pointOfInterest/${point.id}`,
        point
      );
      thunkAPI.dispatch(getAllPoiOfInterest({ page: point.page }));
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
export const updatePoint = createAsyncThunk(
  "updatePoint",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/pointOfInterest/${data.id}`, data);
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
export const searchPoint = createAsyncThunk(
  "/searchPoint",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(
        `/pointOfInterest?POIName=${data.name}`
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
const allPointOfInterestSlice = createSlice({
  name: "allPointOfInterest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPoiOfInterest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPoiOfInterest.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.pointOfInterest = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllPoiOfInterest.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load point of interest ");
      })
      .addCase(createPoint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPoint.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create point of interest successful !!!");
      })
      .addCase(createPoint.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create point of interest ");
      })
      .addCase(deletePoint.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deletePoint.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted a point of interest successful ");
      })
      .addCase(deletePoint.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to delete point of interest ");
      })
      .addCase(updatePoint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePoint.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated a point of interest successful ");
      })
      .addCase(updatePoint.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update a point of interest");
      })
      .addCase(searchPoint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPoint.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.location = actions.payload.data;
      })
      .addCase(searchPoint.rejected, (state) => {
        state.isLoading = false;
        state.pointOfInterest = [];
      });
  },
});

export default allPointOfInterestSlice.reducer;
