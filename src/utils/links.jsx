import { IoBarChartSharp } from "react-icons/io5";
// import { MdQueryStats } from "react-icons/md";
import { FaCity } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineLocalActivity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineTour } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BiTrip } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import { TbNotebook } from "react-icons/tb";
import { FaCarOn } from "react-icons/fa6";
const links = [
  {
    id: 6,
    text: "Tour",
    path: "/dashboard/tours",
    icon: <MdOutlineTour />,
  },
  {
    id: 3,
    text: "location",
    path: "/dashboard/location",
    icon: <CiLocationOn />,
  },
  {
    id: 5,
    text: "Location in Tour",
    path: "/dashboard/locationTour",
    icon: <FaMapLocationDot />,
  },
  { id: 2, text: "city", path: "/dashboard/city", icon: <FaCity /> },
];

export default links;
export const notImportanceLinks = [
  {
    id: 4,
    text: "location activities",
    path: "/dashboard/activities",
    icon: <MdOutlineLocalActivity />,
  },
  {
    id: 7,
    text: "Category Of Poi",
    path: "/dashboard/pois",
    icon: <BiCategory />,
  },

  {
    id: 10,
    text: "Vehicle",
    path: "/dashboard/vehicles",
    icon: <FaCarOn />,
  },
];
export const importanceLinks = [
  { id: 1, text: "stats", path: "/dashboard/stats", icon: <IoBarChartSharp /> },
  {
    id: 100,
    text: "Users",
    path: "/dashboard/users",
    icon: <FaHouseUser />,
  },
  {
    id: 9,
    text: "Booking",
    path: "/dashboard/booking",
    icon: <TbNotebook />,
  },
  {
    id: 8,
    text: "Trip",
    path: "/dashboard/trips",
    icon: <BiTrip />,
  },
];

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
