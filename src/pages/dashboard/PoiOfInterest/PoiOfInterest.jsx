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
import { Link, useNavigate } from "react-router-dom";
import { getAllLocation } from "../../../redux/features/location/allLocation";
import ModelLocation from "../../../components/dashboard/City/ModelLocation";
import Search from "../../../components/common/Search";
import { getAllPois } from "../../../redux/features/pois/pois";
import {
  deletePoint,
  getAllPoiOfInterest,
  searchPoint,
} from "../../../redux/features/poiOfInterest/allPoiOfInterest";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function PoiOfInterest() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  //Gọi dữ liệu
  useEffect(() => {
    dispatch(getAllPois());
    dispatch(getAllPoiOfInterest());
    dispatch(getAllLocation());
  }, []);
  //Xóa dữ liệu
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = () => {
    if (deletePoint) {
      dispatch(deletePoint({ id: deleteId, page: currentPage }));
    }
    onClose();
  };
  //Dữ liệu

  const { pointOfInterest, isLoading, totalPages, totalItems } = useSelector(
    (store) => store.allPoiOfInterest
  );
  const { location } = useSelector((store) => store.allLocation);
  const { pois } = useSelector((store) => store.pois);
  const mergedData = pointOfInterest.map((poi) => {
    const poiLocation = location.find((loc) => loc.id === poi.locationId);
    const poiPois = pois.find((p) => p.id === poi.categoryPOI_ID);

    return {
      ...poi,
      location: poiLocation,
      pois: poiPois,
    };
  });
  console.log(mergedData);
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (getAllPoiOfInterest) {
      dispatch(getAllPoiOfInterest({ page: page }));
    }
  };
  const navigate = useNavigate();
  //Table
  const renderCell = React.useCallback((mergedData, columnKey) => {
    const cellValue = mergedData[columnKey];
    switch (columnKey) {
      case "POIName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.POIName}
            </p>
          </div>
        );
      case "locationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.location?.locationName}
            </p>
          </div>
        );
      case "categoryPOI_ID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {mergedData.pois?.categoryName}
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
                  <Link to={`/dashboard/poiOfInterest/view/${mergedData.id}`}>
                    <span className="cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem key="copy">
                {" "}
                <Tooltip content={`Edit `}>
                  <Link to={`/dashboard/poiOfInterest/update/${mergedData.id}`}>
                    <button className="cursor-pointer active:opacity-50">
                      <EditIcon />
                    </button>
                  </Link>
                </Tooltip>
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={() => {
                  setDeleteId(mergedData.id);
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
        <Search
          search={searchPoint}
          page={currentPage}
          label={"Search point of interest by name"}
        />
        <Button
          color="success"
          onClick={() => navigate("/dashboard/poiOfInterest/add")}
        >
          + Add Point of Interest
        </Button>
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
            {mergedData.length === 0 ? (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            ) : (
              <TableBody items={mergedData}>
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}
