import { IoBarChartSharp } from "react-icons/io5";
// import { MdQueryStats } from "react-icons/md";
import { FaCity } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineLocalActivity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineTour } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BiTrip } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { TbNotebook } from "react-icons/tb";
import { FaCarOn } from "react-icons/fa6";
const links = [
  { id: 1, text: "stats", path: "/dashboard/stats", icon: <IoBarChartSharp /> },
  { id: 2, text: "city", path: "/dashboard/city", icon: <FaCity /> },
  {
    id: 3,
    text: "location",
    path: "/dashboard/location",
    icon: <CiLocationOn />,
  },
  {
    id: 4,
    text: "location activities",
    path: "/dashboard/activities",
    icon: <MdOutlineLocalActivity />,
  },
  {
    id: 5,
    text: "Location in Tour",
    path: "/dashboard/locationTour",
    icon: <FaMapLocationDot />,
  },
  {
    id: 6,
    text: "Tour",
    path: "/dashboard/tour",
    icon: <MdOutlineTour />,
  },
  {
    id: 7,
    text: "Category Of Poi",
    path: "/dashboard/categoryPOI",
    icon: <BiCategory />,
  },
  {
    id: 8,
    text: "Trip",
    path: "/dashboard/trip",
    icon: <BiTrip />,
  },
  { id: 9, text: "Payment", path: "/dashboard/payment", icon: <MdPayment /> },
  {
    id: 10,
    text: "Payment Method",
    path: "/dashboard/paymentMethod",
    icon: <MdOutlinePayments />,
  },
  {
    id: 11,
    text: "Booking",
    path: "/dashboard/booking",
    icon: <TbNotebook />,
  },
  {
    id: 12,
    text: "Vehicle",
    path: "/dashboard/vehicle",
    icon: <FaCarOn />,
  },
];

export default links;
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
