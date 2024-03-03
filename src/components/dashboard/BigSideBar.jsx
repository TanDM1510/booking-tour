import { NavLink } from "react-router-dom";
import links, { importanceLinks, notImportanceLinks } from "../../utils/links";
import { Divider } from "@nextui-org/react";

const BigSideBar = () => {
  return (
    <div className=" hidden  lg:basis-1/6 h-full lg:block  bg-stone-100 ">
      <div className="pt-8 flex flex-col  items-center  h-full">
        <div className="mb-16 text-10"></div>
        <div className="w-full overflow-y-auto">
          <div className="w-full">
            {importanceLinks.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "white" : "",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                    };
                  }}
                  className="flex items-center w-full text-gray-500 capitalize transition ease-in-out duration-500 hover:bg-white hover:pl-14 hover:text-gray-900  "
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
                            ? "size-16 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                            : "size-16  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-blue-500 text-base hover:text-blue-500"
                            : "font-bold text-base hover:text-blue-500"
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
          <Divider className="w-full h-1" />
          <div className="w-full">
            {links.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "white" : "",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                    };
                  }}
                  className="flex items-center w-full text-gray-500 capitalize transition ease-in-out duration-500 hover:bg-white hover:pl-14 hover:text-gray-900  "
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
                            ? "size-16 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                            : "size-16  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-blue-500 text-base hover:text-blue-500"
                            : "font-bold text-base hover:text-blue-500"
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
          <Divider className="w-full h-1" />
          <div className="w-full">
            {notImportanceLinks.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "white" : "",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                    };
                  }}
                  className="flex items-center w-full text-gray-500 capitalize transition ease-in-out duration-500 hover:bg-white hover:pl-14 hover:text-gray-900  "
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
                            ? "size-16 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                            : "size-16  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-blue-500 text-base hover:text-blue-500"
                            : "font-bold text-base hover:text-blue-500"
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
      </div>
    </div>
  );
};
export default BigSideBar;
