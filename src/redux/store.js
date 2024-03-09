import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cityReducer from "./features/city/citySlice";

import allCityReducer from "./features/city/allCity";
import allLocationReducer from "./features/location/allLocation";
import allActivitiesReducer from "./features/activities/allActivities";
import allLocationInTourReducer from "./features/locationInTour/locationInTour";
import toursReducer from "./features/tours/tours";
import vehiclesReducer from "./features/vehicles/vehicles";
import poisReducer from "./features/pois/pois";
import tripsReducer from "./features/trips/trips";
import tourGuidesReducer from "./features/tourGuide/tourGuides";
import bookingsReducer from "./features/bookings/bookings";
import allUserReducer from "./features/user/allUser";

export const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
    allCity: allCityReducer,
    allLocation: allLocationReducer,
    allActivities: allActivitiesReducer,
    locationInTour: allLocationInTourReducer,
    tours: toursReducer,
    vehicles: vehiclesReducer,
    pois: poisReducer,
    trips: tripsReducer,
    tourGuide: tourGuidesReducer,
    booking: bookingsReducer,
    allUser: allUserReducer,
  },
});
