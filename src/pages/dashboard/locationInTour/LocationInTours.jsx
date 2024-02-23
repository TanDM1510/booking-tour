import React, { useEffect } from "react";
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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { getAllLocationInTour } from "../../../redux/features/locationInTour/locationInTour";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function LocationInTours() {
  const dispatch = useDispatch();
  const { locationInTours, isLoading } = useSelector(
    (store) => store.locationInTour
  );

  // get All city
  useEffect(() => {
    dispatch(getAllLocationInTour());
  }, []);
  // handleDelete
  //   const handleDelete = () => {
  //     if (deleteCity) {
  //       dispatch(deleteCity({ id: deleteId }));
  //     }
  //     onClose();
  //   };

  const renderCell = React.useCallback((locationInTours, columnKey) => {
    const cellValue = locationInTours[columnKey];
    switch (columnKey) {
      case "tourId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.tourId}
            </p>
          </div>
        );
      case "locationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.locationId}
            </p>
          </div>
        );
      case "duration":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.duration}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.description}
            </p>
          </div>
        );
      case "startCity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.startCity}
            </p>
          </div>
        );
      case "endCity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {locationInTours.endCity}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[locationInTours.status]}
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
                <Link to={`/dashboard/city/${locationInTours.id}`}>
                  <Tooltip content="Details">
                    <button className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Link to={`/dashboard/city/update/${locationInTours.id}`}>
                  <Tooltip content={`Edit city`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem
                key="edit"
                // onPress={() => {
                //   setDeleteId(city.id);
                //   onOpen();
                // }}
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
        <Input
          label="Search location in tour name"
          size="md"
          className="w-[300px]"
        />
        <NavLink to="/dashboard/addCity">
          <Button color="success">+ Add location in tour</Button>
        </NavLink>
      </div>

      {isLoading ? (
        <Spinner className="flex justify-center items-center mt-10" />
      ) : (
        <Table aria-label="Example table with custom cells">
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
          <TableBody items={locationInTours}>
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
      {/* <ModelCity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
      /> */}
    </>
  );
}
