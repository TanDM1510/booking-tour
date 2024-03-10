import { Navigate, Outlet } from "react-router-dom";

import BigSideBar from "../../components/dashboard/BigSideBar";

import NavbarDashBoard from "../../components/dashboard/Navbar";
import { useSelector } from "react-redux";

const ShareLayout = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      {user?.accessToken && user?.role === 0 ? (
        <main className=" h-screen ">
          <div className="h-1/6">
            <NavbarDashBoard />
          </div>

          <div className="flex flex-row   h-5/6 ">
            <BigSideBar />
            <div className="  w-full lg:basis-5/6 h-full ">
              <div className=" mt-2 w-full px-6 py-4  ">
                <Outlet />
              </div>
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
