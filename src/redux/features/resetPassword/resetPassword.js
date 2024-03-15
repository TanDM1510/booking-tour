import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  otp: [],
  totalPages: 0,
  page: 1,
  totalItems: 0,
  redirect: 0,
  redirectOTP: 0,
};

export const createOTP = createAsyncThunk(
  "createOTP",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.post("/verify", { email: data });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized");
      }

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "verifyOtp",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.post("/verifyOtp", data);
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
export const resetPass = createAsyncThunk(
  "resetPass",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.post("/resetPass", data);
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
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearRedirect: (state) => {
      state.redirect = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.redirect = 1;
        toast.success("Please check your email to get OTP");
      })
      .addCase(createOTP.rejected, (state, actions) => {
        state.isLoading = false;
        state.redirect = 0;
        toast.error(actions.payload.status);
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.redirect = 1;
        state.isLoading = false;
        toast.success("Verify OTP success");
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isLoading = false;
        toast.error("Wrong OTP or exp");
        state.redirect = 0;
      })
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.redirect = 1;
        state.isLoading = false;
        toast.success("Reset password success");
      })
      .addCase(resetPass.rejected, (state) => {
        state.isLoading = false;
        toast.error("There was an error");
        state.redirect = 0;
      });
  },
});
export const { clearRedirect } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
