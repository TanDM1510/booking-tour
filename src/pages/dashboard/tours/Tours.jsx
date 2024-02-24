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
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import { deleteTour, getAllTours } from "../../../redux/features/tours/tours";
import { getAllVehicles } from "../../../redux/features/vehicles/vehicles";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Tours() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTours());
    dispatch(getAllVehicles());
  }, []);
  const { vehicles } = useSelector((store) => store.vehicles);
  const { tours, isLoading } = useSelector((store) => store.tours);
  const handleDelete = () => {
    if (deleteTour) {
      dispatch(deleteTour({ id: deleteId }));
    }
    onClose();
  };

  const renderCell = React.useCallback((tours, columnKey) => {
    const cellValue = tours[columnKey];

    switch (columnKey) {
      case "tourName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {tours.tourName}
            </p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {tours.price}
            </p>
          </div>
        );

      case "vehicleTypeId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {vehicles.find((v) => v.id === tours.vehicleTypeId)?.vehicleName}
            </p>
          </div>
        );
      case "tourType":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {tours.tourType}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[tours.status]}
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
                  <Link to={`/dashboard/tours/view/${tours.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <Link to={`/dashboard/tours/update/${tours.id}`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(tours.id);
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
        <Input label="Search tour name" size="md" className="w-[300px]" />
        <Link to="/dashboard/tours/addTour">
          <Button color="success">+ Add Tour</Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner className="flex justify-center items-center mt-10" />
      ) : (
        <Table aria-label="Example table with custom cells111">
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
          <TableBody items={tours}>
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
