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
} from "@nextui-org/react";
import { EditIcon } from "../../../components/common/EditIcon";
import { DeleteIcon } from "../../../components/common/DeleteIcon";
import { EyeIcon } from "../../../components/common/EyeIcon";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../../redux/features/city/allCity";
import { Link } from "react-router-dom";
import { setEditCity } from "../../../redux/features/city/citySlice";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  const { city, isLoading } = useSelector((store) => store.allCity);

  const renderCell = React.useCallback((city, columnKey) => {
    const cellValue = city[columnKey];

    const country = city.country;
    const cityName = city.cityName;
    const status = city.status;
    console.log(city["cityName"]);
    console.log();
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
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link to="/city/:id">
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip content={`Edit city`}>
              <Link to="/dashboard/addCity">
                <button
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={dispatch(
                    setEditCity({
                      editCityId: city["id"],
                      country,
                      status,
                      cityName,
                    })
                  )}
                >
                  <EditIcon />
                </button>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content={`Delete city`}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <Input label="Search city name" size="md" className="w-[300px]" />
        <Link to="/dashboard/addCity">
          <Button color="success">+ Add city</Button>
        </Link>
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
    </>
  );
}
