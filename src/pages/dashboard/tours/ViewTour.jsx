import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

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
import { columnses } from "./data";
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
  const navigate = useNavigate(); // Use navigate for navigation
  const handleClose = () => {
    navigate("/dashboard/tours");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-3 ">Tour Details</p>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columnses}>
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
              <img src={data.image} height={200} width={200} />
            </TableCell>
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
              <Button color="primary" onClick={handleClose}>
                Back
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewTour;
