import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { columns } from "./data";
const statusColorMap = {
  true: "success",
  false: "danger",
};
const ViewTour = () => {
  const { id } = useParams();
  const { tours } = useSelector((state) => state.tours);
  const { vehicles } = useSelector((store) => store.vehicles);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    if (id) {
      const findTour = tours.find((us) => us.id == id);
      setData(findTour || {});
    }
  }, [id]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Tour Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{data.tourName}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>
              {vehicles.find((v) => v.id === data.vehicleTypeId)?.vehicleName}
            </TableCell>
            <TableCell>{data.tourType}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={statusColorMap[data.status]}
                size="sm"
                variant="flat"
              >
                {data.status ? "Active" : "Disable"}
              </Chip>
            </TableCell>
            <TableCell>
              <Link to={"/dashboard/tours"}>
                <Button color="primary">Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewTour;
