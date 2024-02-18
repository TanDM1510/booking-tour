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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ShareLayout />}>
          <Route path="/dashboard/stats" element={<Stats />} />
          <Route path="/dashboard/city" element={<City />} />
          <Route path="/dashboard/location" element={<Location />} />
          <Route path="/dashboard/addCity" element={<AddCity />} />
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
