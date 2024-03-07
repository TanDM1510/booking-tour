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
  Input,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columnses } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import { deleteTrip, getAllTrips } from "../../../redux/features/trips/trips";
// import moment from "moment";
import { getAllTours } from "../../../redux/features/tours/tours";
const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Trips() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTrips());
    dispatch(getAllTours());
  }, []);
  const { tours } = useSelector((store) => store.tours);
  const { trips, isLoading } = useSelector((store) => store.trips);
  const mergedData = trips.map((trip) => {
    const tourData = tours.find((tour) => tour.id === trip.tourId);
    return {
      ...trip,
      tourData,
    };
  });
  const handleDelete = () => {
    if (deleteTrip) {
      dispatch(deleteTrip({ id: deleteId }));
    }
    onClose();
  };
  // const format = (id) => moment(id).format("MMMM Do YYYY");
  const renderCell = React.useCallback((mergedData, columnKey) => {
    const cellValue = mergedData[columnKey];

    switch (columnKey) {
      case "tourGuideId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tourGuideId}
            </p>
          </div>
        );
      case "tourId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tourData?.tourName}
            </p>
          </div>
        );

      case "totalCustomer":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.totalCustomer}
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
                  <Link to={`/dashboard/trips/view/${mergedData.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <Link to={`/dashboard/trips/update/${mergedData.id}`}>
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
        <Input label="Search trip name" size="md" className="w-[300px]" />
        <Link to="/dashboard/trips/add">
          <Button color="success">+ Add Trip</Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner className="flex justify-center items-center mt-10" />
      ) : (
        <Table aria-label="Example table with custom cells111">
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
          <TableBody items={mergedData}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
