import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);
export default router;
