import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  pois: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllPois = createAsyncThunk(
  "getPois",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/categories?page=${data?.page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
export const searchPois = createAsyncThunk(
  "searchPois",
  async (data, thunkAPI) => {
    try {
      if (!data.name) {
        const resp = await customFetch.get(`/categories?page=1`);
        return resp.data;
      }
      const resp = await customFetch.get(
        `/categories?categoryName=${data?.name}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
export const createPois = createAsyncThunk(
  "createPois",
  async (pois, thunkAPI) => {
    try {
      const resp = await customFetch.post("/categories", pois);
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
export const deletePois = createAsyncThunk(
  "deletePois",
  async (poi, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/categories/${poi.id}`, poi);
      thunkAPI.dispatch(getAllPois({ page: poi.page }));
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
export const updatePois = createAsyncThunk(
  "updatePois",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/categories/${data.id}`, data);
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
const allPoisSlice = createSlice({
  name: "pois",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPois.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPois.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.pois = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllPois.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load category");
      })
      .addCase(createPois.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPois.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Create category of poi successful !!!");
      })
      .addCase(createPois.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to create pois");
      })
      .addCase(deletePois.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deletePois.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deletePois.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updatePois.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePois.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updatePois.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      })
      .addCase(searchPois.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPois.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.pois = actions.payload.data;
      })
      .addCase(searchPois.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to search pois");
      });
  },
});

export default allPoisSlice.reducer;
