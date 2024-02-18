import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../../utils";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  location: [],
};

export const getAllLocation = createAsyncThunk(
  "allLocation/getLocation",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/locations");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

const allLocationSlice = createSlice({
  name: "allLocation",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLocation.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.location = actions.payload.data;
      })
      .addCase(getAllLocation.rejected, (state) => {
        state.isLoading = false;
        toast.error("there was an error");
      });
  },
});

export default allLocationSlice.reducer;
