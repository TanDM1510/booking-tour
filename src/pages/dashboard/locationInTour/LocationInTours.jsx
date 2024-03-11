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
  DropdownTrigger,
  Dropdown,
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
import { Link, useNavigate } from "react-router-dom";
import {
  deleteLocationInTour,
  getAllLocationInTour,
} from "../../../redux/features/locationInTour/locationInTour";
import { getAllTours } from "../../../redux/features/tours/tours";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import Search from "../../../components/common/Search";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function LocationInTours() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const { locationInTours, isLoading, totalItems, totalPages } = useSelector(
    (store) => store.locationInTour
  );
  const { location } = useSelector((store) => store.allLocation);
  const { tours } = useSelector((store) => store.tours);
  const combinedData = locationInTours.map((locationInTour) => {
    const locationData = location.find(
      (loc) => loc.id === locationInTour.locationId
    );
    const tourData = tours.find((tour) => tour.id === locationInTour.tourId);
    return {
      ...locationInTour,
      locationData,
      tourData,
    };
  });
  console.log(combinedData);
  // get All city
  useEffect(() => {
    dispatch(getAllLocationInTour());
    dispatch(getAllLocation());
    dispatch(getAllTours());
  }, []);

  const handleDelete = () => {
    if (deleteLocationInTour) {
      dispatch(deleteLocationInTour({ id: deleteId, page: currentPage }));
    }
    onClose();
  };
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllLocationInTour) {
      dispatch(getAllLocationInTour({ page: page }));
    }
  };
  const renderCell = React.useCallback((combinedData, columnKey) => {
    const cellValue = combinedData[columnKey];
    switch (columnKey) {
      case "tourId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {combinedData.tourData?.tourName}
            </p>
          </div>
        );
      case "locationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {combinedData.locationData?.locationName}
            </p>
          </div>
        );
      case "duration":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {combinedData.duration}
            </p>
          </div>
        );
      // case "description":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize text-default-400">
      //         {locationInTours.description}
      //       </p>
      //     </div>
      //   );
      // case "startCity":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize text-default-400">
      //         {locationInTours.startCity}
      //       </p>
      //     </div>
      //   );
      // case "endCity":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize text-default-400">
      //         {locationInTours.endCity}
      //       </p>
      //     </div>
      //   );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[combinedData.status]}
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
                <Link to={`/dashboard/locationTour/view/${combinedData.id}`}>
                  <Tooltip content="Details">
                    <button className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </button>
                  </Tooltip>
                </Link>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Link to={`/dashboard/locationTour/update/${combinedData.id}`}>
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
                  setDeleteId(combinedData.id);
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
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <Search label={"Search location in tour by name"} />

        <Button
          color="success"
          onClick={() => navigate("/dashboard/locationTour/add")}
        >
          + Add location in tour
        </Button>
      </div>
      <div className="h-72">
        {" "}
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table aria-label="Example table with custom cells" className="mt-10">
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
            <TableBody items={combinedData}>
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
