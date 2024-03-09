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
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import {
  deleteVehicle,
  getAllVehicles,
  searchVehicle,
} from "../../../redux/features/vehicles/vehicles";
import Search from "../../../components/common/Search";
const statusColorMap = {
  true: "success",
  false: "danger",
};
export default function Vehicles() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  //Gọi dữ liệu
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);
  const { vehicles, isLoading } = useSelector((store) => store.vehicles);
  //Xóa dữ liệu
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    if (deleteVehicle) {
      dispatch(deleteVehicle({ id: deleteId }));
    }
    onClose();
  };
  const renderCell = React.useCallback((vehicles, columnKey) => {
    const cellValue = vehicles[columnKey];
    switch (columnKey) {
      case "vehicleName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {vehicles.vehicleName}
            </p>
          </div>
        );
      case "capacity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {vehicles.capacity}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[vehicles.status]}
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
                  <Link to={`/dashboard/vehicles/view/${vehicles.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit Vehicle`}>
                  <Link to={`/dashboard/vehicles/update/${vehicles.id}`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(vehicles.id);
                  onOpen();
                }}
                className="text-danger"
                color="danger"
              >
                <Tooltip color="danger" content="Delete Location">
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
        <Search label={"Search vehicle by name"} search={searchVehicle} />
        <Link to="/dashboard/vehicles/addVehicle">
          <Button color="success">+ Add Vehicle</Button>
        </Link>
      </div>
      <div className="h-72">
        {" "}
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
            {vehicles.length === 0 ? (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            ) : (
              <TableBody items={vehicles}>
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

      <ModelLocation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
