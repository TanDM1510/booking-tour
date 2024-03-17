import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/user/userSlice";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser("Logging out ...."));
    navigate("/login");
  };
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <div className="text-center font-bold text-4xl ">
        <p className="text-9xl font-semibold text-primary">
          <h1>Forbidden (403)</h1>
        </p>
        <h4 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          You can not access to this page
        </h4>
        <p className="mt-6 text-lg leading-7">
          Please login another account to acesss
        </p>
        <div className="mt-10">
          <Button color="primary" onClick={handleLogout}>
            <Link to="/login" className="btn btn-secondary capitalize">
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ForbiddenPage;
