import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

const links = [
  { id: 1, text: "stats", path: "/dashboard/stats", icon: <IoBarChartSharp /> },
  { id: 2, text: "city", path: "/dashboard/city", icon: <MdQueryStats /> },
  { id: 3, text: "location", path: "/dashboard/location", icon: <FaWpforms /> },
  {
    id: 4,
    text: "location activities",
    path: "/dashboard/activities",
    icon: <FaWpforms />,
  },
  {
    id: 5,
    text: "Location in Tour",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
  {
    id: 6,
    text: "Tour",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
  {
    id: 7,
    text: "Category Of Poi",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
  {
    id: 8,
    text: "Trip",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
  { id: 9, text: "Payment", path: "/dashboard/location", icon: <FaWpforms /> },
  {
    id: 10,
    text: "Payment Method",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
  {
    id: 11,
    text: "Booking",
    path: "/dashboard/location",
    icon: <FaWpforms />,
  },
];

export default links;
