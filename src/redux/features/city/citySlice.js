import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../../utils";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  cityName: "",
  country: "",
  statusOption: [true, false],
  status: true,

  isEditing: true,
  editCityId: "",
};
export const createCity = createAsyncThunk(
  "city/createCity",
  async (city, thunkAPI) => {
    try {
      const resp = await customFetch.post("/city/create", city);
      console.log(resp.data);
      thunkAPI.dispatch(clearValues());
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

export const editCity = createAsyncThunk(
  "city/updatedCity",
  async ({ cityId, city }, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/city/update/${cityId}`, city);
      thunkAPI.dispatch(clearValues());
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
const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
    setEditCity: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("create success");
      })
      .addCase(createCity.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editCity.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditCity } = citySlice.actions;
export default citySlice.reducer;
