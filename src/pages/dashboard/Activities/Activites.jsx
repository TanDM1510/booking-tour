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
import {
  deleteActivity,
  getAllActivities,
} from "../../../redux/features/activities/allActivities";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Activities() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const { location } = useSelector((store) => store.allLocation);
  const { activities, isLoading } = useSelector((store) => store.allActivities);
  const activitiesWithLocation = activities.map((activity) => {
    const locationData = location.find((loc) => loc.id === activity.locationId);
    return {
      ...activity,
      locationData,
    };
  });
  useEffect(() => {
    dispatch(getAllActivities());
    dispatch(getAllLocation());
  }, []);
  const handleDelete = () => {
    if (deleteActivity) {
      dispatch(deleteActivity({ id: deleteId }));
    }
    onClose();
  };

  const renderCell = React.useCallback((activitiesWithLocation, columnKey) => {
    const cellValue = activitiesWithLocation[columnKey];
    switch (columnKey) {
      case "locationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {activitiesWithLocation.locationData?.locationName}
            </p>
          </div>
        );
      case "activityName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {activitiesWithLocation.activityName}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[activitiesWithLocation.status]}
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
                <Link to={`/dashboard/activities/${activitiesWithLocation.id}`}>
                  <Tooltip content="Details">
                    <button className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Link
                  to={`/dashboard/activities/update/${activitiesWithLocation.id}`}
                >
                  <Tooltip content={`Edit `}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(activitiesWithLocation.id);
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
        <Input label="Search activity name" size="md" className="w-[300px]" />
        <Link to="/dashboard/activities/add">
          <Button color="success">+ Add activity</Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner className="flex justify-center items-center mt-10" />
      ) : (
        <Table aria-label="Example table with custom cellsaaa">
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
          <TableBody items={activitiesWithLocation}>
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
        isLoading={isLoading}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
      />
    </>
  );
}
