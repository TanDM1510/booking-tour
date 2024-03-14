import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "./userSlice";

const initialState = {
  isLoading: false,
  users: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
};

export const getAllUser = createAsyncThunk(
  "getAllUser",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get(`users?page=${data?.page}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);
// export const createLocation = createAsyncThunk(
//   "createLocation",
//   async (location, thunkAPI) => {
//     try {
//       const resp = await customFetch.post("/locations", location);
//       return resp.data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logoutUser());
//         return thunkAPI.rejectWithValue("Unauthorized");
//       }
//       return thunkAPI.rejectWithValue(error.response.message);
//     }
//   }
// );
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/users/${data.id}`, data);
      thunkAPI.dispatch(getAllUser());
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
export const updateUser = createAsyncThunk(
  "/updateUser",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/users/${data.id}`, data);
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
// export const searchLocation = createAsyncThunk(
//   "/searchLocation",
//   async (data, thunkAPI) => {
//     try {
//       const resp = await customFetch.get(
//         `/locations?locationName=${data.name}`
//       );
//       return resp.data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logoutUser());
//         return thunkAPI.rejectWithValue("Unauthorized");
//       }
//       return thunkAPI.rejectWithValue(error.response.message);
//     }
//   }
// );
const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.users = actions.payload.data;
        state.totalPages = actions.payload.totalPages;
        state.page = actions.payload.page;
        state.totalItems = actions.payload.totalItems;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load user");
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated a user successful ");
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update a user");
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Banned a user successful ");
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });

    //   .addCase(searchLocation.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(searchLocation.fulfilled, (state, actions) => {
    //     state.isLoading = false;
    //     state.location = actions.payload.data;
    //   })
    //   .addCase(searchLocation.rejected, (state) => {
    //     state.isLoading = false;
    //     toast.error("Failed to update a location");
    //   });
  },
});

export default allUserSlice.reducer;
