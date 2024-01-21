import { Button } from "@nextui-org/react";
import Layout from "../components/common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };
  return (
    <Layout>
      <div>
        {user ? (
          <div>
            <Button onClick={handleLogout}>logout</Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Home;
