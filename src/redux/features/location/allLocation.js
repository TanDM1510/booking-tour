import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  location: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
  redirectPage: 0,
};

export const getAllLocation = createAsyncThunk(
  "allLocation/getLocation",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`locations?page=${data?.page}`);
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
      thunkAPI.dispatch(getAllLocation({ page: location.page }));
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
  async ({ formData, id }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/locations/${id}`, formData);
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
      if (!data.name) {
        const resp = await customFetch.get(`/locations?page=1`);
        return resp.data;
      }
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
const allLocationSlice = createSlice({
  name: "allLocation",
  initialState,
  reducers: {
    clearRedirect: (state) => {
      state.redirectPage = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLocation.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.location = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllLocation.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load location");
      })
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state) => {
        state.isLoading = false;
        state.redirectPage = 1;
        toast.success("Create location successful !!!");
      })
      .addCase(createLocation.rejected, (state) => {
        state.isLoading = false;
        state.redirectPage = 0;
        toast.error("Failed to create location");
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted a location successful ");
      })
      .addCase(deleteLocation.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
        state.redirectPage = 0;
      })
      .addCase(updateLocation.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated a location successful ");
        state.redirectPage = 1;
      })
      .addCase(updateLocation.rejected, (state) => {
        state.isLoading = false;
        state.redirectPage = 0;
        toast.error("Failed to update a location");
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
export const { clearRedirect } = allLocationSlice.actions;
export default allLocationSlice.reducer;
