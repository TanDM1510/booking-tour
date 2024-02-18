import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cityReducer from "./features/city/citySlice";

import allCityReducer from "./features/city/allCity";
import allLocationReducer from "./features/location/allLocation";
import allActivitiesReducer from "./features/activities/allActivities";
export const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
    allCity: allCityReducer,
    allLocation: allLocationReducer,
    allActivities: allActivitiesReducer,
  },
});
