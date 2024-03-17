import { useEffect } from "react";
import BookingChart from "../../components/dashboard/BookingChart";
import BuyerProfilePieChart from "../../components/dashboard/BuyerProfilePieChart";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import TransactionChart from "../../components/dashboard/TransactionChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookings/bookings";
import { getAllPayments } from "../../redux/features/payments/allPayments";
import PaymentTable from "../../components/dashboard/PaymentTable";
import ChartDate from "../../components/dashboard/ChartDate";

const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllPayments());
  }, []);
  const { bookings, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.booking
  );
  const { payments } = useSelector((store) => store.payments);
  console.log(payments);
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        {/* <RecentOrders />
        <PopularProducts /> */}
        {/* <BookingChart data={bookings} /> */}
        <ChartDate datas={payments} />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <PaymentTable />
        <TransactionChart datas={payments} />
      </div>
    </div>
  );
};
export default Stats;
