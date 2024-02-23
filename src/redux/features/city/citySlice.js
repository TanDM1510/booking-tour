import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import { getAllCity } from "./allCity";

const initialState = {
  isLoading: false,
  cityName: "",
  country: "",
  status: true,
  editCityId: "",
  city: [],
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
export const updateCity = createAsyncThunk(
  "city/updateCity",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/city/update/${data.id}`, data);

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
export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async (cityId, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/city/${cityId.id}`, {
        data: cityId,
      });
      thunkAPI.dispatch(getAllCity());
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
export const getCity = createAsyncThunk(
  "allCity/getCity",
  async (city, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/city/${city.id}`, city);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
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
      return { ...state, ...payload };
    },
    setDeleteJob: (state, { payload }) => {
      return { ...state, ...payload };
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

      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
        toast.warning("Please wait...");
      })
      .addCase(deleteCity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Deleted successful ");
      })
      .addCase(deleteCity.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCity.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Updated successful ");
      })
      .addCase(updateCity.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update");
      })
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.city = actions.payload;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
        toast.error("There was an error");
      });
  },
});

export const { handleChange, clearValues, setEditCity, setDeleteJob } =
  citySlice.actions;
export default citySlice.reducer;
