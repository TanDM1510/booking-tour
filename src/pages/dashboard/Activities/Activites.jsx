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
import { columnses } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteActivity,
  getAllActivities,
  searchActivity,
} from "../../../redux/features/activities/allActivities";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import Search from "../../../components/common/Search";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Activities() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const { location } = useSelector((store) => store.allLocation);
  const { activities, isLoading, totalItems, totalPages } = useSelector(
    (store) => store.allActivities
  );
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
      dispatch(deleteActivity({ id: deleteId, page: currentPage }));
    }
    onClose();
  };
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllActivities) {
      dispatch(getAllActivities({ page: page }));
    }
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
        <Search label={"Search activity by name"} search={searchActivity} />
        <Link to="/dashboard/activities/add">
          <Button color="success">+ Add activity</Button>
        </Link>
      </div>
      <div className="h-72">
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cellsaaa"
            className="mt-10"
          >
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
            {activitiesWithLocation.length === 0 ? (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            ) : (
              <TableBody items={activitiesWithLocation}>
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
        isLoading={isLoading}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
      />
    </>
  );
}
