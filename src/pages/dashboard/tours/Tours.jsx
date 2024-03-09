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
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import {
  deleteTour,
  getAllTours,
  searchTour,
} from "../../../redux/features/tours/tours";
import { getAllVehicles } from "../../../redux/features/vehicles/vehicles";
import Search from "../../../components/common/Search";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Tours() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const dispatch = useDispatch();
  //data
  useEffect(() => {
    dispatch(getAllTours({ page: currentPage }));
    dispatch(getAllVehicles());
  }, []);
  const { vehicles } = useSelector((store) => store.vehicles);
  const { tours, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.tours
  );
  const mergedData = tours.map((tour) => {
    const vehicleData = vehicles.find(
      (vehicle) => vehicle.id === tour.vehicleTypeId
    );
    return {
      ...tour,
      vehicleData,
    };
  });
  //page
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllTours) {
      dispatch(getAllTours({ page: page }));
    }
  };

  //delete
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    if (deleteTour) {
      dispatch(deleteTour({ id: deleteId, page: currentPage }));
    }
    onClose();
  };

  //table
  const renderCell = React.useCallback((mergedData, columnKey) => {
    const cellValue = mergedData[columnKey];
    switch (columnKey) {
      case "tourName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tourName}
            </p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.price} $
            </p>
          </div>
        );

      case "vehicleTypeId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.vehicleData?.vehicleName}
            </p>
          </div>
        );
      case "tourType":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tourType}
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
                  <Link to={`/dashboard/tours/view/${mergedData.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <Link to={`/dashboard/tours/update/${mergedData.id}`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(mergedData.id);
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
        <Search search={searchTour} label={`Search tour by name`} />
        <Link to="/dashboard/tours/addTour">
          <Button color="success">+ Add Tour</Button>
        </Link>
      </div>
      <div className="h-72">
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cells111"
            className="mt-10"
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
      <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
