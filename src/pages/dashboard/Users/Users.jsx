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
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { columnses } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import { deleteUser, getAllUser } from "../../../redux/features/user/allUser";
import { EditIcon } from "../../../components/common/EditIcon";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Users() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  //Gọi dữ liệu
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  //Xóa dữ liệu
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    if (deleteUser) {
      dispatch(deleteUser({ id: deleteId }));
    }
    onClose();
  };
  //Dữ liệu

  const { users, isLoading } = useSelector((store) => store.allUser);
  console.log(users);
  //Pagination

  const [filterValue, setFilterValue] = React.useState("");
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);
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
      case "image":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              <Avatar src={user.image} />
            </p>
          </div>
        );
      case "fullName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.fullName}
            </p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.email}
            </p>
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
              <DropdownItem key="copy">
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
              </DropdownItem>
              {/* <DropdownItem
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
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <Input
          isClearable
          className="w-full sm:max-w-[300px]"
          placeholder="Search by name..."
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Button
          color="success"
          onClick={() => navigate("/dashboard/users/addTourGuide")}
        >
          + Add Tour Guide
        </Button>
      </div>
      <div className="h-64">
        {" "}
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cells111"
            className="mt-10"
            bottomContent={
              <div className="flex w-full justify-center">
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
            <TableHeader columns={columnses}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            {users.length === 0 ? (
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
      <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
        label={"Do you actually want to ban this user?"}
      />
    </>
  );
}
