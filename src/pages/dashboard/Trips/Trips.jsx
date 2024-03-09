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
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";

import { EyeIcon } from "../../../components/common/EyeIcon";
import { columnses } from "./data";
import { useDispatch, useSelector } from "react-redux";

import { getAllTrips } from "../../../redux/features/trips/trips";
// import moment from "moment";
import { getAllTours } from "../../../redux/features/tours/tours";
import { Link } from "react-router-dom";
import { getAllTourGuides } from "../../../redux/features/tourGuide/tourGuides";
import Search from "../../../components/common/Search";
const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function Trips() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTrips());
    dispatch(getAllTours());
    dispatch(getAllTourGuides());
  }, []);
  const { tourGuides } = useSelector((store) => store.tourGuide);
  const { tours } = useSelector((store) => store.tours);
  const { trips, isLoading, totalItems, totalPages } = useSelector(
    (store) => store.trips
  );
  const mergedData = trips.map((trip) => {
    const tourGuide = tourGuides.find(
      (guide) => guide._id === trip.tourGuideId
    );
    const tour = tours.find((tour) => tour.id === trip.tourId);

    return {
      ...trip,
      tourGuide,
      tour,
    };
  });
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllTrips) {
      dispatch(getAllTrips({ page: page }));
    }
  };
  // const format = (id) => moment(id).format("MMMM Do YYYY");
  const renderCell = React.useCallback((mergedData, columnKey) => {
    const cellValue = mergedData[columnKey];

    switch (columnKey) {
      case "tourGuideId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tourGuide?.userId?.fullName}
            </p>
          </div>
        );
      case "tourId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.tour?.tourName}
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
        <Search label={"Search trip by tour guide name"} />
      </div>
      <div className="h-72">
        {" "}
        {isLoading ? (
          <Spinner className="flex justify-center items-center mt-10" />
        ) : (
          <Table
            aria-label="Example table with custom cells111"
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
    </>
  );
}
