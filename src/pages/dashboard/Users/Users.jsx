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
  Pagination,
  Avatar,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columnses } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteLocation,
  getAllLocation,
  searchLocation,
} from "../../../redux/features/location/allLocation";

import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import Search from "../../../components/common/Search";
import { getAllUser } from "../../../redux/features/user/AllUser";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Users() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  //Gọi dữ liệu
  useEffect(() => {
    dispatch(getAllUser({ page: currentPage }));
  }, []);
  //Xóa dữ liệu
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    if (deleteLocation) {
      dispatch(deleteLocation({ id: deleteId, page: currentPage }));
    }
    onClose();
  };
  //Dữ liệu

  const { users, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.allUser
  );
  console.log(users);
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllLocation) {
      dispatch(getAllLocation({ page: page }));
    }
  };

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
              <DropdownItem key="new">
                {" "}
                <Tooltip content="Details">
                  <Link to={`/dashboard/location/${user._id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <Link to={`/dashboard/location/update/${user._id}`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Link>
                </Tooltip>
              </DropdownItem>
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
      <div className="flex justify-between items-center gap-2 mb-3">
        <Search
          search={searchLocation}
          page={currentPage}
          label={"Search user by name"}
        />

        <Link to="/dashboard/users/addTourGuide">
          <Button color="success">+ Add Tour Guide</Button>
        </Link>
      </div>
      <div className="h-72">
        {" "}
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cells111"
            className="mt-10"
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
              <TableBody items={users}>
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

      {/* <div className="flex flex-col gap-5">
        <p className="text-small text-default-500">Total items: {totalItems}</p>
        <Pagination
          total={totalPages}
          color="secondary"
          page={currentPage}
          onChange={(page) => handlePageChange(page)}
          showControls
        />
      </div> */}
      <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
