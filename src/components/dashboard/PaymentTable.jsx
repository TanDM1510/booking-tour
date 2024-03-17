import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Avatar,
  Pagination,
  Input,
} from "@nextui-org/react";
import { DeleteIcon } from "../common/DeleteIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import ModelLocation from "../../../components/dashboard/City/ModelLocation";
// import { deleteUser } from "../../../redux/features/user/allUser";

import { getAllPayments } from "../../redux/features/payments/allPayments";
import moment from "moment";
import { getAllBookings } from "../../redux/features/bookings/bookings";
import { getAllUser } from "../../redux/features/user/allUser";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function PaymentTable() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  //Gọi dữ liệu
  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getAllBookings());
    dispatch(getAllUser());
  }, []);
  //Xóa dữ liệu
  const [deleteId, setDeleteId] = useState(null);
  //   const handleDelete = () => {
  //     if (deleteUser) {
  //       dispatch(deleteUser({ id: deleteId }));
  //     }
  //     onClose();
  //   };
  //Dữ liệu

  const { payments, isLoading } = useSelector((store) => store.payments);
  const { users } = useSelector((store) => store.allUser);
  const { bookings } = useSelector((store) => store.booking);
  const mergedData = payments
    .map((payment) => {
      const booking = bookings.find(
        (booking) => booking.id === payment.bookingId
      );
      if (!booking) return null; // Skip payments without matching bookings
      const user = users.find((user) => user._id === booking.userId);
      if (!user) return null; // Skip bookings without matching users
      return { ...payment, booking, user };
    })
    .filter(Boolean); // Loại bỏ các giá trị null (nếu có)

  console.log(mergedData);
  //Pagination
  const [filterValue, setFilterValue] = React.useState("");
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...mergedData];

    // Loại bỏ user có id là 2
    filteredUsers = filteredUsers.filter((user) => user.roleId !== 2);

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [payments, filterValue]);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const navigate = useNavigate();
  //Table
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    var role = "";
    switch (columnKey) {
      case "bookingId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.user.fullName}
            </p>
          </div>
        );
      case "paymentDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize ">
              {moment(user.paymentDate).format("YYYY-MM-DD ")}
            </p>
          </div>
        );
      case "amount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.amount} VND</p>
          </div>
        );
      case "roleId":
        switch (user.roleId) {
          case 0:
            role = "User";
            break;
          case 1:
            role = "Tour Guide";
            break;
          case 2:
            role = "Admin";
            break;
          default:
            role = "Unknown";
        }
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {role}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
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
              {/* <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/users/update/${user._id}`)
                    }
                    className="cursor-pointer active:opacity-50"
                  >
                    <EditIcon />
                  </button>
                </Tooltip>
              </DropdownItem> */}
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(user._id);
                  onOpen();
                }}
                className="text-danger"
                color="danger"
              >
                <Tooltip color="danger" content="Delete ">
                  <DeleteIcon />
                </Tooltip>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <div>
        <p className="mb-2 mt-2 font-bold text-lg">
          Bookings have been paid : {mergedData.length}
        </p>
        <div className="h-full">
          {" "}
          {isLoading ? (
            <Spinner className="flex justify-center items-center mt-10" />
          ) : (
            <Table
              aria-label="Example table with custom cells111"
              bottomContent={
                <div className="flex w-full justify-center ">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}
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
              {payments.length === 0 ? (
                <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
              ) : (
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item._id}>
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
        {/* <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
        label={"Do you actually want to ban this user?"}
      /> */}
      </div>
    </>
  );
}
