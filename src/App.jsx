import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error from "./pages/Error";
import ShareLayout from "./pages/dashboard/ShareLayout";
import Stats from "./pages/dashboard/Stats";
import City from "./pages/dashboard/city/City";
import Location from "./pages/dashboard/location/Location";
import AddCity from "./pages/dashboard/city/AddCity";
import Activities from "./pages/dashboard/Activities/Activites";
import UpdateCity from "./pages/dashboard/city/UpdateCity";
import ViewCity from "./pages/dashboard/city/ViewCity";
import AddLocation from "./pages/dashboard/location/AddLocation";
import ViewLocation from "./pages/dashboard/location/ViewLocation";
import UpdateLocation from "./pages/dashboard/location/UpdateLocation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ShareLayout />}>
          <Route path="/dashboard/stats" element={<Stats />} />
          <Route path="/dashboard/city" element={<City />} />
          <Route path="/dashboard/city/update/:id" element={<UpdateCity />} />
          <Route path="/dashboard/addCity" element={<AddCity />} />
          <Route path="/dashboard/city/:id" element={<ViewCity />} />
          <Route path="/dashboard/location" element={<Location />} />

          <Route
            path="/dashboard/location/addLocation"
            element={<AddLocation />}
          />
          <Route
            path="/dashboard/location/update/:id"
            element={<UpdateLocation />}
          />
          <Route path="/dashboard/location/:id" element={<ViewLocation />} />
          <Route path="/dashboard/activities" element={<Activities />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
