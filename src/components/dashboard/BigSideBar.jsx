import { NavLink } from "react-router-dom";
import links, { importanceLinks, notImportanceLinks } from "../../utils/links";
import { Divider } from "@nextui-org/react";

const BigSideBar = () => {
  return (
    <div className=" hidden  lg:basis-1/6 h-full lg:block  bg-stone-100 ">
      <div className=" flex flex-col  items-center  h-full">
        <div className="w-5/6 flex flex-col items-center justify-center border-3 rounded-lg overflow-y-auto ">
          <div className=" flex  flex-col gap-1 mb-1 mt-1 w-full">
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
                  className="flex items-center w-full text-gray-500 capitalize  transition ease-in-out duration-500 hover:bg-white hover:pl-2 hover:text-gray-900  "
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
                            ? "size-10 text-blue-500 mr-4  grid place-items-center transition hover:text-blue-600"
                            : "size-10 mr-4   grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-sm text-blue-500  hover:text-blue-500"
                            : "font-bold text-xs hover:text-blue-500"
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
          <Divider className="w-3/4 h-[1px]" />
          <div className=" flex  flex-col gap-1 mb-1 w-full mt-1 ">
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
                  className="flex items-center w-full text-gray-500 capitalize transition ease-in-out duration-500 hover:bg-white hover:pl-2 hover:text-gray-900  "
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
                            ? "size-10 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                            : "size-10  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-blue-500 text-sm hover:text-blue-500"
                            : "font-bold text-xs hover:text-blue-500"
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
          <Divider className="w-3/4 h-[1px]" />
          <div className=" flex  flex-col gap-1 mb-1 w-full mt-1 ">
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
                  className="flex items-center w-full text-gray-500 capitalize transition ease-in-out duration-500 hover:bg-white hover:pl-2 hover:text-gray-900  "
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
                            ? "size-10 text-blue-500 font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                            : "size-10  font-2xl mr-4 grid place-items-center transition hover:text-blue-600"
                        }
                      >
                        {icon}
                      </span>
                      <p
                        className={
                          isActive
                            ? " font-bold text-blue-500 text-sm hover:text-blue-500"
                            : "font-bold text-xs hover:text-blue-500"
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
