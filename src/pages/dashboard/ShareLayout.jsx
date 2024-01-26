import { Outlet } from "react-router-dom";

import BigSideBar from "../../components/dashboard/BigSideBar";

import NavbarDashBoard from "../../components/dashboard/Navbar";

const ShareLayout = () => {
  return (
    <main className="flex flex-row   h-screen ">
      <BigSideBar />
      <div className="  w-full lg:basis-5/6 h-full ">
        <NavbarDashBoard />
        <div className=" mt-20 w-full px-6 py-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ShareLayout;
