import { Navigate, Outlet } from "react-router-dom";

import BigSideBar from "../../components/dashboard/BigSideBar";

import NavbarDashBoard from "../../components/dashboard/Navbar";
import { useSelector } from "react-redux";

const ShareLayout = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      {user?.accessToken && user?.role === 0 ? (
        <main className="flex flex-row   h-screen ">
          <BigSideBar />
          <div className="  w-full lg:basis-5/6 h-full ">
            <NavbarDashBoard />
            <div className=" mt-20 w-full px-6 py-4">
              <Outlet />
            </div>
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ShareLayout;
