import { useEffect } from "react";
import BookingChart from "../../components/dashboard/BookingChart";
import BuyerProfilePieChart from "../../components/dashboard/BuyerProfilePieChart";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import TransactionChart from "../../components/dashboard/TransactionChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookings/bookings";

const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  const { bookings, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.booking
  );
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart datas={bookings} />
        <BuyerProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        {/* <RecentOrders />
        <PopularProducts /> */}
        {/* <BookingChart data={bookings} /> */}
      </div>
    </div>
  );
};
export default Stats;
