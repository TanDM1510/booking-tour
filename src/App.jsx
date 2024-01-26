import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error from "./pages/Error";
import ShareLayout from "./pages/dashboard/ShareLayout";
import Stats from "./pages/dashboard/Stats";
import City from "./pages/dashboard/city/City";
import Location from "./pages/dashboard/location/Location";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ShareLayout />}>
          <Route index element={<Stats />} />
          <Route path="/dashboard/city" element={<City />} />
          <Route path="/dashboard/location" element={<Location />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
