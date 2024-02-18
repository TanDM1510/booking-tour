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

import { Link } from "react-router-dom";

import { getAllActivities } from "../../../redux/features/activities/allActivities";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Activities() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActivities());
  }, []);
  const { activities, isLoading } = useSelector((store) => store.allActivities);
  console.log(activities);
  const renderCell = React.useCallback((activity, columnKey) => {
    const cellValue = activity[columnKey];
    switch (columnKey) {
      case "locationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {activities.locationId}
            </p>
          </div>
        );
      case "activityName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {activities.activityName}
            </p>
          </div>
        );
      case "activityDuration":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {activities.activityDuration}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[activities.status]}
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
                <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
        <Input label="Search activity name" size="md" className="w-[300px]" />
        <Link to="/dashboard/addCity">
          <Button color="success">+ Add city</Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner className="flex justify-center items-center mt-10" />
      ) : (
        <Table aria-label="Example table with custom cellsaaa">
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
          <TableBody items={activities}>
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
