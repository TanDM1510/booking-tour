import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BookingChart = ({ data }) => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const monthlyBookingData = data.reduce((acc, booking) => {
        const monthYear = booking.bookingDate.slice(0, 7); // Lấy chuỗi năm và tháng từ bookingDate (YYYY-MM)
        if (!acc[monthYear]) {
          acc[monthYear] = { totalAmount: 0, count: 0 };
        }
        acc[monthYear].totalAmount += booking.totalAmount;
        acc[monthYear].count++;
        return acc;
      }, {});
      setMonthlyData(monthlyBookingData);
    };

    fetchData();
  }, [data]);

  const months = Object.keys(monthlyData);
  const amounts = months.map((month) => monthlyData[month].totalAmount);
  const counts = months.map((month) => monthlyData[month].count);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Tổng tiền booking",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        yAxisID: "y-axis-1",
        data: amounts,
      },
      {
        label: "Số lượng đơn",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y-axis-2",
        data: counts,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BookingChart;
