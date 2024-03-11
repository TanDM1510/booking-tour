import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
const statusColorMap = {
  true: "success",
  false: "danger",
};
import { columnses } from "./data";
const BookingDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { bookings } = useSelector((store) => store.booking);
  const { users } = useSelector((store) => store.allUser);

  useEffect(() => {
    if (id) {
      const findBooking = bookings.find((us) => us.id == id);
      setData(findBooking || {});
    }
  }, [id]);
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/booking");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Location Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columnses}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              {users.find((c) => c._id === data.userId)?.fullName}
            </TableCell>
            <TableCell>{data.tripId}</TableCell>
            <TableCell>{data.bookingDate}</TableCell>
            <TableCell>{data.totalAmount}</TableCell>
            <TableCell>{data.totalCustomer}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={statusColorMap[data.status]}
                size="sm"
                variant="flat"
              >
                {data.status ? "Active" : "Disable"}
              </Chip>
            </TableCell>
            <TableCell>
              <Button color="primary" onClick={handleClose}>
                Back
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingDetails;
