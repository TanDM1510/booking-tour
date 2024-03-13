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
  Spinner,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity, getCity } from "../../../redux/features/city/allCity";
import { Link } from "react-router-dom";
import { deleteCity } from "../../../redux/features/city/citySlice";
import ModelCity from "../../../components/dashboard/City/ModelCity";
import Search from "../../../components/common/Search";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function App() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const { city, isLoading, totalItems, totalPages } = useSelector(
    (store) => store.allCity
  );

  // get All city
  useEffect(() => {
    dispatch(getAllCity({ page: currentPage }));
  }, []);
  // handleDelete
  const handleDelete = () => {
    if (deleteCity) {
      dispatch(deleteCity({ id: deleteId, page: currentPage }));
    }
    onClose();
  };
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllCity) {
      dispatch(getAllCity({ page: page }));
    }
  };
  const renderCell = React.useCallback((city, columnKey) => {
    const cellValue = city[columnKey];
    switch (columnKey) {
      case "cityName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {city.cityName}
            </p>
          </div>
        );
      case "country":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {city.country}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[city.status]}
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
              <button>...</button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="w-10">
              <DropdownItem key="new">
                {" "}
                <Link to={`/dashboard/city/${city.id}`}>
                  <Tooltip content="Details">
                    <button className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Link to={`/dashboard/city/update/${city.id}`}>
                  <Tooltip content={`Edit city`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(city.id);
                  onOpen();
                }}
                className="text-danger"
                color="danger"
              >
                <Tooltip color="danger" content="Delete city">
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
        <Search search={getCity} label={"Search city by Name"} />
        {/* <Button color="success" onClick={() => navigate("/dashboard/addCity")}>
          + Add city
        </Button> */}
      </div>
      <div className="h-72">
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table aria-label="Example table with custom cells" className="mt-10">
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
            {city.length === 0 ? (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            ) : (
              <TableBody items={city}>
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

      <div className="flex flex-col gap-5">
        <p className="text-small text-default-500">Total items: {totalItems}</p>
        <Pagination
          total={totalPages}
          color="secondary"
          page={currentPage}
          onChange={(page) => handlePageChange(page)}
          showControls
        />
      </div>
      <ModelCity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
      />
    </>
  );
}
