import { Navigate, Outlet } from "react-router-dom";

import BigSideBar from "../../components/dashboard/BigSideBar";

import NavbarDashBoard from "../../components/dashboard/Navbar";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../components/SignUp/Forrbiden";

const ShareLayout = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      {user?.accessToken && user?.role === 2 ? (
        <main className=" h-screen ">
          <div className="h-1/6">
            <NavbarDashBoard />
          </div>

          <div className="flex flex-row items-center justify-center   h-5/6 ">
            <BigSideBar />
            <div className="  w-full lg:basis-5/6 h-full  ">
              <div className=" mt-2 w-full px-6 py-4   ">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <ForbiddenPage />
      )}
    </>
  );
};

export default ShareLayout;
