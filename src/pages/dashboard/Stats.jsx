import BuyerProfilePieChart from "../../components/dashboard/BuyerProfilePieChart";
import DashboardStatsGrid from "../../components/dashboard/DashboardStatsGrid";
import TransactionChart from "../../components/dashboard/TransactionChart";

const Stats = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        {/* <RecentOrders />
        <PopularProducts /> */}
      </div>
    </div>
  );
};
export default Stats;
