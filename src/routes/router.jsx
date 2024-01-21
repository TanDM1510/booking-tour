import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Error from "../pages/Error";
import { action as signUpForm } from "../components/SignUp/FormSignUp";
import { action as loginForm } from "../components/login/FormLogin";
import { store } from "../redux/store";

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
    action: loginForm(store),
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
    action: signUpForm,
  },
]);
export default router;
