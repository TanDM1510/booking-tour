import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../../utils";

// const addUserToLocalStorage = (user) => {
//   localStorage.setItem("user", JSON.stringify(user));
// };

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "api/v1/signUp",
  async (user, thunkApi) => {
    try {
      const resp = await customFetch.post("/signUp", user);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const loginsUser = createAsyncThunk(
  "api/v1/signIn",
  async (user, thunkApi) => {
    try {
      const resp = await customFetch.post("/signIn", user);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        if (toString(payload.message) === "Existing email") {
          toast.error(payload.message);
          state.isLoading = false;
          return;
        } else {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;
          toast.success("Hello there");
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginsUser.fulfilled, (state, action) => {
        if (parseInt(action.payload.status) === 500) {
          toast.error(action.payload.message);
          state.isLoading = false;
          return;
        } else {
          const user = {
            ...action.payload.user,
            accessToken: action.payload.token.accessToken,
            role: action.payload.userData.role,
            id: action.payload.userData.id,
            refreshToken: action.payload.token.refreshToken,
          };
          state.user = user;
          state.isLoading = false;
          localStorage.setItem("user", JSON.stringify(user));

          toast.success(action.payload.message);
        }
      })
      .addCase(loginsUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.response.data.message);
      });
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
