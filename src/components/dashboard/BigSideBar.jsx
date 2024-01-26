import { NavLink } from "react-router-dom";
import links from "../../utils/links";
import { AcmeLogo } from "./AcmeLogo";

const BigSideBar = () => {
  return (
    <div className=" hidden  lg:basis-1/6 h-full lg:block border-r-3 bg-stone-100">
      <div className="pt-8 flex flex-col  items-center  h-full">
        <div className="mb-7 text-10">
          <AcmeLogo />
        </div>

        {links.map((link) => {
          const { id, text, path, icon } = link;
          return (
            <NavLink
              className="flex items-center w-full text-gray-500 capitalize transition hover:bg-gray-50 hover:pl-14 hover:text-gray-900 "
              key={id}
              to={path}
            >
              {({ isActive }) => (
                <>
                  {" "}
                  <span
                    style={{ fontSize: "2rem" }}
                    className={
                      isActive
                        ? "size-20 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        : "size-20  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                    }
                  >
                    {icon}
                  </span>
                  <p
                    className={
                      isActive
                        ? " font-bold text-blue-500 text-2xl hover:text-blue-500"
                        : "font-bold text-2xl hover:text-blue-500"
                    }
                  >
                    {text}
                  </p>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default BigSideBar;
