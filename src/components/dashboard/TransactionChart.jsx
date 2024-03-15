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

const transactions = [
  {
    id: 110,
    bookingDate: "2024-03-14T21:26:27.902005",
    userId: "65f19d67f2ccb5217aa37d20",
    totalAmount: 615000,
    totalCustomer: 5,
    status: true,
    tripId: 113,
    paymentMethodId: null,
    createAt: "2024-03-14T14:26:30.641Z",
    updateAt: "2024-03-14T14:28:09.411Z",
    deleteAt: null,
  },
  {
    id: 109,
    bookingDate: "2024-03-14T21:17:32.239178",
    userId: "65eec32f091eebb14e0c0217",
    totalAmount: 492000,
    totalCustomer: 4,
    status: true,
    tripId: 112,
    paymentMethodId: null,
    createAt: "2024-03-14T14:17:35.001Z",
    updateAt: "2024-03-14T14:19:06.955Z",
    deleteAt: null,
  },
  {
    id: 108,
    bookingDate: "2024-03-14T13:05:54.570867",
    userId: "65eec32f091eebb14e0c0217",
    totalAmount: 4000000,
    totalCustomer: 4,
    status: true,
    tripId: 108,
    paymentMethodId: null,
    createAt: "2024-03-14T06:05:55.735Z",
    updateAt: "2024-03-14T06:49:19.180Z",
    deleteAt: null,
  },
];

// Hàm định dạng số tiền
const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}tr`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return value.toString();
  }
};

// Tạo mảng chứa tổng số tiền được thanh toán cho mỗi tháng, ban đầu là 0 cho tất cả các tháng
const totalAmountByMonth = new Array(12).fill(0);

// Tính tổng số tiền được thanh toán cho mỗi tháng
transactions.forEach((transaction) => {
  const date = new Date(transaction.bookingDate);
  const monthIndex = date.getMonth();
  totalAmountByMonth[monthIndex] += transaction.totalAmount;
});

// Tạo dữ liệu cho biểu đồ tổng số tiền được thanh toán cho mỗi tháng
const data = totalAmountByMonth.map((totalAmount, index) => ({
  name: ` Tháng ${index + 1}`, // Tên tháng
  TotalAmount: totalAmount, // Tổng số tiền
}));

export default function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
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
}
