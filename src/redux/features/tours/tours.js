import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  tours: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
  redirect: 0,
};

export const getAllTours = createAsyncThunk(
  "getAllTours",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/tours?page=${data?.page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const createTour = createAsyncThunk(
  "createTour",
  async (tour, thunkAPI) => {
    try {
      const resp = await customFetch.post("/tours", tour);
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
export const deleteTour = createAsyncThunk(
  "deleteTour",
  async (tour, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/tours/${tour.id}`, tour);
      thunkAPI.dispatch(getAllTours({ page: tour.page }));
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
export const updateTour = createAsyncThunk(
  "updateTour",
  async ({ formData, id }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/tours/${id}`, formData);
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
export const searchTour = createAsyncThunk(
  "searchTour",
  async (data, thunkAPI) => {
    try {
      if (!data.name) {
        const resp = await customFetch.get(`/tours?page=1`);
        return resp.data;
      }
      const resp = await customFetch.get(`/tours?tourName=${data.name}`);
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

const allTourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    clearRedirect: (state) => {
      state.redirect = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.tours = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllTours.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load tours");
      })
      .addCase(createTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create a tour successful !!!");
      })
      .addCase(createTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create tour");
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteTour.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted a tour successful ");
      })
      .addCase(deleteTour.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTour.fulfilled, (state) => {
        state.isLoading = false;
        state.redirect = 1;
        toast.success("Updated a tour successful ");
      })
      .addCase(updateTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update a tour");
      })
      .addCase(searchTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTour.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.tours = actions.payload.data;
      })
      .addCase(searchTour.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to search a tour");
      });
  },
});
export const { clearRedirect } = allTourSlice.actions;
export default allTourSlice.reducer;
