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
  useDisclosure,
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
import { getAllCity } from "../../../redux/features/city/allCity";
import { Link, NavLink } from "react-router-dom";
import { deleteCity } from "../../../redux/features/city/citySlice";
import ModelCity from "../../../components/dashboard/City/ModelCity";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function App() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const { city, isLoading } = useSelector((store) => store.allCity);

  // get All city
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  // handleDelete
  const handleDelete = () => {
    if (deleteCity) {
      dispatch(deleteCity({ id: deleteId }));
    }
    onClose();
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
        <Input label="Search city name" size="md" className="w-[300px]" />
        <NavLink to="/dashboard/addCity">
          <Button color="success">+ Add city</Button>
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
          <TableBody items={city}>
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
      <ModelCity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
      />
    </>
  );
}
