import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllBookings,
  searchBooking,
} from "../../../redux/features/bookings/bookings";
import { getAllTrips } from "../../../redux/features/trips/trips";
import { getAllUser } from "../../../redux/features/user/allUser";
import moment from "moment";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Bookings() {
  const currentDate = moment();
  const dispatch = useDispatch();
  //Xóa dữ liệu
  //Gọi dữ liệu
  useEffect(() => {
    dispatch(getAllBookings({ page: currentPage }));
    dispatch(getAllUser());
    dispatch(getAllTrips());
  }, []);
  //Dữ liệu
  const { trips } = useSelector((store) => store.trips);
  const { bookings, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.booking
  );

  const { users } = useSelector((store) => store.allUser);
  const mergedData = bookings.map((booking) => {
    const trip = trips.find((trip) => trip.id === booking.tripId);
    const user = users.find((user) => user._id === booking.userId);

    return {
      ...booking,
      trip,
      user,
    };
  });
  console.log(mergedData);
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllBookings) {
      dispatch(getAllBookings({ page: page }));
    }
  };
  const format = (date) => {
    moment(date).format("DD/MM/YY");
  };
  //Table
  const renderCell = React.useCallback((mergedData, columnKey) => {
    const cellValue = mergedData[columnKey];
    switch (columnKey) {
      case "userId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.user?.fullName}
            </p>
          </div>
        );

      case "bookingDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {moment(mergedData.bookingDate).format("YYYY-MM-DD ")}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[mergedData.status]}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Active" : "Disable"}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger className="ml-6 cursor-pointer">
              <p>...</p>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="w-10">
              <DropdownItem key="new">
                {" "}
                <Tooltip content="Details">
                  <Link to={`/dashboard/booking/${mergedData.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);
  const [searchParam, setSearchParam] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchParam(inputValue);
    debouncedHandleChange(inputValue);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleChange = useCallback(
    debounce((value) => {
      if (searchBooking) {
        try {
          // Perform additional validation or error handling here if needed
          dispatch(searchBooking({ id: value, page: currentPage }));
        } catch (error) {
          console.log(error);
        }
      }
    }, 500), // Set debounce delay to 500ms
    [dispatch, searchBooking] // Include dependencies for proper memoization
  );
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <Select
          // label={`${label}`}
          placeholder="Enter search term"
          required
          name="locationId"
          onChange={handleChange}
          value={searchParam}
          className="w-[300px]"
          defaultSelectedKeys={""}
        >
          {users.map((s) => (
            <SelectItem key={s._id} value={s._id}>
              {s.fullName}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="h-72">
        {" "}
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cells111"
            className="mt-10"
            bottomContent={
              <div className="flex flex-col gap-5">
                <p className="text-small text-default-500">
                  Total items: {totalItems}
                </p>
                <Pagination
                  total={totalPages}
                  color="secondary"
                  page={currentPage}
                  onChange={(page) => handlePageChange(page)}
                  showControls
                />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            {mergedData.length === 0 ? (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            ) : (
              <TableBody items={mergedData}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        )}
      </div>
    </>
  );
}
