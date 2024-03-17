import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartDate = ({ datas = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(1); // Mặc định là tháng 1
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Mặc định là năm hiện tại
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}tr`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    } else {
      return value.toString();
    }
  };
  // Hàm xử lý sự kiện khi người dùng thay đổi tháng và năm
  const handleMonthYearChange = (event) => {
    const { name, value } = event.target;
    if (name === "month") {
      setSelectedMonth(parseInt(value));
    } else if (name === "year") {
      setSelectedYear(parseInt(value));
    }
  };
  const currentYear = new Date().getFullYear();
  const futureYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );
  // Lọc dữ liệu cho tháng và năm được chọn
  const filteredData = datas.filter((transaction) => {
    const date = new Date(transaction.paymentDate);
    const transactionMonth = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, cần cộng thêm 1
    const transactionYear = date.getFullYear();
    return (
      transactionMonth === selectedMonth && transactionYear === selectedYear
    );
  });

  const totalAmountByDay = new Array(31).fill(0); // Giả sử mỗi tháng có tối đa 31 ngày

  // Tính tổng số tiền được thanh toán cho mỗi ngày trong tháng
  filteredData.forEach((transaction) => {
    const date = new Date(transaction.paymentDate);
    const dayOfMonth = date.getDate(); // Lấy ngày trong tháng
    totalAmountByDay[dayOfMonth - 1] += transaction.amount;
  });

  // Tạo dữ liệu cho biểu đồ tổng số tiền được thanh toán cho mỗi ngày trong tháng
  const data = totalAmountByDay.map((totalAmount, index) => ({
    name: `Ngày ${index + 1}`, // Tên ngày
    TotalAmount: totalAmount, // Tổng số tiền
  }));

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mt-5">
      <strong className="text-gray-700 font-medium">Revenue by days</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <select
          className="mb-3"
          name="month"
          value={selectedMonth}
          onChange={handleMonthYearChange}
        >
          <option value={1}>Tháng 1</option>
          <option value={2}>Tháng 2</option>
          <option value={3}>Tháng 3</option>
          <option value={4}>Tháng 4</option>
          <option value={5}>Tháng 5</option>
          <option value={6}>Tháng 6</option>
          <option value={7}>Tháng 7</option>
          <option value={8}>Tháng 8</option>
          <option value={9}>Tháng 9</option>
          <option value={10}>Tháng 10</option>
          <option value={11}>Tháng 11</option>
          <option value={12}>Tháng 12</option>
        </select>
        <select
          className="mb-3 ml-3"
          name="year"
          value={selectedYear}
          onChange={handleMonthYearChange}
        >
          {futureYears.map((year) => (
            <option key={year} value={year}>
              Năm {year}
            </option>
          ))}
        </select>
        <ResponsiveContainer width="100%" height="50%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -5,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="TotalAmount" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartDate;
